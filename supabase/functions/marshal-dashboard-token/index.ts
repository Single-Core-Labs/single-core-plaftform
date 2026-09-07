// marshal-dashboard-token — Supabase Edge Function (Deno)
//
// Auth broker for the public website's Marshal dashboard embed.
//
// Flow:
//   browser (signed in via Supabase Auth + GitHub OAuth)
//     → POST /functions/v1/marshal-dashboard-token  (Authorization: Bearer <supabase access token>)
//     → this function verifies the caller's Supabase session,
//       checks the allowlist, then exchanges the verified identity
//       with the Marshal gateway (POST {MARSHAL_GATEWAY_URL}/dashboard/exchange,
//       guarded by MARSHAL_DASHBOARD_EXCHANGE_SECRET) for a short-lived
//       scoped token the dashboard page uses for /api/dashboard/* calls.
//
// Env vars (set via Supabase dashboard / supabase secrets set):
//   MARSHAL_GATEWAY_URL                e.g. https://marshal.singlecorelabs.in (no trailing slash)
//   MARSHAL_DASHBOARD_EXCHANGE_SECRET  the shared secret configured on the gateway
//   MARSHAL_DASHBOARD_ALLOWLIST        optional comma-separated logins/emails; empty = any signed-in user
//   MARSHAL_DASHBOARD_ALLOWED_ORIGIN   REQUIRED: the website origin allowed to call this function
//                                      (e.g. https://singlecorelabs.in). NO wildcard default — this
//                                      function mints dashboard tokens, so it must never answer '*'.
//
// Fail-closed: missing env config, unverified caller, or disallowed Origin → 403/401, never a token.

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const GATEWAY_URL = (Deno.env.get('MARSHAL_GATEWAY_URL') || '').replace(/\/+$/, '')
const EXCHANGE_SECRET = Deno.env.get('MARSHAL_DASHBOARD_EXCHANGE_SECRET') || ''
const ALLOWLIST = (Deno.env.get('MARSHAL_DASHBOARD_ALLOWLIST') || '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean)
// No wildcard default. If unset, cross-origin browser calls are refused entirely
// (same-origin Supabase function invocations from server contexts still work).
const ALLOWED_ORIGIN = (Deno.env.get('MARSHAL_DASHBOARD_ALLOWED_ORIGIN') || '').replace(/\/+$/, '')

function corsHeaders(req: Request): Record<string, string> {
  if (!ALLOWED_ORIGIN) return {}
  // Reflect the configured origin ONLY when the request Origin matches it
  const origin = req.headers.get('Origin') || ''
  return origin === ALLOWED_ORIGIN
    ? {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Vary': 'Origin',
        'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    : {}
}

function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), 'Content-Type': 'application/json' },
  })
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    const headers = corsHeaders(req)
    // No matching Origin → no CORS headers → browser blocks the preflight entirely
    return new Response(null, { status: headers['Access-Control-Allow-Origin'] ? 204 : 403, headers })
  }
  if (req.method !== 'POST') return json(req, { error: 'Method Not Allowed' }, 405)

  // Fail-closed on missing broker configuration
  if (!GATEWAY_URL || !EXCHANGE_SECRET || !ALLOWED_ORIGIN) {
    console.error('marshal-dashboard-token: MARSHAL_GATEWAY_URL / MARSHAL_DASHBOARD_EXCHANGE_SECRET / MARSHAL_DASHBOARD_ALLOWED_ORIGIN not configured')
    return json(req, { error: 'dashboard auth not configured' }, 503)
  }

  // Cross-origin check: if an Origin header is present (browser context) it must
  // be the configured website origin. Non-browser callers (curl, server-to-server)
  // send no Origin and pass this check — they are still gated by the Supabase
  // session verification below.
  const origin = req.headers.get('Origin')
  if (origin && origin.replace(/\/+$/, '') !== ALLOWED_ORIGIN) {
    return json(req, { error: 'origin not allowed' }, 403)
  }

  // 1. Verify the caller's Supabase session (they signed in with GitHub via Supabase Auth)
  const authHeader = req.headers.get('Authorization') || ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()
  if (!token) return json(req, { error: 'missing session' }, 401)

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const { data: userData, error: userErr } = await admin.auth.getUser(token)
  if (userErr || !userData?.user) return json(req, { error: 'invalid session' }, 401)

  const user = userData.user
  const githubLogin: string = (user.user_metadata?.user_name as string) || (user.user_metadata?.preferred_username as string) || ''
  const email: string = (user.email as string) || ''

  // 2. Allowlist check (empty allowlist = any authenticated user, per founder directive)
  if (ALLOWLIST.length > 0) {
    const identities = [githubLogin, email].map((s) => s.toLowerCase()).filter(Boolean)
    if (!identities.some((id) => ALLOWLIST.includes(id))) {
      console.warn(`marshal-dashboard-token: ${githubLogin || email || user.id} not in allowlist`)
      return json(req, { error: 'not authorized for dashboard' }, 403)
    }
  }

  // 3. Exchange the verified identity with the Marshal gateway.
  //    user_id is strictly sanitized on the gateway side as well (charset allowlist).
  const userIdentity = (githubLogin || email || user.id).trim()
  const gwResp = await fetch(`${GATEWAY_URL}/dashboard/exchange`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: EXCHANGE_SECRET, user_id: userIdentity, ttl_secs: 900 }),
  })
  if (!gwResp.ok) {
    console.error(`marshal-dashboard-token: gateway exchange failed (${gwResp.status})`)
    return json(req, { error: 'gateway refused token exchange' }, 502)
  }
  const gwBody = await gwResp.json()
  if (!gwBody?.token) return json(req, { error: 'gateway returned no token' }, 502)

  // 4. Hand the short-lived token to the page (page never sees the broker secret)
  return json(req, { token: gwBody.token, expires_in: gwBody.expires_in ?? 900 })
})

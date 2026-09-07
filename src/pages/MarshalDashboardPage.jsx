import { useEffect, useState, useCallback, useRef } from 'react'
import { Github, ShieldCheck, AlertTriangle, LogOut, RefreshCw, ExternalLink, Clock } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'
import { supabase } from '@/lib/supabase'

const MARSHAL_GATEWAY_URL = (import.meta.env.VITE_MARSHAL_GATEWAY_URL || '').replace(/\/+$/, '')
// The page periodically re-issues the token instead of trusting one long timer,
// so a gateway restart (invalidates all tokens) is recovered from within one
// interval rather than leaving a dead iframe until the original expiry.
const TOKEN_REFRESH_INTERVAL_MS = 5 * 60 * 1000

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export default function MarshalDashboardPage() {
  const [session, setSession] = useState(null)          // Supabase session (GitHub identity)
  const [marshalToken, setMarshalToken] = useState(null) // short-lived token from the broker
  const [status, setStatus] = useState('loading')        // loading | signed-out | exchanging | ready | error
  const [error, setError] = useState('')
  const [tokenExpiresAt, setTokenExpiresAt] = useState(0)
  const refreshTimer = useRef(null)
  const exchanging = useRef(false)                       // guard against concurrent exchanges

  // Track Supabase auth state (the "git auth" — GitHub OAuth via Supabase Auth)
  useEffect(() => {
    if (!supabase) {
      setStatus('error')
      setError('Authentication is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing).')
      return
    }
    if (!MARSHAL_GATEWAY_URL) {
      // Fail fast with an explicit message instead of spinning forever —
      // a build without the gateway URL must never show an infinite "Verifying…"
      setStatus('error')
      setError('Dashboard endpoint is not configured (VITE_MARSHAL_GATEWAY_URL missing from this build).')
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session ?? null)
      setStatus(data?.session ? 'exchanging' : 'signed-out')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null)
      setStatus(s ? 'exchanging' : 'signed-out')
      if (!s) {
        setMarshalToken(null)
        setTokenExpiresAt(0)
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // Clean up the refresh timer on unmount
  useEffect(() => () => { if (refreshTimer.current) clearInterval(refreshTimer.current) }, [])

  // Exchange the verified GitHub identity for a short-lived Marshal dashboard token
  // via the Supabase edge function (which holds the broker secret — the browser
  // never sees it). Token lives in memory only. A periodic re-exchange (not one
  // long timer keyed to the first mint) keeps the iframe alive: if the gateway
  // restarts, every old token dies, and the next interval silently re-issues.
  const exchange = useCallback(async () => {
    if (!supabase || !session || !MARSHAL_GATEWAY_URL || exchanging.current) return
    exchanging.current = true
    setStatus((prev) => (prev === 'ready' ? 'ready' : 'exchanging'))
    setError('')
    try {
      const { data: fnData, error: fnErr } = await supabase.functions.invoke('marshal-dashboard-token', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (fnErr || !fnData?.token) {
        setStatus('error')
        setError(fnData?.error || fnErr?.message || 'Token exchange failed.')
        return
      }
      setMarshalToken(fnData.token)
      const ttlMs = (fnData.expires_in ?? 900) * 1000
      setTokenExpiresAt(Date.now() + ttlMs)
      setStatus('ready')
      // Periodic keepalive: re-issue well inside the 15-min TTL so the token is
      // always fresh, and a gateway restart heals within one interval.
      if (!refreshTimer.current) {
        refreshTimer.current = setInterval(() => { exchange() }, TOKEN_REFRESH_INTERVAL_MS)
      }
    } catch (e) {
      setStatus('error')
      setError(e?.message || 'Unexpected error during token exchange.')
    } finally {
      exchanging.current = false
    }
  }, [supabase, session])

  useEffect(() => {
    if (status === 'exchanging' && session) exchange()
  }, [status, session, exchange])

  const signIn = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  const signOut = async () => {
    if (refreshTimer.current) { clearInterval(refreshTimer.current); refreshTimer.current = null }
    if (supabase) await supabase.auth.signOut()
    setMarshalToken(null)
    setTokenExpiresAt(0)
    setStatus('signed-out')
  }

  const githubLogin = session?.user?.user_metadata?.user_name || session?.user?.user_metadata?.preferred_username || ''
  const displayName = githubLogin || session?.user?.email || 'signed-in user'

  const embedUrl = marshalToken ? `${MARSHAL_GATEWAY_URL}/dashboard?token=${encodeURIComponent(marshalToken)}` : ''

  return (
    <>
      <SEO title="Marshal Dashboard | Single Core Labs" description="Cost & observability dashboard for the Marshal agent runtime — live token, spend, and routing metrics. Sign in with GitHub." />
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8F8F8F] mb-2">Single Core Labs / Marshal</div>
              <h1 className="font-['Manrope',ui-sans-serif,system-ui] text-3xl font-bold tracking-tight">Cost &amp; Observability Dashboard</h1>
              <p className="text-sm text-[#8F8F8F] mt-2 max-w-xl">
                Live token usage, spend, routing, and per-agent success metrics from the Marshal agent runtime. Every number is measured — untracked metrics are labeled, never faked.
              </p>
            </div>
            {session && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8F8F8F]">@{displayName}</span>
                <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-[#B8B8B8] hover:bg-white/5 transition-colors">
                  <LogOut size={13} /> Sign out
                </button>
              </div>
            )}
          </div>

          {/* Signed out — the GitHub gate */}
          {status === 'signed-out' && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-24 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                <ShieldCheck size={24} className="text-[#B8B8B8]" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Sign in with GitHub to view the dashboard</h2>
              <p className="text-sm text-[#8F8F8F] mb-6 max-w-sm">
                The Marshal dashboard is restricted. Authenticate with your GitHub account to continue.
              </p>
              <button
                onClick={signIn}
                className="inline-flex items-center gap-2.5 rounded-md bg-[#EDEDED] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] hover:bg-white transition-colors"
              >
                <GitHubMark /> Continue with GitHub
              </button>
            </div>
          )}

          {/* Loading / exchanging */}
          {(status === 'loading' || status === 'exchanging') && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-24 text-center">
              <RefreshCw size={22} className="animate-spin text-[#8F8F8F] mb-4" />
              <p className="text-sm text-[#8F8F8F]">{status === 'loading' ? 'Checking session…' : 'Verifying access & issuing dashboard token…'}</p>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] px-8 py-24 text-center">
              <AlertTriangle size={24} className="text-amber-400 mb-4" />
              <h2 className="text-lg font-semibold mb-2">Can&apos;t open the dashboard</h2>
              <p className="text-sm text-[#8F8F8F] mb-6 max-w-md">{error}</p>
              {session ? (
                <button onClick={exchange} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-xs text-[#B8B8B8] hover:bg-white/5 transition-colors">
                  <RefreshCw size={13} /> Retry
                </button>
              ) : (
                <button onClick={signIn} className="inline-flex items-center gap-2.5 rounded-md bg-[#EDEDED] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] hover:bg-white transition-colors">
                  <GitHubMark /> Continue with GitHub
                </button>
              )}
            </div>
          )}

          {/* Ready — embed the live Marshal dashboard */}
          {status === 'ready' && marshalToken && (
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0A0A0A]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs text-[#8F8F8F]">
                  <Github size={13} />
                  <span>Marshal runtime · live metrics</span>
                  {tokenExpiresAt > 0 && (
                    <span className="inline-flex items-center gap-1 text-[#6F6F6F]">
                      <Clock size={11} />
                      session renews automatically
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exchange}
                    title="Re-issue dashboard token and reload"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B8B8B8] hover:text-white transition-colors"
                  >
                    <RefreshCw size={12} /> Refresh
                  </button>
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B8B8B8] hover:text-white transition-colors"
                  >
                    Open standalone <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <iframe
                key={marshalToken}
                src={embedUrl}
                title="Marshal cost dashboard"
                className="h-[85vh] w-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

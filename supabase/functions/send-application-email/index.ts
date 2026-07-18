import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') || 'singlecorelabs.in@gmail.com'

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  try {
    const { type, table, record } = await req.json()

    if (type !== 'INSERT' || table !== 'research_collective_applications') {
      return new Response('Ignored', { status: 200 })
    }

    const resend = new Resend(RESEND_API_KEY)

    await resend.emails.send({
      from: 'SCL Research Collective <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      subject: `New RC Application — ${record.first_name} ${record.last_name}`,
      html: `
        <h2>New Research Collective Application</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:600">Name</td><td style="padding:8px">${record.first_name} ${record.last_name}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Email</td><td style="padding:8px">${record.email}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Research Area</td><td style="padding:8px">${record.research_area}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Affiliation</td><td style="padding:8px">${record.affiliation || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Link</td><td style="padding:8px">${record.work_link || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Statement</td><td style="padding:8px">${record.statement}</td></tr>
        </table>
      `,
    })

    return new Response('Email sent', { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
})

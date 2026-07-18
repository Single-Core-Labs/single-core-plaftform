import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  try {
    const { type, table, record } = await req.json()

    if (type !== 'INSERT' || table !== 'research_collective_applications') {
      return new Response('Ignored', { status: 200 })
    }

    const resend = new Resend(RESEND_API_KEY)

    await resend.emails.send({
      from: 'SCL Research Collective <research@singlecorelabs.in>',
      to: [record.email],
      subject: 'Thank you for applying to the Single Core Labs Research Collective',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <p>Dear ${record.first_name},</p>

          <p>Thank you for applying to join our Research Collective.</p>

          <p>We've successfully received your application and are excited to learn more about your background, interests, and research aspirations.</p>

          <p>Our goal is to bring together researchers, engineers, and innovators from academia and industry to collaborate on impactful work across AI, systems, machine learning, robotics, computational biology, and emerging technologies.</p>

          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will review your application.</li>
            <li>Shortlisted candidates may be invited for a brief discussion.</li>
            <li>Selected members will receive details about upcoming research tracks, collaboration opportunities, and cohort activities.</li>
          </ul>

          <p>We're encouraged by the strong interest from professionals, students, and researchers worldwide, and we're looking forward to building a high-quality research community together.</p>

          <p>If you have any publications, projects, GitHub repositories, or additional materials you'd like us to review, feel free to reply to this email.</p>

          <p>Thank you again for your interest.</p>

          <p>
            Best regards,<br/><br/>
            <strong>MANAV SUTAR</strong><br/>
            CEO, Single Core Labs<br/><br/>
            Email: <a href="mailto:singlecorelabs.in@gmail.com">singlecorelabs.in@gmail.com</a><br/>
            Website: <a href="https://singlecorelabs.in">https://singlecorelabs.in</a>
          </p>
        </div>
      `,
    })

    return new Response('Email sent', { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
})

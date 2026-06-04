import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BUYING_HOUSE_EMAIL = 'belayet@bdsourcing.net'
const DEFAULT_EMAIL      = 'tubafashionfabrics@gmail.com'

function getRecipient(type: string): string {
  const bdKeywords = ['sourcing', 'buying house', 'buying']
  return bdKeywords.some(k => type.toLowerCase().includes(k))
    ? BUYING_HOUSE_EMAIL
    : DEFAULT_EMAIL
}

function buildHTML(data: {
  name: string; company?: string; email: string
  type: string; message: string; actualRecipient: string
}): string {
  const isBS = data.actualRecipient === BUYING_HOUSE_EMAIL
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F9F8F5;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;border:1px solid #E5E2D9">
  <tr><td style="background:#18181A;padding:28px 36px">
    <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#fff;font-weight:400">
      Belayet <em style="color:#A87D28">Hossain</em>
    </p>
    <p style="margin:5px 0 0;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4)">
      New Website Inquiry
    </p>
  </td></tr>
  <tr><td style="height:3px;background:linear-gradient(90deg,#7C5C10,#A87D28,#7C5C10)"></td></tr>
  <tr><td style="padding:32px 36px">
    <div style="padding:10px 16px;background:#FEF9C3;border:1px solid #FDE047;border-radius:4px;margin-bottom:20px;font-size:12px;color:#854D0E">
      <strong>Note:</strong> Would normally go to <strong>${data.actualRecipient}</strong>
    </div>
    <div style="display:inline-block;padding:8px 16px;border-radius:3px;margin-bottom:24px;
      background:${isBS ? '#FAF5EB' : '#F0FAF4'};
      border-left:3px solid ${isBS ? '#A87D28' : '#22c55e'}">
      <p style="margin:0;font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;
        color:${isBS ? '#A87D28' : '#16a34a'}">
        ${isBS ? '→ BD Sourcing Inquiry' : '→ General / Trade Inquiry'}
      </p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E2D9;border-radius:6px;overflow:hidden;margin-bottom:24px">
      ${[
        ['Full Name',    data.name],
        ['Company',      data.company || '—'],
        ['Email',        `<a href="mailto:${data.email}" style="color:#A87D28">${data.email}</a>`],
        ['Inquiry Type', data.type || 'General Inquiry'],
      ].map((r, i) => `
      <tr style="background:${i % 2 === 0 ? '#F9F8F5' : '#fff'}">
        <td style="padding:11px 16px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#ADADAB;width:130px;border-right:1px solid #E5E2D9">${r[0]}</td>
        <td style="padding:11px 16px;font-size:14px;color:#18181A">${r[1]}</td>
      </tr>`).join('')}
    </table>
    <div style="padding:18px 20px;background:#F9F8F5;border:1px solid #E5E2D9;border-radius:6px;margin-bottom:28px">
      <p style="margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#ADADAB">Message</p>
      <p style="margin:0;font-size:14px;color:#6A6A66;line-height:1.8;white-space:pre-wrap">${data.message}</p>
    </div>
    <div style="text-align:center">
      <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.type || 'Your Inquiry')}"
        style="display:inline-block;padding:13px 32px;background:#18181A;color:#fff;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border-radius:3px">
        Reply to ${data.name}
      </a>
    </div>
  </td></tr>
  <tr><td style="padding:18px 36px;border-top:1px solid #E5E2D9;background:#F9F8F5">
    <p style="margin:0;font-size:11px;color:#ADADAB;text-align:center">
      Sent from the Belayet Hossain portfolio contact form
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, email, type, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const actualRecipient = getRecipient(type || '')

    // TEST MODE: Resend free tier only allows sending to your own verified email
    // Set RESEND_TEST_MODE=true and RESEND_TEST_EMAIL=your@gmail.com in .env.local
    const isTestMode = process.env.RESEND_TEST_MODE === 'true'
    const testEmail  = process.env.RESEND_TEST_EMAIL

    if (isTestMode && !testEmail) {
      return NextResponse.json(
        { error: 'RESEND_TEST_EMAIL missing in .env.local' },
        { status: 500 }
      )
    }

    const toEmail = isTestMode ? testEmail! : actualRecipient

    const { error } = await resend.emails.send({
      from:    'Belayet Hossain Portfolio <onboarding@resend.dev>',
      to:      toEmail,
      replyTo: email,
      subject: `New Inquiry: ${type || 'General'} — from ${name}`,
      html:    buildHTML({
        name, company, email,
        type: type || 'General Inquiry',
        message, actualRecipient,
      }),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, sentTo: toEmail, testMode: isTestMode })

  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}

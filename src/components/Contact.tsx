'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Mail, Phone, Globe, Send, CheckCircle, AlertCircle } from 'lucide-react'

const schema = z.object({
  name:    z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  email:   z.string().email('Please enter a valid email'),
  type:    z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type F = z.infer<typeof schema>

const contactInfo = [
  { icon: Mail,  label: 'BD Sourcing',        val: 'belayet@bdsourcing.net',       href: 'mailto:belayet@bdsourcing.net' },
  { icon: Mail,  label: 'Tuba Fashion',        val: 'tubafashionfabrics@gmail.com', href: 'mailto:tubafashionfabrics@gmail.com' },
  { icon: Phone, label: 'Personal & WhatsApp', val: '+88 01783-000021',             href: 'tel:+8801783000021' },
  { icon: MapPin,label: 'Head Office',         val: 'House #6, Road #14, Sector #12\nUttara, Dhaka, Bangladesh', href: '#' },
  { icon: Globe, label: 'Website',             val: 'www.bdsourcing.net',           href: 'https://www.bdsourcing.net' },
]

const inquiryTypes = [
  'International Sourcing / Buying House',
  'Garments Manufacturing — SRKH Design',
  'Fabric & Yarn — Tuba Fashion',
  'Fabric & Yarn — Yousuf Traders',
  'Business Partnership',
  'General Inquiry',
]

/* small hint shown next to the select */
function RoutingHint({ type }: { type: string }) {
  if (!type) return null
  const isBDS = type.toLowerCase().includes('sourcing') || type.toLowerCase().includes('buying')
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[11px]" style={{ color: isBDS ? '#7C5C10' : '#6A6A66' }}>
      <Mail size={10} />
      Will be sent to&nbsp;<strong>{isBDS ? 'belayet@bdsourcing.net' : 'tubafashionfabrics@gmail.com'}</strong>
    </p>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register, handleSubmit, watch, reset,
    formState: { errors },
  } = useForm<F>({ resolver: zodResolver(schema) })

  const selectedType = watch('type') ?? ''

  /* scroll reveal */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* submit handler — calls API route */
  const onSubmit = async (data: F) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Something went wrong')
      setStatus('success')
      reset()
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.')
    }
  }

  const inputCls =
    'w-full bg-white border-[1.5px] border-[var(--border)] rounded px-3.5 py-2.5 text-[14px] font-light text-[var(--text)] placeholder:text-[var(--soft)] outline-none focus:border-[var(--gold2)] focus:ring-2 focus:ring-[var(--gold2)]/10 transition-all'

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* heading */}
        <div className="reveal">
          <p className="flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[.18em] uppercase text-[var(--gold)] mb-2">
            <span className="w-5 h-[1.5px] bg-[var(--gold)]" />Contact
          </p>
        </div>
        <div className="reveal">
          <h2 className="font-display text-[clamp(32px,4vw,50px)] font-normal leading-[1.1] tracking-[-0.015em] text-[var(--text)]">
            Get in <em className="italic text-[var(--gold2)]">Touch</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 mt-12">

          {/* ── Left: contact info ── */}
          <div className="reveal" style={{ transitionDelay: '.1s' }}>
            <p className="text-[15px] leading-[1.8] text-[var(--muted)] font-light mb-9">
              Whether you&apos;re an international buyer, potential partner, or exploring a new
              opportunity — every inquiry receives a personal response within 48 hours.
            </p>
            {contactInfo.map(it => (
              <div key={it.label}
                className="flex gap-3.5 mb-5 items-start group hover:translate-x-1 transition-transform duration-200">
                <div className="w-9 h-9 border-[1.5px] border-[var(--border)] bg-[var(--off)] flex items-center justify-center shrink-0 rounded group-hover:border-[var(--gold2)] group-hover:bg-[var(--gold-bg)] transition-all">
                  <it.icon size={14} className="text-[var(--gold)]" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--soft)] mb-0.5">{it.label}</p>
                  <a href={it.href} target={it.icon === Globe ? '_blank' : undefined}
                    className="text-[13px] text-[var(--muted)] whitespace-pre-line hover:text-[var(--gold)] transition-colors">
                    {it.val}
                  </a>
                </div>
              </div>
            ))}

            {/* routing info box */}
            <div className="mt-8 p-4 bg-[var(--gold-bg)] border border-[var(--border)] rounded-md border-l-[3px] border-l-[var(--gold2)]">
              <p className="text-[10px] font-bold tracking-[.12em] uppercase text-[var(--gold)] mb-2">Email Routing</p>
              <p className="text-[12px] text-[var(--muted)] leading-[1.7] font-light">
                Buying house &amp; sourcing inquiries go to <strong className="text-[var(--text)] font-medium">belayet@bdsourcing.net</strong>.
                All other inquiries go to <strong className="text-[var(--text)] font-medium">tubafashionfabrics@gmail.com</strong>.
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="reveal" style={{ transitionDelay: '.2s' }}>
            <div className="bg-[var(--off)] border-[1.5px] border-[var(--border)] rounded-xl p-8">

              {/* SUCCESS */}
              {status === 'success' && (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-[var(--gold-bg)] border-2 border-[var(--gold2)] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle size={24} className="text-[var(--gold2)]" />
                  </div>
                  <h3 className="font-display text-[24px] font-normal text-[var(--text)] mb-2">Message Sent!</h3>
                  <p className="text-[14px] text-[var(--muted)] mb-6">
                    Your inquiry has been received. We&apos;ll respond within 48 hours.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 border-[1.5px] border-[var(--border)] rounded text-[12px] font-semibold tracking-wide uppercase text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)] transition-all">
                    Send Another
                  </button>
                </div>
              )}

              {/* FORM */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                  {/* name + company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--soft)] mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input {...register('name')} placeholder="Your name" className={inputCls} />
                      {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--soft)] mb-1.5">Company</label>
                      <input {...register('company')} placeholder="Optional" className={inputCls} />
                    </div>
                  </div>

                  {/* email */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--soft)] mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input {...register('email')} type="email" placeholder="your@email.com" className={inputCls} />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email.message}</p>}
                  </div>

                  {/* inquiry type + routing hint */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--soft)] mb-1.5">
                      Inquiry Type
                    </label>
                    <select {...register('type')} className={inputCls}>
                      <option value="">Select a topic</option>
                      {inquiryTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <RoutingHint type={selectedType} />
                  </div>

                  {/* message */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--soft)] mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea {...register('message')} rows={4}
                      placeholder="Tell us about your inquiry..."
                      className={inputCls + ' resize-none'} />
                    {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message.message}</p>}
                  </div>

                  {/* server error */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle size={15} className="text-red-500 shrink-0" />
                      <p className="text-[13px] text-red-600">{errorMsg}</p>
                    </div>
                  )}

                  {/* submit */}
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full py-3.5 bg-[var(--text)] text-white text-[12px] font-semibold tracking-wider uppercase rounded flex items-center justify-center gap-2 border-[1.5px] border-[var(--text)] hover:bg-transparent hover:text-[var(--text)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[var(--soft)]">
                    We respond to all inquiries within 48 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

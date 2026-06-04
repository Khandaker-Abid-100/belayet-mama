'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const values = [
    { n:'01', t:'Quality First', d:'Every product and service meets rigorous international standards — no shortcuts, no compromise.' },
    { n:'02', t:'Trust & Reliability', d:'Relationships with global buyers and local manufacturers built on transparency and consistent delivery.' },
    { n:'03', t:'Industry & Community', d:'Success measured not just in numbers, but in employment and opportunity created across the value chain.' },
  ]

  return (
    <section ref={ref} id="about" className="py-24 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <p className="flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[.18em] uppercase text-[var(--gold)] mb-2">
            <span className="w-5 h-[1.5px] bg-[var(--gold)]" />About
          </p>
        </div>
        <div className="reveal">
          <h2 className="font-display text-[clamp(32px,4vw,50px)] font-normal leading-[1.1] tracking-[-0.015em] text-[var(--text)]">
            The Person Behind<br />the <em className="italic text-[var(--gold2)]">Business</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mt-12">
          {/* Bio */}
          <div className="reveal" style={{transitionDelay:'.1s'}}>
            {[
              'Belayet Hossain is a respected Bangladeshi entrepreneur whose career spans the full breadth of the garments and textile industry. With an M.Com in Accounting and a CA (CC) qualification, he brings financial discipline and commercial acumen to everything he builds.',
              'As Chairman of four distinct enterprises — a buying house, a 100% export-oriented garments factory, and two textile trading companies — he has created a network connecting international buyers with Bangladesh\'s manufacturing strength.',
              'His work is guided by a commitment to quality, reliability, and the long-term relationships that sustain businesses across generations.',
            ].map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.88] text-[var(--muted)] mb-4 font-light">{p}</p>
            ))}
            <div className="mt-9 pl-6 border-l-[3px] border-[var(--gold2)] bg-[var(--gold-bg)] py-5 pr-5 rounded-r">
              <p className="font-display italic text-[18px] leading-[1.65] text-[var(--gold)]">
                &ldquo;Good business is simply doing what you say you will do — consistently, honestly, and with care.&rdquo;
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="flex flex-col gap-3.5 reveal" style={{transitionDelay:'.2s'}}>
            {values.map(v => (
              <div key={v.n} className="p-5 border-[1.5px] border-[var(--border)] rounded-md hover:border-[var(--gold2)] hover:bg-[var(--gold-bg)] hover:translate-x-1 transition-all duration-300">
                <div className="text-[10px] font-bold tracking-[.12em] text-[var(--gold)] mb-1">{v.n}</div>
                <div className="text-[14px] font-semibold text-[var(--text)] mb-1">{v.t}</div>
                <div className="text-[13px] text-[var(--muted)] leading-[1.65] font-light">{v.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-[var(--border)] mt-20" />
      </div>
    </section>
  )
}

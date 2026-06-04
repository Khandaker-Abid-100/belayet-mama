'use client'
import { useEffect, useRef } from 'react'

const FIRST = 'Belayet'.split('')
const LAST  = 'Hossain'.split('')

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)

  // Counter animation
  useEffect(() => {
    const targets = [{ val: 4, suffix: 'co.' }, { val: 100, suffix: '%' }, { val: 3, suffix: '+' }]
    const els = document.querySelectorAll<HTMLElement>('.stat-num')
    if (!els.length) return

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        targets.forEach((t, i) => {
          if (!els[i]) return
          let cur = 0
          const step = t.val / 50
          const id = setInterval(() => {
            cur = Math.min(cur + step, t.val)
            els[i].innerHTML = `${Math.floor(cur)}<em class="italic text-[var(--gold2)] text-[0.7em]">${t.suffix}</em>`
            if (cur >= t.val) clearInterval(id)
          }, 30)
        })
        obs.disconnect()
      })
    }, { threshold: 0.5 })

    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero" className="min-h-screen pt-16 flex flex-col items-center justify-center text-center relative overflow-hidden bg-white">

      {/* Animated vertical lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left:'15%', h:'35%', delay:'0s' },
          { left:'30%', h:'50%', delay:'.4s' },
          { left:'50%', h:'40%', delay:'.8s' },
          { left:'70%', h:'55%', delay:'.2s' },
          { left:'85%', h:'35%', delay:'.6s' },
        ].map((l, i) => (
          <span key={i} className="hero-line-bar" style={{
            left: l.left, height: l.h, top: `-${l.h}`,
            animationDelay: l.delay, animationDuration: '3s',
          }} />
        ))}
      </div>

      {/* Horizontal rules */}
      <div className="absolute left-0 right-0 h-px pointer-events-none" style={{top:'18%', background:'linear-gradient(90deg,transparent 5%,var(--border) 50%,transparent 95%)'}} />
      <div className="absolute left-0 right-0 h-px pointer-events-none" style={{bottom:'18%', background:'linear-gradient(90deg,transparent 5%,var(--border) 50%,transparent 95%)'}} />

      {/* Corner brackets */}
      {[
        'top-[12%] left-[8%] border-t-[1.5px] border-l-[1.5px]',
        'top-[12%] right-[8%] border-t-[1.5px] border-r-[1.5px]',
        'bottom-[12%] left-[8%] border-b-[1.5px] border-l-[1.5px]',
        'bottom-[12%] right-[8%] border-b-[1.5px] border-r-[1.5px]',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-5 h-5 border-[var(--gold2)] anim-fade-in pointer-events-none ${cls}`}
          style={{ animationDelay: `${1.8 + i * 0.1}s` }} />
      ))}

      {/* Side labels — hidden on mobile */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block anim-fade-in pointer-events-none"
        style={{ writingMode:'vertical-rl', transform:'translateY(-50%) rotate(180deg)', fontSize:'10px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--soft)', animationDelay:'1.6s' }}>
        Dhaka, Bangladesh
      </div>
      <div className="absolute right-10 top-1/2 hidden lg:block anim-fade-in pointer-events-none"
        style={{ writingMode:'vertical-rl', transform:'translateY(-50%)', fontSize:'10px', fontWeight:500, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--soft)', animationDelay:'1.7s' }}>
        Est. Industry Leader
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto w-full">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-10 anim-fade-up" style={{animationDelay:'.5s'}}>
          <span className="w-8 h-px opacity-50" style={{background:'var(--gold)'}} />
          <span className="text-[11px] font-medium tracking-[.2em] uppercase" style={{color:'var(--gold)'}}>
            Chairman &amp; Business Leader
          </span>
          <span className="w-8 h-px opacity-50" style={{background:'var(--gold)'}} />
        </div>

        {/* Name */}
        <h1 className="font-display font-normal leading-[.92] tracking-[-0.02em] text-[var(--text)]"
          style={{fontSize:'clamp(64px,11vw,130px)'}}>
          {/* First name */}
          <span className="block overflow-hidden pb-[.06em]">
            {FIRST.map((ch, i) => (
              <span key={i} className="char-anim" style={{ animationDelay: `${0.55 + i * 0.04}s` }}>{ch}</span>
            ))}
          </span>
          {/* Last name */}
          <span className="block overflow-hidden pb-[.06em] mt-[.06em]">
            {LAST.map((ch, i) => (
              <span key={i} className="char-anim italic" style={{ color:'var(--gold2)', animationDelay: `${0.82 + i * 0.04}s` }}>{ch}</span>
            ))}
          </span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-8 anim-fade-up" style={{animationDelay:'1.1s'}}>
          <span className="h-px opacity-50" style={{width:120, background:'linear-gradient(90deg,transparent,var(--gold))'}} />
          <span className="w-1.5 h-1.5 rounded-full" style={{background:'var(--gold2)'}} />
          <span className="h-px opacity-50" style={{width:120, background:'linear-gradient(90deg,var(--gold),transparent)'}} />
        </div>

        {/* Credentials */}
        <div className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[.14em] uppercase text-[var(--muted)] anim-fade-up" style={{animationDelay:'1.2s'}}>
          M.Com (Acct)
          <span style={{color:'var(--border)'}}>·</span>
          CA (CC)
        </div>

        {/* Tagline */}
        <p className="text-[16px] md:text-[17px] leading-[1.8] text-[var(--muted)] max-w-xl mx-auto mt-6 font-light anim-fade-up" style={{animationDelay:'1.3s'}}>
          Founder and Chairman of four enterprises across international garment sourcing,
          export manufacturing, and textile trade in Bangladesh.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap mt-10 anim-fade-up" style={{animationDelay:'1.45s'}}>
          <a href="#companies"
            className="px-9 py-3.5 bg-[var(--text)] text-white text-[12px] font-semibold tracking-wider rounded-sm border-[1.5px] border-[var(--text)] hover:bg-transparent hover:text-[var(--text)] transition-all duration-300">
            View Companies
          </a>
          <a href="#contact"
            className="px-9 py-3.5 border-[1.5px] border-[var(--border)] text-[var(--text)] text-[12px] font-semibold tracking-wider rounded-sm hover:border-[var(--text)] transition-all duration-300">
            Get in Touch
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef}
          className="flex justify-center w-full max-w-xl mx-auto mt-16 border-t border-b border-[var(--border)] anim-fade-up"
          style={{animationDelay:'1.6s'}}>
          {[
            { n: '4', s: 'co.', l: 'Companies' },
            { n: '100', s: '%', l: 'Export Oriented' },
            { n: '3', s: '+', l: 'Decades Active' },
            { n: 'BD', s: '→', l: 'Global Markets', text: true },
          ].map((st, i) => (
            <div key={i} className="flex-1 py-4 text-center relative">
              {i > 0 && <span className="absolute left-0 top-[20%] bottom-[20%] w-px bg-[var(--border)]" />}
              <div className="stat-num font-display text-[26px] md:text-[30px] font-normal text-[var(--text)] leading-none">
                {st.n}<em className="italic text-[var(--gold2)] text-[0.72em]">{st.s}</em>
              </div>
              <div className="text-[10px] font-medium tracking-wider uppercase text-[var(--soft)] mt-1">{st.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-in" style={{animationDelay:'2s'}}>
        <span className="text-[9px] font-semibold tracking-[.22em] uppercase text-[var(--soft)]">Scroll</span>
        <div className="w-px h-10 bg-[var(--border)] relative overflow-hidden">
          <div className="scroll-thumb" style={{animationDelay:'2.5s'}} />
        </div>
      </div>
    </section>
  )
}

'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#companies', label: 'Companies' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-16 transition-all duration-500 ${
        scrolled ? 'bg-white/94 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'
      }`}>
        <Link href="#hero" className="font-display text-[19px] text-[var(--text)] anim-fade-down" style={{animationDelay:'.2s'}}>
          Belayet <span className="italic text-[var(--gold2)]">Hossain</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-9 anim-fade-down" style={{animationDelay:'.3s'}}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-[13px] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 relative group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--gold2)] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <a href="#contact"
          className="hidden md:block px-5 py-2 bg-[var(--text)] text-white text-[12px] font-medium tracking-wide rounded-sm hover:bg-[#2a2a2a] transition-colors anim-fade-down"
          style={{animationDelay:'.4s'}}>
          Get in Touch
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`w-5 h-px bg-[var(--text)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-px bg-[var(--text)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-[var(--text)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl italic text-[var(--text)] hover:text-[var(--gold2)] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-[var(--text)] text-white text-sm font-medium rounded-sm">
            Get in Touch
          </a>
        </div>
      )}
    </>
  )
}

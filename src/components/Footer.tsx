export default function Footer() {
  return (
    <footer className="bg-[var(--text)] px-6 md:px-16 py-7 flex items-center justify-between flex-wrap gap-3">
      <a href="#hero" className="font-display text-[17px] text-white font-normal">
        Belayet <span className="italic text-[var(--gold2)]">Hossain</span>
      </a>
      <p className="text-[12px] text-white/35">© 2025 Belayet Hossain. All rights reserved.</p>
      <div className="flex gap-5">
        {[
          { label: 'BD Sourcing', href: 'https://www.bdsourcing.net' },
          { label: 'About',     href: '#about' },
          { label: 'Companies', href: '#companies' },
          { label: 'Contact',   href: '#contact' },
        ].map(l => (
          <a key={l.label} href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            className="text-[11px] font-medium tracking-[.08em] uppercase text-white/35 hover:text-[var(--gold2)] transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

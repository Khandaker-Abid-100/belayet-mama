'use client'
import { useEffect, useRef, useState } from 'react'
import { MapPin, ExternalLink, Mail, X, Send, Globe } from 'lucide-react'

/* ─── DATA ─── */
const companies = [
  {
    id: 'bds',
    n: '01', tag: 'Buying House · Uttara, Dhaka', name: 'BD Sourcing', role: 'Chairman',
    desc: 'A professional buying house bridging international buyers and local manufacturers. Handles sourcing, production monitoring, quality control, compliance, and shipment coordination — delivering the right product, on time, every time.',
    address: 'House #6, Road #14, Sector #12\nUttara, Dhaka, Bangladesh',
    links: [
      { label: 'www.bdsourcing.net',    href: 'https://www.bdsourcing.net', icon: 'ext' },
      { label: 'belayet@bdsourcing.net', href: 'mailto:belayet@bdsourcing.net', icon: 'mail' },
    ],
    hasModal: true,
  },
  {
    id: 'srkh',
    n: '02', tag: '100% Export Garments · Gazipur', name: 'SRKH Design Ltd.', role: 'Chairman',
    desc: 'A 100% export-oriented ready-made garments factory serving buyers across Europe and North America. Built on modern production systems, international compliance standards, and a culture of precision at scale.',
    address: 'Bhabanipur, Gazipur Sadar\nGazipur, Bangladesh',
    links: [],
    hasModal: true,
  },
  {
    id: null,
    n: '03', tag: 'Fabric & Yarn Importer · Narayanganj', name: 'Tuba Fashion', role: 'Chairman',
    desc: 'Imports and distributes quality fabrics and yarn to garment factories across Bangladesh. Known for consistent product standards, competitive pricing, and deep knowledge of manufacturer requirements.',
    address: 'Sher-e-Bangla Link Road\nWest Masdair, Fatullah, Narayanganj',
    links: [{ label: 'tubafashionfabrics@gmail.com', href: 'mailto:tubafashionfabrics@gmail.com', icon: 'mail' }],
    hasModal: false,
  },
  {
    id: null,
    n: '04', tag: 'Fabric & Yarn Trade · Narayanganj', name: 'Yousuf Traders', role: 'Chairman',
    desc: "A fabric and yarn trading business at the heart of Bangladesh's textile trade in Tanbazar. Connecting material suppliers with manufacturers for dependable, quality production inputs.",
    address: 'Tanbazar\nNarayanganj, Bangladesh',
    links: [],
    hasModal: false,
  },
]

/* ─── MODAL DATA ─── */
const modalData: Record<string, {
  tag: string; name: string; role: string;
  about: string[]; gridTitle: string;
  grid: { label: string; val: string }[];
  contacts: { label: string; val: string; href: string; type: string }[];
  cta: { label: string; href: string };
}> = {
  bds: {
    tag: 'Buying House · Uttara, Dhaka',
    name: 'BD Sourcing',
    role: 'Chairman — Belayet Hossain',
    about: [
      "BD Sourcing is a full-service buying house that serves as the professional bridge between international buyers and Bangladesh's manufacturing ecosystem. The company manages the entire sourcing lifecycle — from vendor selection and production planning to quality assurance and final shipment.",
      "Founded and chaired by Belayet Hossain, BD Sourcing has built a reputation for reliability, transparency, and delivering exactly what buyers need, on time and within budget. The company works with manufacturers across Dhaka, Gazipur, Narayanganj, and Chittagong.",
    ],
    gridTitle: 'Services Offered',
    grid: [
      { label: 'Sourcing',       val: 'Vendor identification & selection' },
      { label: 'Production',     val: 'Monitoring & milestone tracking' },
      { label: 'Quality Control',val: 'In-line, mid-line & final inspection' },
      { label: 'Compliance',     val: 'Audit support & documentation' },
      { label: 'Logistics',      val: 'Shipment coordination & customs' },
      { label: 'Markets',        val: 'Europe, USA, Canada & beyond' },
    ],
    contacts: [
      { label: 'Office Address', val: 'House #6, Road #14, Sector #12, Uttara, Dhaka, Bangladesh', href: '#', type: 'map' },
      { label: 'Email',          val: 'belayet@bdsourcing.net', href: 'mailto:belayet@bdsourcing.net', type: 'mail' },
      { label: 'Website',        val: 'www.bdsourcing.net', href: 'https://www.bdsourcing.net', type: 'globe' },
    ],
    cta: { label: 'Visit BD Sourcing Website', href: 'https://www.bdsourcing.net' },
  },
  srkh: {
    tag: '100% Export Garments Factory · Gazipur',
    name: 'SRKH Design Ltd.',
    role: 'Chairman — Belayet Hossain',
    about: [
      "SRKH Design Ltd. is a 100% export-oriented ready-made garments (RMG) manufacturing facility located in Gazipur — Bangladesh's foremost garment manufacturing hub. The factory produces high-quality apparel for international buyers across Europe and North America.",
      "Under the chairmanship of Belayet Hossain, SRKH Design is built on modern production infrastructure, strict international compliance standards, and a skilled workforce committed to delivering precision at every stage of the production process.",
    ],
    gridTitle: 'Factory Capabilities',
    grid: [
      { label: 'Factory Type',    val: '100% Export Oriented RMG' },
      { label: 'Location',        val: 'Bhabanipur, Gazipur, Bangladesh' },
      { label: 'Product Category',val: 'Ready-Made Garments (Woven & Knit)' },
      { label: 'Compliance',      val: 'International buyer standards' },
      { label: 'Export Markets',  val: 'Europe, USA & North America' },
      { label: 'Quality System',  val: 'In-line & final QC checks' },
    ],
    contacts: [
      { label: 'Factory Address', val: 'Bhabanipur, Gazipur Sadar, Gazipur, Bangladesh', href: '#', type: 'map' },
      { label: 'Inquiries via BD Sourcing', val: 'belayet@bdsourcing.net', href: 'mailto:belayet@bdsourcing.net', type: 'mail' },
    ],
    cta: { label: 'Send a Manufacturing Inquiry', href: '#contact' },
  },
}

/* ─── MODAL COMPONENT ─── */
function Modal({ id, onClose }: { id: string; onClose: () => void }) {
  const d = modalData[id]
  if (!d) return null

  // Close on Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      style={{ background: 'rgba(24,24,26,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl
                      animate-[modalIn_.35s_cubic-bezier(.16,1,.3,1)_forwards]">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-7 pt-7 pb-5 border-b border-[var(--border)] rounded-t-xl flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[.14em] uppercase text-[var(--gold)] mb-2">
              <span className="w-4 h-[1.5px] bg-[var(--gold)]" />{d.tag}
            </p>
            <h3 className="font-display text-[clamp(22px,3vw,30px)] font-normal text-[var(--text)] leading-tight">{d.name}</h3>
            <span className="inline-block mt-1.5 text-[10px] font-semibold tracking-[.1em] uppercase px-2.5 py-1 bg-[var(--gold-bg)] text-[var(--gold)] rounded-sm">
              {d.role}
            </span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 border-[1.5px] border-[var(--border)] rounded-full flex items-center justify-center shrink-0 hover:border-[var(--text)] transition-colors mt-1">
            <X size={14} className="text-[var(--muted)]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 pt-6 space-y-6">

          {/* About */}
          <div>
            <p className="text-[11px] font-bold tracking-[.14em] uppercase text-[var(--text)] pb-2.5 mb-3 border-b border-[var(--border)]">
              About the Company
            </p>
            {d.about.map((p, i) => (
              <p key={i} className="text-[14px] leading-[1.85] text-[var(--muted)] font-light mb-3">{p}</p>
            ))}
          </div>

          {/* Capabilities Grid */}
          <div>
            <p className="text-[11px] font-bold tracking-[.14em] uppercase text-[var(--text)] pb-2.5 mb-3 border-b border-[var(--border)]">
              {d.gridTitle}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {d.grid.map(item => (
                <div key={item.label} className="p-3 bg-[var(--off)] rounded-md border border-[var(--border)]">
                  <p className="text-[9px] font-bold tracking-[.14em] uppercase text-[var(--soft)] mb-1">{item.label}</p>
                  <p className="text-[13px] font-medium text-[var(--text)]">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold tracking-[.14em] uppercase text-[var(--text)] pb-2.5 mb-3 border-b border-[var(--border)]">
              Contact &amp; Location
            </p>
            <div className="space-y-3">
              {d.contacts.map(c => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 border border-[var(--border)] bg-[var(--off)] rounded flex items-center justify-center shrink-0">
                    {c.type === 'mail'  && <Mail  size={13} className="text-[var(--gold)]" />}
                    {c.type === 'map'   && <MapPin size={13} className="text-[var(--gold)]" />}
                    {c.type === 'globe' && <Globe  size={13} className="text-[var(--gold)]" />}
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[.1em] uppercase text-[var(--soft)] mb-0.5">{c.label}</p>
                    <a href={c.href} target={c.type === 'globe' ? '_blank' : undefined}
                      className="text-[13px] text-[var(--muted)] hover:text-[var(--gold)] transition-colors">{c.val}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a href={d.cta.href}
            target={d.cta.href.startsWith('http') ? '_blank' : undefined}
            onClick={d.cta.href === '#contact' ? onClose : undefined}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--text)] text-white text-[12px] font-semibold tracking-wider uppercase rounded border-[1.5px] border-[var(--text)] hover:bg-transparent hover:text-[var(--text)] transition-all duration-300">
            {d.cta.href.startsWith('http') ? <Globe size={13} /> : <Send size={13} />}
            {d.cta.label}
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function Companies() {
  const ref = useRef<HTMLElement>(null)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section ref={ref} id="companies" className="py-24 px-6 md:px-16 bg-[var(--off)]">
        <div className="max-w-5xl mx-auto">

          <div className="reveal">
            <p className="flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[.18em] uppercase text-[var(--gold)] mb-2">
              <span className="w-5 h-[1.5px] bg-[var(--gold)]" />Portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-end mb-11 reveal">
            <h2 className="font-display text-[clamp(32px,4vw,50px)] font-normal leading-[1.1] tracking-[-0.015em] text-[var(--text)]">
              Four Companies,<br /><em className="italic text-[var(--gold2)]">One Vision</em>
            </h2>
            <p className="text-[15px] leading-[1.8] text-[var(--muted)] font-light">
              Each company serves a specific role in the garment and textile value chain — together forming a complete ecosystem from raw materials to global export.
            </p>
          </div>

          <div className="flex flex-col gap-0.5">
            {companies.map((co, i) => (
              <div key={co.n}
                className="reveal bg-white border-[1.5px] border-[var(--border)] rounded-md overflow-hidden hover:border-[var(--gold2)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}>

                {/* ── Mobile layout ── */}
                <div className="md:hidden p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 shrink-0 font-display text-[18px] italic text-[var(--soft)] pt-0.5">{co.n}</div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--gold)] mb-1">{co.tag}</p>
                      <h3 className="font-display text-[20px] font-normal text-[var(--text)] mb-1">{co.name}</h3>
                      <span className="inline-block text-[10px] font-semibold tracking-[.08em] uppercase px-2.5 py-0.5 bg-[var(--gold-bg)] text-[var(--gold)] rounded-sm mb-3">{co.role}</span>
                      <p className="text-[13px] leading-[1.8] text-[var(--muted)] font-light mb-3">{co.desc}</p>

                      {/* More Details button — mobile */}
                      {co.hasModal && co.id && (
                        <button onClick={() => setActiveModal(co.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 border-[1.5px] border-[var(--border)] rounded-sm text-[11px] font-semibold tracking-wide uppercase text-[var(--text)] hover:border-[var(--gold2)] hover:text-[var(--gold2)] hover:bg-[var(--gold-bg)] transition-all duration-250 mb-3">
                          More Details
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                      )}

                      <div className="flex items-start gap-2 mb-2">
                        <MapPin size={12} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                        <span className="text-[12px] text-[var(--muted)] leading-[1.55] whitespace-pre-line">{co.address}</span>
                      </div>
                      {co.links.map(lk => (
                        <a key={lk.href} href={lk.href} target={lk.icon === 'ext' ? '_blank' : undefined}
                          className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--gold)] hover:text-[var(--gold2)] hover:underline mt-1">
                          {lk.icon === 'ext' ? <ExternalLink size={10} /> : <Mail size={10} />}
                          {lk.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Desktop layout ── */}
                <div className="hidden md:grid" style={{ gridTemplateColumns: '68px 1fr 260px' }}>
                  <div className="flex items-center justify-center font-display text-[20px] italic text-[var(--soft)] border-r border-[var(--border)] bg-[var(--off)]">
                    {co.n}
                  </div>
                  <div className="p-7">
                    <p className="text-[10px] font-semibold tracking-[.1em] uppercase text-[var(--gold)] mb-1.5">{co.tag}</p>
                    <h3 className="font-display text-[22px] font-normal text-[var(--text)] mb-1.5">{co.name}</h3>
                    <span className="inline-block text-[10px] font-semibold tracking-[.08em] uppercase px-2.5 py-0.5 bg-[var(--gold-bg)] text-[var(--gold)] rounded-sm mb-3">{co.role}</span>
                    <p className="text-[13px] leading-[1.8] text-[var(--muted)] font-light mb-4">{co.desc}</p>

                    {/* More Details button — desktop */}
                    {co.hasModal && co.id && (
                      <button onClick={() => setActiveModal(co.id)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 border-[1.5px] border-[var(--border)] rounded-sm text-[11px] font-semibold tracking-wide uppercase text-[var(--text)] hover:border-[var(--gold2)] hover:text-[var(--gold2)] hover:bg-[var(--gold-bg)] transition-all duration-250 group">
                        More Details
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                          className="group-hover:translate-x-0.5 transition-transform duration-200">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="p-6 border-l border-[var(--border)] bg-[var(--off)] flex flex-col justify-center gap-3">
                    <div className="flex items-start gap-2">
                      <MapPin size={13} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                      <span className="text-[12px] text-[var(--muted)] leading-[1.55] whitespace-pre-line">{co.address}</span>
                    </div>
                    {co.links.map(lk => (
                      <a key={lk.href} href={lk.href} target={lk.icon === 'ext' ? '_blank' : undefined}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--gold)] hover:text-[var(--gold2)] hover:underline">
                        {lk.icon === 'ext' ? <ExternalLink size={10} /> : <Mail size={10} />}
                        {lk.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <Modal id={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  )
}

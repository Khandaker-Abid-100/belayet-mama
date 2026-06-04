import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Belayet Hossain — Chairman & Business Leader',
  description: 'Founder and Chairman of four enterprises across international garment sourcing, export manufacturing, and textile trade in Bangladesh.',
  keywords: ['Belayet Hossain', 'BD Sourcing', 'SRKH Design', 'Tuba Fashion', 'Yousuf Traders', 'Bangladesh garments', 'buying house'],
  openGraph: {
    title: 'Belayet Hossain — Chairman & Business Leader',
    description: 'Founder and Chairman of four enterprises across international garment sourcing, export manufacturing, and textile trade in Bangladesh.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import About     from '@/components/About'
import Companies from '@/components/Companies'
import Contact   from '@/components/Contact'
import Footer    from '@/components/Footer'
import WhatsApp  from '@/components/WhatsApp'

export default function Home() {
  return (
    <>
      <WhatsApp />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Companies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

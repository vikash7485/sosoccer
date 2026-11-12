import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Founder from './components/Founder'
import Achievements from './components/Achievements'
import Programs from './components/Programs'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Enquiry from './components/Enquiry'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import InstallApp from './components/InstallApp'
import { ScrollProgress } from './components/ui'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-pitch-950">
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Founder />
        <Programs />
        <WhyUs />
        <Achievements />
        <Gallery />
        <Testimonials />
        <Enquiry />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <InstallApp />
    </>
  )
}

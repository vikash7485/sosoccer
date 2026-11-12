import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Founder from './components/Founder'
import Achievements from './components/Achievements'
import Programs from './components/Programs'
import WhyUs from './components/WhyUs'
import Legends from './components/Legends'
import BatchFinder from './components/BatchFinder'
import Stars from './components/Stars'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Enquiry from './components/Enquiry'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import InstallApp from './components/InstallApp'
import { ScrollProgress } from './components/ui'
import { useLang } from './i18n'

export default function App() {
  const { t } = useLang()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-pitch-950">
        {t('Skip to content', 'मुख्य सामग्री पर जाएँ')}
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Founder />
        <Programs />
        <BatchFinder />
        <WhyUs />
        <Legends />
        <Stars />
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

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import WhyNkumu from '@/components/WhyNkumu'
import CertificationsSection from '@/components/CertificationsSection'
import FeaturedArtists from '@/components/FeaturedArtists'
import Charts from '@/components/Charts'
import PreOrders from '@/components/PreOrders'
import Awards from '@/components/Awards'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import AppSection from '@/components/AppSection'
import Waitlist from '@/components/Waitlist'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import MusicPlayer from '@/components/MusicPlayer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <WhyNkumu />
        <CertificationsSection />
        <FeaturedArtists />
        <Charts />
        <PreOrders />
        <Awards />
        <HowItWorks />
        <Pricing />
        <AppSection />
        <Waitlist />
        <Testimonials />
      </main>
      <Footer />
      <MusicPlayer />
    </>
  )
}

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import FeaturedArtists from '@/components/FeaturedArtists'
import Communaute from '@/components/Communaute'
import WhyNkumu from '@/components/WhyNkumu'
import Charts from '@/components/Charts'
import CertificationsSection from '@/components/CertificationsSection'
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
        <FeaturedArtists />
        <Communaute />
        <WhyNkumu />
        <Charts />
        <CertificationsSection />
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

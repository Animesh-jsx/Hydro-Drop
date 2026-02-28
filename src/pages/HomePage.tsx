import PageTransition from '../components/common/PageTransition'
import HeroSection from '../components/home/HeroSection'
import ProductCarousel from '../components/home/ProductCarousel'
import SustainabilitySection from '../components/home/SustainabilitySection'
import StatsBar from '../components/home/StatsBar'
import PartnersStrip from '../components/home/PartnersStrip'
import WhyHydraDrop from '../components/home/WhyHydraDrop'
import InquiryForm from '../components/home/InquiryForm'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <ProductCarousel />
      <SustainabilitySection />
      <StatsBar />
      <PartnersStrip />
      <WhyHydraDrop />
      <InquiryForm />
    </PageTransition>
  )
}

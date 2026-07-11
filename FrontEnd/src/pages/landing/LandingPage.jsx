import LandingFeedbackSection from '../../components/LandingFeedbackSection'
import useLandingPage from './hooks/useLandingPage'
import { LandingPageProvider } from './context/LandingPageContext'
import Navbar from '../../components/navbars/Navbar'
import LandingHeroSection from './components/LandingHeroSection'
import LandingAboutSection from './components/LandingAboutSection'
import LandingFreshersSection from './components/LandingFreshersSection'
import LandingGlowDivider from './components/LandingGlowDivider'
import LandingPainSection from './components/LandingPainSection'
import LandingPlatformSection from './components/LandingPlatformSection'
import LandingMissionsSection from './components/LandingMissionsSection'
import LandingCodeGymSection from './components/LandingCodeGymSection'
import LandingAptitudeSection from './components/LandingAptitudeSection'
import LandingAILabSection from './components/LandingAILabSection'
import LandingDeploySection from './components/LandingDeploySection'
import LandingHowItWorksSection from './components/LandingHowItWorksSection'
import LandingFinalCtaSection from './components/LandingFinalCtaSection'

export default function LandingPage() {
  const landing = useLandingPage()

  return (
    <LandingPageProvider value={landing}>
      <div className="lp-page">
        <Navbar />
        <LandingHeroSection />
        <LandingAboutSection />
        <LandingGlowDivider />
        <LandingFreshersSection />
        <LandingGlowDivider />
        <LandingPainSection />
        <LandingPlatformSection />
        <LandingGlowDivider />
        <LandingMissionsSection />
        <LandingGlowDivider />
        <LandingCodeGymSection />
        <LandingGlowDivider />
        <LandingAptitudeSection />
        <LandingGlowDivider />
        <LandingAILabSection />
        <LandingGlowDivider />
        <LandingDeploySection />
        <LandingGlowDivider />
        <LandingHowItWorksSection />
        <LandingGlowDivider />
        <LandingFeedbackSection />
        <LandingFinalCtaSection />
      </div>
    </LandingPageProvider>
  )
}

import { Head } from '@inertiajs/react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ProductShowcaseSection from '@/components/landing/ProductShowcaseSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import WhyPayloSection from '@/components/landing/WhyPayloSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FaqSection from '@/components/landing/FaqSection';
import CtaSection from '@/components/landing/CtaSection';
import LandingFooter from '@/components/landing/LandingFooter';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-[#F7F5F0] text-[#111111] font-sans selection:bg-[#FF6B00] selection:text-[#111111]">
            <Head title="PAYLO - Software Management Photobooth Indonesia" />
            
            <LandingNavbar />
            
            <main>
                <HeroSection />
                <StatsSection />
                <ProblemSection />
                <FeaturesSection />
                <ProductShowcaseSection />
                <HowItWorksSection />
                <WhyPayloSection />
                <TestimonialsSection />
                <PricingSection />
                <FaqSection />
                <CtaSection />
            </main>

            <LandingFooter />
        </div>
    );
}

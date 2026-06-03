import LandingLayout from '@/layouts/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import MetricsSection from '@/components/landing/MetricsSection';
import NewsSection from '@/components/landing/NewsSection';
import WorkflowSection from '@/components/landing/WorkflowSection';
import TestimonialSection from '@/components/landing/TestimonialSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Welcome() {
    return (
        <LandingLayout title="ctechbooth - Enterprise Photobooth Management Platform">
            <HeroSection />
            <MetricsSection />
            <NewsSection />
            <WorkflowSection />
            <TestimonialSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

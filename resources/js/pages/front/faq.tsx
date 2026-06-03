import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import FaqSection from '@/components/landing/FaqSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Faq() {
    return (
        <LandingLayout title="FAQ & Bantuan ctechbooth">
            <GenericHeroSection 
                title="Pertanyaan Umum (FAQ)"
                subtitle="Temukan jawaban cepat mengenai fitur, instalasi sistem, dan dukungan teknis kami di sini."
            />
            <FaqSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

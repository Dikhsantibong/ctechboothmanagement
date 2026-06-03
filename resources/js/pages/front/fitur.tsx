import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PaymentIntegrationSection from '@/components/landing/PaymentIntegrationSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Fitur() {
    return (
        <LandingLayout title="Fitur Lengkap ctechbooth">
            <GenericHeroSection 
                title="Fitur Terbaik Untuk Bisnis Anda"
                subtitle="Mulai dari operasional harian hingga laporan pendapatan akhir bulan, semuanya dikendalikan dalam satu genggaman."
            />
            <FeaturesSection />
            <PaymentIntegrationSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

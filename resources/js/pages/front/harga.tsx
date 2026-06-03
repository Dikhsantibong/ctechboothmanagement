import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import PricingSection from '@/components/landing/PricingSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Harga() {
    return (
        <LandingLayout title="Harga & Paket ctechbooth">
            <GenericHeroSection 
                title="Investasi Untuk Ekosistem Photobooth Lengkap"
                subtitle="Setiap paket mencakup pengalaman photobooth, digital sharing, dan sistem manajemen bisnis. Bukan hanya software, melainkan platform bisnis."
            />
            <PricingSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

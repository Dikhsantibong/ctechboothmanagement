import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import PricingSection from '@/components/landing/PricingSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Harga() {
    return (
        <LandingLayout title="Harga & Paket ctechbooth">
            <GenericHeroSection 
                title="Investasi Transparan Untuk Skala Enterprise"
                subtitle="Tidak ada biaya tersembunyi. Pilih paket yang paling sesuai dengan kebutuhan ekspansi cabang bisnis Anda."
            />
            <PricingSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import OperationsSection from '@/components/landing/OperationsSection';
import DashboardPreviewSection from '@/components/landing/DashboardPreviewSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Solusi() {
    return (
        <LandingLayout title="Solusi Operasional ctechbooth">
            <GenericHeroSection 
                title="Sistem Terpusat, Bisnis Terkendali"
                subtitle="Tinggalkan cara manual. Pantau status perangkat, ketersediaan kertas printer, hingga transaksi tenant secara langsung."
            />
            <OperationsSection />
            <DashboardPreviewSection />
            <BenefitsSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

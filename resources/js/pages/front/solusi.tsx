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
                title="Solusi Operasional Bisnis Photobooth End-to-End"
                subtitle="Dari mesin photobooth hingga laporan keuangan cabang, CTECHBOOTH menyatukan seluruh alur operasional dalam satu platform terintegrasi."
            />
            <OperationsSection />
            <DashboardPreviewSection />
            <BenefitsSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

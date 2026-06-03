import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import PhotoExperienceSection from '@/components/landing/PhotoExperienceSection';
import MachineFeatureSection from '@/components/landing/MachineFeatureSection';
import DigitalExperienceSection from '@/components/landing/DigitalExperienceSection';
import BusinessManagementSection from '@/components/landing/BusinessManagementSection';
import InnovationSection from '@/components/landing/InnovationSection';
import PaymentIntegrationSection from '@/components/landing/PaymentIntegrationSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';

export default function Fitur() {
    return (
        <LandingLayout title="Fitur Lengkap - CTECHBOOTH Platform Photobooth Ecosystem">
            <GenericHeroSection 
                title="Platform Photobooth Ecosystem Terlengkap"
                subtitle="CTECHBOOTH menggabungkan Aplikasi Photobooth, Management Dashboard, Event Experience Platform, Printing System, Digital Sharing, dan Business Monitoring dalam satu ekosistem terintegrasi."
            />
            <PhotoExperienceSection />
            <MachineFeatureSection />
            <DigitalExperienceSection />
            <BusinessManagementSection />
            <PaymentIntegrationSection />
            <InnovationSection />
            <FinalCtaSection />
        </LandingLayout>
    );
}

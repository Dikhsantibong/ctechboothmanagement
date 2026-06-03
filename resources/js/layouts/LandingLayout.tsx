import { Head } from '@inertiajs/react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';

export default function LandingLayout({ 
    children, 
    title = "ctechbooth - Enterprise Photobooth Management Platform" 
}: { 
    children: React.ReactNode, 
    title?: string 
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col">
            <Head title={title} />
            
            <LandingNavbar />
            
            <main className="flex-1">
                {children}
            </main>

            <LandingFooter />
            <FloatingWhatsApp />
        </div>
    );
}

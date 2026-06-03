import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

import { useFlashToast } from '@/hooks/use-flash-toast';
import { usePage } from '@inertiajs/react';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    useFlashToast();
    const page = usePage();
    const componentName = page.component as string;
    const url = page.url as string;
    
    // Don't render sidebar for front pages - check both component name and URL
    const isFrontPage = componentName === 'Welcome' || 
                       componentName === 'Front/Features' || 
                       componentName === 'Front/Analytics' || 
                       componentName === 'Front/Testimonials' || 
                       componentName === 'Front/Pricing' ||
                       componentName?.includes('Front') ||
                       componentName?.includes('front') ||
                       url === '/' ||
                       url === '/features' ||
                       url === '/analytics' ||
                       url === '/testimonials' ||
                       url === '/pricing';

    if (isFrontPage) {
        return <>{children}</>;
    }

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}

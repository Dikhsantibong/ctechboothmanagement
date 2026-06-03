import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { CheckCircle2 } from 'lucide-react';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-dvh lg:grid-cols-2">
            {/* Left Panel - Brand & Value Prop */}
            <div className="relative hidden flex-col justify-between bg-[#111827] p-12 text-white lg:flex overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full"></div>

                {/* Logo */}
                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-2 text-xl font-bold tracking-tight"
                >
                    <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
                    ctechbooth
                </Link>

                {/* Center content */}
                <div className="relative z-10 space-y-8">
                    <h2 className="text-4xl font-bold tracking-tight leading-tight">
                        Platform operasional photobooth untuk bisnis modern.
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        Kelola tenant, booth, transaksi, dan laporan dari satu dashboard terpusat.
                    </p>
                    <div className="space-y-4 pt-4">
                        {[
                            'Multi Tenant Management',
                            'Real Time Monitoring',
                            'Cloud Based Infrastructure',
                            'Analytics & Reporting',
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom testimonial */}
                <div className="relative z-10 border-t border-white/10 pt-8">
                    <p className="text-gray-400 text-sm leading-relaxed italic mb-4">
                        "Semenjak pakai ctechbooth, monitoring cabang jadi jauh lebih mudah. Semua data real-time."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                            S
                        </div>
                        <div>
                            <div className="text-sm font-medium text-white">SnapBox Studio</div>
                            <div className="text-xs text-gray-500">Franchise Owner</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex items-center justify-center px-6 py-12 bg-[#FAFAFA]">
                <div className="mx-auto w-full max-w-[400px] space-y-8">
                    {/* Mobile logo */}
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center gap-2 lg:hidden"
                    >
                        <div className="w-6 h-6 bg-blue-600 rounded-md"></div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">ctechbooth</span>
                    </Link>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                        <div className="flex flex-col items-center text-center gap-2 mb-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                            <p className="text-sm text-gray-500">{description}</p>
                        </div>
                        {children}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} ctechbooth. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

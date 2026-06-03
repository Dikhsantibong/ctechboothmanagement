import { Head, Link, usePage } from '@inertiajs/react';
import { Camera, Globe } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'id' | 'en';

export const LangContext = createContext<{ lang: Lang; t: any; setLang: (lang: Lang) => void }>({
    lang: 'id',
    t: {},
    setLang: () => {},
});

export const translations = {
    id: {
        nav: { home: "Beranda", features: "Fitur", analytics: "Analitik", testimonials: "Testimoni", pricing: "Harga", login: "Masuk", dashboard: "Dashboard" },
        footer: { rights: "Ctechbooth Management. Hak Cipta Dilindungi Undang-Undang. Dibuat dengan presisi." }
    },
    en: {
        nav: { home: "Home", features: "Features", analytics: "Analytics", testimonials: "Testimonials", pricing: "Pricing", login: "Log In", dashboard: "Dashboard" },
        footer: { rights: "Ctechbooth Management. All rights reserved. Crafted with precision." }
    }
};

export default function LandingLayout({ children, title = "Ctechbooth" }: { children: React.ReactNode, title?: string }) {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState<Lang>('id');
    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            <Head>
                <title>{title}</title>
                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                    
                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #FFFFFF;
                        color: #1A1A1A;
                        overflow-x: hidden;
                    }
                    
                    .glass-card {
                        background: #FFFFFF;
                        border: 1px solid #E5E7EB;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    }
                    
                    .blue-gradient-text {
                        background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    .blue-glow {
                        box-shadow: 0 0 40px rgba(59, 130, 246, 0.15);
                    }
                    
                    .gold-border {
                        position: relative;
                    }
                    
                    .blue-border::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: inherit;
                        padding: 1px;
                        background: linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(30,64,175,0.05) 100%);
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        -webkit-mask-composite: xor;
                        mask-composite: exclude;
                        pointer-events: none;
                    }
                    
                    .hero-glow {
                        position: absolute;
                        top: 20%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
                        z-index: -1;
                        border-radius: 50%;
                        filter: blur(40px);
                    }

                    /* Hide scrollbar for smooth cards */
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }

                    .marquee-container {
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .marquee-content {
                        display: inline-block;
                        animation: marquee 20s linear infinite;
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    `}
                </style>
            </Head>

            <div className="min-h-screen relative overflow-hidden bg-[#FFFFFF] selection:bg-[#3B82F6] selection:text-white text-[#1A1A1A]">
                
                {/* Cinematic Background Glow */}
                <div className="hero-glow"></div>

                {/* Sticky Navbar */}
                <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FFFFFF]/90 backdrop-blur-lg border-b border-gray-200 py-4' : 'bg-transparent py-6'}`}>
                    <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
                                <Camera className="text-white w-5 h-5" />
                            </div>
                            <span className="font-semibold text-lg tracking-tight">Ctechbooth</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                            <Link href="/" className="hover:text-[#1A1A1A] transition-colors">{t.nav.home}</Link>
                            <Link href="/features" className="hover:text-[#1A1A1A] transition-colors">{t.nav.features}</Link>
                            <Link href="/analytics" className="hover:text-[#1A1A1A] transition-colors">{t.nav.analytics}</Link>
                            <Link href="/testimonials" className="hover:text-[#1A1A1A] transition-colors">{t.nav.testimonials}</Link>
                            <Link href="/pricing" className="hover:text-[#1A1A1A] transition-colors">{t.nav.pricing}</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            {/* Language Switcher */}
                            <div className="relative group">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1A1A1A] transition-colors">
                                    <Globe className="w-4 h-4" />
                                    <span className="uppercase">{lang}</span>
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <button onClick={() => setLang('id')} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === 'id' ? 'text-[#3B82F6]' : 'text-[#1A1A1A]'}`}>Indonesia</button>
                                    <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === 'en' ? 'text-[#3B82F6]' : 'text-[#1A1A1A]'}`}>English</button>
                                </div>
                            </div>

                            {auth.user ? (
                                <Link
                                    href="/admin/dashboard"
                                    className="px-5 py-2 text-sm font-medium rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all text-[#1A1A1A]"
                                >
                                    {t.nav.dashboard}
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:opacity-90 transition-opacity text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                >
                                    {t.nav.login}
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <main>
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
                                    <Camera className="text-white w-5 h-5" />
                                </div>
                                <span className="font-semibold text-xl tracking-tight text-[#1A1A1A]">Ctechbooth</span>
                            </div>
                            
                            <div className="flex gap-8 text-sm text-gray-600">
                                <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</Link>
                                <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</Link>
                                <Link href="#" className="hover:text-[#1A1A1A] transition-colors">Contact</Link>
                            </div>
                        </div>
                        
                        <div className="text-center md:text-left text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} {t.footer.rights}
                        </div>
                    </div>
                </footer>
            </div>
        </LangContext.Provider>
    );
}

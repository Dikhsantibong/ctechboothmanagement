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
                        background-color: #0A0A0A;
                        color: #FFFFFF;
                        overflow-x: hidden;
                    }
                    
                    .glass-card {
                        background: rgba(22, 22, 22, 0.4);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .gold-gradient-text {
                        background: linear-gradient(135deg, #F7D774 0%, #D4AF37 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    .gold-glow {
                        box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
                    }
                    
                    .gold-border {
                        position: relative;
                    }
                    
                    .gold-border::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: inherit;
                        padding: 1px;
                        background: linear-gradient(135deg, rgba(247,215,116,0.3) 0%, rgba(212,175,55,0.05) 100%);
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
                        background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(10, 10, 10, 0) 70%);
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

            <div className="min-h-screen relative overflow-hidden bg-[#0A0A0A] selection:bg-[#D4AF37] selection:text-black text-white">
                
                {/* Cinematic Background Glow */}
                <div className="hero-glow"></div>

                {/* Sticky Navbar */}
                <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
                    <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F7D774] to-[#D4AF37] flex items-center justify-center">
                                <Camera className="text-black w-5 h-5" />
                            </div>
                            <span className="font-semibold text-lg tracking-tight">Ctechbooth</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8C0CC]">
                            <Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
                            <Link href="/features" className="hover:text-white transition-colors">{t.nav.features}</Link>
                            <Link href="/analytics" className="hover:text-white transition-colors">{t.nav.analytics}</Link>
                            <Link href="/testimonials" className="hover:text-white transition-colors">{t.nav.testimonials}</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            {/* Language Switcher */}
                            <div className="relative group">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-[#B8C0CC] hover:text-white transition-colors">
                                    <Globe className="w-4 h-4" />
                                    <span className="uppercase">{lang}</span>
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-32 bg-[#161616] border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <button onClick={() => setLang('id')} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${lang === 'id' ? 'text-[#D4AF37]' : 'text-white'}`}>Indonesia</button>
                                    <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${lang === 'en' ? 'text-[#D4AF37]' : 'text-white'}`}>English</button>
                                </div>
                            </div>

                            {auth.user ? (
                                <Link
                                    href="/admin/dashboard"
                                    className="px-5 py-2 text-sm font-medium rounded-full bg-white/10 hover:bg-white/15 border border-white/5 transition-all text-white"
                                >
                                    {t.nav.dashboard}
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F7D774] hover:opacity-90 transition-opacity text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
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
                <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F7D774] to-[#D4AF37] flex items-center justify-center">
                                    <Camera className="text-black w-5 h-5" />
                                </div>
                                <span className="font-semibold text-xl tracking-tight text-white">Ctechbooth</span>
                            </div>
                            
                            <div className="flex gap-8 text-sm text-[#B8C0CC]">
                                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                            </div>
                        </div>
                        
                        <div className="text-center md:text-left text-xs text-[#B8C0CC]/50">
                            &copy; {new Date().getFullYear()} {t.footer.rights}
                        </div>
                    </div>
                </footer>
            </div>
        </LangContext.Provider>
    );
}

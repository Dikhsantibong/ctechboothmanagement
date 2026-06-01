import LandingLayout, { LangContext } from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, Camera, Cloud, CreditCard, LayoutDashboard, MonitorSmartphone, Play, Smartphone, Wallet, CheckCircle2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

const homeTranslations = {
    id: {
        hero: {
            badge: "Memperkenalkan Ctechbooth OS 2.0",
            title1: "Standar Kemewahan untuk",
            title2: "Photobooth Mandiri",
            desc: "Otomatisasi pembayaran, pantau perangkat keras dari jarak jauh, dan analisis pendapatan Anda dengan platform manajemen photobooth paling elegan di dunia.",
            btnStart: "Mulai Sekarang",
            btnDemo: "Tonton Demo"
        },
        stats: {
            title: "Telah dipercaya oleh",
            highlight: "100++ Mesin Photobooth",
            desc: "yang beroperasi setiap harinya di seluruh Indonesia."
        },
        payment: {
            title: "Terintegrasi Penuh",
            desc: "Sistem pembayaran langsung yang mendukung QRIS, Virtual Account, dan berbagai E-Wallet."
        },
        bigPicture: {
            title: "Gambaran Besar",
            desc: "Satu ekosistem lengkap untuk pelanggan dan pemilik.",
            dashboard: {
                title: "Website Dashboard",
                desc: "Kontrol penuh di tangan Anda. Pantau revenue, status mesin, dan atur paket harga dari manapun."
            },
            app: {
                title: "Aplikasi Mesin",
                desc: "Interface yang mulus dan interaktif untuk memandu pelanggan dari mulai foto hingga pembayaran."
            }
        },
        cards: {
            title: "Mengapa Ctechbooth?",
            c1: "Operasional 24/7 Tanpa Kasir",
            c2: "Laporan Pendapatan Real-time",
            c3: "Sinkronisasi Cloud Instan",
            c4: "Manajemen Multi-Cabang"
        },
        pricing: {
            title: "Investasi pada Keunggulan",
            starter: "Pemula",
            pro: "Profesional",
            enterprise: "Enterprise",
            pricePerMonth: "/bln",
            custom: "Kustom",
            mostPopular: "Paling Populer",
            btnSelect: "Pilih Paket"
        }
    },
    en: {
        hero: {
            badge: "Introducing Ctechbooth OS 2.0",
            title1: "The Luxury Standard for",
            title2: "Self-Service Photobooths",
            desc: "Automate payments, monitor hardware remotely, and analyze your revenue with the world's most elegant photobooth management platform.",
            btnStart: "Get Started",
            btnDemo: "Watch Demo"
        },
        stats: {
            title: "Trusted by over",
            highlight: "100++ Photobooths",
            desc: "operating daily across Indonesia."
        },
        payment: {
            title: "Fully Integrated",
            desc: "Direct payment system supporting QRIS, Virtual Accounts, and various E-Wallets."
        },
        bigPicture: {
            title: "The Big Picture",
            desc: "One complete ecosystem for customers and operators.",
            dashboard: {
                title: "Website Dashboard",
                desc: "Full control in your hands. Monitor revenue, machine status, and set pricing from anywhere."
            },
            app: {
                title: "Machine App",
                desc: "Seamless and interactive interface guiding customers from taking photos to making payments."
            }
        },
        cards: {
            title: "Why Ctechbooth?",
            c1: "24/7 Cashierless Operations",
            c2: "Real-time Revenue Reports",
            c3: "Instant Cloud Sync",
            c4: "Multi-branch Management"
        },
        pricing: {
            title: "Invest in Excellence",
            starter: "Starter",
            pro: "Professional",
            enterprise: "Enterprise",
            pricePerMonth: "/mo",
            custom: "Custom",
            mostPopular: "Most Popular",
            btnSelect: "Select Plan"
        }
    }
};

const backgroundImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=2000",
];

export default function Welcome() {
    return (
        <LandingLayout title="Ctechbooth - Home">
            <HomeContent />
        </LandingLayout>
    );
}

function HomeContent() {
    const { lang } = useContext(LangContext);
    const t = homeTranslations[lang];
    const [bgIndex, setBgIndex] = useState(0);

    // Image Slideshow logic
    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Slideshow Hero Section */}
            <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden">
                {/* Background Slideshow */}
                {backgroundImages.map((img, i) => (
                    <div 
                        key={img}
                        className={`absolute inset-0 transition-opacity duration-1000 ${i === bgIndex ? 'opacity-30' : 'opacity-0'}`}
                        style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            mixBlendMode: 'luminosity'
                        }}
                    />
                ))}
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10 mt-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F7D774] text-xs font-medium mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        {t.hero.badge}
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl">
                        {t.hero.title1} <br className="hidden md:block" />
                        <span className="gold-gradient-text">{t.hero.title2}</span>
                    </h1>
                    
                    <p className="text-[#B8C0CC] text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
                        {t.hero.desc}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/login"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F7D774] hover:opacity-90 transition-opacity text-black font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        >
                            {t.hero.btnStart} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="#demo"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-card hover:bg-white/5 transition-all text-white font-medium flex items-center justify-center gap-2"
                        >
                            <Play className="w-4 h-4" /> {t.hero.btnDemo}
                        </a>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 border-y border-white/5 bg-[#111111]/50 relative z-20">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[#B8C0CC] text-lg">
                        {t.stats.title} <span className="gold-gradient-text font-bold text-2xl mx-2">{t.stats.highlight}</span> {t.stats.desc}
                    </p>
                </div>
            </section>

            {/* Brand Marquee Section */}
            <section className="py-10 bg-[#0A0A0A] overflow-hidden relative border-b border-white/5">
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0A0A0A] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0A0A0A] to-transparent z-10"></div>
                
                <div className="marquee-container">
                    <div className="marquee-content flex items-center gap-16 px-8">
                        {/* Dummy Brand Logos using Text for now, in a real scenario you would map images */}
                        {[...Array(2)].map((_, j) => (
                            <div key={j} className="flex gap-16 items-center">
                                <span className="text-white/20 text-2xl font-bold uppercase tracking-widest flex items-center gap-2"><Camera className="w-8 h-8"/> SNAPSTUDIO</span>
                                <span className="text-white/20 text-2xl font-bold uppercase tracking-widest">FLASHBOOTH</span>
                                <span className="text-white/20 text-2xl font-bold uppercase tracking-widest flex items-center gap-2"><MonitorSmartphone className="w-8 h-8"/> CAPTURE.ID</span>
                                <span className="text-white/20 text-2xl font-bold uppercase tracking-widest">MEMORIES</span>
                                <span className="text-white/20 text-2xl font-bold uppercase tracking-widest">PICSY</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Integration */}
            <section className="py-24 relative z-20">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.payment.title}</h2>
                    <p className="text-[#B8C0CC] max-w-2xl mx-auto mb-16">{t.payment.desc}</p>
                    
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {/* Placeholder for Payment Logos */}
                        <div className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"><div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><Wallet /></div> <span className="font-semibold text-xl">QRIS</span></div>
                        <div className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"><div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><CreditCard /></div> <span className="font-semibold text-xl">Virtual Account</span></div>
                        <div className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"><div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5"><Smartphone /></div> <span className="font-semibold text-xl">E-Wallets</span></div>
                    </div>
                </div>
            </section>

            {/* The Big Picture Section */}
            <section className="py-24 bg-[#050505] relative border-y border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]"></div>
                
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4"><span className="gold-gradient-text">{t.bigPicture.title}</span></h2>
                        <p className="text-[#B8C0CC] max-w-2xl mx-auto">{t.bigPicture.desc}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Dashboard Side */}
                        <div className="glass-card p-8 rounded-[32px] border border-white/10 order-2 md:order-1 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center border border-white/10">
                                    <LayoutDashboard className="text-[#D4AF37] w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">{t.bigPicture.dashboard.title}</h3>
                            </div>
                            <p className="text-[#B8C0CC] leading-relaxed mb-8">{t.bigPicture.dashboard.desc}</p>
                            
                            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] p-2">
                                <div className="w-full h-48 bg-[#161616] rounded-lg relative">
                                    <div className="absolute top-4 left-4 right-4 flex gap-2">
                                        <div className="w-1/3 h-16 bg-white/5 rounded-md border border-white/5"></div>
                                        <div className="w-1/3 h-16 bg-white/5 rounded-md border border-white/5"></div>
                                        <div className="w-1/3 h-16 bg-[#D4AF37]/20 rounded-md border border-[#D4AF37]/30"></div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 h-20 bg-white/5 rounded-md border border-white/5 flex items-end p-2 gap-2">
                                        <div className="w-4 h-8 bg-[#D4AF37]/50 rounded-sm"></div>
                                        <div className="w-4 h-12 bg-[#D4AF37]/50 rounded-sm"></div>
                                        <div className="w-4 h-6 bg-[#D4AF37]/50 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* App Side */}
                        <div className="glass-card p-8 rounded-[32px] border border-white/10 order-1 md:order-2 relative overflow-hidden group gold-border">
                            <div className="absolute inset-0 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center border border-white/10">
                                    <MonitorSmartphone className="text-[#D4AF37] w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold">{t.bigPicture.app.title}</h3>
                            </div>
                            <p className="text-[#B8C0CC] leading-relaxed mb-8">{t.bigPicture.app.desc}</p>
                            
                            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] p-2 flex justify-center">
                                <div className="w-32 h-48 bg-[#161616] rounded-[24px] border border-white/20 relative shadow-2xl flex flex-col items-center justify-center gap-2">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Camera className="w-6 h-6 text-white/50" />
                                    </div>
                                    <div className="w-20 h-2 bg-white/10 rounded-full mt-4"></div>
                                    <div className="w-16 h-6 bg-[#D4AF37] rounded-full mt-2 opacity-80"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrolling Info Cards */}
            <section className="py-24 overflow-hidden relative">
                <div className="container mx-auto px-6 mb-12">
                    <h2 className="text-3xl font-bold">{t.cards.title}</h2>
                </div>
                
                <div className="flex gap-6 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8">
                    {[
                        { icon: Camera, title: t.cards.c1 },
                        { icon: BarChart3, title: t.cards.c2 },
                        { icon: Cloud, title: t.cards.c3 },
                        { icon: MonitorSmartphone, title: t.cards.c4 }
                    ].map((item, idx) => (
                        <div key={idx} className="min-w-[300px] md:min-w-[400px] h-64 glass-card rounded-[24px] p-8 flex flex-col justify-end relative group snap-center cursor-pointer hover:bg-white/5 transition-colors gold-border border border-white/5">
                            <item.icon className="w-12 h-12 text-[#D4AF37] absolute top-8 right-8 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
                            <h3 className="text-2xl font-bold leading-tight">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Pricing Peek */}
            <section className="py-24 bg-[#050505] border-t border-white/5 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <h2 className="text-3xl font-bold mb-12">{t.pricing.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="glass-card p-6 rounded-2xl border border-white/5">
                            <h4 className="text-lg font-medium">{t.pricing.starter}</h4>
                            <div className="text-2xl font-bold mt-2">Rp 299k<span className="text-sm font-normal text-[#B8C0CC]">{t.pricing.pricePerMonth}</span></div>
                        </div>
                        <div className="bg-[#111] p-6 rounded-2xl gold-border relative transform md:-translate-y-2 gold-glow">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{t.pricing.mostPopular}</div>
                            <h4 className="text-lg font-medium text-[#F7D774]">{t.pricing.pro}</h4>
                            <div className="text-2xl font-bold mt-2">Rp 799k<span className="text-sm font-normal text-[#B8C0CC]">{t.pricing.pricePerMonth}</span></div>
                        </div>
                        <div className="glass-card p-6 rounded-2xl border border-white/5">
                            <h4 className="text-lg font-medium">{t.pricing.enterprise}</h4>
                            <div className="text-2xl font-bold mt-2">{t.pricing.custom}</div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <Link href="/pricing" className="text-[#D4AF37] hover:text-[#F7D774] font-medium flex items-center justify-center gap-2">
                            Lihat Detail Paket <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

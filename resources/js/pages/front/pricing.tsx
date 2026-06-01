import LandingLayout, { LangContext } from '@/layouts/LandingLayout';
import { CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useContext, useState } from 'react';

const pricingTranslations = {
    id: {
        hero: {
            title: "Investasi pada Keunggulan",
            desc: "Harga yang simpel dan transparan dirancang untuk berkembang bersama bisnis fotografi Anda."
        },
        starter: {
            name: "Pemula",
            desc: "Untuk pemilik satu booth.",
            price: "Rp 299k",
            features: ["1 Lisensi Photobooth", "Analitik Dashboard Dasar", "Invoice Manual", "Dukungan Email", "Penyimpanan Cloud 5 GB"],
            btn: "Pilih Pemula"
        },
        pro: {
            name: "Profesional",
            desc: "Untuk operator yang sedang berkembang.",
            price: "Rp 799k",
            badge: "Paling Populer",
            features: ["Hingga 5 Photobooth", "Analitik AI Lanjutan", "Invoice & Pajak Otomatis", "Diagnostik Perangkat Jarak Jauh", "Prioritas Dukungan 24/7", "Penyimpanan Cloud 50 GB", "Branding Kustom"],
            btn: "Pilih Profesional"
        },
        enterprise: {
            name: "Enterprise",
            desc: "Untuk jaringan waralaba (franchise).",
            price: "Kustom",
            features: ["Photobooth Tak Terbatas", "Branding White-label", "Integrasi Kustom (API)", "Manajer Akun Dedikasi", "SLA 99.9% Uptime", "Penyimpanan Tak Terbatas", "Pelatihan Onsite"],
            btn: "Hubungi Sales"
        },
        perMonth: "/bln",
        faq: {
            title: "Pertanyaan Umum",
            items: [
                { q: "Apakah ada biaya setup?", a: "Tidak ada biaya setup. Anda bisa langsung mulai menggunakan Ctechbooth setelah berlangganan." },
                { q: "Bagaimana sistem pembayarannya?", a: "Kami menerima pembayaran via transfer bank, QRIS, dan kartu kredit. Tagihan dikirim setiap awal bulan." },
                { q: "Bisakah upgrade atau downgrade paket?", a: "Tentu! Anda bisa mengubah paket kapan saja. Perubahan akan berlaku di periode tagihan berikutnya." },
                { q: "Apakah ada masa percobaan gratis?", a: "Ya, kami menyediakan masa percobaan 14 hari untuk paket Profesional tanpa perlu kartu kredit." }
            ]
        }
    },
    en: {
        hero: {
            title: "Invest in Excellence",
            desc: "Simple, transparent pricing designed to scale with your photography business."
        },
        starter: {
            name: "Starter",
            desc: "For single booth owners.",
            price: "Rp 299k",
            features: ["1 Photobooth License", "Basic Dashboard Analytics", "Manual Invoicing", "Email Support", "5 GB Cloud Storage"],
            btn: "Select Starter"
        },
        pro: {
            name: "Professional",
            desc: "For growing operators.",
            price: "Rp 799k",
            badge: "Most Popular",
            features: ["Up to 5 Photobooths", "Advanced AI Analytics", "Automated Invoicing & Tax", "Remote Hardware Diagnostics", "Priority 24/7 Support", "50 GB Cloud Storage", "Custom Branding"],
            btn: "Select Professional"
        },
        enterprise: {
            name: "Enterprise",
            desc: "For franchise networks.",
            price: "Custom",
            features: ["Unlimited Booths", "White-label Branding", "Custom Integrations (API)", "Dedicated Account Manager", "99.9% Uptime SLA", "Unlimited Storage", "Onsite Training"],
            btn: "Contact Sales"
        },
        perMonth: "/mo",
        faq: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Are there any setup fees?", a: "No setup fees. You can start using Ctechbooth right after subscribing." },
                { q: "How does billing work?", a: "We accept payments via bank transfer, QRIS, and credit cards. Invoices are sent at the beginning of each month." },
                { q: "Can I upgrade or downgrade?", a: "Absolutely! You can change your plan anytime. Changes take effect in the next billing period." },
                { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial for the Professional plan — no credit card required." }
            ]
        }
    }
};

export default function Pricing() {
    return (
        <LandingLayout title="Ctechbooth - Pricing">
            <PricingContent />
        </LandingLayout>
    );
}

function PricingContent() {
    const { lang } = useContext(LangContext);
    const t = pricingTranslations[lang];
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="gold-gradient-text">{t.hero.title}</span></h1>
                    <p className="text-[#B8C0CC] text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center mb-28">
                    
                    {/* Starter */}
                    <div className="glass-card p-8 rounded-[24px] border border-white/5 flex flex-col">
                        <h3 className="text-xl font-medium mb-2">{t.starter.name}</h3>
                        <p className="text-[#B8C0CC] text-sm mb-6">{t.starter.desc}</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold">{t.starter.price}</span>
                            <span className="text-[#B8C0CC] text-sm">{t.perMonth}</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {t.starter.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#B8C0CC]">
                                    <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm font-medium">{t.starter.btn}</button>
                    </div>

                    {/* Professional */}
                    <div className="bg-[#111] p-8 rounded-[24px] gold-border gold-glow relative transform md:-translate-y-4 flex flex-col">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F7D774] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                            {t.pro.badge}
                        </div>
                        <h3 className="text-xl font-medium mb-2 text-[#F7D774]">{t.pro.name}</h3>
                        <p className="text-[#B8C0CC] text-sm mb-6">{t.pro.desc}</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold">{t.pro.price}</span>
                            <span className="text-[#B8C0CC] text-sm">{t.perMonth}</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {t.pro.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white">
                                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F7D774] hover:opacity-90 transition-opacity text-black text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]">{t.pro.btn}</button>
                    </div>

                    {/* Enterprise */}
                    <div className="glass-card p-8 rounded-[24px] border border-white/5 flex flex-col">
                        <h3 className="text-xl font-medium mb-2">{t.enterprise.name}</h3>
                        <p className="text-[#B8C0CC] text-sm mb-6">{t.enterprise.desc}</p>
                        <div className="mb-8">
                            <span className="text-4xl font-bold">{t.enterprise.price}</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {t.enterprise.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-[#B8C0CC]">
                                    <CheckCircle2 className="w-4 h-4 text-white/50 shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm font-medium">{t.enterprise.btn}</button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-2">{t.faq.title}</h2>
                    </div>

                    <div className="space-y-4">
                        {t.faq.items.map((item, idx) => (
                            <div key={idx} className="glass-card rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-medium text-white flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" /> {item.q}
                                    </span>
                                    <ArrowRight className={`w-4 h-4 text-[#B8C0CC] transition-transform duration-200 ${openFaq === idx ? 'rotate-90' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                                    <p className="px-6 pl-14 text-[#B8C0CC] text-sm leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

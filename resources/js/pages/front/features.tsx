import LandingLayout, { LangContext } from '@/layouts/LandingLayout';
import { Cloud, MonitorSmartphone, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { useContext } from 'react';

const featureTranslations = {
    id: {
        hero: {
            title: "Keanggunan Teknik",
            desc: "Segala yang Anda butuhkan untuk mengembangkan bisnis photobooth Anda, dibuat dengan perhatian ekstra pada detail."
        },
        items: {
            payment: { title: "Otomatisasi Pembayaran", desc: "Terima QRIS, Virtual Account, dan E-Wallet secara langsung. Invoice dibuat dan dilacak secara otonom." },
            remote: { title: "Diagnostik Jarak Jauh", desc: "Pantau status kamera, gulungan kertas printer, dan kesehatan sistem dari ponsel Anda secara real-time." },
            cloud: { title: "Sinkronisasi Cloud", desc: "Unggah foto yang diambil ke penyimpanan cloud yang aman. Pelanggan menerima galeri melalui email otomatis." },
            security: { title: "Keamanan Enterprise", desc: "Enkripsi tingkat perbankan untuk semua transaksi. Kontrol akses berbasis peran untuk tim Anda." },
            ai: { title: "Analitik Berbasis AI", desc: "Prediksi jam sibuk, analisis demografi pelanggan, dan optimalkan strategi harga dengan model machine learning kami." }
        }
    },
    en: {
        hero: {
            title: "Engineering Elegance",
            desc: "Everything you need to scale your photobooth empire, crafted with obsessive attention to detail."
        },
        items: {
            payment: { title: "Payment Automation", desc: "Accept QRIS, Virtual Accounts, and E-Wallets directly. Invoices are generated and tracked autonomously." },
            remote: { title: "Remote Diagnostics", desc: "Monitor camera status, printer paper rolls, and system health from your phone in real-time." },
            cloud: { title: "Cloud Sync & Storage", desc: "Instantly upload captured photos to secure cloud storage. Customers receive their galleries via automated emails." },
            security: { title: "Enterprise Security", desc: "Bank-grade encryption for all transactions and user data. Role-based access control for your team." },
            ai: { title: "AI-Powered Analytics", desc: "Predict peak hours, analyze customer demographics, and optimize your pricing strategy with our proprietary machine learning models." }
        }
    }
};

export default function Features() {
    return (
        <LandingLayout title="Ctechbooth - Features">
            <FeaturesContent />
        </LandingLayout>
    );
}

function FeaturesContent() {
    const { lang } = useContext(LangContext);
    const t = featureTranslations[lang];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Specific Hero for Features */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 mb-6">
                        <Zap className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="gold-gradient-text">{t.hero.title}</span></h1>
                    <p className="text-[#B8C0CC] text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-8 rounded-[24px] gold-border hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{t.items.payment.title}</h3>
                        <p className="text-[#B8C0CC] text-sm leading-relaxed">{t.items.payment.desc}</p>
                    </div>
                    
                    <div className="glass-card p-8 rounded-[24px] gold-border hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MonitorSmartphone className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{t.items.remote.title}</h3>
                        <p className="text-[#B8C0CC] text-sm leading-relaxed">{t.items.remote.desc}</p>
                    </div>

                    <div className="glass-card p-8 rounded-[24px] gold-border hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Cloud className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{t.items.cloud.title}</h3>
                        <p className="text-[#B8C0CC] text-sm leading-relaxed">{t.items.cloud.desc}</p>
                    </div>

                    <div className="glass-card p-8 rounded-[24px] gold-border hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{t.items.security.title}</h3>
                        <p className="text-[#B8C0CC] text-sm leading-relaxed">{t.items.security.desc}</p>
                    </div>

                    <div className="glass-card p-8 rounded-[24px] gold-border hover:bg-white/5 transition-colors group md:col-span-2 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#D4AF37]/5 to-transparent"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{t.items.ai.title}</h3>
                                <p className="text-[#B8C0CC] text-sm leading-relaxed">{t.items.ai.desc}</p>
                            </div>
                            <div className="flex-1 w-full flex items-center justify-center">
                                {/* Minimalist Chart Graphic */}
                                <div className="w-full h-32 flex items-end gap-2 px-4">
                                    {[40, 70, 45, 90, 65, 80, 100, 85].map((h, i) => (
                                        <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#D4AF37]/20 to-[#F7D774] relative group-hover:opacity-80 transition-opacity" style={{ height: `${h}%` }}>
                                            {i === 6 && (
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[#F7D774] whitespace-nowrap">
                                                    Peak Day
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

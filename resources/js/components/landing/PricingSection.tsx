import { motion } from 'framer-motion';
import { Check, Minus, MessageCircle } from 'lucide-react';

export default function PricingSection() {
    const phoneNumber = "628111111111"; // Ganti dengan nomor asli

    const getWaLink = (message: string) => {
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    const plans = [
        {
            name: "ctechbooth STARTER",
            badge: "COCOK UNTUK BISNIS BARU",
            price: "Rp 4.500.000",
            period: "/bulan",
            desc: "Menggunakan platform ctechbooth untuk mengelola operasional photobooth tanpa perlu membangun sistem sendiri.",
            features: [
                "Dashboard Monitoring",
                "Monitoring Booth",
                "Data Pelanggan",
                "Laporan Dasar",
                "Support Standar",
                "Update Sistem Berkala"
            ],
            isFeatured: false,
            buttonText: "DAPATKAN PENAWARAN",
            waMessage: "Halo, saya tertarik dengan paket ctechbooth STARTER. Mohon informasi lengkap dan penawaran untuk bisnis photobooth saya."
        },
        {
            name: "ctechbooth FULL SETUP",
            badge: "PALING POPULER",
            price: "Rp 12.500.000",
            period: "/setup",
            desc: "Solusi lengkap untuk bisnis yang ingin langsung operasional dengan sistem yang siap digunakan.",
            features: [
                "Semua fitur Starter",
                "Setup Sistem Awal",
                "Konfigurasi Tenant",
                "Integrasi Booth",
                "Training Penggunaan",
                "Pendampingan Implementasi",
                "Go Live Assistance"
            ],
            isFeatured: true,
            buttonText: "DAPATKAN PENAWARAN",
            waMessage: "Halo, saya tertarik dengan paket ctechbooth FULL SETUP. Mohon informasi detail implementasi dan penawarannya."
        },
        {
            name: "ctechbooth BUSINESS GROWTH",
            badge: "UNTUK BISNIS YANG BERKEMBANG",
            price: "Rp 18.500.000",
            period: "/paket",
            desc: "Dirancang untuk bisnis photobooth yang sudah berjalan dan ingin meningkatkan efisiensi operasional.",
            features: [
                "Multi Cabang",
                "Multi User",
                "Analytics Lengkap",
                "Monitoring Real-Time",
                "Prioritas Support",
                "Workflow Management",
                "Operational Insights"
            ],
            isFeatured: false,
            buttonText: "DAPATKAN PENAWARAN",
            waMessage: "Halo, saya tertarik dengan paket ctechbooth BUSINESS GROWTH. Mohon informasi lebih lanjut dan penawaran terbaiknya."
        },
        {
            name: "ctechbooth ENTERPRISE",
            badge: "CUSTOM SOLUTION",
            price: "Hubungi Kami",
            period: "",
            desc: "Solusi khusus untuk perusahaan, franchise, atau jaringan bisnis dengan kebutuhan yang lebih kompleks.",
            features: [
                "Custom Workflow",
                "Custom Branding",
                "Integrasi Sistem",
                "Dedicated Support",
                "SLA Agreement",
                "Konsultasi Implementasi",
                "Pengembangan Khusus"
            ],
            isFeatured: false,
            buttonText: "HUBUNGI TIM CTECHBOOTH",
            waMessage: "Halo, saya ingin berkonsultasi mengenai solusi ctechbooth ENTERPRISE untuk kebutuhan bisnis kami."
        }
    ];

    const comparisonFeatures = [
        { name: "Dashboard Monitoring", starter: true, setup: true, growth: true, enterprise: true },
        { name: "Monitoring Booth", starter: true, setup: true, growth: true, enterprise: true },
        { name: "Data Pelanggan", starter: true, setup: true, growth: true, enterprise: true },
        { name: "Laporan", starter: "Dasar", setup: "Lengkap", growth: "Lengkap", enterprise: "Kustom" },
        { name: "Multi User", starter: false, setup: false, growth: true, enterprise: true },
        { name: "Multi Cabang", starter: false, setup: false, growth: true, enterprise: true },
        { name: "Analytics", starter: false, setup: false, growth: true, enterprise: true },
        { name: "Training", starter: false, setup: true, growth: true, enterprise: true },
        { name: "Setup Sistem", starter: false, setup: true, growth: true, enterprise: true },
        { name: "Integrasi Booth", starter: false, setup: true, growth: true, enterprise: true },
        { name: "Dedicated Support", starter: false, setup: false, growth: false, enterprise: true },
        { name: "Custom Development", starter: false, setup: false, growth: false, enterprise: true },
    ];

    const CheckIcon = () => <Check className="w-5 h-5 text-green-500 mx-auto" />;
    const MinusIcon = () => <Minus className="w-5 h-5 text-gray-300 mx-auto" />;

    return (
        <section id="pricing" className="py-24 px-6 bg-[#FAFAFA] border-y border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                        PAKET SOLUSI UNTUK SETIAP TAHAP BISNIS PHOTOBOOTH
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Mulai dari penggunaan aplikasi saja hingga implementasi penuh yang siap digunakan untuk mengelola operasional photobooth secara profesional.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                    {plans.map((plan, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`bg-white rounded-2xl flex flex-col relative h-full ${plan.isFeatured ? 'border-2 border-blue-600 shadow-xl' : 'border border-gray-200 shadow-sm'}`}
                        >
                            {plan.isFeatured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                                    MOST POPULAR
                                </div>
                            )}
                            
                            <div className="p-6 border-b border-gray-100 flex-1 flex flex-col">
                                <div className="text-xs font-bold text-blue-600 mb-3 tracking-wider uppercase min-h-[16px]">{plan.badge}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900 tracking-tight">{plan.price}</span>
                                    <span className="text-gray-500 font-medium">{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {plan.desc}
                                </p>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-600 text-sm font-medium">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a 
                                    href={getWaLink(plan.waMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-3 rounded-xl font-bold transition-all text-center flex items-center justify-center gap-2 ${plan.isFeatured ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {plan.buttonText}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Investment Note */}
                <div className="text-center text-sm text-gray-500 mb-24 max-w-3xl mx-auto px-4 bg-gray-50 py-4 rounded-xl border border-gray-200">
                    * Harga yang ditampilkan merupakan estimasi awal dan dapat disesuaikan berdasarkan jumlah booth, jumlah cabang, kebutuhan integrasi, serta cakupan implementasi yang dibutuhkan.
                </div>

                {/* Comparison Table */}
                <div className="mb-24 overflow-x-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                            BANDINGKAN FITUR SETIAP PAKET
                        </h3>
                    </div>
                    
                    <div className="min-w-[800px] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-4 font-bold text-gray-900 w-1/3">Fitur</th>
                                    <th className="p-4 font-bold text-gray-900 text-center w-1/6">STARTER</th>
                                    <th className="p-4 font-bold text-gray-900 text-center w-1/6">FULL SETUP</th>
                                    <th className="p-4 font-bold text-gray-900 text-center w-1/6">BUSINESS</th>
                                    <th className="p-4 font-bold text-gray-900 text-center w-1/6">ENTERPRISE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((feat, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-700">{feat.name}</td>
                                        <td className="p-4 text-center">
                                            {typeof feat.starter === 'boolean' ? (feat.starter ? <CheckIcon /> : <MinusIcon />) : <span className="text-sm font-semibold text-gray-600">{feat.starter}</span>}
                                        </td>
                                        <td className="p-4 text-center">
                                            {typeof feat.setup === 'boolean' ? (feat.setup ? <CheckIcon /> : <MinusIcon />) : <span className="text-sm font-semibold text-gray-600">{feat.setup}</span>}
                                        </td>
                                        <td className="p-4 text-center">
                                            {typeof feat.growth === 'boolean' ? (feat.growth ? <CheckIcon /> : <MinusIcon />) : <span className="text-sm font-semibold text-gray-600">{feat.growth}</span>}
                                        </td>
                                        <td className="p-4 text-center">
                                            {typeof feat.enterprise === 'boolean' ? (feat.enterprise ? <CheckIcon /> : <MinusIcon />) : <span className="text-sm font-semibold text-gray-600">{feat.enterprise}</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Consultation CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-xl"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-gray-900"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            TIDAK YAKIN MEMILIH PAKET?
                        </h3>
                        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                            Tim ctechbooth akan membantu menganalisis kebutuhan bisnis Anda dan merekomendasikan solusi yang paling sesuai.
                        </p>
                        <a 
                            href={getWaLink("Halo, saya ingin konsultasi mengenai kebutuhan software photobooth dan paket ctechbooth yang paling sesuai untuk bisnis saya.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            <MessageCircle className="w-5 h-5" />
                            KONSULTASI GRATIS
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

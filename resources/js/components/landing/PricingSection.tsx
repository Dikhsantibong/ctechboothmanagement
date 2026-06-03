import { motion } from 'framer-motion';
import { Check, Minus, MessageCircle } from 'lucide-react';

const phoneNumber = "628111111111";
const getWaLink = (message: string) => `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const plans = [
    {
        name: "Starter",
        subtitle: "Mulai bisnis photobooth Anda",
        price: "Hubungi Kami",
        featured: false,
        features: [
            "Photobooth Koran",
            "Photostrip (2–4 frame)",
            "Cetak 4R",
            "Dashboard Dasar",
            "Customer Database",
            "1 Booth",
            "Email Support",
        ],
        waMessage: "Halo, saya tertarik dengan paket CTECHBOOTH STARTER. Mohon informasi lebih lanjut.",
    },
    {
        name: "Full Setup",
        subtitle: "Solusi lengkap siap pakai",
        price: "Hubungi Kami",
        featured: true,
        features: [
            "Semua fitur Starter",
            "GIF Booth",
            "Boomerang Booth",
            "QR Download & Sharing",
            "Training & Setup Sistem",
            "Hingga 3 Booth",
            "Prioritas Support",
        ],
        waMessage: "Halo, saya tertarik dengan paket CTECHBOOTH FULL SETUP. Mohon informasi lebih lanjut.",
    },
    {
        name: "Business Growth",
        subtitle: "Skalakan bisnis multi-cabang",
        price: "Hubungi Kami",
        featured: false,
        features: [
            "Semua fitur Full Setup",
            "Multi Cabang Management",
            "Event Analytics Dashboard",
            "Revenue Monitoring",
            "Video Booth",
            "Hingga 10 Booth",
            "Dedicated Account Manager",
        ],
        waMessage: "Halo, saya tertarik dengan paket CTECHBOOTH BUSINESS GROWTH. Mohon informasi lebih lanjut.",
    },
    {
        name: "Enterprise",
        subtitle: "Custom sesuai kebutuhan",
        price: "Custom",
        featured: false,
        features: [
            "Semua fitur Business Growth",
            "AI Background Replacement",
            "Sponsor Advertising System",
            "White Label",
            "Custom Integration",
            "Unlimited Booth",
            "24/7 Dedicated Support",
        ],
        waMessage: "Halo, saya tertarik dengan paket CTECHBOOTH ENTERPRISE. Mohon informasi lengkap dan diskusi kebutuhan custom.",
    },
];

const comparisonFeatures = [
    { name: "Photobooth Koran", starter: true, full: true, business: true, enterprise: true },
    { name: "Photostrip & Cetak 4R", starter: true, full: true, business: true, enterprise: true },
    { name: "GIF Booth", starter: false, full: true, business: true, enterprise: true },
    { name: "Boomerang Booth", starter: false, full: true, business: true, enterprise: true },
    { name: "Video Booth", starter: false, full: false, business: true, enterprise: true },
    { name: "Digital Only Booth", starter: false, full: true, business: true, enterprise: true },
    { name: "QR Download & Sharing", starter: false, full: true, business: true, enterprise: true },
    { name: "Cloud Gallery & Album", starter: false, full: true, business: true, enterprise: true },
    { name: "Multi Cabang", starter: false, full: false, business: true, enterprise: true },
    { name: "Event Analytics", starter: false, full: false, business: true, enterprise: true },
    { name: "AI Features", starter: false, full: false, business: false, enterprise: true },
    { name: "Sponsor Advertising", starter: false, full: false, business: false, enterprise: true },
    { name: "White Label", starter: false, full: false, business: false, enterprise: true },
    { name: "Custom Integration", starter: false, full: false, business: false, enterprise: true },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                            Paket & Harga
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Paket Solusi Untuk Setiap Tahap Bisnis Photobooth
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Mulai dari penggunaan dasar hingga implementasi enterprise, setiap paket mencakup pengalaman photobooth dan sistem manajemen bisnis.
                        </p>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`relative bg-white rounded-2xl border shadow-sm p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                plan.featured
                                    ? 'border-blue-500 ring-2 ring-blue-100'
                                    : 'border-gray-200'
                            }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                                    PALING POPULER
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                                <p className="text-sm text-gray-500">{plan.subtitle}</p>
                            </div>

                            <div className="text-2xl font-bold text-gray-900 mb-6">{plan.price}</div>

                            <div className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, j) => (
                                    <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <a
                                href={getWaLink(plan.waMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 ${
                                    plan.featured
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                            >
                                <MessageCircle className="w-4 h-4" />
                                Hubungi Kami
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 tracking-tight">
                        Bandingkan Fitur Setiap Paket
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="text-left p-4 font-bold text-gray-900 min-w-[200px]">Fitur</th>
                                    <th className="p-4 font-bold text-gray-900 text-center">Starter</th>
                                    <th className="p-4 font-bold text-blue-600 text-center">Full Setup</th>
                                    <th className="p-4 font-bold text-gray-900 text-center">Business</th>
                                    <th className="p-4 font-bold text-gray-900 text-center">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((row, i) => (
                                    <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                                        <td className="p-4 text-gray-700 font-medium">{row.name}</td>
                                        <td className="p-4 text-center">
                                            {row.starter ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />}
                                        </td>
                                        <td className="p-4 text-center bg-blue-50/30">
                                            {row.full ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />}
                                        </td>
                                        <td className="p-4 text-center">
                                            {row.business ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />}
                                        </td>
                                        <td className="p-4 text-center">
                                            {row.enterprise ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Minus className="w-5 h-5 text-gray-300 mx-auto" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* CTA Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Tidak Yakin Memilih Paket?
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                            Tim kami siap membantu Anda menemukan solusi yang paling sesuai dengan skala bisnis dan kebutuhan event Anda.
                        </p>
                        <a
                            href={getWaLink("Halo, saya ingin konsultasi mengenai paket CTECHBOOTH yang paling sesuai untuk bisnis photobooth saya.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
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

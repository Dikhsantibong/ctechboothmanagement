import { motion } from 'framer-motion';
import { LayoutDashboard, MonitorSmartphone, UsersRound, CreditCard, BarChart3, Users } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            icon: LayoutDashboard,
            title: "Monitoring Tenant",
            desc: "Pantau seluruh cabang dan performa tenant dari satu halaman."
        },
        {
            icon: MonitorSmartphone,
            title: "Monitoring Booth",
            desc: "Status hardware, error log, dan sisa kertas printer."
        },
        {
            icon: UsersRound,
            title: "CRM Pelanggan",
            desc: "Database pelanggan lengkap untuk kebutuhan promosi."
        },
        {
            icon: CreditCard,
            title: "Subscription Management",
            desc: "Sistem berlangganan dan tagihan otomatis untuk mitra."
        },
        {
            icon: BarChart3,
            title: "Analytics",
            desc: "Laporan transaksi, trafik, dan analisis peak hours."
        },
        {
            icon: Users,
            title: "Multi User Access",
            desc: "Akses tersendiri untuk admin, kasir, dan teknisi."
        }
    ];

    return (
        <section id="features" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                        Semua Yang Dibutuhkan Bisnis Photobooth
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Mulai dari operasional harian hingga ekspansi bisnis, ctechbooth menyediakan tools komprehensif.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <feat.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

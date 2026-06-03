import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MonitorSmartphone, UsersRound, CreditCard, BarChart3 } from 'lucide-react';

export default function FeaturesSection() {
    const features = [
        {
            icon: LayoutDashboard,
            title: "Dashboard Monitoring",
            desc: "Pantau seluruh cabang dan performa booth secara real-time dari satu halaman."
        },
        {
            icon: Users,
            title: "Tenant Management",
            desc: "Kelola akses, bagi hasil, dan performa masing-masing tenant tanpa ribet."
        },
        {
            icon: MonitorSmartphone,
            title: "Monitoring Booth",
            desc: "Status hardware, error log, dan sisa kertas printer terpantau dari jauh."
        },
        {
            icon: UsersRound,
            title: "CRM Pelanggan",
            desc: "Database pelanggan lengkap untuk kebutuhan promosi dan retensi."
        },
        {
            icon: CreditCard,
            title: "Subscription Management",
            desc: "Sistem berlangganan otomatis dan tagihan untuk para mitra."
        },
        {
            icon: BarChart3,
            title: "Analytics & Reporting",
            desc: "Laporan transaksi, trafik pengunjung, dan analisis peak hours detail."
        }
    ];

    return (
        <section id="fitur" className="py-24 px-6 bg-[#F7F5F0]">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
                        FITUR KELAS <span className="text-[#FF6B00]">ENTERPRISE</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="brutal-card p-8 bg-white flex flex-col"
                        >
                            <div className="w-16 h-16 bg-[#F7F5F0] border-[3px] border-[#111111] flex items-center justify-center mb-6">
                                <feat.icon className="w-8 h-8 text-[#111111]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#111111] mb-4 uppercase">{feat.title}</h3>
                            <p className="text-lg text-[#525252] leading-relaxed">
                                {feat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

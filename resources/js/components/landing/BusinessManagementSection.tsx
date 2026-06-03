import { motion } from 'framer-motion';
import { Monitor, Users, Database, BarChart3, ShieldCheck, CreditCard, TrendingUp, Building2 } from 'lucide-react';

const features = [
    { icon: Monitor, title: "Monitoring Booth", desc: "Pantau status seluruh booth secara real-time dari satu dashboard." },
    { icon: Users, title: "Tenant Management", desc: "Kelola seluruh tenant dan operator dalam satu platform terpusat." },
    { icon: Database, title: "Customer Database", desc: "Simpan dan analisis data pelanggan untuk meningkatkan layanan." },
    { icon: BarChart3, title: "Event Analytics", desc: "Lihat performa setiap event dengan laporan yang komprehensif." },
    { icon: ShieldCheck, title: "Multi User Access", desc: "Atur hak akses untuk Owner, Admin, dan Operator secara terpisah." },
    { icon: CreditCard, title: "Subscription Management", desc: "Kelola paket dan langganan tenant dengan mudah dan transparan." },
    { icon: TrendingUp, title: "Revenue Monitoring", desc: "Pantau pendapatan dan performa bisnis dari semua cabang." },
    { icon: Building2, title: "Branch Management", desc: "Kelola banyak cabang dan lokasi dari satu dashboard pusat." },
];

export default function BusinessManagementSection() {
    return (
        <section className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                            Business Management
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Kendalikan Bisnis Anda Dari Satu Dashboard
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Semua data bisnis, mulai dari performa booth hingga pendapatan cabang, tersaji dalam satu tampilan yang mudah dipahami.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                                <item.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';

export default function MetricsSection() {
    const metrics = [
        { value: "50+", label: "Tenant Aktif" },
        { value: "10.000+", label: "Sesi Photobooth" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-4xl font-bold text-gray-900 mb-2">{m.value}</div>
                            <div className="text-sm font-medium text-gray-500">{m.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

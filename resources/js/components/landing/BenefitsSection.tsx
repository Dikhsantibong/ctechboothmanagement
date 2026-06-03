import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function BenefitsSection() {
    const benefits = [
        "Menghemat waktu operasional",
        "Monitoring bisnis real-time",
        "Data lebih akurat",
        "Multi cabang",
        "Pertumbuhan bisnis lebih cepat",
        "Dashboard terpusat"
    ];

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                        >
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="font-medium text-gray-900">{benefit}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

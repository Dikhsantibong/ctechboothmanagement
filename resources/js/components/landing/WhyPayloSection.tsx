import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function WhyPayloSection() {
    const reasons = [
        "Multi Tenant",
        "Cloud Native",
        "Scalable",
        "Real Time",
        "Support Indonesia",
        "Analytics Lengkap",
        "High Availability",
        "Future Integration"
    ];

    return (
        <section className="py-24 px-6 bg-[#F7F5F0]">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
                        MENGAPA <span className="bg-[#111111] text-white px-4">PAYLO?</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {reasons.map((reason, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="brutal-card p-6 bg-white flex items-center gap-4"
                        >
                            <div className="w-8 h-8 flex-shrink-0 bg-[#00C853] border-[2px] border-[#111111] flex items-center justify-center text-[#111111]">
                                <Check className="w-5 h-5 font-bold" />
                            </div>
                            <h3 className="text-lg font-bold text-[#111111] uppercase">{reason}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

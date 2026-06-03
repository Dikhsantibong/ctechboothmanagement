import { motion } from 'framer-motion';

export default function StatsSection() {
    return (
        <section className="bg-[#111111] py-20 border-y-[3px] border-[#111111]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x-[3px] divide-[#525252]">
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true }}
                        className="px-4"
                    >
                        <div className="text-5xl md:text-7xl font-black text-[#FF6B00] mb-2">50+</div>
                        <div className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide">Tenant Aktif</div>
                    </motion.div>
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="px-4"
                    >
                        <div className="text-5xl md:text-7xl font-black text-[#FF6B00] mb-2">10K+</div>
                        <div className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide">Sesi Photobooth</div>
                    </motion.div>
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="px-4"
                    >
                        <div className="text-5xl md:text-7xl font-black text-[#FF6B00] mb-2">99.9%</div>
                        <div className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide">Uptime</div>
                    </motion.div>
                    <motion.div 
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="px-4"
                    >
                        <div className="text-5xl md:text-7xl font-black text-[#FF6B00] mb-2">24/7</div>
                        <div className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide">Support</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';

export default function CtaSection() {
    return (
        <section className="py-32 px-6 bg-[#111111] border-y-[3px] border-[#111111]">
            <div className="container mx-auto max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-[#F7F5F0] mb-12 uppercase leading-[1.1] tracking-tight">
                        SIAP MENGEMBANGKAN BISNIS PHOTOBOOTH ANDA?
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button className="brutal-btn bg-[#FF6B00] text-[#111111] text-lg">
                            JADWALKAN DEMO
                        </button>
                        <button className="brutal-btn bg-white text-[#111111] text-lg">
                            HUBUNGI TIM
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

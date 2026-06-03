import { motion } from 'framer-motion';

export default function ProblemSection() {
    return (
        <section className="py-24 px-6 bg-[#F7F5F0]">
            <div className="container mx-auto max-w-7xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] max-w-4xl mx-auto uppercase">
                        BISNIS PHOTOBOOTH <span className="text-white bg-[#111111] px-4 inline-block transform rotate-1">TIDAK BISA</span> DIKELOLA DENGAN EXCEL
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        "Sulit monitoring banyak booth",
                        "Data pelanggan tercecer",
                        "Laporan manual",
                        "Tidak tahu performa tenant"
                    ].map((problem, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="brutal-card p-8 bg-white flex items-center gap-6"
                        >
                            <div className="w-16 h-16 bg-[#111111] text-[#FF6B00] flex items-center justify-center font-black text-3xl border-[3px] border-[#111111]">
                                !
                            </div>
                            <h3 className="text-2xl font-bold text-[#111111] uppercase tracking-wide">{problem}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

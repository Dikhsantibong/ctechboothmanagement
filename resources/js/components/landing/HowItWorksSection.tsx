import { motion } from 'framer-motion';

export default function HowItWorksSection() {
    const steps = [
        { num: "01", title: "Daftar", desc: "Buat akun admin PAYLO." },
        { num: "02", title: "Aktivasi", desc: "Pilih paket langganan sesuai skala bisnis." },
        { num: "03", title: "Hubungkan Booth", desc: "Install aplikasi PAYLO di mesin photobooth." },
        { num: "04", title: "Operasional", desc: "Mesin berjalan 24/7 menerima pembayaran." },
        { num: "05", title: "Monitoring", desc: "Pantau revenue dan status mesin dari dashboard." }
    ];

    return (
        <section id="cara-kerja" className="py-24 px-6 bg-[#FF6B00] border-y-[3px] border-[#111111] overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
                        CARA KERJA
                    </h2>
                </div>

                <div className="relative">
                    {/* Connector Line (visible on md+) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-[3px] bg-[#111111] z-0"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 rounded-none bg-white border-[3px] border-[#111111] shadow-[6px_6px_0px_#111111] flex items-center justify-center text-3xl font-black text-[#111111] mb-8">
                                    {step.num}
                                </div>
                                <h3 className="text-2xl font-bold text-[#111111] mb-2 uppercase">{step.title}</h3>
                                <p className="text-[#111111] font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

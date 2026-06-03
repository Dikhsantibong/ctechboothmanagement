import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WorkflowSection() {
    const steps = [
        { title: "Daftar Tenant", desc: "Buat akun admin ctechbooth." },
        { title: "Aktivasi Sistem", desc: "Pilih paket langganan." },
        { title: "Hubungkan Booth", desc: "Install aplikasi di mesin." },
        { title: "Mulai Operasional", desc: "Terima pembayaran otomatis." },
        { title: "Pantau Dashboard", desc: "Monitoring pendapatan harian." }
    ];

    return (
        <section className="py-24 px-6 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Cara Kerja ctechbooth
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start relative">
                    {/* Hidden line connecting steps on desktop */}
                    <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-gray-100 z-0"></div>

                    {steps.map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative z-10 flex flex-col items-center text-center w-full md:w-1/5 mb-8 md:mb-0 px-2"
                        >
                            <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 mb-6 shadow-sm">
                                0{i + 1}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-500 font-medium">{step.desc}</p>
                            
                            {/* Mobile arrow */}
                            {i < steps.length - 1 && (
                                <ArrowRight className="w-5 h-5 text-gray-300 md:hidden mt-6" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

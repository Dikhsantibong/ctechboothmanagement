import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "SnapBox Studio",
            role: "Franchise Owner",
            content: "Semenjak pakai PAYLO, pusing mikirin rekapan tiap bulan hilang. Semua dashboard udah nampilin angka real-time. Terbaik!",
            rating: 5
        },
        {
            name: "Flash Booth ID",
            role: "Event Organizer",
            content: "Sangat mudah di-setup untuk event-event skala besar. Uptime benar-benar sesuai klaim, nggak pernah down saat event puncak.",
            rating: 5
        },
        {
            name: "Lensa Coffee",
            role: "Coffee Shop Manager",
            content: "Photobooth di cafe kami berjalan autopilot. Pembayaran QRIS langsung masuk, dan bisa dicek darimana saja. Solusi wajib buat F&B.",
            rating: 5
        }
    ];

    return (
        <section className="py-24 px-6 bg-[#111111]">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#F7F5F0] uppercase tracking-tight">
                        DIPERCAYA OLEH <br/> <span className="text-[#FF6B00]">BISNIS LOKAL</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testi, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#F7F5F0] border-[3px] border-[#F7F5F0] p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-200 shadow-[8px_8px_0px_#FF6B00]"
                        >
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testi.rating)].map((_, j) => (
                                        <Star key={j} className="w-6 h-6 text-[#111111] fill-[#111111]" />
                                    ))}
                                </div>
                                <p className="text-xl text-[#111111] font-medium leading-relaxed mb-8">
                                    "{testi.content}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-300 border-[3px] border-[#111111] grayscale">
                                    {/* Placeholder foto hitam putih */}
                                </div>
                                <div>
                                    <div className="font-bold text-[#111111] uppercase">{testi.name}</div>
                                    <div className="text-sm font-bold text-[#525252]">{testi.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

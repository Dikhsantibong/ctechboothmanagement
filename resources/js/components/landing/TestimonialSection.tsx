import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
    const testimonials = [
        {
            name: "SnapBox Studio",
            rating: 5,
            content: "Semenjak pakai ctechbooth, pusing mikirin rekapan tiap bulan hilang. Semua dashboard udah nampilin angka real-time. Terbaik!"
        },
        {
            name: "Flash Booth ID",
            rating: 5,
            content: "Sangat mudah di-setup untuk event-event skala besar. Uptime benar-benar sesuai klaim, nggak pernah down saat event puncak."
        },
        {
            name: "Lensa Coffee",
            rating: 5,
            content: "Photobooth di cafe kami berjalan autopilot. Pembayaran QRIS langsung masuk, dan bisa dicek darimana saja."
        }
    ];

    return (
        <section className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Dipercaya Oleh Ratusan Bisnis
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testi, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(testi.rating)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed font-medium mb-8 flex-1">
                                "{testi.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {testi.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{testi.name}</div>
                                    <div className="text-sm text-gray-500">Verified Customer</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

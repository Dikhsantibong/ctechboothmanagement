import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FinalCtaSection() {
    const phoneNumber = "628111111111"; // Ganti dengan nomor asli
    
    const getWaLink = (message: string) => {
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <section className="py-32 px-6 bg-white border-t border-gray-200">
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
                        Tersedia untuk semua ukuran bisnis
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 uppercase">
                        SIAP MENINGKATKAN OPERASIONAL BISNIS PHOTOBOOTH ANDA?
                    </h2>
                    
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Mulai dari aplikasi saja hingga implementasi penuh, ctechbooth siap membantu bisnis Anda berkembang dengan sistem yang lebih modern dan terukur.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a 
                            href={getWaLink("Halo, saya ingin mendapatkan penawaran lengkap untuk penggunaan software ctechbooth.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            DAPATKAN PENAWARAN
                        </a>
                        <a 
                            href={getWaLink("Halo, saya ingin konsultasi mengenai kebutuhan software photobooth dan paket ctechbooth yang paling sesuai untuk bisnis saya.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            <MessageCircle className="w-5 h-5" />
                            KONSULTASI GRATIS
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

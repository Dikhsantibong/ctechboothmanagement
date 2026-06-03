import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export default function NewsSection() {
    const news = [
        {
            title: "ctechbooth v2.0 Dirilis: Dashboard Lebih Cepat",
            date: "12 Mei 2026",
            excerpt: "Update terbaru membawa peningkatan performa dashboard hingga 3x lipat dan penambahan laporan analitik prediktif.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Mengapa Bisnis Photobooth Butuh Sistem Terpusat?",
            date: "05 Mei 2026",
            excerpt: "Banyak pengusaha photobooth kehilangan potensi pendapatan karena tidak memantau kinerja mesin secara real-time.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Integrasi Pembayaran QRIS Dinamis Kini Tersedia",
            date: "28 Apr 2026",
            excerpt: "Kini ctechbooth mendukung pembuatan QRIS dinamis langsung dari layar mesin photobooth tanpa perangkat tambahan.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 px-6 bg-white border-y border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                            Berita & Update Terbaru
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Dapatkan informasi terkini seputar ctechbooth dan industri photobooth.
                        </p>
                    </div>
                    <a href="#" className="hidden md:inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-48 mb-6 overflow-hidden rounded-2xl bg-gray-100">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none"></div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
                                <Calendar className="w-4 h-4" />
                                {item.date}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.excerpt}
                            </p>
                        </motion.div>
                    ))}
                </div>
                
                <a href="#" className="mt-8 md:hidden inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </section>
    );
}

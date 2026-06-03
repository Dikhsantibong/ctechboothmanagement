import LandingLayout from '@/layouts/LandingLayout';
import GenericHeroSection from '@/components/landing/GenericHeroSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Berita() {
    const allNews = [
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
        },
        {
            title: "Tren Desain Frame Photobooth 2026",
            date: "15 Apr 2026",
            excerpt: "Melihat tren desain template dan frame yang paling diminati oleh Gen Z di berbagai event pop-up.",
            image: "https://images.unsplash.com/photo-1516280440504-63c631024346?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Tips Memilih Lokasi Penempatan Booth",
            date: "02 Apr 2026",
            excerpt: "Lokasi adalah kunci. Pelajari metrik foot-traffic untuk memaksimalkan ROI dari mesin photobooth Anda.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Maintenance Berkala: Rahasia Kamera Awet",
            date: "20 Mar 2026",
            excerpt: "Panduan lengkap merawat kamera DSLR dan lampu flash di dalam mesin photobooth agar tahan lama.",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <LandingLayout title="Berita & Artikel - ctechbooth">
            <GenericHeroSection 
                title="Pusat Informasi & Inspirasi"
                subtitle="Kumpulan berita rilis fitur terbaru, tips bisnis operasional, dan tren industri photobooth dari tim ahli ctechbooth."
            />
            
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allNews.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group cursor-pointer flex flex-col h-full"
                            >
                                <div className="relative h-56 mb-6 overflow-hidden rounded-2xl bg-gray-100 shrink-0">
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
                                <p className="text-gray-600 leading-relaxed flex-1">
                                    {item.excerpt}
                                </p>
                                
                                <div className="mt-6 text-sm font-bold text-blue-600 group-hover:text-blue-700">
                                    Baca Selengkapnya &rarr;
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            <FinalCtaSection />
        </LandingLayout>
    );
}

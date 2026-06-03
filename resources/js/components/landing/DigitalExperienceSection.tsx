import { motion } from 'framer-motion';
import { QrCode, MessageCircle, Mail, Cloud, Image, BookOpen, LayoutGrid, Scan, Globe } from 'lucide-react';

const features = [
    { icon: QrCode, title: "QR Download", desc: "Scan dan unduh hasil foto langsung ke smartphone." },
    { icon: MessageCircle, title: "WhatsApp Sharing", desc: "Kirim hasil foto langsung ke WhatsApp pelanggan." },
    { icon: Mail, title: "Email Sharing", desc: "Kirim foto ke alamat email pelanggan secara otomatis." },
    { icon: Cloud, title: "Cloud Gallery", desc: "Akses seluruh hasil foto dari cloud kapan saja dan di mana saja." },
    { icon: Image, title: "Online Album", desc: "Album digital yang bisa diakses dan dibagikan oleh pelanggan." },
    { icon: BookOpen, title: "Digital Guestbook", desc: "Buku tamu digital untuk menambahkan pesan di event." },
    { icon: LayoutGrid, title: "Event Gallery", desc: "Galeri khusus per-event yang bisa diakses publik." },
    { icon: Scan, title: "Scan & Download", desc: "Pindai QR Code di hasil cetak untuk unduh versi digital." },
    { icon: Globe, title: "Personalized Landing Page", desc: "Halaman khusus per-event untuk pengalaman pelanggan yang unik." },
];

export default function DigitalExperienceSection() {
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-sm font-medium mb-6">
                            Digital Experience
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Pengalaman Digital Modern
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Berikan pengalaman digital terbaik kepada pelanggan Anda dengan fitur sharing dan galeri yang lengkap.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            className="group flex items-start gap-4 bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0 group-hover:bg-cyan-200 transition-colors">
                                <item.icon className="w-5 h-5 text-cyan-700" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

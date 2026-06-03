import { motion } from 'framer-motion';
import { Newspaper, Image, LayoutGrid, BookOpen, Sparkles, Repeat, Video, QrCode } from 'lucide-react';

const modes = [
    {
        icon: Newspaper,
        title: "Photobooth Koran",
        desc: "Hasil foto dengan desain ala koran atau majalah yang sedang populer untuk event wedding dan brand activation.",
        features: ["Template koran modern", "Custom headline", "Custom logo & branding", "Instant print"],
        color: "from-amber-500 to-orange-600",
    },
    {
        icon: Image,
        title: "Photobooth 4R",
        desc: "Mode cetak standar ukuran 4R dengan kualitas tinggi untuk hasil yang sempurna.",
        features: ["Full frame photo", "Border custom", "Event branding", "High resolution output"],
        color: "from-blue-500 to-blue-700",
    },
    {
        icon: LayoutGrid,
        title: "Photostrip",
        desc: "Format photobooth klasik dengan beberapa frame dalam satu cetakan.",
        features: ["2 frame layout", "3 frame layout", "4 frame layout", "Custom layout"],
        color: "from-violet-500 to-purple-700",
    },
    {
        icon: BookOpen,
        title: "Flipbook Booth",
        desc: "Mengubah rangkaian foto menjadi buku animasi fisik yang dapat dibawa pulang oleh pelanggan.",
        features: ["Auto sequence", "Auto crop", "Print ready layout", "Event branding"],
        color: "from-emerald-500 to-green-700",
    },
    {
        icon: Sparkles,
        title: "GIF Booth",
        desc: "Menghasilkan animasi GIF yang dapat langsung dibagikan secara digital.",
        features: ["Instant GIF generation", "QR download", "Email sharing", "WhatsApp sharing"],
        color: "from-pink-500 to-rose-600",
    },
    {
        icon: Repeat,
        title: "Boomerang Booth",
        desc: "Membuat video pendek looping yang populer untuk event dan aktivasi brand.",
        features: ["Auto loop recording", "Instant preview", "Digital sharing", "Event branding"],
        color: "from-cyan-500 to-teal-600",
    },
    {
        icon: Video,
        title: "Video Booth",
        desc: "Rekam video singkat dengan branding event yang dapat langsung dibagikan.",
        features: ["HD recording", "Custom overlay", "Instant sharing", "Cloud upload"],
        color: "from-red-500 to-red-700",
    },
    {
        icon: QrCode,
        title: "Digital Only Booth",
        desc: "Tanpa printer, seluruh hasil dikirim secara digital melalui QR Code. Cocok untuk event modern dan aktivasi brand.",
        features: ["QR Code download", "Zero waste", "Instant delivery", "Gallery online"],
        color: "from-gray-600 to-gray-800",
    },
];

export default function PhotoExperienceSection() {
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-sm font-medium mb-6">
                            Photo Experience
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Berbagai Mode Pengalaman Photobooth Dalam Satu Platform
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            CTECHBOOTH mendukung berbagai jenis pengalaman photobooth yang dapat digunakan untuk event, wedding, brand activation, expo, mall, sekolah, maupun bisnis rental photobooth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modes.map((mode, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                        >
                            {/* Header gradient */}
                            <div className={`h-2 bg-gradient-to-r ${mode.color}`}></div>
                            
                            <div className="p-6 flex flex-col flex-1">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4`}>
                                    <mode.icon className="w-6 h-6 text-white" />
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{mode.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{mode.desc}</p>
                                
                                <div className="space-y-2">
                                    {mode.features.map((f, j) => (
                                        <div key={j} className="flex items-center gap-2 text-sm text-gray-500">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${mode.color} shrink-0`}></div>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { Camera, Printer, Zap, Palette, Award, Eye, RotateCcw, WifiOff, CloudUpload } from 'lucide-react';

const features = [
    { icon: Camera, title: "Multi Camera Support", desc: "Mendukung berbagai jenis kamera profesional seperti DSLR, mirrorless, dan webcam." },
    { icon: Printer, title: "Printer Integration", desc: "Kompatibel dengan printer event populer seperti DNP, HiTi, dan Canon Selphy." },
    { icon: Zap, title: "Instant Print", desc: "Cetak hasil dalam hitungan detik langsung dari mesin photobooth." },
    { icon: Palette, title: "Custom Template Builder", desc: "Membuat template sendiri tanpa coding menggunakan editor visual drag-and-drop." },
    { icon: Award, title: "Event Branding", desc: "Logo, sponsor, QR Code, dan elemen visual lainnya ditampilkan secara otomatis." },
    { icon: Eye, title: "Live Preview", desc: "Pelanggan dapat melihat hasil sebelum dicetak untuk memastikan kepuasan." },
    { icon: RotateCcw, title: "Retake Feature", desc: "Mengambil ulang foto sebelum finalisasi agar hasil sempurna." },
    { icon: WifiOff, title: "Offline Mode", desc: "Tetap dapat digunakan saat internet tidak stabil, data otomatis sinkron saat online." },
    { icon: CloudUpload, title: "Auto Backup", desc: "Data foto dan transaksi tersimpan secara otomatis ke cloud storage." },
];

export default function MachineFeatureSection() {
    return (
        <section className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
                            Fitur Mesin
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Fitur Profesional Untuk Operasional Photobooth
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Semua yang Anda butuhkan untuk mengoperasikan mesin photobooth secara profesional sudah tersedia di dalam CTECHBOOTH.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            className="group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                                <item.icon className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

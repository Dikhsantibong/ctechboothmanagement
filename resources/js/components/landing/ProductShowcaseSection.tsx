import { motion } from 'framer-motion';

export default function ProductShowcaseSection() {
    const blocks = [
        {
            title: "MONITORING TENANT",
            desc: "Satu layar untuk melihat siapa saja mitra yang aktif, pendapatan mereka hari ini, dan status lisensi tanpa harus buka banyak aplikasi.",
            color: "bg-[#00C853]"
        },
        {
            title: "MONITORING BOOTH",
            desc: "Deteksi otomatis jika kamera mati, aplikasi error, atau kertas printer habis. Anda akan dapat notifikasi sebelum pelanggan komplain.",
            color: "bg-[#FF6B00]"
        },
        {
            title: "PENDAPATAN TENANT",
            desc: "Pemisahan dana otomatis. Semua transaksi QRIS langsung terekap dengan sistem bagi hasil yang sudah Anda tentukan di awal.",
            color: "bg-white"
        },
        {
            title: "MANAJEMEN PELANGGAN",
            desc: "Kumpulkan email atau nomor WhatsApp pelanggan yang menggunakan photobooth Anda untuk kebutuhan campaign marketing selanjutnya.",
            color: "bg-[#111111]"
        }
    ];

    return (
        <section className="py-24 px-6 bg-[#111111]">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#F7F5F0] uppercase tracking-tight">
                        SATU PLATFORM, <br/> <span className="text-[#FF6B00]">KONTROL PENUH</span>
                    </h2>
                </div>

                <div className="space-y-24">
                    {blocks.map((block, i) => {
                        const isEven = i % 2 === 1;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={`${isEven ? 'lg:order-2' : ''}`}>
                                    <h3 className="text-3xl md:text-5xl font-black text-[#F7F5F0] mb-6 uppercase">
                                        {block.title}
                                    </h3>
                                    <p className="text-xl text-gray-400 leading-relaxed font-medium">
                                        {block.desc}
                                    </p>
                                </div>
                                <div className={`brutal-card ${block.color} aspect-video p-4 flex items-center justify-center relative overflow-hidden ${isEven ? 'lg:order-1' : ''}`}>
                                    <div className="absolute inset-x-8 inset-y-8 bg-black/10 border-[3px] border-[#111111] border-dashed flex items-center justify-center">
                                        <span className={`font-bold uppercase tracking-widest ${block.color === 'bg-[#111111]' ? 'text-white' : 'text-[#111111]'}`}>
                                            UI MOCKUP PLACEHOLDER
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

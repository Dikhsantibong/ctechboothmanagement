import { motion } from 'framer-motion';
import { Wand2, Paintbrush, Megaphone, Activity, Ticket, Star, Globe, Trophy } from 'lucide-react';

const innovations = [
    { icon: Wand2, title: "AI Background Replacement", desc: "Mengganti background secara otomatis menggunakan teknologi AI untuk hasil yang lebih menarik.", tag: "AI" },
    { icon: Paintbrush, title: "AI Event Theme Generator", desc: "Membuat desain template berdasarkan tema acara secara otomatis dengan kecerdasan buatan.", tag: "AI" },
    { icon: Megaphone, title: "Sponsor Advertising System", desc: "Menampilkan sponsor pada hasil foto dan layar booth secara dinamis.", tag: "Revenue" },
    { icon: Activity, title: "Event Engagement Analytics", desc: "Mengukur interaksi pengunjung event dengan data yang komprehensif.", tag: "Analytics" },
    { icon: Ticket, title: "Digital Coupon System", desc: "Memberikan voucher dan kupon digital setelah sesi photobooth.", tag: "Marketing" },
    { icon: Star, title: "Loyalty Program", desc: "Program poin pelanggan untuk meningkatkan retensi dan repeat order.", tag: "Marketing" },
    { icon: Globe, title: "Microsite Event", desc: "Landing page khusus untuk setiap event dengan branding yang unik.", tag: "Digital" },
    { icon: Trophy, title: "Multi Booth Competition", desc: "Kompetisi antar booth dalam satu event untuk meningkatkan engagement.", tag: "Engagement" },
];

const tagColors: Record<string, string> = {
    "AI": "bg-violet-100 text-violet-700",
    "Revenue": "bg-amber-100 text-amber-700",
    "Analytics": "bg-blue-100 text-blue-700",
    "Marketing": "bg-pink-100 text-pink-700",
    "Digital": "bg-cyan-100 text-cyan-700",
    "Engagement": "bg-emerald-100 text-emerald-700",
};

export default function InnovationSection() {
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-medium mb-6">
                            Innovation Roadmap
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Lebih Dari Sekadar Photobooth
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            CTECHBOOTH terus berinovasi dengan fitur-fitur canggih yang menjadikan platform ini semakin unggul di industri photobooth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {innovations.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                    <item.icon className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[item.tag]}`}>
                                    {item.tag}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed flex-1">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import LandingLayout, { LangContext } from '@/layouts/LandingLayout';
import { Star, Quote } from 'lucide-react';
import { useContext } from 'react';

const testimonialsTranslations = {
    id: {
        hero: {
            title: "Dipercaya oleh Elite",
            desc: "Dengarkan langsung dari operator photobooth sukses yang menggunakan Ctechbooth untuk mengembangkan bisnis mereka."
        },
        statsBar: {
            s1: { value: "100+", label: "Mesin Aktif" },
            s2: { value: "50+", label: "Mitra Operator" },
            s3: { value: "98%", label: "Kepuasan Pelanggan" },
            s4: { value: "24/7", label: "Dukungan Premium" }
        },
        items: [
            {
                quote: "Ctechbooth menggantikan tiga aplikasi berbeda yang kami gunakan. Estetikanya indah, tetapi keandalannya yang membuat saya bisa tidur nyenyak mengetahui 15 booth saya beroperasi tanpa cela.",
                name: "Adrian Pratama",
                role: "Founder, FlashBooth Jakarta",
                avatar: "a042581f4e29026704d"
            },
            {
                quote: "Otomatisasi invoicenya saja menghemat 20 jam kerja kami per minggu. Ini terasa seperti perangkat lunak yang dibangun oleh orang-orang yang benar-benar memahami bisnis fotografi mandiri.",
                name: "Nadia Saphira",
                role: "Operations Director, SnapStudios",
                avatar: "a042581f4e29026024d"
            },
            {
                quote: "Sejak beralih ke Ctechbooth, revenue kami naik 40%. Dashboard analitiknya membantu kami memahami jam sibuk dan mengoptimalkan penempatan mesin.",
                name: "Reza Mahendra",
                role: "CEO, PixelMoment",
                avatar: "a042581f4e29026014d"
            },
            {
                quote: "Fitur remote diagnostics luar biasa. Saya bisa memantau 8 mesin di 3 kota berbeda langsung dari ponsel saya. Masalah terdeteksi sebelum pelanggan mengeluh.",
                name: "Siti Aisyah",
                role: "Owner, Booth & Co.",
                avatar: "a042581f4e29026034d"
            },
            {
                quote: "Integrasi pembayaran QRIS-nya sangat mulus. Pelanggan hanya scan, bayar, dan langsung bisa foto. Tidak perlu lagi uang kembalian atau kasir.",
                name: "Budi Santoso",
                role: "Franchise Manager, SmileBooth",
                avatar: "a042581f4e29026044d"
            },
            {
                quote: "Tim support Ctechbooth sangat responsif. Setiap kali ada kendala, mereka menyelesaikannya dalam hitungan menit. Benar-benar standar enterprise.",
                name: "Dewi Anggraeni",
                role: "COO, Momento Studio",
                avatar: "a042581f4e29026054d"
            }
        ]
    },
    en: {
        hero: {
            title: "Trusted by the Elite",
            desc: "Hear directly from successful photobooth operators who use Ctechbooth to grow their business."
        },
        statsBar: {
            s1: { value: "100+", label: "Active Machines" },
            s2: { value: "50+", label: "Partner Operators" },
            s3: { value: "98%", label: "Customer Satisfaction" },
            s4: { value: "24/7", label: "Premium Support" }
        },
        items: [
            {
                quote: "Ctechbooth replaced three different software tools we were using. The aesthetic is beautiful, but the reliability is what lets me sleep at night knowing my 15 booths are operating flawlessly.",
                name: "Adrian Pratama",
                role: "Founder, FlashBooth Jakarta",
                avatar: "a042581f4e29026704d"
            },
            {
                quote: "The invoice automation alone saved me 20 hours a week. It feels like software built by people who actually understand the self-service photography business.",
                name: "Nadia Saphira",
                role: "Operations Director, SnapStudios",
                avatar: "a042581f4e29026024d"
            },
            {
                quote: "Since switching to Ctechbooth, our revenue increased by 40%. The analytics dashboard helps us understand peak hours and optimize machine placement.",
                name: "Reza Mahendra",
                role: "CEO, PixelMoment",
                avatar: "a042581f4e29026014d"
            },
            {
                quote: "The remote diagnostics feature is incredible. I can monitor 8 machines in 3 different cities directly from my phone. Issues are detected before customers complain.",
                name: "Siti Aisyah",
                role: "Owner, Booth & Co.",
                avatar: "a042581f4e29026034d"
            },
            {
                quote: "The QRIS payment integration is seamless. Customers just scan, pay, and start taking photos. No more change or cashier needed.",
                name: "Budi Santoso",
                role: "Franchise Manager, SmileBooth",
                avatar: "a042581f4e29026044d"
            },
            {
                quote: "Ctechbooth's support team is incredibly responsive. Whenever there's an issue, they resolve it in minutes. Truly enterprise-grade.",
                name: "Dewi Anggraeni",
                role: "COO, Momento Studio",
                avatar: "a042581f4e29026054d"
            }
        ]
    }
};

export default function Testimonials() {
    return (
        <LandingLayout title="Ctechbooth - Testimonials">
            <TestimonialsContent />
        </LandingLayout>
    );
}

function TestimonialsContent() {
    const { lang } = useContext(LangContext);
    const t = testimonialsTranslations[lang];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3B82F6]/10 mb-6">
                        <Quote className="w-8 h-8 text-[#3B82F6]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="blue-gradient-text">{t.hero.title}</span></h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {[t.statsBar.s1, t.statsBar.s2, t.statsBar.s3, t.statsBar.s4].map((stat, i) => (
                        <div key={i} className="glass-card p-6 rounded-2xl text-center">
                            <div className="text-3xl font-bold blue-gradient-text">{stat.value}</div>
                            <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {t.items.map((item, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-[24px] hover:bg-gray-50 transition-colors group flex flex-col justify-between">
                            {/* Stars */}
                            <div>
                                <div className="flex text-[#3B82F6] mb-5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-base font-light italic leading-relaxed text-gray-700 mb-8">
                                    "{item.quote}"
                                </p>
                            </div>
                            
                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] p-0.5 shrink-0">
                                    <img
                                        src={`https://i.pravatar.cc/150?u=${item.avatar}`}
                                        alt={item.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-[#1A1A1A] text-sm">{item.name}</div>
                                    <div className="text-xs text-gray-600">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

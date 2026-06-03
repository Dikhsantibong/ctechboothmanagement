import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
    const faqs = [
        {
            q: "Apakah PAYLO bisa digunakan untuk mesin photobooth rakitan sendiri?",
            a: "Tentu. PAYLO adalah software berbasis OS yang dirancang agnostik terhadap hardware. Selama mesin Anda menggunakan OS Windows/Mac yang didukung, PAYLO dapat berjalan mulus."
        },
        {
            q: "Bagaimana sistem pembagian hasil (split payment) bekerja?",
            a: "Anda bisa mengatur persentase pembagian hasil langsung dari dashboard. Saat ada transaksi QRIS masuk, sistem akan otomatis memisahkan dana ke rekening Anda dan rekening tenant sesuai porsi."
        },
        {
            q: "Apakah butuh koneksi internet yang sangat cepat?",
            a: "PAYLO dirancang efisien. Koneksi 4G standar sudah cukup untuk melakukan sinkronisasi data, pembayaran QRIS, dan upload foto ke cloud secara asinkron (background process)."
        },
        {
            q: "Berapa lama proses setup awal aplikasi?",
            a: "Kurang dari 10 menit. Setelah Anda mendaftar, cukup unduh installer, login di mesin, dan booth Anda siap beroperasi."
        },
        {
            q: "Apakah ada batasan penyimpanan foto di Cloud?",
            a: "Setiap paket memiliki batas penyimpanan default. Namun, sistem kami dilengkapi auto-archiving dan kompresi cerdas. Anda juga bisa menghubungkan AWS S3 Anda sendiri untuk paket Enterprise."
        }
    ];

    return (
        <section className="py-24 px-6 bg-[#F7F5F0] border-t-[3px] border-[#111111]">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
                        FREQUENTLY ASKED <span className="text-[#FF6B00]">QUESTIONS</span>
                    </h2>
                </div>

                <Accordion.Root type="single" collapsible className="space-y-4">
                    {faqs.map((faq, i) => (
                        <Accordion.Item 
                            key={i} 
                            value={`item-${i}`} 
                            className="brutal-card bg-white overflow-hidden"
                        >
                            <Accordion.Header>
                                <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group">
                                    <span className="text-xl font-bold text-[#111111] uppercase pr-8">
                                        {faq.q}
                                    </span>
                                    <ChevronDown className="w-6 h-6 text-[#111111] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                                <div className="p-6 pt-0 text-lg text-[#525252] font-medium leading-relaxed border-t-[3px] border-[#111111] bg-[#F7F5F0]">
                                    {faq.a}
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
                
                {/* Animasi Accordion Tailwind manual karena radix menggunakan keyframes untuk slide */}
                <style>
                    {`
                    @keyframes slideDown {
                        from { height: 0; }
                        to { height: var(--radix-accordion-content-height); }
                    }
                    @keyframes slideUp {
                        from { height: var(--radix-accordion-content-height); }
                        to { height: 0; }
                    }
                    .animate-slideDown {
                        animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
                    }
                    .animate-slideUp {
                        animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
                    }
                    `}
                </style>
            </div>
        </section>
    );
}

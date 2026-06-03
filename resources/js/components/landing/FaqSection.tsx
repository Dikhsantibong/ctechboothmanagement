import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FaqSection() {
    const faqs = [
        {
            q: "Apakah ctechbooth bisa digunakan untuk mesin photobooth rakitan?",
            a: "Tentu. ctechbooth mendukung berbagai jenis mesin rakitan yang menggunakan sistem operasi Windows."
        },
        {
            q: "Bagaimana sistem pembagian hasil bekerja?",
            a: "Pembagian hasil bisa diatur via dashboard. Dana akan terbagi otomatis berdasarkan nominal persentase ke rekening tenant."
        },
        {
            q: "Apakah butuh internet cepat?",
            a: "Koneksi 4G standar sudah sangat cukup karena ctechbooth melakukan sinkronisasi data di latar belakang (asinkron)."
        },
        {
            q: "Berapa lama proses setup?",
            a: "Setup memakan waktu kurang dari 10 menit. Cukup install aplikasi dan login menggunakan kredensial tenant."
        },
        {
            q: "Apakah data pelanggan aman?",
            a: "Sangat aman. Kami menggunakan enkripsi kelas enterprise untuk mengamankan data transaksi dan profil pelanggan Anda."
        }
    ];

    return (
        <section id="faq" className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Pertanyaan Umum
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Accordion.Root type="single" collapsible className="space-y-4">
                        {faqs.map((faq, i) => (
                            <Accordion.Item 
                                key={i} 
                                value={`item-${i}`} 
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <Accordion.Header>
                                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group hover:bg-gray-50 transition-colors">
                                        <span className="font-bold text-gray-900 pr-8">
                                            {faq.q}
                                        </span>
                                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown text-gray-600 font-medium">
                                    <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                                        {faq.a}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </motion.div>
                
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

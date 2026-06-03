import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function PricingSection() {
    const plans = [
        {
            name: "STARTER",
            price: "Rp 299.000",
            period: "/bulan",
            features: [
                "1 Mesin Photobooth",
                "Basic Dashboard",
                "Email Support",
                "Standard Analytics"
            ],
            isFeatured: false,
            buttonText: "MULAI SEKARANG"
        },
        {
            name: "BUSINESS",
            price: "Rp 799.000",
            period: "/bulan",
            features: [
                "5 Mesin Photobooth",
                "Advanced Dashboard",
                "Priority Support 24/7",
                "Predictive AI Analytics",
                "White-label Branding"
            ],
            isFeatured: true,
            buttonText: "PILIH BUSINESS"
        },
        {
            name: "ENTERPRISE",
            price: "KUSTOM",
            period: "",
            features: [
                "Unlimited Mesin",
                "Dedicated Account Manager",
                "Custom API Integration",
                "On-premise Deployment Option"
            ],
            isFeatured: false,
            buttonText: "HUBUNGI SALES"
        }
    ];

    return (
        <section id="harga" className="py-24 px-6 bg-[#F7F5F0]">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
                        INVESTASI UNTUK <span className="text-[#FF6B00]">SKALA BESAR</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`brutal-card p-8 flex flex-col h-full ${plan.isFeatured ? 'bg-[#FF6B00] md:-translate-y-4 md:scale-105' : 'bg-white'}`}
                        >
                            {plan.isFeatured && (
                                <div className="bg-[#111111] text-white text-xs font-bold uppercase tracking-widest py-1 px-3 self-start mb-6 border-[2px] border-[#111111]">
                                    PALING POPULER
                                </div>
                            )}
                            <h3 className={`text-2xl font-black uppercase mb-4 ${plan.isFeatured ? 'text-[#111111]' : 'text-[#525252]'}`}>
                                {plan.name}
                            </h3>
                            <div className="mb-8 border-b-[3px] border-[#111111] pb-8">
                                <span className="text-4xl font-black text-[#111111]">{plan.price}</span>
                                <span className={`text-lg font-bold ml-1 ${plan.isFeatured ? 'text-[#111111]' : 'text-[#525252]'}`}>{plan.period}</span>
                            </div>
                            
                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <Check className={`w-6 h-6 flex-shrink-0 ${plan.isFeatured ? 'text-[#111111]' : 'text-[#00C853]'}`} />
                                        <span className={`font-bold ${plan.isFeatured ? 'text-[#111111]' : 'text-[#111111]'}`}>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 font-bold uppercase border-[3px] border-[#111111] transition-transform hover:-translate-y-1 hover:-translate-x-1 ${plan.isFeatured ? 'bg-[#111111] text-white shadow-[6px_6px_0px_#F7F5F0]' : 'bg-[#F7F5F0] text-[#111111] shadow-[6px_6px_0px_#111111]'}`}>
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

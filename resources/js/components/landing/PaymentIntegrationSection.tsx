import { motion } from 'framer-motion';

export default function PaymentIntegrationSection() {
    const gateways = [
        "QRIS", "Midtrans", "Xendit", "GoPay", "OVO", "DANA", 
        "ShopeePay", "LinkAja", "BCA Virtual Account", "Mandiri", 
        "BNI", "BRI", "Permata", "Credit Card"
    ];

    // Duplicate array to create a seamless infinite scrolling effect
    const marqueeItems = [...gateways, ...gateways];

    return (
        <section className="py-24 px-6 bg-white border-y border-gray-200 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                            Terintegrasi Dengan Semua Pembayaran
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Tidak perlu pusing memikirkan metode pembayaran pelanggan. ctechbooth sudah terhubung langsung dengan seluruh Payment Gateway terkemuka di Indonesia.
                        </p>
                    </motion.div>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden flex items-center h-32 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
                    <div className="marquee-content flex gap-8 whitespace-nowrap items-center">
                        {marqueeItems.map((gateway, i) => (
                            <div 
                                key={i}
                                className="flex items-center justify-center px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm text-gray-700 font-bold text-lg min-w-[200px]"
                            >
                                {gateway}
                            </div>
                        ))}
                    </div>
                </div>
                
                <style>
                    {`
                    .marquee-content {
                        display: flex;
                        width: max-content;
                        animation: marquee 30s linear infinite;
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-content:hover {
                        animation-play-state: paused;
                    }
                    `}
                </style>
            </div>
        </section>
    );
}

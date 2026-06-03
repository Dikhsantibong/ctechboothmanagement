import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    return (
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-[#F7F5F0]">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-block border-[3px] border-[#111111] px-4 py-1 font-bold text-sm bg-white mb-8 shadow-[4px_4px_0px_#111111] tracking-wide">
                        SOFTWARE PHOTOBOOTH INDONESIA
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8 text-[#111111]">
                        SOFTWARE PHOTOBOOTH UNTUK BISNIS YANG INGIN <span className="text-[#FF6B00] bg-[#111111] px-4 inline-block transform -rotate-2">TUMBUH</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[#525252] mb-10 max-w-xl font-medium">
                        Kelola tenant, transaksi, pelanggan, laporan, dan operasional photobooth dalam satu dashboard modern.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 mb-12">
                        <Link href="/register" className="brutal-btn bg-[#FF6B00] text-[#111111]">
                            DEMO GRATIS
                        </Link>
                        <a href="#fitur" className="brutal-btn bg-white text-[#111111]">
                            LIHAT FITUR
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 font-bold text-sm text-[#111111]">
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#00C853]" /> Cloud Based</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#00C853]" /> Multi Tenant</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#00C853]" /> Multi Cabang</div>
                        <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#00C853]" /> Real Time Monitoring</div>
                    </div>
                </motion.div>

                {/* Right Mockup */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <div className="brutal-card bg-white p-2">
                        {/* Mockup Header */}
                        <div className="flex items-center gap-2 border-b-[3px] border-[#111111] pb-2 mb-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-[#111111]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#111111]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#111111]"></div>
                            <div className="ml-4 text-xs font-bold font-mono">PAYLO DASHBOARD</div>
                        </div>
                        {/* Mockup Body */}
                        <div className="p-4 grid grid-cols-2 gap-4">
                            <div className="border-[3px] border-[#111111] p-4 bg-[#F7F5F0]">
                                <div className="text-sm font-bold text-[#525252]">TOTAL TENANT</div>
                                <div className="text-4xl font-black text-[#111111]">124</div>
                            </div>
                            <div className="border-[3px] border-[#111111] p-4 bg-[#FF6B00]">
                                <div className="text-sm font-bold text-[#111111]">BOOTH ONLINE</div>
                                <div className="text-4xl font-black text-[#111111]">98<span className="text-xl">/100</span></div>
                            </div>
                            <div className="border-[3px] border-[#111111] p-4 bg-white col-span-2">
                                <div className="text-sm font-bold text-[#525252] mb-2">PENDAPATAN TENANT</div>
                                <div className="h-24 bg-[#F7F5F0] border-[3px] border-[#111111] flex items-end px-4 gap-2 pb-2">
                                    <div className="w-full bg-[#111111] h-[40%]"></div>
                                    <div className="w-full bg-[#111111] h-[60%]"></div>
                                    <div className="w-full bg-[#111111] h-[30%]"></div>
                                    <div className="w-full bg-[#111111] h-[80%]"></div>
                                    <div className="w-full bg-[#FF6B00] h-[100%]"></div>
                                </div>
                            </div>
                            <div className="border-[3px] border-[#111111] p-4 bg-[#00C853]">
                                <div className="text-sm font-bold text-[#111111]">DEVICE STATUS</div>
                                <div className="text-xl font-black text-[#111111]">ALL HEALTHY</div>
                            </div>
                            <div className="border-[3px] border-[#111111] p-4 bg-white">
                                <div className="text-sm font-bold text-[#525252]">MONTHLY GROWTH</div>
                                <div className="text-xl font-black text-[#111111]">+34.5%</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

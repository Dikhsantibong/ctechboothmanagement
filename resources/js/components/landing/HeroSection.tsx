import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { CheckCircle2, ArrowRight, LayoutDashboard, MonitorSmartphone, Server } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Left: Copywriting (7 cols) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            v2.0 is now live
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                            Operasional photobooth dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">satu platform.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                            ctechbooth membantu bisnis photobooth mengelola tenant, booth, pelanggan, transaksi, dan laporan secara real-time dari satu dashboard tersentralisasi.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <a 
                                href="https://wa.me/628111111111?text=Halo%2C%20saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20ctechbooth." 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                Konsultasi Gratis <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="#features" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                                Lihat Fitur
                            </a>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cloud Based</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Multi Tenant</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Real Time</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Multi Cabang</div>
                        </div>
                    </motion.div>

                    {/* Right: Dashboard Preview (5 cols) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Abstract Mockup Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4 text-gray-500 text-sm font-medium">
                                    <LayoutDashboard className="w-4 h-4" /> Pendapatan Tenant
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-4">Rp 45.2M</div>
                                <div className="flex items-end gap-2 h-20">
                                    {[30, 40, 20, 50, 70, 45, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: `${h}%` }}>
                                            {i === 6 && <div className="w-full h-full bg-blue-500 rounded-t-sm"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
                                    <Server className="w-4 h-4" /> Tenant Aktif
                                </div>
                                <div className="text-2xl font-bold text-gray-900">124</div>
                                <div className="text-xs font-medium text-green-500 mt-1">+12 bulan ini</div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm">
                                    <MonitorSmartphone className="w-4 h-4" /> Booth Online
                                </div>
                                <div className="text-2xl font-bold text-gray-900">98/100</div>
                                <div className="text-xs font-medium text-green-500 mt-1">98% uptime</div>
                            </div>
                        </div>
                        
                        {/* Decorative background glow */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function DashboardPreviewSection() {
    return (
        <section className="py-24 px-6 bg-white border-y border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Visual 8 cols */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-2 shadow-sm overflow-hidden flex flex-col">
                            {/* Window Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white rounded-t-xl">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            {/* Dashboard Mockup Content */}
                            <div className="bg-white p-6 h-80 flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="w-1/4 h-24 bg-gray-100 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 font-medium">Metric</div>
                                    <div className="w-1/4 h-24 bg-gray-100 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 font-medium">Metric</div>
                                    <div className="w-1/2 h-24 bg-gray-100 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 font-medium">Chart</div>
                                </div>
                                <div className="flex-1 bg-gray-100 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 font-medium">
                                    Data Table
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Desc 4 cols */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">
                            Monitoring seluruh tenant dari satu dashboard.
                        </h2>
                        
                        <div className="space-y-4 mb-8">
                            {[
                                "Statistik Real Time",
                                "Monitoring Booth",
                                "Status Perangkat",
                                "Data Pelanggan",
                                "Laporan Otomatis"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

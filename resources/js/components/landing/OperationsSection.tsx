import { motion } from 'framer-motion';
import { Camera, Users, Database, FileText, LineChart, Cpu } from 'lucide-react';

export default function OperationsSection() {
    return (
        <section id="operations" className="py-24 px-6 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                        Platform Operasional Bisnis
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Beragam fitur canggih yang dirancang khusus untuk mempermudah operasional Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card Besar 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                            <Camera className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Monitoring Booth</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Sistem akan memberitahu Anda ketika kamera mati, koneksi terputus, atau kertas printer habis secara seketika sebelum pelanggan sadar.
                        </p>
                        <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                            <span className="text-sm text-gray-400 font-medium">Live Device Status Mockup</span>
                        </div>
                    </motion.div>

                    {/* Card Kecil 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Tenant Management</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Kontrol hak akses setiap mitra dan tenant Anda dengan mudah.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card Kecil 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                            <Database className="w-6 h-6 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Database</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Otomatis menyimpan email dan nomor telepon pelanggan.
                        </p>
                    </motion.div>

                    {/* Card Besar 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                            <div className="flex-1">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                    <LineChart className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Analytics & Reports</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Lihat jam sibuk, demografi pengguna, dan total pendapatan secara instan. Laporan dikirim ke email setiap bulan.
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 h-40 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                                <span className="text-sm text-gray-400 font-medium">Analytics Chart Mockup</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

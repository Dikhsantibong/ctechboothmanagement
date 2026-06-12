import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlayCircle, Camera, QrCode, LayoutDashboard, Network, Layout, Printer, LineChart,
    Newspaper, Ticket, Video, CheckCircle2, Ban, ChevronDown, Send, Globe, AtSign, Menu, X, Download
} from 'lucide-react';

export default function Welcome() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <>
            <Head title="Ctechbooth - SelfPhoto App" />
            <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
            {/* TopNavBar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm h-16' : 'bg-transparent h-20'}`}>
                <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1280px] mx-auto h-full">
                    <div className="text-2xl font-bold text-primary tracking-tight">CTECHBOOTH</div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#features">Fitur</a>
                        <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#concepts">Konsep</a>
                        <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#pricing">Harga</a>
                        <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#faq">FAQ</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <a href="#demo" className="bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                            Mulai Sekarang
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-foreground p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-x-0 top-[64px] bg-background border-b border-border shadow-lg z-40 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4 p-6">
                            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">Fitur</a>
                            <a href="#concepts" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">Konsep</a>
                            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">Harga</a>
                            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">FAQ</a>
                            <hr className="border-border my-2" />
                            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="bg-primary text-primary-foreground text-center py-3 rounded-xl font-medium w-full">
                                Mulai Sekarang
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-black">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-black to-black"></div>
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer} 
                    className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    <div className="text-center lg:text-left">
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            SaaS Photobooth Terlengkap di Indonesia
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-foreground">
                            Bangun Bisnis Photobooth yang Lebih <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Modern & Menguntungkan</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0">
                            Dari Photo Strip hingga Receipt Booth, Flipbook, Magazine Cover, dan konsep photobooth kekinian lainnya dalam satu platform profesional.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a href="#demo" className="w-full sm:w-auto bg-primary text-primary-foreground h-12 px-8 rounded-lg text-sm font-medium shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                <PlayCircle className="w-5 h-5" />
                                Lihat Demo
                            </a>
                            <a href="/penawaran_photoboth_ctech.pdf" download className="w-full sm:w-auto bg-background/60 backdrop-blur border border-border h-12 px-8 rounded-lg text-sm font-medium hover:bg-muted/50 transition-all flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Penawaran
                            </a>
                        </motion.div>
                    </div>
                    
                    <motion.div variants={fadeInUp} className="relative mt-12 lg:mt-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10 transform translate-x-10 translate-y-10"></div>
                        <img src="/hero.png" alt="CTECHBOOTH Hero Mockup" className="w-full max-w-lg mx-auto lg:max-w-full h-auto object-contain drop-shadow-2xl" />
                    </motion.div>
                </motion.div>
            </section>


            {/* Concepts Showcase Grid */}
            <section className="py-24 px-6 md:px-12 bg-muted/30" id="concepts">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Eksplorasi Konsep Tanpa Batas</h2>
                        <p className="text-base text-muted-foreground">Satu software untuk semua jenis aktivasi event kreatif Anda.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Main Concepts */}
                        <div className="md:col-span-1 flex flex-col gap-6">
                            <motion.div variants={fadeInUp} className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img alt="Photo Strip" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkWQQAT-rprBhnwvJNc-J2KVIh3Uq-JvvRHGhPt7xR6tNQIH20pRSt6eDdXT60YHQizAeSoFKlYbh5XMxuFiIO1gGqd1ap_nfaB5-PJGvk7usmfzSlJ6P35XlTOnMqsm95Cxg11YJ_HvqIrEepqgu3vKWw_WFfRCUgFz5Cn4BNjKGmWmQ2BnC06Av6x-4jkuHHoevYsuzhQoSlB83JoghwvmaHJhMiD5msG6Ody7jqm1CNCQFjWYuK06w6y4go6XT6tsPXjFQI0Ic" />
                                </div>
                                <div className="p-6">
                                    <span className="text-primary text-xs font-semibold uppercase tracking-wider mb-2 block">Classic</span>
                                    <h3 className="text-2xl font-bold mb-2">Photo Strip</h3>
                                    <p className="text-muted-foreground text-sm">Layout 3-pose vertikal ikonik yang tak lekang oleh waktu.</p>
                                </div>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img alt="Magazine Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8NNoTmIFoPM1pLYVg0nmw0-fobZ_XhbENudxCUmJ43pi9DiPr-aLo1vCtqvqKLvYHbadjiShOCmoQPPKEB9pOIQuEc_p7NYQVbHP1yi3V0NA985mkiAWJ8BrbeRXTIU1EH9z9UnElOLaBFJcq_IP3BdBUPtp4fTruNLz-14DpURseNTebZpSJGUHWZG0DGpcbcw9JYx17oBiqLSm6mPwCKd_hEk1xLP1zfeYBWPcBxuq-HovEFb8u7b-Cz73xK7qigK7CJpL1Qv8" />
                                </div>
                                <div className="p-6">
                                    <span className="text-indigo-500 text-xs font-semibold uppercase tracking-wider mb-2 block">Premium</span>
                                    <h3 className="text-2xl font-bold mb-2">Magazine Cover</h3>
                                    <p className="text-muted-foreground text-sm">Jadikan tamu Anda sebagai model sampul majalah fashion ternama.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Featured Large */}
                        <div className="md:col-span-1">
                            <motion.div variants={fadeInUp} className="group h-full relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="h-full flex flex-col">
                                    <div className="flex-grow overflow-hidden">
                                        <img alt="Receipt Booth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA36eXGO7IcYF-SyWdaZeswpskfo4mitXJrh7qaTRIAWMDERnnbw3nAev1kFVCS0BpfDlBZ43uAoGJ0MGu6ZpwhkkNhEy4Sv7a2mgfjXGg1lVu-XgjFk-GcERh8iSj89SBEn7sl1P8Dbf5pGC5mmjsZTdeZaFu8lL6yXWM9X3X6of0yPZ0l3w90Yb61p5_eLEVvn87MOW2-eDWHoAtgBEQAQ2sJkuzU0fbyZYJilRpjx4NxSDwrkTMLyAXBcGLb6KVKQpS3ROU-5KA" />
                                    </div>
                                    <div className="p-8 bg-background">
                                        <span className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2 block">Trending</span>
                                        <h3 className="text-3xl font-bold mb-4">Receipt Booth</h3>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Konsep viral cetak thermal hitam-putih yang sangat cepat dan estetik untuk kafe dan event pop-up.</p>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">High Speed</span>
                                            <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">QR Download</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Secondary Grid */}
                        <div className="md:col-span-1 grid grid-cols-1 gap-6">
                            <motion.div variants={fadeInUp} className="bg-background/60 backdrop-blur p-6 rounded-2xl border border-border hover:border-primary/50 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Newspaper className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold">Koran Booth</h4>
                                </div>
                                <p className="text-muted-foreground text-sm">Layout koran vintage yang unik dengan artikel kustom untuk setiap tamu.</p>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="bg-background/60 backdrop-blur p-6 rounded-2xl border border-border hover:border-primary/50 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Ticket className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold">Boarding Pass</h4>
                                </div>
                                <p className="text-muted-foreground text-sm">Sempurna untuk event bertema travel atau peluncuran destinasi baru.</p>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="bg-background/60 backdrop-blur p-6 rounded-2xl border border-border hover:border-primary/50 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Video className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold">Video Booth</h4>
                                </div>
                                <p className="text-muted-foreground text-sm">Bukan sekadar foto, rekam momen 360 atau slow motion beresolusi tinggi.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why CTECHBOOTH */}
            <section className="py-24 px-6 md:px-12" id="features">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center"
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-1">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">Dirancang untuk Efisiensi & Skalabilitas</h2>
                            <p className="text-base text-muted-foreground">Teknologi premium yang memudahkan operasional vendor photobooth dari skala kecil hingga korporasi besar.</p>
                        </motion.div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div variants={fadeInUp} className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Camera className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold mb-1">DSLR Integration</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Mendukung koneksi langsung ke berbagai tipe kamera Canon & Nikon untuk hasil foto profesional.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <QrCode className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold mb-1">QR Download</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Tamu dapat langsung mengunduh hasil foto secara instan melalui scan QR code tanpa ribet.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <LayoutDashboard className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold mb-1">Event Dashboard</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Monitor performa event secara real-time, jumlah foto tercetak, hingga trafik pengunjung.</p>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Network className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold mb-1">Multi Booth Management</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Kelola banyak lokasi photobooth sekaligus dalam satu akun dashboard terpusat.</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-6 md:px-12 bg-foreground text-background">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Proses Kerja yang Simpel</h2>
                        <p className="text-muted max-w-xl mx-auto">Hanya butuh beberapa menit dari setup hingga booth siap digunakan.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
                    >
                        <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-background/20 z-0"></div>
                        <motion.div variants={fadeInUp} className="relative z-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center border-8 border-foreground text-primary-foreground shadow-xl shadow-primary/20">
                                <Layout className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Pilih Template</h4>
                            <p className="text-muted text-sm px-4">Gunakan ratusan template siap pakai atau desain milik Anda.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative z-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center border-8 border-foreground text-primary-foreground shadow-xl shadow-primary/20">
                                <Camera className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Ambil Foto</h4>
                            <p className="text-muted text-sm px-4">Tamu beraksi di depan kamera dengan feedback real-time.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative z-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center border-8 border-foreground text-primary-foreground shadow-xl shadow-primary/20">
                                <Printer className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Print & Share</h4>
                            <p className="text-muted text-sm px-4">Cetak fisik otomatis dan kirim versi digital via QR/Email.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative z-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center border-8 border-foreground text-primary-foreground shadow-xl shadow-primary/20">
                                <LineChart className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">Analytics</h4>
                            <p className="text-muted text-sm px-4">Analisis data tamu dan performa booth setelah event usai.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Mengapa Beralih ke CTECHBOOTH?</h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="overflow-x-auto rounded-2xl border border-border bg-background shadow-sm"
                    >
                        <table className="w-full border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-5 px-6 text-left text-lg font-bold">Fitur & Layanan</th>
                                    <th className="py-5 px-6 text-center text-lg font-bold text-muted-foreground bg-muted/30">Software Tradisional</th>
                                    <th className="py-5 px-6 text-center text-lg font-bold text-primary bg-primary/5">CTECHBOOTH</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="py-5 px-6 text-sm font-medium">Variasi Konsep Foto</td>
                                    <td className="py-5 px-6 text-center text-muted-foreground text-sm">Sangat Terbatas</td>
                                    <td className="py-5 px-6 text-center text-primary font-bold text-sm bg-primary/5">8+ Konsep Kreatif</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="py-5 px-6 text-sm font-medium">Manajemen Data Tamu</td>
                                    <td className="py-5 px-6 text-center text-muted-foreground text-sm">Manual / Tidak Ada</td>
                                    <td className="py-5 px-6 text-center text-primary font-bold text-sm bg-primary/5">Otomatis & Real-time</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="py-5 px-6 text-sm font-medium">Dashboard Monitoring</td>
                                    <td className="py-5 px-6 text-center text-muted-foreground text-sm">Harus di Lokasi</td>
                                    <td className="py-5 px-6 text-center text-primary font-bold text-sm bg-primary/5">Cloud-based Anywhere</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="py-5 px-6 text-sm font-medium">Kecepatan Share Digital</td>
                                    <td className="py-5 px-6 text-center text-muted-foreground text-sm">Lambat / Kabel</td>
                                    <td className="py-5 px-6 text-center text-primary font-bold text-sm bg-primary/5">Instan via QR Code</td>
                                </tr>
                                <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="py-5 px-6 text-sm font-medium">Dukungan Teknis</td>
                                    <td className="py-5 px-6 text-center text-muted-foreground text-sm">Email (Slow)</td>
                                    <td className="py-5 px-6 text-center text-primary font-bold text-sm bg-primary/5">Priority WhatsApp Support</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 px-6 md:px-12 bg-muted/30" id="pricing">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Pilih Paket yang Sesuai dengan Bisnis Anda</h2>
                        <p className="text-muted-foreground">Mulai dari satu event hingga ratusan event setiap bulan. Semua paket sudah dilengkapi template photobooth modern dan siap digunakan.</p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    >
                        {/* Starter */}
                        <motion.div variants={fadeInUp} className="p-8 bg-background border border-border rounded-2xl flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-bold mb-2">Starter</h3>
                            <p className="text-muted-foreground text-sm mb-6">Cocok untuk pemula yang baru memulai bisnis photobooth.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold tracking-tight">Rp199.000</span>
                                <span className="text-muted-foreground font-medium">/bulan</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow text-sm">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Template Strip</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Template Reguler</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Template Koran</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Template Polaroid</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>QR Download</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>WhatsApp Sharing</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>1 Device</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/5 transition-colors">Mulai Sekarang</button>
                        </motion.div>

                        {/* Growth */}
                        <motion.div variants={fadeInUp} className="p-8 bg-background border-2 border-primary rounded-2xl flex flex-col relative shadow-2xl shadow-primary/10 transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold tracking-wider">⭐ PALING POPULER</div>
                            <h3 className="text-xl font-bold mb-2">Growth</h3>
                            <p className="text-muted-foreground text-sm mb-6">Pilihan terbaik untuk vendor photobooth yang aktif menerima event.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold tracking-tight">Rp399.000</span>
                                <span className="text-muted-foreground font-medium">/bulan</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow text-sm">
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Semua fitur Starter</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Magazine Cover</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Passport Style</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Wedding & Birthday Templates</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>GIF Booth</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Boomerang</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Cloud Gallery</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Custom Branding</span>
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>3 Device</span>
                                </li>
                            </ul>
                            <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">Mulai Berlangganan</button>
                        </motion.div>

                        {/* Pro */}
                        <motion.div variants={fadeInUp} className="p-8 bg-background border border-border rounded-2xl flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-bold mb-2">Pro</h3>
                            <p className="text-muted-foreground text-sm mb-6">Untuk agency dan vendor profesional dengan kebutuhan event yang lebih besar.</p>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold tracking-tight">Rp699.000</span>
                                <span className="text-muted-foreground font-medium">/bulan</span>
                            </div>
                            <ul className="space-y-4 mb-10 flex-grow text-sm">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Semua fitur Growth</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Video Booth</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>AI Background Removal</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Green Screen</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>White Label</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Unlimited Device</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span>Priority Support</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-colors">Hubungi Sales</button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-24 px-6 md:px-12 bg-muted/30">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Mitra Kami</h2>
                        <p className="text-base text-muted-foreground">Dipercaya oleh berbagai vendor photobooth dan event organizer di seluruh Indonesia</p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center"
                    >
                        {[
                            { name: "Partner 1", image: "/partner/partner1.png" },
                            { name: "Partner 2", image: "/partner/partner2.png" },
                        ].map((partner, i) => (
                            <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center">
                                <img 
                                    src={partner.image} 
                                    alt={partner.name}
                                    className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-2xl"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 md:px-12" id="faq">
                <div className="max-w-3xl mx-auto">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight"
                    >
                        Pertanyaan Populer
                    </motion.h2>
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                        className="space-y-4"
                    >
                        {[
                            {
                                q: "Apakah software ini butuh koneksi internet?",
                                a: "Untuk pengambilan foto dan cetak lokal, software dapat bekerja secara offline. Namun, fitur QR Download dan sinkronisasi Dashboard Analytics membutuhkan koneksi internet (bisa melalui tethering hotspot)."
                            },
                            {
                                q: "Hardware apa saja yang saya butuhkan?",
                                a: "Minimal Anda membutuhkan Laptop (Windows 10/11), Kamera DSLR/Mirrorless (Canon/Nikon/Sony), dan Printer Photobooth (DNP/Hiti/Thermal). Kami juga menyediakan panduan pemilihan hardware yang optimal."
                            },
                            {
                                q: "Apakah ada trial version?",
                                a: "Ya, kami menyediakan trial selama 7 hari dengan watermark pada hasil foto agar Anda dapat mencoba semua fitur dan kecocokan hardware sebelum memutuskan berlangganan."
                            }
                        ].map((faq, index) => (
                            <motion.details key={index} variants={fadeInUp} className="group border border-border rounded-2xl bg-background overflow-hidden" open={index === 0}>
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-semibold text-lg hover:text-primary transition-colors">
                                    <span>{faq.q}</span>
                                    <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform text-muted-foreground" />
                                </summary>
                                <div className="p-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/50">
                                    {faq.a}
                                </div>
                            </motion.details>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 md:px-12 bg-primary relative overflow-hidden" id="demo">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
                <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="md:w-1/2 text-primary-foreground"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Siap Mengupgrade Bisnis Photobooth Anda?</h2>
                        <p className="text-primary-foreground/80 mb-10 text-lg leading-relaxed">Bergabunglah dengan ratusan vendor yang telah meningkatkan pendapatan mereka bersama CTECHBOOTH.</p>
                        <div className="flex flex-wrap gap-4">
                            <a className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-transform" href="#">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                                Hubungi via WhatsApp
                            </a>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="md:w-1/2 w-full"
                    >
                        <form className="bg-background/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-border/50 text-foreground">
                            <h3 className="text-2xl font-bold mb-6">Mulai Demo Gratis</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Nama Lengkap</label>
                                    <input className="w-full bg-background border border-border rounded-xl p-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none" placeholder="Budi Santoso" type="text" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email Bisnis</label>
                                    <input className="w-full bg-background border border-border rounded-xl p-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none" placeholder="budi@vendorfoto.com" type="email" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Nama Brand Photobooth</label>
                                    <input className="w-full bg-background border border-border rounded-xl p-3.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none" placeholder="Luxury Photo ID" type="text" />
                                </div>
                                <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all mt-6" type="submit">Kirim Request Demo</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 py-20 max-w-[1280px] mx-auto">
                    <div className="space-y-6 md:col-span-1">
                        <div className="text-2xl font-bold text-primary tracking-tight">CTECHBOOTH</div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Empowering event creators with modern photobooth technology for a better visitor experience.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Product</h4>
                        <ul className="space-y-4">
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#features">Features</a></li>
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#pricing">Pricing</a></li>
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#demo">Demo</a></li>
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#">Tutorials</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-4">
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#">Contact Us</a></li>
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#">Privacy Policy</a></li>
                            <li><a className="text-muted-foreground hover:text-primary transition-colors text-sm" href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Dapatkan tips bisnis photobooth langsung di inbox Anda.</p>
                        <div className="flex gap-2">
                            <input className="bg-muted border border-border rounded-xl p-3 text-sm flex-grow outline-none focus:border-primary transition-colors" placeholder="Email Anda" type="email" />
                            <button className="bg-primary text-primary-foreground px-4 rounded-xl hover:opacity-90 transition-opacity"><Send className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">© 2026 CTECHBOOTH. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-muted-foreground hover:text-primary transition-colors" href="#"><Globe className="w-5 h-5" /></a>
                        <a className="text-muted-foreground hover:text-primary transition-colors" href="#"><AtSign className="w-5 h-5" /></a>
                    </div>
                </div>
            </footer>
        </div>
        </>
    );
}

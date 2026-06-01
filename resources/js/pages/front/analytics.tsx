import LandingLayout, { LangContext } from '@/layouts/LandingLayout';
import { BarChart3, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { useContext } from 'react';

const analyticsTranslations = {
    id: {
        hero: {
            title: "Analitik Berbasis AI",
            desc: "Data real-time untuk keputusan bisnis yang lebih cerdas. Prediksi tren, identifikasi peluang, dan maksimalkan pendapatan."
        },
        metrics: {
            revenue: "Pendapatan Bulanan",
            growth: "Pertumbuhan",
            sessions: "Sesi Foto / Hari",
            peakHour: "Jam Sibuk",
            avgRevenue: "Rata-rata Pendapatan / Mesin"
        },
        insights: {
            title: "Wawasan Mendalam",
            desc: "Dapatkan analisis mendalam tentang bisnis Anda melalui dashboard interaktif.",
            item1: { title: "Prediksi Jam Sibuk", desc: "AI kami menganalisis pola penggunaan historis untuk memprediksi kapan mesin Anda akan paling sibuk." },
            item2: { title: "Demografi Pelanggan", desc: "Kenali siapa pelanggan Anda berdasarkan lokasi, preferensi, dan kebiasaan penggunaan." },
            item3: { title: "Optimasi Harga", desc: "Rekomendasi harga yang optimal berdasarkan data lokasi, waktu, dan kompetitor." },
            item4: { title: "ROI per Mesin", desc: "Lacak pengembalian investasi untuk setiap mesin photobooth secara individual." }
        }
    },
    en: {
        hero: {
            title: "AI-Powered Analytics",
            desc: "Real-time data for smarter business decisions. Predict trends, identify opportunities, and maximize revenue."
        },
        metrics: {
            revenue: "Monthly Revenue",
            growth: "Growth",
            sessions: "Photo Sessions / Day",
            peakHour: "Peak Hour",
            avgRevenue: "Avg Revenue / Machine"
        },
        insights: {
            title: "Deep Insights",
            desc: "Get in-depth analysis of your business through an interactive dashboard.",
            item1: { title: "Peak Hour Prediction", desc: "Our AI analyzes historical usage patterns to predict when your machines will be busiest." },
            item2: { title: "Customer Demographics", desc: "Know your customers by location, preferences, and usage habits." },
            item3: { title: "Price Optimization", desc: "Optimal pricing recommendations based on location, time, and competitor data." },
            item4: { title: "ROI per Machine", desc: "Track return on investment for each photobooth machine individually." }
        }
    }
};

export default function Analytics() {
    return (
        <LandingLayout title="Ctechbooth - Analytics">
            <AnalyticsContent />
        </LandingLayout>
    );
}

function AnalyticsContent() {
    const { lang } = useContext(LangContext);
    const t = analyticsTranslations[lang];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 mb-6">
                        <BarChart3 className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="gold-gradient-text">{t.hero.title}</span></h1>
                    <p className="text-[#B8C0CC] text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
                </div>

                {/* Live Metrics Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="text-[#B8C0CC] text-xs uppercase tracking-wider mb-2">{t.metrics.revenue}</div>
                        <div className="text-2xl md:text-3xl font-bold text-white">Rp 42,5<span className="text-lg text-[#B8C0CC]">jt</span></div>
                        <div className="text-[#4ADE80] text-sm mt-1 flex items-center justify-center gap-1"><TrendingUp className="w-3 h-3" /> +14.5%</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="text-[#B8C0CC] text-xs uppercase tracking-wider mb-2">{t.metrics.sessions}</div>
                        <div className="text-2xl md:text-3xl font-bold text-white">347</div>
                        <div className="text-[#4ADE80] text-sm mt-1 flex items-center justify-center gap-1"><TrendingUp className="w-3 h-3" /> +8.2%</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="text-[#B8C0CC] text-xs uppercase tracking-wider mb-2">{t.metrics.peakHour}</div>
                        <div className="text-2xl md:text-3xl font-bold text-white">14:00</div>
                        <div className="text-[#B8C0CC] text-sm mt-1">— 16:00</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="text-[#B8C0CC] text-xs uppercase tracking-wider mb-2">{t.metrics.avgRevenue}</div>
                        <div className="text-2xl md:text-3xl font-bold text-white">Rp 3,5<span className="text-lg text-[#B8C0CC]">jt</span></div>
                        <div className="text-[#4ADE80] text-sm mt-1 flex items-center justify-center gap-1"><TrendingUp className="w-3 h-3" /> +5.1%</div>
                    </div>
                </div>

                {/* Interactive Chart Preview */}
                <div className="glass-card rounded-[32px] p-8 md:p-12 mb-20 gold-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[100px]"></div>
                    <h3 className="text-xl font-bold mb-8 relative z-10">{t.metrics.revenue} — 2025</h3>
                    <div className="relative z-10 w-full h-48 md:h-64 flex items-end gap-3 md:gap-4">
                        {[
                            { label: 'Jan', h: 35 },
                            { label: 'Feb', h: 42 },
                            { label: 'Mar', h: 38 },
                            { label: 'Apr', h: 55 },
                            { label: 'Mei', h: 60 },
                            { label: 'Jun', h: 52 },
                            { label: 'Jul', h: 70 },
                            { label: 'Agu', h: 85 },
                            { label: 'Sep', h: 78 },
                            { label: 'Okt', h: 90 },
                            { label: 'Nov', h: 95 },
                            { label: 'Des', h: 100 },
                        ].map((m, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div 
                                    className="w-full rounded-t-md bg-gradient-to-t from-[#D4AF37]/30 to-[#F7D774] group-hover:from-[#D4AF37]/60 group-hover:to-[#F7D774] transition-all duration-300 relative"
                                    style={{ height: `${m.h}%` }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#F7D774] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {m.h}%
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#B8C0CC] hidden md:block">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deep Insights Grid */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.insights.title}</h2>
                    <p className="text-[#B8C0CC] max-w-xl mx-auto">{t.insights.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: Clock, ...t.insights.item1 },
                        { icon: Users, ...t.insights.item2 },
                        { icon: Target, ...t.insights.item3 },
                        { icon: BarChart3, ...t.insights.item4 },
                    ].map((item, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-[24px] hover:bg-white/5 transition-colors group flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6 text-[#D4AF37]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-[#B8C0CC] text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

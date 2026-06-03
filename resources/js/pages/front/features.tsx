import LandingLayout, { LangContext } from '@/layouts/LandingLayout';
import { Cloud, MonitorSmartphone, ShieldCheck, Zap, BarChart3, CreditCard, Smartphone, LayoutDashboard, Users, Globe, Printer, CheckCircle2 } from 'lucide-react';
import { useContext } from 'react';

const featureTranslations = {
    id: {
        hero: {
            title: "Engineering Elegance",
            desc: "Everything you need to scale your photobooth empire, crafted with obsessive attention to detail."
        },
        items: {
            payment: { title: "Payment Automation", desc: "Accept QRIS, Virtual Accounts, and E-Wallets directly. Invoices are generated and tracked autonomously." },
            remote: { title: "Remote Diagnostics", desc: "Monitor camera status, printer paper rolls, and system health from your phone in real-time." },
            cloud: { title: "Cloud Sync & Storage", desc: "Instantly upload captured photos to secure cloud storage. Customers receive their galleries via automated emails." },
            security: { title: "Enterprise Security", desc: "Bank-grade encryption for all transactions and user data. Role-based   your team." },
            ai: { title: "AI-Powered Analytics", desc: "Predict peak hours, analyze customer demographics, and optimize your pricing strategy with our proprietary machine learning models." },
            branding: { title: "White-Label Branding", desc: "Fully customize the interface with your own logo, colors, and domain. Complete brand ownership." },
            multi_camera: { title: "Multi-Camera Support", desc: "Connect multiple DSLR cameras with live preview. Automatic camera switching for different photo modes." },
            marketing: { title: "Marketing Engine", desc: "Built-in voucher system, promotional campaigns, and customer retention tools to grow your business." }
        }
    },
    en: {
        hero: {
            title: "Engineering Elegance",
            desc: "Everything you need to scale your photobooth empire, crafted with obsessive attention to detail."
        },
        items: {
            payment: { title: "Payment Automation", desc: "Accept QRIS, Virtual Accounts, and E-Wallets directly. Invoices are generated and tracked autonomously." },
            remote: { title: "Remote Diagnostics", desc: "Monitor camera status, printer paper rolls, and system health from your phone in real-time." },
            cloud: { title: "Cloud Sync & Storage", desc: "Instantly upload captured photos to secure cloud storage. Customers receive their galleries via automated emails." },
            security: { title: "Enterprise Security", desc: "Bank-grade encryption for all transactions and user data. Role-based access control for your team." },
            ai: { title: "AI-Powered Analytics", desc: "Predict peak hours, analyze customer demographics, and optimize your pricing strategy with our proprietary machine learning models." },
            branding: { title: "White-Label Branding", desc: "Fully customize the interface with your own logo, colors, and domain. Complete brand ownership." },
            multi_camera: { title: "Multi-Camera Support", desc: "Connect multiple DSLR cameras with live preview. Automatic camera switching for different photo modes." },
            marketing: { title: "Marketing Engine", desc: "Built-in voucher system, promotional campaigns, and customer retention tools to grow your business." }
        }
    }
};

const featureItems: { icon: any; key: keyof typeof featureTranslations['en']['items'] }[] = [
    { icon: CreditCard, key: 'payment' },
    { icon: MonitorSmartphone, key: 'remote' },
    { icon: Cloud, key: 'cloud' },
    { icon: ShieldCheck, key: 'security' },
    { icon: BarChart3, key: 'ai' },
    { icon: LayoutDashboard, key: 'branding' },
    { icon: Smartphone, key: 'multi_camera' },
    { icon: Users, key: 'marketing' }
];

export default function Features() {
    return (
        <LandingLayout title="Ctechbooth - Features">
            <FeaturesContent />
        </LandingLayout>
    );
}

function FeaturesContent() {
    const { lang } = useContext(LangContext);
    const t = featureTranslations[lang];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#1E40AF]/20 mb-6">
                        <Zap className="w-8 h-8 text-[#3B82F6]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="blue-gradient-text">{t.hero.title}</span></h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
                </div>

                {/* Bento Grid Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featureItems.map((item, index) => {
                        const feature = t.items[item.key];
                        const Icon = item.icon;
                        const isLarge = index === 3 || index === 7;
                        
                        return (
                            <div 
                                key={index} 
                                className={`glass-card rounded-[24px] p-8 blue-border hover:border-[#3B82F6]/30 transition-all group ${isLarge ? 'lg:col-span-2' : ''}`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#1E40AF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="text-[#3B82F6] w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Feature Highlight Section */}
                <div className="mt-24">
                    <div className="glass-card rounded-[32px] p-8 md:p-12 blue-border relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-[100px]"></div>
                        
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    <span className="blue-gradient-text">AI-Powered Intelligence</span>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Our proprietary machine learning models analyze thousands of data points to optimize your photobooth operations automatically.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Predictive maintenance alerts",
                                        "Dynamic pricing recommendations",
                                        "Customer behavior analysis",
                                        "Peak hour forecasting"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-600">
                                            <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                                                <CheckCircle2 className="text-[#3B82F6] w-4 h-4" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="relative">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="text-xs text-gray-500 mb-4">AI Predictions</div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-[#1A1A1A]">Next Peak Hour</span>
                                            <span className="text-sm font-semibold text-[#3B82F6]">14:00 - 16:00</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-[#1A1A1A]">Revenue Forecast</span>
                                            <span className="text-sm font-semibold text-green-600">+23%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-[#1A1A1A]">Optimal Price</span>
                                            <span className="text-sm font-semibold text-[#3B82F6]">Rp 45,000</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
                                            <div className="h-full w-[78%] bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] rounded-full"></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">Confidence: 78%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

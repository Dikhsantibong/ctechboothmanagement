import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function LandingNavbar() {
    return (
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img src="/web-logo.jpeg" alt="CTECHBOOTH" className="w-12 h-12 object-contain rounded-lg" />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="/fitur" className="hover:text-gray-900 transition-colors">Fitur</Link>
                    <Link href="/solusi" className="hover:text-gray-900 transition-colors">Solusi</Link>
                    <Link href="/harga" className="hover:text-gray-900 transition-colors">Harga</Link>
                    <Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                    <a 
                        href="https://wa.me/628111111111?text=Halo%2C%20saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20ctechbooth." 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}

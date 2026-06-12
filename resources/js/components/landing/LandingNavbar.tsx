import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X } from 'lucide-react';

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-200"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/web-logo.jpeg" alt="CTECHBOOTH" className="w-12 h-12 object-contain rounded-lg" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <Link href="/fitur" className="hover:text-gray-900 transition-colors">Fitur</Link>
                        <Link href="/solusi" className="hover:text-gray-900 transition-colors">Solusi</Link>
                        <Link href="/harga" className="hover:text-gray-900 transition-colors">Harga</Link>
                        <Link href="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                        <a 
                            href="https://wa.me/6282293118410?text=Halo%2C%20saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20ctechbooth." 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Hubungi Kami
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden flex flex-col"
                    >
                        <div className="flex flex-col gap-6 mt-8 text-lg font-medium text-gray-900">
                            <Link href="/fitur" onClick={toggleMenu} className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4">Fitur</Link>
                            <Link href="/solusi" onClick={toggleMenu} className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4">Solusi</Link>
                            <Link href="/harga" onClick={toggleMenu} className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4">Harga</Link>
                            <Link href="/faq" onClick={toggleMenu} className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4">FAQ</Link>
                            
                            <a 
                                href="https://wa.me/6282293118410?text=Halo%2C%20saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20ctechbooth." 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-sm mt-4"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Hubungi Kami
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

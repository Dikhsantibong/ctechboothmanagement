import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function LandingNavbar() {
    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed w-full z-50 top-0 left-0 border-b-[3px] border-[#111111] bg-[#F7F5F0]"
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-3xl font-black tracking-tighter text-[#111111]">
                    PAYLO<span className="text-[#FF6B00]">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-bold">
                    <a href="#fitur" className="hover:text-[#FF6B00] transition-colors">FITUR</a>
                    <a href="#cara-kerja" className="hover:text-[#FF6B00] transition-colors">CARA KERJA</a>
                    <a href="#harga" className="hover:text-[#FF6B00] transition-colors">HARGA</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden md:block font-bold hover:text-[#FF6B00]">
                        LOGIN
                    </Link>
                    <Link href="/register" className="brutal-btn bg-[#FF6B00] text-[#111111] px-6 py-2 text-sm">
                        COBA GRATIS
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}

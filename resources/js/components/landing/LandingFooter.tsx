import { Link } from '@inertiajs/react';

export default function LandingFooter() {
    return (
        <footer className="bg-[#F7F5F0] py-16 px-6">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 border-b-[3px] border-[#111111] pb-12 mb-8">
                <div className="md:col-span-2">
                    <div className="text-4xl font-black tracking-tighter text-[#111111] mb-4">
                        PAYLO<span className="text-[#FF6B00]">.</span>
                    </div>
                    <p className="text-lg font-bold text-[#525252] max-w-xs uppercase">
                        Software Management Photobooth Indonesia
                    </p>
                </div>
                
                <div>
                    <h4 className="text-lg font-black text-[#111111] mb-6 uppercase">Menu</h4>
                    <ul className="space-y-4 font-bold text-[#525252]">
                        <li><a href="#fitur" className="hover:text-[#FF6B00]">Fitur</a></li>
                        <li><a href="#harga" className="hover:text-[#FF6B00]">Harga</a></li>
                        <li><a href="#tentang" className="hover:text-[#FF6B00]">Tentang</a></li>
                        <li><a href="#kontak" className="hover:text-[#FF6B00]">Kontak</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-black text-[#111111] mb-6 uppercase">Legal</h4>
                    <ul className="space-y-4 font-bold text-[#525252]">
                        <li><a href="#" className="hover:text-[#FF6B00]">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:text-[#FF6B00]">Kebijakan Privasi</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between font-bold text-[#525252] text-sm">
                <p>&copy; {new Date().getFullYear()} PAYLO. All rights reserved.</p>
                <div className="mt-4 md:mt-0 flex gap-4">
                    <a href="#" className="hover:text-[#111111]">INSTAGRAM</a>
                    <a href="#" className="hover:text-[#111111]">LINKEDIN</a>
                </div>
            </div>
        </footer>
    );
}

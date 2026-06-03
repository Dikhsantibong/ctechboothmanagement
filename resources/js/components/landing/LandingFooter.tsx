export default function LandingFooter() {
    return (
        <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Produk</h4>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Fitur</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Harga</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Keamanan</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Perusahaan</h4>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Karir</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Kontak</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Resource</h4>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Dokumentasi</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Pusat Bantuan</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Panduan Komunitas</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">API Reference</a></li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">ctechbooth</span>
                        </div>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                            Software manajemen photobooth terpercaya di Indonesia. Membantu mengotomatisasi ribuan transaksi setiap harinya.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                                IG
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                                LI
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-400">
                    <p>&copy; {new Date().getFullYear()} ctechbooth. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-900 transition-colors">Syarat Ketentuan</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Kebijakan Privasi</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

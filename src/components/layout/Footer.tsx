export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              Teman Laba
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Asisten keuangan pintar berbasis AI untuk UMKM Indonesia
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Fitur
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Analisis Profit Harian</li>
              <li>Rekomendasi Harga</li>
              <li>Simulasi Skenario</li>
              <li>Manajemen Produk</li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              Tentang
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dibuat untuk IMPHNEN x KOLOSAL AI Hackathon 2025
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Powered by Google Gemini AI
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <p className="text-center text-xs text-gray-500">
            © 2024 Teman Laba. Dibuat dengan ❤️ untuk UMKM Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

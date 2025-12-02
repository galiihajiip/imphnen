import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            AI Financial Co-Pilot
          </h1>
          <p className="text-xl text-gray-400">
            Asisten Keuangan Pintar untuk UMKM Indonesia
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 space-y-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Analisis Profit</h2>
            <p className="text-gray-400">
              AI menjelaskan untung-rugi usaha Anda dengan bahasa sederhana dan memberikan saran praktis
            </p>
            <Link href="/dashboard?tab=profit">
              <Button className="w-full">Mulai Analisis</Button>
            </Link>
          </Card>

          <Card className="p-8 space-y-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Rekomendasi Harga</h2>
            <p className="text-gray-400">
              Dapatkan saran harga jual yang tepat berdasarkan biaya produksi dan target keuntungan Anda
            </p>
            <Link href="/dashboard?tab=pricing">
              <Button className="w-full" variant="secondary">Tentukan Harga</Button>
            </Link>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-surface/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Dibuat dengan AI Gemini Pro</h3>
              <p className="text-sm text-gray-400">
                Aplikasi ini menggunakan teknologi AI terkini untuk memberikan analisis dan rekomendasi yang akurat dan mudah dipahami oleh pelaku UMKM.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

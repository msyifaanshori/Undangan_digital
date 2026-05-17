// src/app/page.js
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-amber-200">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-6 max-w-5xl mx-auto border-b border-amber-100">
        <div className="text-xl font-serif font-bold text-amber-900 tracking-wider">MomenDigital</div>
        <div className="space-x-6 text-sm font-medium">
          <Link href="/katalog" className="hover:text-amber-600 transition-colors">Katalog</Link>
          <Link href="/order" className="hover:text-amber-600 transition-colors">Pesan Sekarang</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
          Platform Undangan #1
        </div>
        
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight max-w-3xl">
          Bagikan Kabar Bahagia dengan <span className="text-amber-700 italic">Lebih Elegan</span>
        </h1>
        
        <p className="mt-6 text-gray-500 max-w-xl text-lg leading-relaxed">
          Buat undangan digital pernikahanmu dalam hitungan menit. Visual estetik sekelas jepretan kamera profesional, fitur lengkap, dan otomatis memukau tamu undanganmu.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/katalog" className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Lihat Katalog Tema
          </Link>
          <Link href="/order" className="bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 px-8 py-3.5 rounded-full font-medium shadow-sm transition-all">
            Buat Undangan
          </Link>
        </div>

        {/* MOCKUP PREVIEW */}
        <div className="mt-20 w-full max-w-4xl h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-10">
            <p className="text-white font-serif text-2xl drop-shadow-md">Desain Premium & Interaktif</p>
          </div>
        </div>
      </main>

    </div>
  );
}
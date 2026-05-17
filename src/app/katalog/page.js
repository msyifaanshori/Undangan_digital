// src/app/katalog/page.js
import Link from "next/link";

export default function KatalogPage() {
  // Simulasi data template
  const templates = [
    { id: "modern", nama: "Modern Minimalist", cover: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500" },
    { id: "rustic", nama: "Rustic Floral", cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500" },
    { id: "elegant", nama: "Elegant Gold", cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <Link href="/" className="text-sm text-amber-600 font-bold mb-4 inline-block hover:underline">← Kembali ke Beranda</Link>
          <h1 className="text-4xl font-serif font-bold text-amber-900">Katalog Tema Undangan</h1>
          <p className="mt-3 text-gray-500">Pilih desain yang paling mencerminkan kisah ceritamu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-100 group transition-all hover:-translate-y-2">
              <div className="h-72 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${tpl.cover}')` }}></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-slate-800">{tpl.nama}</h3>
                <div className="mt-6 flex flex-col gap-2">
                  <a href={`/riza-nisa`} target="_blank" className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-semibold py-2.5 rounded-xl transition-all">
                    👀 Lihat Demo
                  </a>
                  <Link href={`/order?theme=${tpl.id}`} className="bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md transition-all">
                    ✍️ Pesan Tema Ini
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
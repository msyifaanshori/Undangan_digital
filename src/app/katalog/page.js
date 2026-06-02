// src/app/katalog/page.js
import Link from "next/link";

const TEMPLATES = [
  {
    id: "elegance-gold",
    nama: "Elegance Gold",
    tema: "Elegance Gold",
    cover:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500",
    demoSlug: "demo-elegance",
  },
  {
    id: "rustic-sage",
    nama: "Rustic Sage",
    tema: "Rustic Sage",
    cover:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500",
    demoSlug: "demo-rustic",
  },
  {
    id: "ocean-navy",
    nama: "Ocean Navy",
    tema: "Ocean Navy",
    cover:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500",
    demoSlug: "demo-navy",
  },
  {
    id: "terracotta-warm",
    nama: "Terracotta Warm",
    tema: "Terracotta Warm",
    cover:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500",
    demoSlug: "demo-terracotta",
  },
  {
    id: "pastel-dream",
    nama: "Pastel Dream",
    tema: "Pastel Dream",
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
    demoSlug: "demo-pastel",
  },
  {
    id: "midnight-glam",
    nama: "Midnight Glam",
    tema: "Midnight Glam",
    cover:
      "https://images.unsplash.com/photo-1519657337289-077653f724ed?w=500",
    demoSlug: "demo-midnight",
  },
];

export default function KatalogPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <Link
            href="/"
            className="text-sm text-amber-600 font-bold mb-4 inline-block hover:underline"
          >
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-serif font-bold text-amber-900">
            Katalog Tema Undangan
          </h1>
          <p className="mt-3 text-gray-500">
            Pilih desain yang paling mencerminkan kisah ceritamu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-100 group transition-all hover:-translate-y-2"
            >
              <div className="h-72 bg-gray-200 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${tpl.cover}')` }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-slate-800">
                  {tpl.nama}
                </h3>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={`/${tpl.demoSlug}?to=Tamu+Undangan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-semibold py-2.5 rounded-xl transition-all"
                  >
                    👀 Lihat Demo
                  </a>
                  <Link
                    href={`/order?theme=${tpl.id}`}
                    className="bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md transition-all"
                  >
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

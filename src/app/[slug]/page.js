// src/app/[slug]/page.js
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RsvpForm from "./RsvpForm"; // Pastikan file RsvpForm.js sudah ada

export default async function UndanganKlien({ params, searchParams }) {
  const slug = params.slug;
  const namaTamu = searchParams.to || "Tamu Spesial";

  const { data: klien, error } = await supabase
    .from("undangan")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !klien) {
    notFound();
  }

  // KAMUS WARNA UNTUK 10 TEMPLATE
  const temaDesain = {
    "Elegance Gold": { bg: "bg-[#FDFBF7]", text: "text-slate-900", aksen: "text-amber-700", border: "border-amber-200", boxBg: "bg-white" },
    "Rustic Sage": { bg: "bg-[#F1F4F0]", text: "text-emerald-950", aksen: "text-emerald-700", border: "border-emerald-200", boxBg: "bg-white" },
    "Ocean Navy": { bg: "bg-slate-50", text: "text-slate-900", aksen: "text-blue-900", border: "border-blue-200", boxBg: "bg-white" },
    "Terracotta Warm": { bg: "bg-[#FAF5F0]", text: "text-stone-900", aksen: "text-orange-800", border: "border-orange-200", boxBg: "bg-white" },
    "Monochrome": { bg: "bg-white", text: "text-black", aksen: "text-gray-500", border: "border-gray-300", boxBg: "bg-gray-50" },
    "Pastel Dream": { bg: "bg-rose-50", text: "text-rose-950", aksen: "text-rose-500", border: "border-rose-200", boxBg: "bg-white" },
    "Royal Burgundy": { bg: "bg-[#FCF9F9]", text: "text-slate-900", aksen: "text-rose-900", border: "border-rose-200", boxBg: "bg-white" },
    "Midnight Glam": { bg: "bg-slate-950", text: "text-slate-100", aksen: "text-amber-500", border: "border-amber-500", boxBg: "bg-slate-900" },
    "Vintage Sepia": { bg: "bg-[#F4EFE6]", text: "text-yellow-950", aksen: "text-yellow-800", border: "border-yellow-300", boxBg: "bg-[#FCFBF8]" },
    "Lavender Joy": { bg: "bg-fuchsia-50", text: "text-fuchsia-950", aksen: "text-purple-700", border: "border-purple-200", boxBg: "bg-white" }
  };

  // Ambil warna sesuai tema yang dipilih klien (default Elegance Gold)
  const warna = temaDesain[klien.tema] || temaDesain["Elegance Gold"];

  return (
    <div className={`min-h-screen ${warna.bg} ${warna.text} flex flex-col items-center justify-center p-6 text-center font-sans transition-all duration-500`}>
      
      {/* Bagian Penerima Tamu */}
      <div className="mb-12 mt-8">
        <p className={`text-sm tracking-widest uppercase font-bold mb-2 ${warna.aksen}`}>Kepada Yth.</p>
        <h2 className={`text-3xl font-serif font-bold border-b-2 pb-2 inline-block px-4 ${warna.border}`}>
          {namaTamu}
        </h2>
      </div>

      {/* Kotak Utama Undangan */}
      <div className={`${warna.boxBg} p-10 rounded-3xl shadow-xl max-w-lg w-full border ${warna.border}`}>
        <p className="text-xs uppercase tracking-widest mb-4 opacity-70">The Wedding Of</p>
        
        <h1 className={`text-5xl font-serif mb-6 ${warna.aksen}`}>
          {klien.nama_klien}
        </h1>

        <div className="text-sm space-y-4 mb-8">
          <p>
            <span className="font-bold text-lg">{klien.nama_pria}</span> <br/>
            <span className="text-xs opacity-75">Putra dari {klien.ortu_pria || "Bapak & Ibu"}</span>
          </p>
          <p className={`font-serif italic text-2xl ${warna.aksen}`}>&</p>
          <p>
            <span className="font-bold text-lg">{klien.nama_wanita}</span> <br/>
            <span className="text-xs opacity-75">Putri dari {klien.ortu_wanita || "Bapak & Ibu"}</span>
          </p>
        </div>

        {/* Bagian Jadwal Acara */}
        <div className={`p-4 rounded-xl text-sm border border-opacity-50 ${warna.border}`}>
          <p className={`font-bold mb-2 ${warna.aksen}`}>📅 {klien.tanggal_acara}</p>
          <p className="mb-1">🕌 Akad: <span className="font-semibold">{klien.tempat_akad || "Menyusul"}</span></p>
          <p>🏢 Resepsi: <span className="font-semibold">{klien.tempat_resepsi || "Menyusul"}</span></p>
        </div>
      </div>

      {/* Form RSVP */}
      <RsvpForm slug={slug} />
      
      <p className="mt-12 text-xs opacity-50">Dibuat menggunakan Syifa Digital Invitation</p>
    </div>
  );
}
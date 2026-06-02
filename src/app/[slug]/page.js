// src/app/[slug]/page.js
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RsvpForm from "./RsvpForm"; // <-- 1. Tambahkan import ini

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

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col items-center justify-center p-6 text-center font-sans">
      
      {/* Bagian Penerima Tamu */}
      <div className="mb-12">
        <p className="text-sm tracking-widest text-amber-700 uppercase font-bold mb-2">Kepada Yth.</p>
        <h2 className="text-3xl font-serif font-bold text-slate-900 border-b-2 border-amber-200 pb-2 inline-block px-4">
          {namaTamu}
        </h2>
      </div>

      {/* Bagian Nama Pengantin */}
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full border border-amber-100">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">The Wedding Of</p>
        
        <h1 className="text-5xl font-serif text-amber-900 mb-6">
          {klien.nama_klien}
        </h1>

        <div className="text-sm text-slate-600 space-y-4 mb-8">
          <p>
            <span className="font-bold text-slate-800">{klien.nama_pria}</span> <br/>
            <span className="text-xs">Putra dari {klien.ortu_pria || "Bapak & Ibu"}</span>
          </p>
          <p className="text-amber-500 font-serif italic text-lg">&</p>
          <p>
            <span className="font-bold text-slate-800">{klien.nama_wanita}</span> <br/>
            <span className="text-xs">Putri dari {klien.ortu_wanita || "Bapak & Ibu"}</span>
          </p>
        </div>

        {/* Bagian Jadwal Acara */}
        <div className="bg-amber-50 p-4 rounded-xl text-sm border border-amber-100">
          <p className="font-bold text-amber-900 mb-2">📅 {klien.tanggal_acara}</p>
          <p className="mb-1">🕌 Akad: <span className="font-semibold">{klien.tempat_akad || "Menyusul"}</span></p>
          <p>🏢 Resepsi: <span className="font-semibold">{klien.tempat_resepsi || "Menyusul"}</span></p>
        </div>
      </div>

      {/* 2. PASANG FORM RSVP DI SINI (DI LUAR KOTAK PUTIH UTAMA) */}
      <RsvpForm slug={slug} />

    </div>
  );
}
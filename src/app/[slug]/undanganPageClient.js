// src/app/[slug]/undanganPageClient.js
"use client";

import { useState } from "react";
import RsvpForm from "./RsvpForm";

// Kamus warna untuk 10 template
const TEMA_DESAIN = {
  "Elegance Gold": {
    bg: "bg-[#FDFBF7]",
    text: "text-slate-900",
    aksen: "text-amber-700",
    border: "border-amber-200",
    boxBg: "bg-white",
    coverBg: "bg-[#F9F6F0]",
    coverAksen: "text-amber-800",
    btnBg: "bg-amber-800 hover:bg-amber-900",
  },
  "Rustic Sage": {
    bg: "bg-[#F1F4F0]",
    text: "text-emerald-950",
    aksen: "text-emerald-700",
    border: "border-emerald-200",
    boxBg: "bg-white",
    coverBg: "bg-[#EAF0E9]",
    coverAksen: "text-emerald-900",
    btnBg: "bg-emerald-800 hover:bg-emerald-900",
  },
  "Ocean Navy": {
    bg: "bg-slate-50",
    text: "text-slate-900",
    aksen: "text-blue-900",
    border: "border-blue-200",
    boxBg: "bg-white",
    coverBg: "bg-slate-100",
    coverAksen: "text-blue-900",
    btnBg: "bg-blue-900 hover:bg-blue-950",
  },
  "Terracotta Warm": {
    bg: "bg-[#FAF5F0]",
    text: "text-stone-900",
    aksen: "text-orange-800",
    border: "border-orange-200",
    boxBg: "bg-white",
    coverBg: "bg-[#F5EDE3]",
    coverAksen: "text-orange-900",
    btnBg: "bg-orange-800 hover:bg-orange-900",
  },
  "Monochrome": {
    bg: "bg-white",
    text: "text-black",
    aksen: "text-gray-600",
    border: "border-gray-300",
    boxBg: "bg-gray-50",
    coverBg: "bg-gray-100",
    coverAksen: "text-gray-900",
    btnBg: "bg-gray-900 hover:bg-black",
  },
  "Pastel Dream": {
    bg: "bg-rose-50",
    text: "text-rose-950",
    aksen: "text-rose-500",
    border: "border-rose-200",
    boxBg: "bg-white",
    coverBg: "bg-rose-100",
    coverAksen: "text-rose-800",
    btnBg: "bg-rose-600 hover:bg-rose-700",
  },
  "Royal Burgundy": {
    bg: "bg-[#FCF9F9]",
    text: "text-slate-900",
    aksen: "text-rose-900",
    border: "border-rose-200",
    boxBg: "bg-white",
    coverBg: "bg-[#F7F0F0]",
    coverAksen: "text-rose-950",
    btnBg: "bg-rose-900 hover:bg-rose-950",
  },
  "Midnight Glam": {
    bg: "bg-slate-950",
    text: "text-slate-100",
    aksen: "text-amber-500",
    border: "border-amber-500",
    boxBg: "bg-slate-900",
    coverBg: "bg-slate-900",
    coverAksen: "text-amber-400",
    btnBg: "bg-amber-600 hover:bg-amber-700",
  },
  "Vintage Sepia": {
    bg: "bg-[#F4EFE6]",
    text: "text-yellow-950",
    aksen: "text-yellow-800",
    border: "border-yellow-300",
    boxBg: "bg-[#FCFBF8]",
    coverBg: "bg-[#EDE5D5]",
    coverAksen: "text-yellow-900",
    btnBg: "bg-yellow-800 hover:bg-yellow-900",
  },
  "Lavender Joy": {
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-950",
    aksen: "text-purple-700",
    border: "border-purple-200",
    boxBg: "bg-white",
    coverBg: "bg-fuchsia-100",
    coverAksen: "text-purple-900",
    btnBg: "bg-purple-700 hover:bg-purple-800",
  },
};

export default function UndanganPageClient({ klien, namaTamu, slug }) {
  const [isOpen, setIsOpen] = useState(false);

  const warna = TEMA_DESAIN[klien.tema] || TEMA_DESAIN["Elegance Gold"];

  const handleBukaUndangan = () => {
    setIsOpen(true);
  };

  return (
    <div className={`min-h-screen ${warna.bg} ${warna.text} font-sans`}>

      {/* COVER PAGE — tampil sebelum undangan dibuka */}
      {!isOpen && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${warna.coverBg} p-6 text-center`}
        >
          <div
            className={`${warna.boxBg} px-8 py-12 rounded-3xl shadow-xl max-w-sm w-full border ${warna.border}`}
          >
            <p
              className={`text-xs tracking-[0.2em] uppercase font-semibold mb-3 ${warna.aksen}`}
            >
              The Wedding of
            </p>
            <h1
              className={`text-3xl font-serif font-bold tracking-wide my-4 ${warna.coverAksen}`}
            >
              {klien.nama_klien}
            </h1>
            <div className={`w-16 h-px mx-auto my-5 ${warna.border} border-t`} />
            <p className="text-xs tracking-wider text-gray-400 uppercase mb-2">
              Kepada Yth.
            </p>
            <p
              className={`text-xl font-semibold py-2 px-5 rounded-2xl border inline-block ${warna.border} ${warna.boxBg}`}
            >
              {namaTamu}
            </p>
            <button
              onClick={handleBukaUndangan}
              className={`mt-10 ${warna.btnBg} text-white font-medium text-sm py-3.5 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 tracking-wider w-full`}
            >
              💌 Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* ISI UNDANGAN */}
      {isOpen && (
        <div
          className={`flex flex-col items-center justify-center min-h-screen p-6 text-center transition-all duration-500`}
        >
          {/* Bagian Penerima Tamu */}
          <div className="mb-10 mt-8">
            <p
              className={`text-sm tracking-widest uppercase font-bold mb-2 ${warna.aksen}`}
            >
              Kepada Yth.
            </p>
            <h2
              className={`text-3xl font-serif font-bold border-b-2 pb-2 inline-block px-4 ${warna.border}`}
            >
              {namaTamu}
            </h2>
          </div>

          {/* Kotak Utama Undangan */}
          <div
            className={`${warna.boxBg} p-10 rounded-3xl shadow-xl max-w-lg w-full border ${warna.border}`}
          >
            <p className="text-xs uppercase tracking-widest mb-4 opacity-60">
              The Wedding Of
            </p>

            <h1 className={`text-5xl font-serif mb-6 ${warna.aksen}`}>
              {klien.nama_klien}
            </h1>

            <div className="text-sm space-y-4 mb-8">
              <div>
                <span className="font-bold text-lg">{klien.nama_pria}</span>
                <br />
                <span className="text-xs opacity-75">
                  Putra dari {klien.ortu_pria || "Bapak & Ibu"}
                </span>
              </div>
              <p className={`font-serif italic text-2xl ${warna.aksen}`}>&amp;</p>
              <div>
                <span className="font-bold text-lg">{klien.nama_wanita}</span>
                <br />
                <span className="text-xs opacity-75">
                  Putri dari {klien.ortu_wanita || "Bapak & Ibu"}
                </span>
              </div>
            </div>

            {/* Jadwal Acara */}
            <div
              className={`p-4 rounded-xl text-sm border ${warna.border} space-y-1`}
            >
              <p className={`font-bold mb-2 ${warna.aksen}`}>
                📅 {klien.tanggal_acara || "Tanggal Menyusul"}
              </p>
              <p>
                🕌 Akad:{" "}
                <span className="font-semibold">
                  {klien.tempat_akad || "Menyusul"}
                </span>
              </p>
              <p>
                🏢 Resepsi:{" "}
                <span className="font-semibold">
                  {klien.tempat_resepsi || "Menyusul"}
                </span>
              </p>
            </div>
          </div>

          {/* Form RSVP */}
          <RsvpForm slug={slug} warna={warna} />

          <p className="mt-12 text-xs opacity-40">
            Dibuat menggunakan Syifa Digital Invitation
          </p>
        </div>
      )}
    </div>
  );
}

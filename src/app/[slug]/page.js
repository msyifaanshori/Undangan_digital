// src/app/[slug]/page.js
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import UndanganPageClient from "./undanganPageClient";

// Data fallback untuk slug demo — dipakai jika belum ada di Supabase
const DEMO_DATA = {
  "demo-elegance": {
    slug: "demo-elegance",
    tema: "Elegance Gold",
    nama_klien: "Reza & Nadia",
    nama_pria: "Reza Aditya Pratama, S.T.",
    ortu_pria: "Putra dari Bpk. H. Ahmad Fauzi & Ibu Hj. Siti Rahayu",
    nama_wanita: "Nadia Azzahra, S.Pd.",
    ortu_wanita: "Putri dari Bpk. Drs. Budi Santoso & Ibu Dra. Lestari",
    tanggal_acara: "Sabtu, 12 Juli 2026",
    tempat_akad: "Masjid Al-Ikhlas, Jl. Sudirman No. 10, Jakarta Selatan",
    tempat_resepsi: "Gedung Grand Ballroom, Jl. Gatot Subroto No. 5, Jakarta",
  },
  "demo-rustic": {
    slug: "demo-rustic",
    tema: "Rustic Sage",
    nama_klien: "Ardi & Putri",
    nama_pria: "Ardi Nugroho, S.Hut.",
    ortu_pria: "Putra dari Bpk. Suparno & Ibu Winarti",
    nama_wanita: "Putri Sekar Wangi, S.T.P.",
    ortu_wanita: "Putri dari Bpk. Hartono & Ibu Sri Mulyani",
    tanggal_acara: "Minggu, 20 September 2026",
    tempat_akad: "Pura Mangkunegaran, Surakarta",
    tempat_resepsi: "Pendopo Agung, Jl. Pahlawan No. 3, Solo",
  },
  "demo-navy": {
    slug: "demo-navy",
    tema: "Ocean Navy",
    nama_klien: "Bagas & Laras",
    nama_pria: "Bagas Prasetya, S.I.K.",
    ortu_pria: "Putra dari Bpk. Kombes Pol. Susanto & Ibu Endah",
    nama_wanita: "Laras Kusumawardani, S.H.",
    ortu_wanita: "Putri dari Bpk. Dr. Ridwan, M.H. & Ibu Dra. Nurul",
    tanggal_acara: "Jumat, 14 Agustus 2026",
    tempat_akad: "Masjid Agung Baitul Makmur, Banda Aceh",
    tempat_resepsi: "Hotel Hermes Palace, Jl. Teuku Umar, Banda Aceh",
  },
  "demo-terracotta": {
    slug: "demo-terracotta",
    tema: "Terracotta Warm",
    nama_klien: "Dika & Ayu",
    nama_pria: "Dika Firmansyah, S.E.",
    ortu_pria: "Putra dari Bpk. H. Firmansyah & Ibu Hj. Darsini",
    nama_wanita: "Ayu Maharani, S.Farm.",
    ortu_wanita: "Putri dari Bpk. Apt. Gunawan, M.Si. & Ibu Sari",
    tanggal_acara: "Sabtu, 17 Oktober 2026",
    tempat_akad: "Masjid Raya Mujahidin, Pontianak",
    tempat_resepsi: "Ballroom Hotel Kapuas Palace, Pontianak",
  },
  "demo-pastel": {
    slug: "demo-pastel",
    tema: "Pastel Dream",
    nama_klien: "Kevin & Sasa",
    nama_pria: "Kevin Nathaniel, S.Ds.",
    ortu_pria: "Putra dari Bpk. Hendra & Ibu Melisa",
    nama_wanita: "Sasa Pramesti, S.Psi.",
    ortu_wanita: "Putri dari Bpk. Wibowo & Ibu Anastasia",
    tanggal_acara: "Minggu, 8 November 2026",
    tempat_akad: "Kapel Santo Yosep, Jl. Diponegoro No. 25, Surabaya",
    tempat_resepsi: "Shangri-La Hotel Surabaya, Jl. Mayjend Sungkono 120",
  },
  "demo-midnight": {
    slug: "demo-midnight",
    tema: "Midnight Glam",
    nama_klien: "Rafael & Citra",
    nama_pria: "Rafael Dominic, S.Sn.",
    ortu_pria: "Putra dari Bpk. Antonius & Ibu Francisca",
    nama_wanita: "Citra Maharani, S.T.",
    ortu_wanita: "Putri dari Bpk. Ir. Haryanto & Ibu Dewi",
    tanggal_acara: "Sabtu, 5 Desember 2026",
    tempat_akad: "The Stones Hotel, Legian Bali",
    tempat_resepsi: "The Stones Hotel Ballroom, Jl. Raya Legian, Kuta, Bali",
  },
};

export default async function UndanganKlien({ params, searchParams }) {
  // Next.js 15+: params & searchParams are Promises, must be awaited
  const { slug } = await params;
  const { to: namaTamu = "Tamu Spesial" } = await searchParams;

  // Coba ambil dari Supabase dulu
  const { data: klienDb } = await supabase
    .from("undangan")
    .select("*")
    .eq("slug", slug)
    .single();

  // Jika ada di DB, pakai data DB. Jika tidak, cek apakah ini slug demo.
  const klien = klienDb ?? DEMO_DATA[slug] ?? null;

  if (!klien) {
    notFound();
  }

  return (
    <UndanganPageClient klien={klien} namaTamu={namaTamu} slug={slug} />
  );
}

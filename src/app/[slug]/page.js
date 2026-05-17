// src/app/[slug]/page.js
import UndanganClient from "./undanganClient";
import { notFound } from "next/navigation";

// 🗄️ SIMULASI DATABASE KLIEN (SaaS-Ready)
// Kamu bisa tambah ratusan klien baru di sini dengan format yang sama!
const MOCK_DATABASE = {
  "riza-nisa": {
    namaKlien: "Riza & Nisa",
    pria: { nama: "Riza Aditya, S.Kom", ortu: "Bapak Ahmad Syarifuddin & Ibu Siti Aminah" },
    wanita: { nama: "Nisa Az-Zahra, S.T", ortu: "Bapak Budi Setiawan & Ibu Rahmah Aminah" },
    acara: {
      tanggal: "Minggu, 12 Juli 2026",
      targetCountdown: "2026-07-12T09:00:00",
      akad: { jam: "09.00 WITA - Selesai", tempat: "Masjid Raya Sabilal Muhtadin, Banjarmasin" },
      resepsi: { jam: "11.00 - 16.00 WITA", tempat: "Gedung Serbaguna, Kota Banjarmasin" },
      // Link embed resmi Google Maps
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.1219294273574!2d114.58882917592471!3d-3.3199859966548545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dee3f39a3fe085b%3A0x721c32c86b5171f2!2sMasjid%20Raya%20Sabilal%20Muhtadin!5e0!3m2!1sid!2sid!4v1715830000000!5m2!1sid!2sid",
      mapsDirectUrl: "https://maps.app.goo.gl/w6f9vA6ZtG8mGZ9M7"
    },
    kado: [
      { bank: "Bank BCA", norek: "1234567890", atasNama: "Riza Aditya" },
      { bank: "Bank Mandiri", norek: "9876543210", atasNama: "Nisa Az-Zahra" }
    ]
  },
  "budi-siti": {
    namaKlien: "Budi & Siti",
    pria: { nama: "Budi Pratama, S.T", ortu: "Bapak Herianto & Ibu Endang" },
    wanita: { nama: "Siti Rahmah, S.E", ortu: "Bapak Mansyur & Ibu Aminah" },
    acara: {
      tanggal: "Sabtu, 08 Agustus 2026",
      targetCountdown: "2026-08-08T10:00:00",
      akad: { jam: "10.00 WITA - Selesai", tempat: "KUA Banjarmasin Utara" },
      resepsi: { jam: "13.00 - 17.00 WITA", tempat: "Gedung Aula Serbaguna Poliban" },
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.2201389239843!2d114.5623048!3d-3.2955985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dee3d3a010d7a6b%3A0x6b306bd6b005e8b4!2sPoliteknik%20Negeri%20Banjarmasin!5e0!3m2!1sid!2sid!4v1715831111111!5m2!1sid!2sid",
      mapsDirectUrl: "https://maps.app.goo.gl/7x9f2B2A2C2D2E2F7"
    },
    kado: [
      { bank: "Bank BRI", norek: "5555-01-234567-53-2", atasNama: "Budi Pratama" }
    ]
  }
};

export default async function PageUndangan({ params, searchParams }) {
  const { slug } = await params;
  const queryParams = await searchParams;
  
  // 1. Ambil Nama Penerima dari URL (?to=...)
  const namaTamu = queryParams.to || "Tamu Undangan";

  // 2. Ambil data pengantin berdasarkan slug URL (misal: /riza-nisa atau /budi-siti)
  const weddingData = MOCK_DATABASE[slug];

  // PENGAMAN: Jika klien tidak terdaftar di database, langsung tampilkan halaman 404 (Not Found)
  if (!weddingData) {
    return notFound();
  }

  // 3. Lempar data klien yang bersih ke komponen UI
  return (
    <UndanganClient 
      weddingData={weddingData} 
      namaTamu={namaTamu} 
    />
  );
}
// src/app/order/page.js
"use client";

import { useState } from "react";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    slug: "",
    namaKlien: "",
    namaPria: "",
    ortuPria: "",
    namaWanita: "",
    ortuWanita: "",
    tanggalAcara: "",
    tempatAkad: "",
    tempatResepsi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "slug") {
      setFormData({ ...formData, [name]: value.toLowerCase().replace(/\s+/g, "-") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.slug || !formData.namaKlien || !formData.namaPria || !formData.namaWanita) {
      return alert("Mohon isi data utama (Link URL, Nama Klien, dan Nama Mempelai)!");
    }

    // Nomor WhatsApp tujuan pesanan (Ganti dengan nomormu nanti)
    const nomorWA = "6285705368511"; 

    const teksPesan = encodeURIComponent(
      `🛒 *PESAN UNDANGAN DIGITAL SAAS*\n\n` +
      `🔗 *Pilihan URL:* localhost:3000/${formData.slug}\n` +
      `👥 *Nama Klien:* ${formData.namaKlien}\n\n` +
      `🤵‍♂️ *Mempelai Pria:* ${formData.namaPria}\n` +
      `👨‍👩‍👦 *Ortu Pria:* ${formData.ortuPria}\n\n` +
      `👰‍♀️ *Mempelai Wanita:* ${formData.namaWanita}\n` +
      `👨‍👩‍👧 *Ortu Wanita:* ${formData.ortuWanita}\n\n` +
      `📅 *Tanggal Acara:* ${formData.tanggalAcara}\n` +
      `🕌 *Tempat Akad:* ${formData.tempatAkad}\n` +
      `🏢 *Tempat Resepsi:* ${formData.tempatResepsi}\n\n` +
      ` _Mohon diproses, terima kasih!_`
    );

    window.open(`https://api.whatsapp.com/send?phone=${nomorWA}&text=${teksPesan}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 text-slate-700 font-sans">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(139,115,85,0.05)] border border-amber-100">
        
        <div className="text-center mb-8">
          <span className="text-2xl">🛒</span>
          <h2 className="mt-2 text-3xl font-serif font-bold text-amber-900 tracking-wide">Formulir Data Pengantin</h2>
          <p className="mt-2 text-xs text-gray-400">Isi data secara lengkap untuk membuat undangan digital Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Request Link URL Undangan *</label>
            <div className="flex rounded-xl shadow-sm border border-amber-200 overflow-hidden focus-within:ring-2 focus-within:ring-amber-600 focus-within:border-transparent transition-all">
              <span className="bg-amber-50 px-3 py-3 text-gray-400 border-r border-amber-200 select-none text-xs flex items-center">undangan.com/</span>
              <input type="text" name="slug" placeholder="riza-nisa" value={formData.slug} onChange={handleChange} className="w-full px-3 py-3 focus:outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Nama Judul Klien *</label>
            <input type="text" name="namaKlien" placeholder="Riza & Nisa" value={formData.namaKlien} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" required />
          </div>

          <div className="w-full h-[1px] bg-amber-100 my-4"></div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Nama Pria *</label>
              <input type="text" name="namaPria" placeholder="Riza Aditya, S.Kom" value={formData.namaPria} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Ortu Pria</label>
              <input type="text" name="ortuPria" placeholder="Putra dari Bpk Ahmad" value={formData.ortuPria} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Nama Wanita *</label>
              <input type="text" name="namaWanita" placeholder="Nisa Az-Zahra, S.T" value={formData.namaWanita} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Ortu Wanita</label>
              <input type="text" name="ortuWanita" placeholder="Putri dari Bpk Budi" value={formData.ortuWanita} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" />
            </div>
          </div>

          <div className="w-full h-[1px] bg-amber-100 my-4"></div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Tanggal Acara</label>
            <input type="text" name="tanggalAcara" placeholder="Minggu, 12 Juli 2026" value={formData.tanggalAcara} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Tempat Akad</label>
            <input type="text" name="tempatAkad" placeholder="Masjid Sabilal Muhtadin" value={formData.tempatAkad} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">Tempat Resepsi</label>
            <input type="text" name="tempatResepsi" placeholder="Gedung Serbaguna" value={formData.tempatResepsi} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all" />
          </div>

          <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm py-4 rounded-xl shadow-md transition-all transform active:scale-[0.98] tracking-wider mt-6">
            🚀 Kirim Data Ke WhatsApp Admin
          </button>

        </form>
      </div>
    </div>
  );
}
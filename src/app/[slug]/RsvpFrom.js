// src/app/[slug]/RsvpForm.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function RsvpForm({ slug }) {
  const [listUcapan, setListUcapan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({ nama: "", kehadiran: "Hadir", pesan: "" });

  useEffect(() => {
    ambilUcapan();
  }, [slug]);

  async function ambilUcapan() {
    setLoading(true);
    const { data, error } = await supabase
      .from("ucapan")
      .select("*")
      .eq("slug", slug)
      .order("created_at", { ascending: false });

    if (!error) setListUcapan(data);
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataBaru = { slug, ...inputs };
    
    const { error } = await supabase.from("ucapan").insert([dataBaru]);
    
    if (error) {
      alert("Gagal mengirim ucapan");
    } else {
      setInputs({ nama: "", kehadiran: "Hadir", pesan: "" });
      ambilUcapan(); // Refresh list secara otomatis
    }
  };

  return (
    <div className="max-w-lg w-full mt-8 bg-white p-6 rounded-3xl shadow-xl border border-amber-100 text-left text-sm">
      <h3 className="text-xl font-serif font-bold text-amber-900 mb-4 text-center">✨ Buku Tamu & RSVP</h3>
      
      {/* FORM INPUT UCAPAN */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <div>
          <label className="block font-semibold mb-1 text-xs text-gray-500">Nama Anda</label>
          <input type="text" value={inputs.nama} onChange={(e) => setInputs({...inputs, nama: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Nama asli / kerabat" required />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-xs text-gray-500">Konfirmasi Kehadiran</label>
          <select value={inputs.kehadiran} onChange={(e) => setInputs({...inputs, kehadiran: e.target.value})} className="w-full p-2 border rounded-lg bg-white">
            <option value="Hadir">🟢 Hadir</option>
            <option value="Tidak Hadir">🔴 Tidak Hadir</option>
            <option value="Masih Ragu">🟡 Masih Ragu</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-xs text-gray-500">Ucapan & Doa Restu</label>
          <textarea value={inputs.pesan} onChange={(e) => setInputs({...inputs, pesan: e.target.value})} className="w-full p-2 border rounded-lg h-20" placeholder="Tulis ucapan selamat hangat Anda di sini..." required></textarea>
        </div>
        <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-lg transition-all shadow">
          🚀 Kirim Ucapan
        </button>
      </form>

      {/* DAFTAR UCAPAN YANG SUDAH MASUK */}
      <div className="border-t pt-4">
        <h4 className="font-bold text-slate-800 mb-3 font-serif">💬 Doa & Ucapan ({listUcapan.length})</h4>
        {loading ? (
          <p className="text-xs text-gray-400">Memuat ucapan...</p>
        ) : listUcapan.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Belum ada ucapan. Jadilah yang pertama!</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {listUcapan.map((item) => (
              <div key={item.id} className="bg-slate-50 p-3 rounded-xl border">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 text-xs">{item.nama}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    item.kehadiran === "Hadir" ? "bg-green-100 text-green-800" : 
                    item.kehadiran === "Tidak Hadir" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                  }`}>{item.kehadiran}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.pesan}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
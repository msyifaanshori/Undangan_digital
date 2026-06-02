// src/app/admin/page.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [daftarUndangan, setDaftarUndangan] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Perhatikan ada tambahan "tema" di sini
  const [formData, setFormData] = useState({
    slug: "", tema: "Elegance Gold", nama_klien: "", nama_pria: "", ortu_pria: "",
    nama_wanita: "", ortu_wanita: "", tanggal_acara: "",
    tempat_akad: "", tempat_resepsi: ""
  });

  useEffect(() => {
    const sesiAktif = sessionStorage.getItem("admin_login_aktif");
    if (sesiAktif === "benar") {
      setIsLoggedIn(true);
      ambilData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "syifa2026") {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_login_aktif", "benar");
      ambilData();
    } else {
      alert("❌ Password Salah! Akses Ditolak.");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_login_aktif");
    setIsLoggedIn(false);
    setDaftarUndangan([]);
  };

  async function ambilData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("undangan")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDaftarUndangan(data);
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "slug") {
      setFormData({ ...formData, [name]: value.toLowerCase().replace(/\s+/g, "-") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("undangan").insert([formData]);
    if (error) {
      alert("Gagal membuat undangan: " + error.message);
    } else {
      alert("🎉 Undangan baru Berhasil Dibuat!");
      setFormData({ slug: "", tema: "Elegance Gold", nama_klien: "", nama_pria: "", ortu_pria: "", nama_wanita: "", ortu_wanita: "", tanggal_acara: "", tempat_akad: "", tempat_resepsi: "" });
      ambilData();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full border border-slate-200 text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Panel</h2>
          <p className="text-sm text-slate-500 mb-6">Masukkan password untuk mengelola undangan.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Masukkan Password..." value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-blue-500 text-center text-lg tracking-widest" required />
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-all">Buka Kunci</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">⚙️ Dashboard Pengelola</h1>
          <button onClick={handleLogout} className="text-sm bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-bold transition-all">Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-1">
            <h2 className="text-xl font-bold text-slate-950 mb-4">✨ Buat Undangan Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Custom URL (Slug)</label>
                <input type="text" name="slug" placeholder="contoh: budi-siti" value={formData.slug} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:outline-slate-400" required />
              </div>
              
              {/* TAMBAHAN DROPDOWN TEMA */}
              <div>
                <label className="block font-bold mb-1">Pilih Template (Tema)</label>
                <select name="tema" value={formData.tema} onChange={handleChange} className="w-full p-2.5 border rounded-lg bg-white">
                  <option value="Elegance Gold">1. Elegance Gold</option>
                  <option value="Rustic Sage">2. Rustic Sage</option>
                  <option value="Ocean Navy">3. Ocean Navy</option>
                  <option value="Terracotta Warm">4. Terracotta Warm</option>
                  <option value="Monochrome">5. Monochrome</option>
                  <option value="Pastel Dream">6. Pastel Dream</option>
                  <option value="Royal Burgundy">7. Royal Burgundy</option>
                  <option value="Midnight Glam">8. Midnight Glam</option>
                  <option value="Vintage Sepia">9. Vintage Sepia</option>
                  <option value="Lavender Joy">10. Lavender Joy</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Nama Judul Klien</label>
                <input type="text" name="nama_klien" placeholder="Budi & Siti" value={formData.nama_klien} onChange={handleChange} className="w-full p-2.5 border rounded-lg focus:outline-slate-400" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Mempelai Pria</label>
                  <input type="text" name="nama_pria" value={formData.nama_pria} onChange={handleChange} className="w-full p-2.5 border rounded-lg" required />
                </div>
                <div>
                  <label className="block font-bold mb-1">Mempelai Wanita</label>
                  <input type="text" name="nama_wanita" value={formData.nama_wanita} onChange={handleChange} className="w-full p-2.5 border rounded-lg" required />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Tanggal Acara</label>
                <input type="text" name="tanggal_acara" placeholder="Minggu, 12 Desember 2026" value={formData.tanggal_acara} onChange={handleChange} className="w-full p-2.5 border rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg shadow transition-all">➕ Aktifkan Undangan</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-950 mb-4">📋 Daftar Undangan Aktif</h2>
            {loading ? <p className="text-sm text-gray-400">Sedang memuat data...</p> : daftarUndangan.length === 0 ? <p className="text-sm text-gray-400">Belum ada undangan yang dibuat.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b text-slate-400 font-semibold">
                      <th className="pb-3">Nama Klien</th>
                      <th className="pb-3">Tema</th>
                      <th className="pb-3">URL Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {daftarUndangan.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3 font-medium text-slate-900">{item.nama_klien}</td>
                        <td className="py-3 text-slate-500">{item.tema || "Elegance Gold"}</td>
                        <td className="py-3 text-blue-600 underline"><a href={`/${item.slug}`} target="_blank">/{item.slug}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
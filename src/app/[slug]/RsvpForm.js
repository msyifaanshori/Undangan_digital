// src/app/[slug]/RsvpForm.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export default function RsvpForm({ slug, warna = {} }) {
  const [listUcapan, setListUcapan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputs, setInputs] = useState({
    nama: "",
    kehadiran: "Hadir",
    pesan: "",
  });

  const borderClass = warna.border || "border-amber-100";
  const aksenClass = warna.aksen || "text-amber-700";
  const btnClass = warna.btnBg || "bg-amber-800 hover:bg-amber-900";

  const ambilUcapan = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await supabase
      .from("ucapan")
      .select("id, nama, kehadiran, pesan, created_at")
      .eq("slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg("Gagal memuat ucapan. Coba refresh halaman.");
    } else {
      setListUcapan(data || []);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    ambilUcapan();
  }, [ambilUcapan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.nama.trim() || !inputs.pesan.trim()) return;

    setSubmitting(true);
    setErrorMsg("");

    const { error } = await supabase.from("ucapan").insert([
      { slug, nama: inputs.nama.trim(), kehadiran: inputs.kehadiran, pesan: inputs.pesan.trim() },
    ]);

    if (error) {
      setErrorMsg("Gagal mengirim ucapan. Silakan coba lagi.");
    } else {
      setInputs({ nama: "", kehadiran: "Hadir", pesan: "" });
      await ambilUcapan();
    }
    setSubmitting(false);
  };

  const inputClass =
    `w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-white ${borderClass}`;

  return (
    <div
      className={`max-w-lg w-full mt-8 bg-white p-6 rounded-3xl shadow-xl border ${borderClass} text-left text-sm`}
    >
      <h3
        className={`text-xl font-serif font-bold mb-4 text-center ${aksenClass}`}
      >
        ✨ Buku Tamu &amp; RSVP
      </h3>

      {/* FORM INPUT UCAPAN */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <div>
          <label className="block font-semibold mb-1 text-xs text-gray-500">
            Nama Anda
          </label>
          <input
            type="text"
            value={inputs.nama}
            onChange={(e) => setInputs({ ...inputs, nama: e.target.value })}
            className={inputClass}
            placeholder="Nama asli / kerabat"
            required
            maxLength={100}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-xs text-gray-500">
            Konfirmasi Kehadiran
          </label>
          <select
            value={inputs.kehadiran}
            onChange={(e) =>
              setInputs({ ...inputs, kehadiran: e.target.value })
            }
            className={inputClass}
          >
            <option value="Hadir">🟢 Hadir</option>
            <option value="Tidak Hadir">🔴 Tidak Hadir</option>
            <option value="Masih Ragu">🟡 Masih Ragu</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-xs text-gray-500">
            Ucapan &amp; Doa Restu
          </label>
          <textarea
            value={inputs.pesan}
            onChange={(e) => setInputs({ ...inputs, pesan: e.target.value })}
            className={`${inputClass} h-20 resize-none`}
            placeholder="Tulis ucapan selamat hangat Anda di sini..."
            required
            maxLength={500}
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${btnClass} text-white font-bold py-2.5 rounded-lg transition-all shadow disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {submitting ? "Mengirim..." : "🚀 Kirim Ucapan"}
        </button>
      </form>

      {/* DAFTAR UCAPAN */}
      <div className={`border-t ${borderClass} pt-4`}>
        <h4 className={`font-bold mb-3 font-serif ${aksenClass}`}>
          💬 Doa &amp; Ucapan ({listUcapan.length})
        </h4>
        {loading ? (
          <p className="text-xs text-gray-400">Memuat ucapan...</p>
        ) : errorMsg && listUcapan.length === 0 ? (
          <p className="text-xs text-red-500">{errorMsg}</p>
        ) : listUcapan.length === 0 ? (
          <p className="text-xs text-gray-400 italic">
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {listUcapan.map((item) => (
              <div
                key={item.id}
                className={`bg-slate-50 p-3 rounded-xl border ${borderClass}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 text-xs">
                    {item.nama}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.kehadiran === "Hadir"
                        ? "bg-green-100 text-green-800"
                        : item.kehadiran === "Tidak Hadir"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.kehadiran}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.pesan}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

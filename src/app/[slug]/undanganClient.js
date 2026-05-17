// src/app/[slug]/UndanganClient.js
"use client";

import { useState, useRef, useEffect } from "react";

export default function UndanganClient({ weddingData, namaTamu }) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  // Destrukturisasi data agar kodingan di bawah lebih pendek
  const { namaKlien, pria, wanita, acara, kado } = weddingData;

  // --- 1. COUNTDOWN TIMER DINAMIS ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(acara.targetCountdown).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [acara.targetCountdown]);

  // --- 2. RESERVASI & UCAPAN ---
  const [wishes, setWishes] = useState([
    { nama: "Aris Munandar", status: "Hadir", teks: "Selamat ya! Lancar acaranya dan berkah rumah tangganya." }
  ]);
  const [inputNama, setInputNama] = useState(namaTamu !== "Tamu Undangan" ? namaTamu : "");
  const [inputStatus, setInputStatus] = useState("Hadir");
  const [inputTeks, setInputTeks] = useState("");

  const handleSubmitUcapan = (e) => {
    e.preventDefault();
    if (!inputNama || !inputTeks) return alert("Mohon isi nama dan ucapan Anda");
    setWishes([{ nama: inputNama, status: inputStatus, teks: inputTeks }, ...wishes]);
    setInputTeks("");
  };

  // --- 3. COPY REKENING BINAMIS ---
  const [copiedIndex, setCopiedIndex] = useState(null);
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleBukaUndangan = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Autoplay diblokir", err));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-700 font-sans relative overflow-x-hidden antialiased">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop />

      {/* 🚪 COVER HALAMAN UTAMA */}
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F6F0] p-6 text-center transition-all duration-1000 ease-in-out ${isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
        <div className="text-amber-600 text-3xl mb-4 animate-bounce">✨</div>
        <div className="bg-white px-6 py-12 rounded-3xl shadow-[0_10px_30px_rgba(139,115,85,0.1)] max-w-sm w-full border border-amber-100/60">
          <p className="text-xs tracking-[0.2em] text-amber-700 uppercase font-medium mb-3">The Wedding of</p>
          <h1 className="text-3xl font-serif font-bold text-amber-800 tracking-wide my-4">{namaKlien}</h1>
          <div className="w-16 h-[1px] bg-amber-200 mx-auto my-6"></div>
          <h3 className="text-xs tracking-wider text-gray-400 uppercase mb-3">Kepada Yth. Bapak/Ibu/Saudara/i</h3>
          <h2 className="text-xl font-semibold text-slate-800 bg-amber-50/80 py-2.5 px-5 rounded-2xl border border-amber-100 inline-block my-2 shadow-sm">{namaTamu}</h2>
          <button onClick={handleBukaUndangan} className="mt-10 bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm py-3.5 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 tracking-wider">
            💌 Buka Undangan
          </button>
        </div>
      </div>

      {/* 📜 ISI UNDANGAN DYNAMIC */}
      {isOpen && (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-amber-100/40 pb-24 animate-fade-in">
          
          <div className="h-80 bg-slate-200 flex items-center justify-center relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=600')" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-white"></div>
            <div className="absolute bottom-6 text-center w-full z-10 px-4">
              <p className="text-white/80 text-xs tracking-[0.3em] uppercase mb-1">Walimatul 'Ursy</p>
              <h2 className="text-amber-900 text-4xl font-serif font-bold tracking-wide">{namaKlien}</h2>
            </div>
          </div>

          {/* Mempelai Section Dinamis */}
          <div className="px-8 py-12 text-center space-y-6">
            <div className="space-y-1">
              <h3 className="text-xs tracking-widest uppercase font-bold text-amber-800 font-serif">Mempelai Pria</h3>
              <p className="text-xl font-bold text-slate-800 font-serif">{pria.nama}</p>
              <p className="text-xs text-gray-400 max-w-[280px] mx-auto">{pria.ortu}</p>
            </div>
            <div className="text-xl font-serif italic text-amber-600 font-bold my-2">dan</div>
            <div className="space-y-1">
              <h3 className="text-xs tracking-widest uppercase font-bold text-amber-800 font-serif">Mempelai Wanita</h3>
              <p className="text-xl font-bold text-slate-800 font-serif">{wanita.nama}</p>
              <p className="text-xs text-gray-400 max-w-[280px] mx-auto">{wanita.ortu}</p>
            </div>
          </div>

          {/* Countdown Section */}
          <div className="px-6 py-8 bg-amber-50/50 border-y border-amber-100/60 text-center space-y-4">
            <h3 className="font-serif text-lg font-bold text-amber-900">Menuju Hari Bahagia</h3>
            <div className="flex justify-center gap-3">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-amber-200/60 shadow-sm rounded-xl min-w-[64px] py-3">
                  <div className="text-xl font-bold text-amber-800 tabular-nums">{item.value}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda & Preview Maps Dinamis */}
          <div className="mx-6 my-8 px-6 py-8 bg-[#FAF7F2] rounded-[2rem] border border-amber-100/50 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-serif font-bold text-amber-900">Waktu & Tempat</h3>
              <div className="w-8 h-[1.5px] bg-amber-600 mx-auto mt-1"></div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm text-center space-y-4 text-xs border border-amber-100/30">
              <div>
                <h4 className="font-bold text-amber-800 uppercase tracking-wider mb-0.5">Akad Nikah</h4>
                <p className="font-bold text-slate-800">{acara.tanggal}</p>
                <p className="text-amber-700 font-medium">{acara.akad.jam}</p>
                <p className="text-gray-400 mt-0.5">{acara.akad.tempat}</p>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <h4 className="font-bold text-amber-800 uppercase tracking-wider mb-0.5">Resepsi</h4>
                <p className="font-bold text-slate-800">{acara.tanggal}</p>
                <p className="text-amber-700 font-medium">{acara.resepsi.jam}</p>
                <p className="text-gray-400 mt-0.5">{acara.resepsi.tempat}</p>
              </div>
            </div>

            {/* 🗺️ MAPS EMBED DINAMIS */}
            <div className="w-full h-48 rounded-2xl overflow-hidden shadow-sm border border-amber-200/70 relative">
              <iframe 
                src={acara.mapsEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <a href={acara.mapsDirectUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all">
              📍 Petunjuk Rute Google Maps
            </a>
          </div>

          {/* Kado Digital Dinamis */}
          <div className="px-6 py-10 text-center space-y-6 border-t border-amber-100/40">
            <div className="space-y-1">
              <span className="text-xl">🎁</span>
              <h3 className="text-xl font-serif font-bold text-amber-900">Kado Digital</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Anda dapat mentransfer tanda kasih secara digital melalui rekening resmi berikut:</p>
            </div>

            <div className="space-y-3 max-w-xs mx-auto">
              {kado.map((account, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-50/40 to-amber-100/20 p-5 rounded-2xl border border-amber-200/50 text-left relative overflow-hidden shadow-sm">
                  <div className="text-xs font-bold text-amber-800 tracking-wide mb-1">{account.bank}</div>
                  <div className="text-base font-mono font-bold text-slate-800 my-1">{account.norek}</div>
                  <div className="text-[11px] text-gray-500">a.n. {account.atasNama}</div>
                  <button onClick={() => copyToClipboard(account.norek, idx)} className="absolute right-4 bottom-4 bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold py-1.5 px-3 rounded-lg shadow-sm transition-all">
                    {copiedIndex === idx ? "✓ Tersalin" : "📋 Salin No"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form RSVP */}
          <div className="px-6 py-10 bg-[#FAF7F2] border-y border-amber-100/50 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-serif font-bold text-amber-900">Buku Tamu & RSVP</h3>
              <p className="text-xs text-gray-400">Kirimkan konfirmasi kehadiran dan doa restu Anda</p>
            </div>

            <form onSubmit={handleSubmitUcapan} className="space-y-3 max-w-xs mx-auto">
              <input type="text" placeholder="Nama Anda" value={inputNama} onChange={(e) => setInputNama(e.target.value)} className="w-full px-4 py-3 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all" />
              <select value={inputStatus} onChange={(e) => setInputStatus(e.target.value)} className="w-full px-4 py-3 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all">
                <option value="Hadir">Saya akan Hadir</option>
                <option value="Bisa Hadir">Insya Allah Hadir</option>
                <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
              </select>
              <textarea rows="3" placeholder="Tulis ucapan & doa restu..." value={inputTeks} onChange={(e) => setInputTeks(e.target.value)} className="w-full px-4 py-3 text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all resize-none"></textarea>
              <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition-all tracking-wider">🚀 Kirim Ucapan</button>
            </form>

            <div className="max-w-xs mx-auto mt-8 space-y-3 max-h-60 overflow-y-auto pr-1 text-left custom-scrollbar">
              {wishes.map((wish, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800">{wish.nama}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${wish.status.includes("Tidak") ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>{wish.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">{wish.teks}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-300 tracking-widest mt-12 uppercase">Created by UndanganDigital.com</div>
        </div>
      )}
    </div>
  );
}
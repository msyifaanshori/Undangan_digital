-- ============================================================
-- SEED DATA DEMO UNDANGAN
-- Jalankan di Supabase Dashboard → SQL Editor
-- ============================================================

INSERT INTO undangan (slug, tema, nama_klien, nama_pria, ortu_pria, nama_wanita, ortu_wanita, tanggal_acara, tempat_akad, tempat_resepsi)
VALUES
  (
    'demo-elegance',
    'Elegance Gold',
    'Reza & Nadia',
    'Reza Aditya Pratama, S.T.',
    'Putra dari Bpk. H. Ahmad Fauzi & Ibu Hj. Siti Rahayu',
    'Nadia Azzahra, S.Pd.',
    'Putri dari Bpk. Drs. Budi Santoso & Ibu Dra. Lestari',
    'Sabtu, 12 Juli 2026',
    'Masjid Al-Ikhlas, Jl. Sudirman No. 10, Jakarta Selatan',
    'Gedung Serbaguna Grand Ballroom, Jl. Gatot Subroto No. 5, Jakarta'
  ),
  (
    'demo-rustic',
    'Rustic Sage',
    'Ardi & Putri',
    'Ardi Nugroho, S.Hut.',
    'Putra dari Bpk. Suparno & Ibu Winarti',
    'Putri Sekar Wangi, S.T.P.',
    'Putri dari Bpk. Hartono & Ibu Sri Mulyani',
    'Minggu, 20 September 2026',
    'Pura Mangkunegaran, Surakarta',
    'Pendopo Agung, Jl. Pahlawan No. 3, Solo'
  ),
  (
    'demo-navy',
    'Ocean Navy',
    'Bagas & Laras',
    'Bagas Prasetya, S.I.K.',
    'Putra dari Bpk. Kombes Pol. Susanto & Ibu Endah',
    'Laras Kusumawardani, S.H.',
    'Putri dari Bpk. Dr. Ridwan, M.H. & Ibu Dra. Nurul',
    'Jumat, 14 Agustus 2026',
    'Masjid Agung Baitul Makmur, Banda Aceh',
    'Hotel Hermes Palace, Jl. Teuku Umar, Banda Aceh'
  ),
  (
    'demo-terracotta',
    'Terracotta Warm',
    'Dika & Ayu',
    'Dika Firmansyah, S.E.',
    'Putra dari Bpk. H. Firmansyah & Ibu Hj. Darsini',
    'Ayu Maharani, S.Farm.',
    'Putri dari Bpk. Apt. Gunawan, M.Si. & Ibu Sari',
    'Sabtu, 17 Oktober 2026',
    'Masjid Raya Mujahidin, Pontianak',
    'Ballroom Hotel Kapuas Palace, Pontianak'
  ),
  (
    'demo-pastel',
    'Pastel Dream',
    'Kevin & Sasa',
    'Kevin Nathaniel, S.Ds.',
    'Putra dari Bpk. Hendra & Ibu Melisa',
    'Sasa Pramesti, S.Psi.',
    'Putri dari Bpk. Wibowo & Ibu Anastasia',
    'Minggu, 8 November 2026',
    'Kapel Santo Yosep, Jl. Diponegoro No. 25, Surabaya',
    'Shangri-La Hotel Surabaya, Jl. Mayjend Sungkono 120'
  ),
  (
    'demo-midnight',
    'Midnight Glam',
    'Rafael & Citra',
    'Rafael Dominic, S.Sn.',
    'Putra dari Bpk. Antonius & Ibu Francisca',
    'Citra Maharani, S.T.',
    'Putri dari Bpk. Ir. Haryanto & Ibu Dewi',
    'Sabtu, 5 Desember 2026',
    'The Stones Hotel, Legian Bali',
    'The Stones Hotel Ballroom, Jl. Raya Legian, Kuta, Bali'
  );

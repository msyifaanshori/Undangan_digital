// src/app/api/webhook/route.js
import { NextResponse } from 'next/server';

// Fungsi POST untuk menerima data notifikasi dari Payment Gateway (Midtrans/Duitku)
export async function POST(request) {
  try {
    // 1. Tangkap sinyal data dari server pembayaran
    const body = await request.json();
    
    // Nanti logika cek status pembayarannya di sini:
    // Jika body.transaction_status === "settlement" (sudah bayar)
    // Update status database klien di Supabase menjadi "Aktif"

    console.log("🔔 Sinyal Pembayaran Masuk:", body);

    // 2. Beri respon 200 OK ke server pembayaran agar mereka tahu sinyal sudah diterima
    return NextResponse.json(
      { message: "Webhook berhasil diterima dan diproses" },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada webhook" },
      { status: 500 }
    );
  }
}
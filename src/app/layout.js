import "./globals.css";

export const metadata = {
  title: "Syifa Digital Invitation — Undangan Pernikahan Online",
  description:
    "Buat undangan pernikahan digital yang elegan dan interaktif. Tersedia berbagai pilihan tema premium.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

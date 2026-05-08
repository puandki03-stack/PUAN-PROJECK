import Link from "next/link";

const menuItems = [
  {
    href: "/dashboard",
    ikon: "👤",
    judul: "Dashboard Anggota",
    deskripsi: "Portofolio simpanan, katalog pembiayaan, dan riwayat transaksi.",
    warna: "from-teal-500 to-teal-700",
    ring: "ring-teal-200",
  },
  {
    href: "/pengurus",
    ikon: "🛡️",
    judul: "Panel Pengurus",
    deskripsi: "Manajemen transaksi, laporan keuangan, dan verifikasi syariah.",
    warna: "from-emerald-500 to-emerald-700",
    ring: "ring-emerald-200",
  },
  {
    href: "/simpanan",
    ikon: "💳",
    judul: "Proses Simpanan",
    deskripsi: "Form pengajuan pembiayaan, kalkulator zakat, dan infaq sukarela.",
    warna: "from-cyan-500 to-cyan-700",
    ring: "ring-cyan-200",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 text-center">
          <p className="text-teal-200 text-sm font-medium tracking-widest uppercase mb-3">
            ☪ Amanah · Berkah · Transparan
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Koperasi Syariah Digital
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Platform digital untuk mengelola simpanan, pembiayaan, dan laporan
            keuangan berdasarkan prinsip-prinsip syariah Islam.
          </p>
        </div>
      </header>

      {/* MENU UTAMA */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-14 w-full">
        <h2 className="text-center text-2xl font-bold text-slate-800 mb-10">
          Pilih Menu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative rounded-2xl bg-white shadow-md border border-slate-100
                overflow-hidden transition-all duration-300
                hover:shadow-xl hover:-translate-y-1 hover:ring-2 ${item.ring}
              `}
            >
              <div
                className={`h-2 w-full bg-gradient-to-r ${item.warna} group-hover:h-3 transition-all duration-300`}
              />
              <div className="p-7">
                <span className="text-4xl mb-4 block">{item.ikon}</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {item.judul}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.deskripsi}
                </p>
                <span
                  className={`
                    mt-5 inline-flex items-center gap-1 text-sm font-semibold
                    bg-gradient-to-r ${item.warna} bg-clip-text text-transparent
                  `}
                >
                  Buka →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 text-center text-sm text-slate-500">
          © 2026 Koperasi Syariah Digital — Amanah · Berkah · Transparan
        </div>
      </footer>
    </div>
  );
}

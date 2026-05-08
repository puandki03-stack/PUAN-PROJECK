"use client";

import React, { useState, useEffect } from "react";

/* ─────────────────── DATA DUMMY ─────────────────── */
const dataSimpanan = {
  pokok: 5000000,
  wajib: 12500000,
  sukarela: 8750000,
};

const produkPembiayaan = [
  {
    id: 1,
    nama: "Murabahah",
    ikon: "🏷️",
    deskripsi: "Jual-beli barang dengan margin keuntungan yang disepakati.",
    marginInfo: "Margin 8 – 12 %",
    warna: "from-teal-500 to-teal-700",
  },
  {
    id: 2,
    nama: "Mudharabah",
    ikon: "🤝",
    deskripsi: "Bagi hasil antara pemilik modal dan pengelola usaha.",
    marginInfo: "Nisbah 60 : 40",
    warna: "from-emerald-500 to-emerald-700",
  },
  {
    id: 3,
    nama: "Musyarakah",
    ikon: "🏗️",
    deskripsi: "Kemitraan usaha dengan kontribusi modal bersama.",
    marginInfo: "Nisbah sesuai porsi",
    warna: "from-cyan-500 to-cyan-700",
  },
  {
    id: 4,
    nama: "Ijarah",
    ikon: "🔑",
    deskripsi: "Sewa-menyewa aset dengan hak opsi kepemilikan.",
    marginInfo: "Ujrah 5 – 9 %",
    warna: "from-sky-500 to-sky-700",
  },
  {
    id: 5,
    nama: "Istishna",
    ikon: "🏠",
    deskripsi: "Pemesanan barang/proyek dengan spesifikasi khusus.",
    marginInfo: "Harga disepakati",
    warna: "from-indigo-500 to-indigo-700",
  },
];

const riwayatTransaksi = [
  {
    id: 1,
    tanggal: "2026-05-01",
    jenis: "Setor Simpanan Wajib",
    nominal: 500000,
    status: "Berhasil",
  },
  {
    id: 2,
    tanggal: "2026-04-28",
    jenis: "Cicilan Murabahah #3",
    nominal: 1250000,
    status: "Berhasil",
  },
  {
    id: 3,
    tanggal: "2026-04-15",
    jenis: "Setor Simpanan Sukarela",
    nominal: 2000000,
    status: "Berhasil",
  },
  {
    id: 4,
    tanggal: "2026-04-10",
    jenis: "Cicilan Murabahah #2",
    nominal: 1250000,
    status: "Berhasil",
  },
  {
    id: 5,
    tanggal: "2026-04-01",
    jenis: "Setor Simpanan Wajib",
    nominal: 500000,
    status: "Berhasil",
  },
  {
    id: 6,
    tanggal: "2026-03-20",
    jenis: "Penarikan Simpanan Sukarela",
    nominal: 1000000,
    status: "Menunggu",
  },
];

/* ─────────────────── HELPERS ─────────────────── */
const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    n
  );

const formatTanggal = (str) =>
  new Date(str).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* ─────────────────── KOMPONEN ─────────────────── */

/** Kartu Simpanan */
function KartuSimpanan({ label, nominal, ikon, delay }) {
  const [tampil, setTampil] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTampil(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl bg-white shadow-lg
        border border-slate-100
        transition-all duration-700 ease-out
        ${tampil ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        hover:shadow-xl hover:-translate-y-1 group
      `}
    >
      {/* Aksen dekoratif */}
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-500" />
      <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-teal-50/60" />

      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white text-xl shadow-md shadow-teal-200">
            {ikon}
          </span>
          <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase">
            {label}
          </p>
        </div>
        <p className="text-2xl font-extrabold text-slate-800 tracking-tight">
          {formatRupiah(nominal)}
        </p>
        <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
      </div>
    </div>
  );
}

/** Kartu Produk Pembiayaan */
function KartuProduk({ produk, delay }) {
  const [tampil, setTampil] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTampil(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`
        rounded-2xl bg-white shadow-md border border-slate-100
        overflow-hidden transition-all duration-700 ease-out
        ${tampil ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        hover:shadow-xl hover:-translate-y-1 group cursor-pointer
      `}
    >
      <div
        className={`h-2 w-full bg-gradient-to-r ${produk.warna} group-hover:h-3 transition-all duration-300`}
      />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{produk.ikon}</span>
          <h3 className="text-lg font-bold text-slate-800">{produk.nama}</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {produk.deskripsi}
        </p>
        <span
          className={`
            inline-block text-xs font-semibold px-3 py-1 rounded-full
            bg-gradient-to-r ${produk.warna} text-white
          `}
        >
          {produk.marginInfo}
        </span>
      </div>
    </div>
  );
}

/** Badge Status */
function BadgeStatus({ status }) {
  const cfg =
    status === "Berhasil"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : "bg-amber-50 text-amber-700 ring-amber-200";

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${cfg}`}>
      {status}
    </span>
  );
}

/* ─────────────────── HALAMAN UTAMA ─────────────────── */
export default function DashboardAnggota() {
  const totalSimpanan =
    dataSimpanan.pokok + dataSimpanan.wajib + dataSimpanan.sukarela;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HEADER ── */}
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-teal-200 text-sm font-medium tracking-wide uppercase mb-1">
                Koperasi Syariah Digital
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Assalamu&apos;alaikum, Anggota 👋
              </h1>
              <p className="mt-2 text-teal-100 text-base">
                Kelola simpanan &amp; pembiayaan Anda dengan prinsip syariah yang amanah.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 text-center">
              <p className="text-xs text-teal-200 uppercase tracking-wider mb-1">
                Total Portofolio
              </p>
              <p className="text-2xl font-extrabold">{formatRupiah(totalSimpanan)}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-14">
        {/* ── WIDGET PORTOFOLIO ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">
              Portofolio Simpanan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <KartuSimpanan
              label="Simpanan Pokok"
              nominal={dataSimpanan.pokok}
              ikon="💎"
              delay={100}
            />
            <KartuSimpanan
              label="Simpanan Wajib"
              nominal={dataSimpanan.wajib}
              ikon="📌"
              delay={250}
            />
            <KartuSimpanan
              label="Simpanan Sukarela"
              nominal={dataSimpanan.sukarela}
              ikon="🎁"
              delay={400}
            />
          </div>
        </section>

        {/* ── KATALOG PRODUK PEMBIAYAAN ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">
              Katalog Produk Pembiayaan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {produkPembiayaan.map((p, i) => (
              <KartuProduk key={p.id} produk={p} delay={150 + i * 120} />
            ))}
          </div>
        </section>

        {/* ── STATUS TRANSAKSI ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">
              Riwayat Transaksi Terakhir
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            {/* Header tabel */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <span className="col-span-3">Tanggal</span>
              <span className="col-span-4">Jenis Transaksi</span>
              <span className="col-span-3 text-right">Nominal</span>
              <span className="col-span-2 text-center">Status</span>
            </div>

            {/* Baris */}
            {riwayatTransaksi.map((trx, idx) => (
              <div
                key={trx.id}
                className={`
                  grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center px-6 py-4
                  ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                  hover:bg-teal-50/40 transition-colors duration-200
                  border-b border-slate-100 last:border-b-0
                `}
              >
                <span className="sm:col-span-3 text-sm text-slate-600">
                  <span className="sm:hidden font-medium text-slate-400 mr-1">
                    Tanggal:
                  </span>
                  {formatTanggal(trx.tanggal)}
                </span>

                <span className="sm:col-span-4 text-sm font-medium text-slate-800">
                  <span className="sm:hidden font-medium text-slate-400 mr-1">
                    Jenis:
                  </span>
                  {trx.jenis}
                </span>

                <span className="sm:col-span-3 text-sm font-semibold text-slate-800 sm:text-right">
                  <span className="sm:hidden font-medium text-slate-400 mr-1">
                    Nominal:
                  </span>
                  {formatRupiah(trx.nominal)}
                </span>

                <span className="sm:col-span-2 sm:text-center">
                  <BadgeStatus status={trx.status} />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MOTIVASI ISLAMI ── */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-lg font-semibold mb-1">💡 Motivasi Hari Ini</p>
          <p className="text-teal-100 leading-relaxed italic">
            "Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan jangan
            tolong-menolong dalam berbuat dosa dan permusuhan."
            <span className="not-italic font-semibold block mt-1 text-white/90">
              — QS. Al-Ma&apos;idah : 2
            </span>
          </p>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 text-center text-sm text-slate-500">
          © 2026 Koperasi Syariah Digital — Amanah · Berkah · Transparan
        </div>
      </footer>
    </div>
  );
}

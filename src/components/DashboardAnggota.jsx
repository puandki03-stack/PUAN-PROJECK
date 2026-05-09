"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/* ── helpers ── */
const rp = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const tgl = (s) =>
  new Date(s).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

/* ── data ── */
const dataSimpanan = { pokok: 5_000_000, wajib: 12_500_000, sukarela: 8_750_000 };

const produk = [
  { id:1, nama:"Murabahah",  ikon:"🏷️", info:"Margin 8–12%",  desc:"Jual-beli barang dengan margin keuntungan yang disepakati bersama.", color:"bg-teal-50 border-teal-200 text-teal-700" },
  { id:2, nama:"Mudharabah", ikon:"🤝", info:"Nisbah 60:40", desc:"Bagi hasil antara pemilik modal dan pengelola usaha.",               color:"bg-emerald-50 border-emerald-200 text-emerald-700" },
  { id:3, nama:"Musyarakah", ikon:"🏗️", info:"Sesuai porsi", desc:"Kemitraan usaha dengan kontribusi modal bersama.",                   color:"bg-cyan-50 border-cyan-200 text-cyan-700" },
  { id:4, nama:"Ijarah",     ikon:"🔑", info:"Ujrah 5–9%",   desc:"Sewa-menyewa aset dengan hak opsi kepemilikan.",                    color:"bg-sky-50 border-sky-200 text-sky-700" },
  { id:5, nama:"Istishna",   ikon:"🏠", info:"Harga sepakat",desc:"Pemesanan barang/proyek dengan spesifikasi khusus.",                 color:"bg-indigo-50 border-indigo-200 text-indigo-700" },
];

const transaksi = [
  { id:1, tgl:"2026-05-01", jenis:"Setor Simpanan Wajib",        nominal:500_000,   status:"Berhasil" },
  { id:2, tgl:"2026-04-28", jenis:"Cicilan Murabahah #3",        nominal:1_250_000, status:"Berhasil" },
  { id:3, tgl:"2026-04-15", jenis:"Setor Simpanan Sukarela",     nominal:2_000_000, status:"Berhasil" },
  { id:4, tgl:"2026-04-10", jenis:"Cicilan Murabahah #2",        nominal:1_250_000, status:"Berhasil" },
  { id:5, tgl:"2026-04-01", jenis:"Setor Simpanan Wajib",        nominal:500_000,   status:"Berhasil" },
  { id:6, tgl:"2026-03-20", jenis:"Penarikan Simpanan Sukarela", nominal:1_000_000, status:"Menunggu" },
];

/* ── Modal ── */
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 fade-in">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden fade-up">
        <div className="gradient-teal px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-base">{title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl font-bold w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">&times;</button>
        </div>
        <div className="p-6 text-sm text-slate-700">{children}</div>
        <div className="px-6 pb-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── KartuSimpanan ── */
function KartuSimpanan({ label, nominal, ikon, pct, delay, onClick }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <button
      onClick={onClick}
      style={{ transitionDelay: `${delay}ms` }}
      className={`w-full text-left card card-lift p-5 cursor-pointer transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-xl border border-teal-100">{ikon}</div>
        <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2 py-1 rounded-full border border-teal-100">{pct}</span>
      </div>
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-800 font-heading">{rp(nominal)}</p>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-teal-600 font-semibold">
        <span>Lihat detail</span>
        <span>→</span>
      </div>
    </button>
  );
}

/* ── KartuProduk ── */
function KartuProduk({ p, delay, onClick }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <button
      onClick={onClick}
      style={{ transitionDelay: `${delay}ms` }}
      className={`w-full text-left card card-lift cursor-pointer overflow-hidden transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-teal-700" />
      <div className="p-4">
        <div className="text-2xl mb-3">{p.ikon}</div>
        <h3 className="font-bold text-slate-800 text-sm mb-1">{p.nama}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{p.desc}</p>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.color}`}>{p.info}</span>
      </div>
    </button>
  );
}

/* ── BadgeStatus ── */
function BadgeStatus({ status }) {
  return status === "Berhasil"
    ? <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Berhasil</span>
    : <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">⏳ Menunggu</span>;
}

/* ── MAIN ── */
export default function DashboardAnggota({ user }) {
  const [modal, setModal] = useState(null);
  const total = dataSimpanan.pokok + dataSimpanan.wajib + dataSimpanan.sukarela;
  const name = user?.email?.split("@")[0] || "Anggota";

  const openSimpanan = (label, desc, nominal) =>
    setModal({ title: label, content: (
      <div className="space-y-4">
        <p className="text-slate-500 leading-relaxed">{desc}</p>
        <div className="gradient-teal rounded-xl p-4">
          <p className="text-teal-200 text-xs font-semibold uppercase tracking-wide mb-1">Saldo Saat Ini</p>
          <p className="text-white text-2xl font-bold font-heading">{rp(nominal)}</p>
        </div>
      </div>
    )});

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <header className="gradient-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-teal-100 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                KSPPS Syariah Digital
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Assalamu&apos;alaikum, <span className="text-teal-200">{name}</span> 👋
              </h1>
              <p className="mt-2 text-teal-100 text-sm max-w-lg">
                Kelola simpanan &amp; pembiayaan syariah Anda dengan mudah, aman, dan amanah.
              </p>
            </div>
            {/* portofolio card */}
            <div className="fade-up bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 lg:min-w-[220px]">
              <p className="text-teal-200 text-xs font-semibold uppercase tracking-wide mb-1">Total Portofolio</p>
              <p className="text-3xl font-black text-white font-heading">{rp(total)}</p>
              <p className="text-teal-300 text-xs mt-2">3 jenis simpanan aktif ✓</p>
            </div>
          </div>
        </div>
        {/* wave */}
        <svg viewBox="0 0 1440 36" fill="none" className="w-full" style={{ marginBottom: "-1px" }} preserveAspectRatio="none">
          <path d="M0 36C480 0 960 0 1440 36H0Z" fill="#f8fafc" />
        </svg>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ── PORTOFOLIO SIMPANAN ── */}
        <section>
          <div className="section-title">
            <h2 className="text-lg font-bold text-slate-800">Portofolio Simpanan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KartuSimpanan label="Simpanan Pokok" nominal={dataSimpanan.pokok} ikon="💎" pct="Tetap" delay={0}
              onClick={() => openSimpanan("Simpanan Pokok", "Simpanan awal yang dibayarkan satu kali saat mendaftar menjadi anggota. Tidak dapat ditarik selama masih berstatus anggota aktif.", dataSimpanan.pokok)} />
            <KartuSimpanan label="Simpanan Wajib" nominal={dataSimpanan.wajib} ikon="📌" pct="Bulanan" delay={100}
              onClick={() => openSimpanan("Simpanan Wajib", "Simpanan rutin bulanan sebagai kewajiban dasar keanggotaan. Dapat ditarik jika keluar dari keanggotaan.", dataSimpanan.wajib)} />
            <KartuSimpanan label="Simpanan Sukarela" nominal={dataSimpanan.sukarela} ikon="🎁" pct="Fleksibel" delay={200}
              onClick={() => setModal({ title: "Simpanan Sukarela", content: (
                <div className="space-y-4">
                  <p className="text-slate-500 leading-relaxed">Tabungan tambahan yang bisa disetor dan ditarik kapan saja sesuai kesepakatan. Sangat dianjurkan untuk masa depan Anda.</p>
                  <div className="gradient-teal rounded-xl p-4">
                    <p className="text-teal-200 text-xs font-semibold uppercase tracking-wide mb-1">Saldo Saat Ini</p>
                    <p className="text-white text-2xl font-bold font-heading">{rp(dataSimpanan.sukarela)}</p>
                  </div>
                  <Link href="/simpanan" className="block w-full text-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 rounded-xl transition-colors">
                    Setor Sekarang →
                  </Link>
                </div>
              )}}) } />
          </div>
        </section>

        {/* ── KATALOG PRODUK ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="section-title mb-0">
              <h2 className="text-lg font-bold text-slate-800">Produk Pembiayaan KSPPS</h2>
            </div>
            <Link href="/simpanan" className="text-sm font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-4 py-2 rounded-lg transition-colors">
              Ajukan →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {produk.map((p, i) => (
              <KartuProduk key={p.id} p={p} delay={i * 80}
                onClick={() => setModal({ title: `Akad ${p.nama}`, content: (
                  <div className="space-y-4">
                    <div className="text-5xl text-center py-4 bg-slate-50 rounded-xl">{p.ikon}</div>
                    <p className="text-slate-600 leading-relaxed">{p.desc}</p>
                    <div className={`p-4 rounded-xl border ${p.color} bg-opacity-50`}>
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Estimasi Imbal Hasil</p>
                      <p className="text-lg font-bold">{p.info}</p>
                    </div>
                    <Link href="/simpanan" className="block w-full text-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 rounded-xl transition-colors">
                      Ajukan Pembiayaan →
                    </Link>
                  </div>
                )}}) }
              />
            ))}
          </div>
        </section>

        {/* ── RIWAYAT TRANSAKSI ── */}
        <section>
          <div className="section-title">
            <h2 className="text-lg font-bold text-slate-800">Riwayat Transaksi Terakhir</h2>
          </div>
          <div className="card overflow-hidden">
            {/* header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-teal-700 text-white text-xs font-bold uppercase tracking-wide">
              <span className="col-span-3">Tanggal</span>
              <span className="col-span-5">Jenis Transaksi</span>
              <span className="col-span-2 text-right">Nominal</span>
              <span className="col-span-2 text-center">Status</span>
            </div>
            {transaksi.map((t, i) => (
              <div key={t.id} className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center px-5 py-3.5 border-b border-slate-100 last:border-0 hover:bg-teal-50/50 transition-colors ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                <span className="sm:col-span-3 text-xs text-slate-500">{tgl(t.tgl)}</span>
                <span className="sm:col-span-5 text-sm font-medium text-slate-800">{t.jenis}</span>
                <span className="sm:col-span-2 text-sm font-bold text-slate-800 sm:text-right">{rp(t.nominal)}</span>
                <span className="sm:col-span-2 sm:text-center"><BadgeStatus status={t.status} /></span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MOTIVASI ── */}
        <section className="gradient-teal rounded-2xl p-7 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative">
            <p className="text-teal-200 text-xs font-bold uppercase tracking-widest mb-2">💡 Motivasi Hari Ini</p>
            <p className="text-white text-base italic leading-relaxed max-w-2xl">
              &ldquo;Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan jangan tolong-menolong dalam berbuat dosa dan permusuhan.&rdquo;
            </p>
            <p className="text-teal-300 text-sm font-semibold mt-2">— QS. Al-Ma&apos;idah : 2</p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-sm font-bold text-teal-700">KSPPS <span className="text-slate-400 font-normal">Syariah Digital</span></span>
          <span className="text-xs text-slate-400">© 2026 — Amanah · Berkah · Transparan</span>
        </div>
      </footer>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
        {modal?.content}
      </Modal>
    </div>
  );
}

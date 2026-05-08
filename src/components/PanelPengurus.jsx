"use client";

import React, { useState } from "react";

/* ─────────── HELPERS ─────────── */
const rp = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);
const tgl = (s) =>
  new Date(s).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

/* ─────────── DATA DUMMY ─────────── */
const setoranAnggota = [
  { id: 1, nama: "Ahmad Fauzi", tanggal: "2026-05-07", jenis: "Simpanan Wajib", nominal: 500000, status: "Menunggu" },
  { id: 2, nama: "Siti Aisyah", tanggal: "2026-05-06", jenis: "Simpanan Sukarela", nominal: 2000000, status: "Menunggu" },
  { id: 3, nama: "Budi Santoso", tanggal: "2026-05-05", jenis: "Simpanan Pokok", nominal: 5000000, status: "Terverifikasi" },
  { id: 4, nama: "Dewi Kartika", tanggal: "2026-05-04", jenis: "Simpanan Wajib", nominal: 500000, status: "Terverifikasi" },
];

const pengajuanPembiayaan = [
  { id: 1, nama: "Rizky Pratama", tanggal: "2026-05-06", produk: "Murabahah", nominal: 25000000, status: "Menunggu" },
  { id: 2, nama: "Nur Halimah", tanggal: "2026-05-03", produk: "Mudharabah", nominal: 50000000, status: "Menunggu" },
  { id: 3, nama: "Eko Wijaya", tanggal: "2026-04-28", produk: "Ijarah", nominal: 15000000, status: "Disetujui" },
];

const statistik = {
  totalAset: 2850000000, arusKasMasuk: 320000000, arusKasKeluar: 185000000,
  shuTahunIni: 145000000, totalAnggota: 347, pembiayaanAktif: 89,
};

const neraca = [
  { akun: "Kas & Setara Kas", debit: 450000000, kredit: 0 },
  { akun: "Pembiayaan Murabahah", debit: 1200000000, kredit: 0 },
  { akun: "Pembiayaan Mudharabah", debit: 800000000, kredit: 0 },
  { akun: "Aset Tetap", debit: 400000000, kredit: 0 },
  { akun: "Simpanan Anggota", debit: 0, kredit: 1650000000 },
  { akun: "Dana Syirkah Temporer", debit: 0, kredit: 750000000 },
  { akun: "Modal Koperasi", debit: 0, kredit: 350000000 },
  { akun: "SHU Tahun Berjalan", debit: 0, kredit: 100000000 },
];

const labaRugi = [
  { pos: "Pendapatan Margin Murabahah", nominal: 180000000 },
  { pos: "Pendapatan Bagi Hasil Mudharabah", nominal: 95000000 },
  { pos: "Pendapatan Ujrah Ijarah", nominal: 42000000 },
  { pos: "Pendapatan Administrasi", nominal: 15000000 },
  { pos: "Beban Bagi Hasil Simpanan", nominal: -85000000 },
  { pos: "Beban Operasional", nominal: -72000000 },
  { pos: "Beban Penyisihan Kerugian", nominal: -30000000 },
];

/* ─────────── SUB-KOMPONEN ─────────── */
function Badge({ status }) {
  const m = {
    Menunggu: "bg-amber-50 text-amber-700 ring-amber-300",
    Terverifikasi: "bg-emerald-50 text-emerald-700 ring-emerald-300",
    Disetujui: "bg-blue-50 text-blue-700 ring-blue-300",
    Ditolak: "bg-red-50 text-red-700 ring-red-300",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${m[status] || m.Menunggu}`}>
      {status}
    </span>
  );
}

function KartuStat({ label, value, ikon, accent }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 hover:shadow-lg transition-shadow group">
      <div className="flex items-center gap-3 mb-3">
        <span className={`flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${accent} text-white text-lg shadow-sm`}>
          {ikon}
        </span>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-xl font-extrabold text-slate-800">{value}</p>
    </div>
  );
}

function BarSederhana({ label, persen, warna }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="text-slate-500 font-semibold">{persen}%</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full rounded-full ${warna} transition-all duration-1000`} style={{ width: `${persen}%` }} />
      </div>
    </div>
  );
}

/* ─────────── HALAMAN UTAMA ─────────── */
export default function PanelPengurus() {
  const [tabLaporan, setTabLaporan] = useState("neraca");
  const [dataSetoran, setDataSetoran] = useState(setoranAnggota);
  const [dataPembiayaan, setDataPembiayaan] = useState(pengajuanPembiayaan);

  const ubahStatusSetoran = (id, status) =>
    setDataSetoran((p) => p.map((s) => (s.id === id ? { ...s, status } : s)));
  const ubahStatusPembiayaan = (id, status) =>
    setDataPembiayaan((p) => p.map((s) => (s.id === id ? { ...s, status } : s)));

  const totalDebit = neraca.reduce((a, r) => a + r.debit, 0);
  const totalKredit = neraca.reduce((a, r) => a + r.kredit, 0);
  const totalPendapatan = labaRugi.filter((l) => l.nominal > 0).reduce((a, l) => a + l.nominal, 0);
  const totalBeban = Math.abs(labaRugi.filter((l) => l.nominal < 0).reduce((a, l) => a + l.nominal, 0));
  const labaBersih = totalPendapatan - totalBeban;

  /* distribusi SHU */
  const distSHU = [
    { label: "Anggota (40%)", persen: 40, warna: "bg-teal-500" },
    { label: "Cadangan (25%)", persen: 25, warna: "bg-emerald-500" },
    { label: "Pengurus (15%)", persen: 15, warna: "bg-cyan-500" },
    { label: "Pendidikan (10%)", persen: 10, warna: "bg-sky-500" },
    { label: "Sosial (10%)", persen: 10, warna: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <p className="text-teal-300 text-sm font-medium tracking-wide uppercase mb-1">Panel Pengurus</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Manajemen Koperasi Syariah</h1>
          <p className="mt-2 text-teal-200 text-base">Kelola transaksi, pantau keuangan, dan jaga amanah anggota.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-14">

        {/* ── STATISTIK REAL-TIME ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">Ringkasan Keuangan Real-time</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <KartuStat label="Total Aset" value={rp(statistik.totalAset)} ikon="🏦" accent="from-teal-500 to-teal-700" />
            <KartuStat label="Arus Kas Masuk" value={rp(statistik.arusKasMasuk)} ikon="📈" accent="from-emerald-500 to-emerald-700" />
            <KartuStat label="Arus Kas Keluar" value={rp(statistik.arusKasKeluar)} ikon="📉" accent="from-rose-500 to-rose-700" />
            <KartuStat label="SHU Tahun Ini" value={rp(statistik.shuTahunIni)} ikon="💰" accent="from-amber-500 to-amber-700" />
            <KartuStat label="Total Anggota" value={statistik.totalAnggota} ikon="👥" accent="from-cyan-500 to-cyan-700" />
            <KartuStat label="Pembiayaan Aktif" value={statistik.pembiayaanAktif} ikon="📋" accent="from-indigo-500 to-indigo-700" />
          </div>

          {/* Distribusi SHU */}
          <div className="mt-8 bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <h3 className="text-base font-bold text-slate-700 mb-4">Distribusi Sisa Hasil Usaha (SHU)</h3>
            <div className="space-y-3">
              {distSHU.map((d) => (
                <BarSederhana key={d.label} {...d} />
              ))}
            </div>
          </div>
        </section>

        {/* ── MANAJEMEN TRANSAKSI ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">Manajemen Transaksi</h2>
          </div>

          {/* Tabel Verifikasi Setoran */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-700">Verifikasi Setoran Anggota</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-3 text-left">Nama</th>
                    <th className="px-6 py-3 text-left">Tanggal</th>
                    <th className="px-6 py-3 text-left">Jenis</th>
                    <th className="px-6 py-3 text-right">Nominal</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSetoran.map((s, i) => (
                    <tr key={s.id} className={`${i % 2 ? "bg-slate-50/50" : ""} hover:bg-teal-50/30 transition-colors`}>
                      <td className="px-6 py-3 font-medium text-slate-800">{s.nama}</td>
                      <td className="px-6 py-3 text-slate-500">{tgl(s.tanggal)}</td>
                      <td className="px-6 py-3 text-slate-600">{s.jenis}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-800">{rp(s.nominal)}</td>
                      <td className="px-6 py-3 text-center"><Badge status={s.status} /></td>
                      <td className="px-6 py-3 text-center">
                        {s.status === "Menunggu" ? (
                          <button onClick={() => ubahStatusSetoran(s.id, "Terverifikasi")} className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors shadow-sm">
                            Verifikasi
                          </button>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Persetujuan Pembiayaan */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-700">Persetujuan Pengajuan Pembiayaan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-3 text-left">Nama</th>
                    <th className="px-6 py-3 text-left">Tanggal</th>
                    <th className="px-6 py-3 text-left">Produk</th>
                    <th className="px-6 py-3 text-right">Nominal</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPembiayaan.map((p, i) => (
                    <tr key={p.id} className={`${i % 2 ? "bg-slate-50/50" : ""} hover:bg-teal-50/30 transition-colors`}>
                      <td className="px-6 py-3 font-medium text-slate-800">{p.nama}</td>
                      <td className="px-6 py-3 text-slate-500">{tgl(p.tanggal)}</td>
                      <td className="px-6 py-3 text-slate-600">{p.produk}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-800">{rp(p.nominal)}</td>
                      <td className="px-6 py-3 text-center"><Badge status={p.status} /></td>
                      <td className="px-6 py-3 text-center">
                        {p.status === "Menunggu" ? (
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => ubahStatusPembiayaan(p.id, "Disetujui")} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
                              Setujui
                            </button>
                            <button onClick={() => ubahStatusPembiayaan(p.id, "Ditolak")} className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors shadow-sm">
                              Tolak
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── LAPORAN KEUANGAN PERIODE ── */}
        <section>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
              <h2 className="text-xl font-bold text-slate-800">Laporan Keuangan Periode</h2>
            </div>
            {/* Badge Transparansi */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
              <span className="text-emerald-600 text-lg">✅</span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                Terverifikasi Dewan Pengawas Syariah
              </span>
            </div>
          </div>

          {/* Tab Switch */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "neraca", label: "Neraca" },
              { key: "labarugi", label: "Laba Rugi" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTabLaporan(t.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tabLaporan === t.key
                    ? "bg-teal-700 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            {tabLaporan === "neraca" ? (
              <>
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-700">Neraca — Per 30 April 2026</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <th className="px-6 py-3 text-left">Akun</th>
                        <th className="px-6 py-3 text-right">Debit</th>
                        <th className="px-6 py-3 text-right">Kredit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {neraca.map((r, i) => (
                        <tr key={i} className={`${i % 2 ? "bg-slate-50/50" : ""}`}>
                          <td className="px-6 py-3 text-slate-700 font-medium">{r.akun}</td>
                          <td className="px-6 py-3 text-right text-slate-800">{r.debit ? rp(r.debit) : "—"}</td>
                          <td className="px-6 py-3 text-right text-slate-800">{r.kredit ? rp(r.kredit) : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-teal-50 font-bold border-t-2 border-teal-200">
                        <td className="px-6 py-3 text-teal-800">Total</td>
                        <td className="px-6 py-3 text-right text-teal-800">{rp(totalDebit)}</td>
                        <td className="px-6 py-3 text-right text-teal-800">{rp(totalKredit)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-700">Laporan Laba Rugi — Januari – April 2026</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <th className="px-6 py-3 text-left">Pos</th>
                        <th className="px-6 py-3 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labaRugi.map((l, i) => (
                        <tr key={i} className={`${i % 2 ? "bg-slate-50/50" : ""}`}>
                          <td className="px-6 py-3 text-slate-700 font-medium">{l.pos}</td>
                          <td className={`px-6 py-3 text-right font-semibold ${l.nominal < 0 ? "text-red-600" : "text-emerald-700"}`}>
                            {l.nominal < 0 ? `(${rp(Math.abs(l.nominal))})` : rp(l.nominal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-teal-200 bg-teal-50 font-bold">
                        <td className="px-6 py-3 text-teal-800">Laba Bersih</td>
                        <td className="px-6 py-3 text-right text-teal-800">{rp(labaBersih)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 text-center text-sm text-slate-500">
          © 2026 Koperasi Syariah Digital — Panel Pengurus · Amanah · Transparan
        </div>
      </footer>
    </div>
  );
}

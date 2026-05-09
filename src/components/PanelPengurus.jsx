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

const dataAnggota = [
  { id: "A-001", nama: "Ahmad Fauzi", tglGabung: "2024-01-15", saldo: 15500000, status: "Aktif" },
  { id: "A-002", nama: "Siti Aisyah", tglGabung: "2024-02-20", saldo: 8200000, status: "Aktif" },
  { id: "A-003", nama: "Budi Santoso", tglGabung: "2023-11-05", saldo: 45000000, status: "Aktif" },
  { id: "A-004", nama: "Dewi Kartika", tglGabung: "2025-03-10", saldo: 2500000, status: "Tidak Aktif" },
  { id: "A-005", nama: "Eko Wijaya", tglGabung: "2024-06-18", saldo: 12000000, status: "Aktif" },
];

/* ─────────── SUB-KOMPONEN ─────────── */
function Badge({ status }) {
  const m = {
    Menunggu: "bg-amber-50 text-amber-700 ring-amber-300",
    Terverifikasi: "bg-emerald-50 text-emerald-700 ring-emerald-300",
    Disetujui: "bg-blue-50 text-blue-700 ring-blue-300",
    Ditolak: "bg-red-50 text-red-700 ring-red-300",
    Aktif: "bg-teal-50 text-teal-700 ring-teal-300",
    "Tidak Aktif": "bg-slate-100 text-slate-500 ring-slate-300",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${m[status] || m.Menunggu}`}>
      {status}
    </span>
  );
}

function KartuStat({ label, value, ikon, accent }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow group cursor-pointer">
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

/* ─────────── KOMPONEN MODAL ─────────── */
function ModalDetail({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        <div className={`p-6 text-white ${data.warnaHeader || "bg-teal-600"}`}>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{data.judul}</h3>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
          </div>
        </div>
        <div className="p-6 text-slate-700">
          {data.isi}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── VIEWS ─────────── */
function ViewDashboard() {
  const distSHU = [
    { label: "Anggota (40%)", persen: 40, warna: "bg-teal-500" },
    { label: "Cadangan (25%)", persen: 25, warna: "bg-emerald-500" },
    { label: "Pengurus (15%)", persen: 15, warna: "bg-cyan-500" },
    { label: "Pendidikan (10%)", persen: 10, warna: "bg-sky-500" },
    { label: "Sosial (10%)", persen: 10, warna: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Ringkasan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <KartuStat label="Total Aset" value={rp(statistik.totalAset)} ikon="🏦" accent="from-teal-500 to-teal-700" />
          <KartuStat label="Arus Kas Masuk" value={rp(statistik.arusKasMasuk)} ikon="📈" accent="from-emerald-500 to-emerald-700" />
          <KartuStat label="Arus Kas Keluar" value={rp(statistik.arusKasKeluar)} ikon="📉" accent="from-rose-500 to-rose-700" />
          <KartuStat label="SHU Tahun Ini" value={rp(statistik.shuTahunIni)} ikon="💰" accent="from-amber-500 to-amber-700" />
          <KartuStat label="Total Anggota" value={statistik.totalAnggota} ikon="👥" accent="from-cyan-500 to-cyan-700" />
          <KartuStat label="Pembiayaan Aktif" value={statistik.pembiayaanAktif} ikon="📋" accent="from-indigo-500 to-indigo-700" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-700 mb-6">Distribusi Sisa Hasil Usaha (SHU)</h3>
        <div className="space-y-4">
          {distSHU.map((d) => (
            <BarSederhana key={d.label} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewTransaksi({ dataSetoran, ubahStatusSetoran, dataPembiayaan, ubahStatusPembiayaan, setModalData }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-800">Manajemen Transaksi</h2>

      {/* Tabel Verifikasi Setoran */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
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
                  <td className="px-6 py-4 font-medium text-slate-800">{s.nama}</td>
                  <td className="px-6 py-4 text-slate-500">{tgl(s.tanggal)}</td>
                  <td className="px-6 py-4 text-slate-600">{s.jenis}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-800">{rp(s.nominal)}</td>
                  <td className="px-6 py-4 text-center"><Badge status={s.status} /></td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => setModalData({
                          judul: "Detail Setoran Anggota",
                          warnaHeader: "bg-teal-700",
                          isi: (
                            <div className="space-y-3">
                              <p><strong>Nama:</strong> {s.nama}</p>
                              <p><strong>Tanggal:</strong> {tgl(s.tanggal)}</p>
                              <p><strong>Jenis:</strong> {s.jenis}</p>
                              <p><strong>Nominal:</strong> {rp(s.nominal)}</p>
                              <p><strong>Status:</strong> <Badge status={s.status} /></p>
                              <hr className="my-2"/>
                              <p className="text-sm text-slate-500">Periksa mutasi rekening koperasi sebelum memverifikasi setoran ini untuk memastikan dana telah efektif masuk.</p>
                            </div>
                          )
                        })}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                      >
                        Detail
                      </button>
                      {s.status === "Menunggu" && (
                        <button onClick={() => ubahStatusSetoran(s.id, "Terverifikasi")} className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors shadow-sm">
                          Verifikasi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Persetujuan Pembiayaan */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-700">Persetujuan Pembiayaan</h3>
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
                  <td className="px-6 py-4 font-medium text-slate-800">{p.nama}</td>
                  <td className="px-6 py-4 text-slate-500">{tgl(p.tanggal)}</td>
                  <td className="px-6 py-4 text-slate-600">{p.produk}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-800">{rp(p.nominal)}</td>
                  <td className="px-6 py-4 text-center"><Badge status={p.status} /></td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => setModalData({
                          judul: "Detail Pembiayaan",
                          warnaHeader: "bg-emerald-700",
                          isi: (
                            <div className="space-y-3">
                              <p><strong>Nama Pemohon:</strong> {p.nama}</p>
                              <p><strong>Produk:</strong> {p.produk}</p>
                              <p><strong>Nominal Diajukan:</strong> <span className="text-xl font-bold text-teal-700">{rp(p.nominal)}</span></p>
                              <p><strong>Status:</strong> <Badge status={p.status} /></p>
                              <hr className="my-2"/>
                              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm">
                                <p className="font-semibold mb-1">Catatan Analis:</p>
                                <p>Rasio simpanan mencukupi. Riwayat pembayaran lancar.</p>
                              </div>
                            </div>
                          )
                        })}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                      >
                        Detail
                      </button>
                      {p.status === "Menunggu" && (
                        <>
                          <button onClick={() => ubahStatusPembiayaan(p.id, "Disetujui")} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
                            Setujui
                          </button>
                          <button onClick={() => ubahStatusPembiayaan(p.id, "Ditolak")} className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors shadow-sm">
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ViewLaporan({ tabLaporan, setTabLaporan }) {
  const totalDebit = neraca.reduce((a, r) => a + r.debit, 0);
  const totalKredit = neraca.reduce((a, r) => a + r.kredit, 0);
  const totalPendapatan = labaRugi.filter((l) => l.nominal > 0).reduce((a, l) => a + l.nominal, 0);
  const totalBeban = Math.abs(labaRugi.filter((l) => l.nominal < 0).reduce((a, l) => a + l.nominal, 0));
  const labaBersih = totalPendapatan - totalBeban;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Laporan Keuangan</h2>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
          <span className="text-emerald-600">✅</span>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
            Terverifikasi DPS
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {[{ key: "neraca", label: "Neraca" }, { key: "labarugi", label: "Laba Rugi" }].map((t) => (
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {tabLaporan === "neraca" ? (
          <>
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-700">Neraca Koperasi (Per 30 April 2026)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-3 text-left">Pos Akun</th>
                    <th className="px-6 py-3 text-right">Debit</th>
                    <th className="px-6 py-3 text-right">Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  {neraca.map((r, i) => (
                    <tr key={i} className={`${i % 2 ? "bg-slate-50/50" : ""}`}>
                      <td className="px-6 py-4 text-slate-700 font-medium">{r.akun}</td>
                      <td className="px-6 py-4 text-right text-slate-800">{r.debit ? rp(r.debit) : "—"}</td>
                      <td className="px-6 py-4 text-right text-slate-800">{r.kredit ? rp(r.kredit) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-teal-50 font-bold border-t-2 border-teal-200">
                    <td className="px-6 py-4 text-teal-800">Total Keseluruhan</td>
                    <td className="px-6 py-4 text-right text-teal-800">{rp(totalDebit)}</td>
                    <td className="px-6 py-4 text-right text-teal-800">{rp(totalKredit)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-700">Laporan Laba Rugi (Jan – Apr 2026)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-3 text-left">Pos Keterangan</th>
                    <th className="px-6 py-3 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {labaRugi.map((l, i) => (
                    <tr key={i} className={`${i % 2 ? "bg-slate-50/50" : ""}`}>
                      <td className="px-6 py-4 text-slate-700 font-medium">{l.pos}</td>
                      <td className={`px-6 py-4 text-right font-semibold ${l.nominal < 0 ? "text-red-600" : "text-emerald-700"}`}>
                        {l.nominal < 0 ? `(${rp(Math.abs(l.nominal))})` : rp(l.nominal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-teal-200 bg-teal-50 font-bold">
                    <td className="px-6 py-4 text-teal-800 text-lg">Laba Bersih Tahun Berjalan</td>
                    <td className="px-6 py-4 text-right text-teal-800 text-lg">{rp(labaBersih)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ViewDataAnggota({ setModalData }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Direktori Anggota Koperasi</h2>
        <button className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 shadow-sm">
          + Tambah Anggota Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-4 text-left">ID Anggota</th>
                <th className="px-6 py-4 text-left">Nama Lengkap</th>
                <th className="px-6 py-4 text-left">Tanggal Bergabung</th>
                <th className="px-6 py-4 text-right">Total Saldo Simpanan</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataAnggota.map((a, i) => (
                <tr key={a.id} className={`${i % 2 ? "bg-slate-50/50" : ""} hover:bg-teal-50/30 transition-colors`}>
                  <td className="px-6 py-4 font-mono text-slate-500">{a.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{a.nama}</td>
                  <td className="px-6 py-4 text-slate-500">{tgl(a.tglGabung)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-800">{rp(a.saldo)}</td>
                  <td className="px-6 py-4 text-center"><Badge status={a.status} /></td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setModalData({
                        judul: `Profil Anggota: ${a.nama}`,
                        warnaHeader: "bg-teal-700",
                        isi: (
                          <div className="space-y-3">
                            <p><strong>ID Anggota:</strong> {a.id}</p>
                            <p><strong>Nama:</strong> {a.nama}</p>
                            <p><strong>Bergabung Sejak:</strong> {tgl(a.tglGabung)}</p>
                            <p><strong>Total Saldo:</strong> <span className="text-lg font-bold text-teal-700">{rp(a.saldo)}</span></p>
                            <p><strong>Status Keanggotaan:</strong> <Badge status={a.status} /></p>
                            <hr className="my-2"/>
                            <p className="text-sm text-slate-500">Anggota ini telah mematuhi seluruh kewajiban simpanan pokok dan wajib. Riwayat pembiayaan berstatus baik.</p>
                          </div>
                        )
                      })}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Lihat Profil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─────────── HALAMAN UTAMA (DASHBOARD LAYOUT) ─────────── */
export default function PanelPengurus() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [modalData, setModalData] = useState(null);
  
  // State untuk Tab Laporan
  const [tabLaporan, setTabLaporan] = useState("neraca");
  
  // State untuk Transaksi
  const [dataSetoran, setDataSetoran] = useState(setoranAnggota);
  const [dataPembiayaan, setDataPembiayaan] = useState(pengajuanPembiayaan);

  const ubahStatusSetoran = (id, status) =>
    setDataSetoran((p) => p.map((s) => (s.id === id ? { ...s, status } : s)));
  const ubahStatusPembiayaan = (id, status) =>
    setDataPembiayaan((p) => p.map((s) => (s.id === id ? { ...s, status } : s)));

  // Menu Sidebar
  const menus = [
    { id: "dashboard", label: "Dashboard", ikon: "📊" },
    { id: "transaksi", label: "Transaksi", ikon: "💳" },
    { id: "laporan", label: "Laporan", ikon: "📄" },
    { id: "anggota", label: "Data Anggota", ikon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* ── SIDEBAR ── */}
      <aside className="w-full md:w-64 bg-teal-800 text-white flex-shrink-0 flex flex-col border-r border-teal-900 shadow-xl z-10 hidden md:flex">
        <div className="p-6 border-b border-teal-700/50">
          <p className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-1">Panel Admin</p>
          <h1 className="text-2xl font-extrabold tracking-tight leading-none">KSPPS Digital</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menus.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMenu(m.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium ${
                activeMenu === m.id 
                  ? "bg-teal-600 text-white shadow-md transform translate-x-1" 
                  : "text-teal-100 hover:bg-teal-700/50 hover:text-white hover:translate-x-1"
              }`}
            >
              <span className="text-xl">{m.ikon}</span>
              {m.label}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-teal-700/50 text-xs text-teal-300/60">
          © 2026 Amanah · Transparan
        </div>
      </aside>

      {/* ── MOBILE NAV (Tampil jika di layar kecil) ── */}
      <div className="md:hidden bg-teal-800 p-4 flex gap-2 overflow-x-auto shadow-md z-10 sticky top-0">
        {menus.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMenu(m.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === m.id ? "bg-teal-600 text-white" : "bg-teal-800 text-teal-200 border border-teal-700"
            }`}
          >
            {m.ikon} {m.label}
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {/* Header Mobile bisa juga ditaruh di atas konten jika diperlukan */}
          <header className="mb-10 flex justify-between items-end">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
                Koperasi Syariah
              </p>
              <h1 className="text-3xl font-extrabold text-slate-800">
                {menus.find((m) => m.id === activeMenu)?.label}
              </h1>
            </div>
            
            {/* User Profile Mini */}
            <div className="hidden sm:flex items-center gap-3 bg-white p-2 pr-4 rounded-full shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border-2 border-white shadow-sm">
                AD
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-700 leading-none">Admin Pusat</p>
                <p className="text-xs text-slate-500 mt-1">Pengurus Aktif</p>
              </div>
            </div>
          </header>

          {/* RENDER KONTEN BERDASARKAN MENU AKTIF */}
          {activeMenu === "dashboard" && <ViewDashboard />}
          {activeMenu === "transaksi" && (
            <ViewTransaksi 
              dataSetoran={dataSetoran} 
              ubahStatusSetoran={ubahStatusSetoran}
              dataPembiayaan={dataPembiayaan}
              ubahStatusPembiayaan={ubahStatusPembiayaan}
              setModalData={setModalData}
            />
          )}
          {activeMenu === "laporan" && (
            <ViewLaporan 
              tabLaporan={tabLaporan} 
              setTabLaporan={setTabLaporan} 
            />
          )}
          {activeMenu === "anggota" && (
            <ViewDataAnggota setModalData={setModalData} />
          )}

        </div>
      </main>

      {/* Global Modal */}
      <ModalDetail 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        data={modalData} 
      />
    </div>
  );
}

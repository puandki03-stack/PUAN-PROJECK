"use client";

import React, { useState, useMemo } from "react";

/* ─────────── HELPERS ─────────── */
const rp = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

const NISHAB_EMAS_85GRAM = 85 * 1_050_000; // ≈ Rp 89.250.000 (perkiraan harga emas/gram)
const TARIF_ZAKAT = 0.025; // 2.5%

/* ─────────── KOMPONEN UTAMA ─────────── */
export default function SimpananProses() {
  /* ── STATE FORM SETORAN ── */
  const [form, setForm] = useState({
    jenisProduk: "",
    namaPengaju: "",
    asetDimiliki: "",
    totalPengajuan: "",
    metodeBayar: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* ── STATE KALKULATOR ZAKAT ── */
  const [saldoSimpanan, setSaldoSimpanan] = useState("");
  const [infaqNominal, setInfaqNominal] = useState("");
  const [infaqAktif, setInfaqAktif] = useState(false);

  /* ── PRODUK OPTIONS ── */
  const produkOptions = [
    "Murabahah",
    "Mudharabah",
    "Musyarakah",
    "Ijarah",
    "Istishna",
  ];

  /* ── VALIDASI ── */
  const validasi = () => {
    const e = {};
    if (!form.jenisProduk) e.jenisProduk = "Pilih jenis produk";
    if (!form.namaPengaju.trim()) e.namaPengaju = "Nama wajib diisi";
    if (!form.asetDimiliki || Number(form.asetDimiliki) <= 0)
      e.asetDimiliki = "Masukkan nilai aset yang valid";
    if (!form.totalPengajuan || Number(form.totalPengajuan) <= 0)
      e.totalPengajuan = "Masukkan nominal pengajuan yang valid";
    if (Number(form.totalPengajuan) > Number(form.asetDimiliki))
      e.totalPengajuan = "Pengajuan tidak boleh melebihi aset yang dimiliki";
    if (!form.metodeBayar) e.metodeBayar = "Pilih metode pembayaran";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validasi()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ jenisProduk: "", namaPengaju: "", asetDimiliki: "", totalPengajuan: "", metodeBayar: "" });
    setErrors({});
    setSubmitted(false);
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  /* ── KALKULASI ZAKAT ── */
  const saldoNum = Number(saldoSimpanan) || 0;
  const zakatInfo = useMemo(() => {
    if (saldoNum <= 0) return null;
    const wajibZakat = saldoNum >= NISHAB_EMAS_85GRAM;
    return {
      wajibZakat,
      nishabFormatted: rp(NISHAB_EMAS_85GRAM),
      zakatNominal: wajibZakat ? saldoNum * TARIF_ZAKAT : 0,
    };
  }, [saldoNum]);

  const infaqNum = Number(infaqNominal) || 0;

  /* ── INPUT WRAPPER ── */
  const InputField = ({ label, id, error, children }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );

  const inputCls = (err) =>
    `w-full rounded-xl border ${
      err ? "border-red-400 ring-2 ring-red-100" : "border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
    } bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
          <p className="text-teal-200 text-sm font-medium tracking-wide uppercase mb-1">Koperasi Syariah Digital</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Proses Simpanan &amp; Pengajuan</h1>
          <p className="mt-2 text-teal-100">Ajukan pembiayaan dan kelola zakat/infaq Anda dengan mudah.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-14">

        {/* ═══════════ FORM SETORAN / PENGAJUAN ═══════════ */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">Form Pengajuan Pembiayaan</h2>
          </div>

          {/* Pesan Ta'awun */}
          <div className="mb-6 bg-teal-50 border border-teal-200 rounded-2xl p-5 flex gap-4 items-start">
            <span className="text-3xl mt-0.5">🤲</span>
            <div>
              <p className="text-sm font-bold text-teal-800 mb-1">Keutamaan Ta&apos;awun (Tolong-Menolong)</p>
              <p className="text-sm text-teal-700 leading-relaxed">
                Rasulullah ﷺ bersabda: <em>&quot;Barangsiapa meringankan beban seorang mukmin di dunia, Allah akan meringankan
                bebannya di hari kiamat.&quot;</em>
                <span className="font-semibold block mt-1">(HR. Muslim)</span>
              </p>
            </div>
          </div>

          {submitted ? (
            /* Sukses */
            <div className="bg-white rounded-2xl shadow-md border border-emerald-200 p-8 text-center space-y-4">
              <span className="text-5xl">✅</span>
              <h3 className="text-xl font-bold text-emerald-700">Pengajuan Berhasil Dikirim!</h3>
              <p className="text-sm text-slate-500">Pengajuan Anda akan diverifikasi oleh pengurus. Semoga dimudahkan.</p>
              <div className="bg-slate-50 rounded-xl p-4 text-left text-sm space-y-1 max-w-md mx-auto">
                <p><span className="font-semibold text-slate-600">Produk:</span> {form.jenisProduk}</p>
                <p><span className="font-semibold text-slate-600">Nama:</span> {form.namaPengaju}</p>
                <p><span className="font-semibold text-slate-600">Aset:</span> {rp(Number(form.asetDimiliki))}</p>
                <p><span className="font-semibold text-slate-600">Pengajuan:</span> {rp(Number(form.totalPengajuan))}</p>
                <p><span className="font-semibold text-slate-600">Metode:</span> {form.metodeBayar}</p>
              </div>
              <button onClick={resetForm} className="mt-2 px-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors shadow-sm">
                Buat Pengajuan Baru
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8 space-y-5">
              {/* Jenis Produk */}
              <InputField label="Jenis Produk Pembiayaan" id="jenisProduk" error={errors.jenisProduk}>
                <select
                  id="jenisProduk"
                  value={form.jenisProduk}
                  onChange={(e) => handleChange("jenisProduk", e.target.value)}
                  className={inputCls(errors.jenisProduk)}
                >
                  <option value="">— Pilih Produk —</option>
                  {produkOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </InputField>

              {/* Nama */}
              <InputField label="Nama Pengaju" id="namaPengaju" error={errors.namaPengaju}>
                <input
                  id="namaPengaju"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={form.namaPengaju}
                  onChange={(e) => handleChange("namaPengaju", e.target.value)}
                  className={inputCls(errors.namaPengaju)}
                />
              </InputField>

              {/* Aset */}
              <InputField label="Aset yang Dimiliki (Rp)" id="asetDimiliki" error={errors.asetDimiliki}>
                <input
                  id="asetDimiliki"
                  type="number"
                  min="0"
                  placeholder="Contoh: 50000000"
                  value={form.asetDimiliki}
                  onChange={(e) => handleChange("asetDimiliki", e.target.value)}
                  className={inputCls(errors.asetDimiliki)}
                />
              </InputField>

              {/* Total Pengajuan */}
              <InputField label="Total yang Ingin Diajukan (Rp)" id="totalPengajuan" error={errors.totalPengajuan}>
                <input
                  id="totalPengajuan"
                  type="number"
                  min="0"
                  placeholder="Contoh: 25000000"
                  value={form.totalPengajuan}
                  onChange={(e) => handleChange("totalPengajuan", e.target.value)}
                  className={inputCls(errors.totalPengajuan)}
                />
              </InputField>

              {/* Metode Bayar */}
              <InputField label="Metode Pembayaran" id="metodeBayar" error={errors.metodeBayar}>
                <div className="flex gap-4">
                  {["Transfer Bank", "Potong Saldo"].map((m) => (
                    <label
                      key={m}
                      className={`flex-1 cursor-pointer rounded-xl border-2 px-4 py-3 text-center text-sm font-semibold transition-all ${
                        form.metodeBayar === m
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="metodeBayar"
                        value={m}
                        checked={form.metodeBayar === m}
                        onChange={(e) => handleChange("metodeBayar", e.target.value)}
                        className="sr-only"
                      />
                      {m === "Transfer Bank" ? "🏧 " : "💳 "}
                      {m}
                    </label>
                  ))}
                </div>
              </InputField>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold text-base hover:from-teal-700 hover:to-teal-800 transition-all shadow-md shadow-teal-200 active:scale-[0.98]"
              >
                Kirim Pengajuan
              </button>
            </form>
          )}
        </section>

        {/* ═══════════ KALKULATOR ZAKAT & INFAQ ═══════════ */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-700" />
            <h2 className="text-xl font-bold text-slate-800">Kalkulator Zakat Mal &amp; Infaq</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8 space-y-6">
            {/* Input Saldo */}
            <div>
              <label htmlFor="saldoSimpanan" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Total Saldo Simpanan Anda (Rp)
              </label>
              <input
                id="saldoSimpanan"
                type="number"
                min="0"
                placeholder="Masukkan total saldo simpanan"
                value={saldoSimpanan}
                onChange={(e) => setSaldoSimpanan(e.target.value)}
                className="w-full rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Hasil Zakat */}
            {zakatInfo && (
              <div className={`rounded-2xl p-5 ${zakatInfo.wajibZakat ? "bg-amber-50 border border-amber-200" : "bg-slate-50 border border-slate-200"}`}>
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                  {zakatInfo.wajibZakat ? "⚠️" : "ℹ️"}
                  <span className={zakatInfo.wajibZakat ? "text-amber-800" : "text-slate-600"}>
                    {zakatInfo.wajibZakat ? "Saldo Anda sudah mencapai Nishab!" : "Saldo belum mencapai Nishab"}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Nishab (85 gr emas)</p>
                    <p className="font-bold text-slate-700">{zakatInfo.nishabFormatted}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Saldo Anda</p>
                    <p className="font-bold text-slate-700">{rp(saldoNum)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Zakat 2.5%</p>
                    <p className={`font-extrabold ${zakatInfo.wajibZakat ? "text-amber-700" : "text-slate-400"}`}>
                      {zakatInfo.wajibZakat ? rp(zakatInfo.zakatNominal) : "—"}
                    </p>
                  </div>
                </div>

                {zakatInfo.wajibZakat && (
                  <p className="mt-3 text-xs text-amber-700 italic">
                    * Zakat mal wajib dikeluarkan jika harta telah mencapai nishab dan haul (1 tahun).
                  </p>
                )}
              </div>
            )}

            {/* Infaq Sukarela */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-700">💚 Infaq Sukarela di Akhir Transaksi</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={infaqAktif}
                    onChange={(e) => setInfaqAktif(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-teal-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

              {infaqAktif && (
                <div className="space-y-3">
                  <input
                    type="number"
                    min="0"
                    placeholder="Masukkan nominal infaq (Rp)"
                    value={infaqNominal}
                    onChange={(e) => setInfaqNominal(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
                  />
                  {infaqNum > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
                      <p className="text-emerald-700">
                        Anda berinfaq sebesar <span className="font-bold">{rp(infaqNum)}</span>. Jazakallahu khairan! 🤲
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ringkasan */}
            {(zakatInfo?.wajibZakat || (infaqAktif && infaqNum > 0)) && (
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-3">📋 Ringkasan Kewajiban &amp; Kebaikan</h4>
                <div className="space-y-2 text-sm">
                  {zakatInfo?.wajibZakat && (
                    <div className="flex justify-between">
                      <span className="text-teal-100">Zakat Mal (2.5%)</span>
                      <span className="font-bold">{rp(zakatInfo.zakatNominal)}</span>
                    </div>
                  )}
                  {infaqAktif && infaqNum > 0 && (
                    <div className="flex justify-between">
                      <span className="text-teal-100">Infaq Sukarela</span>
                      <span className="font-bold">{rp(infaqNum)}</span>
                    </div>
                  )}
                  <div className="border-t border-teal-500 pt-2 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-extrabold text-lg">
                      {rp((zakatInfo?.wajibZakat ? zakatInfo.zakatNominal : 0) + (infaqAktif ? infaqNum : 0))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Motivasi penutup */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg">
          <p className="text-lg font-semibold mb-1">🌙 Pengingat</p>
          <p className="text-teal-100 leading-relaxed italic">
            &quot;Sedekah itu tidak mengurangi harta. Allah tidak menambah seorang hamba yang
            pemaaf kecuali kemuliaan, dan tidaklah seseorang merendahkan diri karena Allah
            kecuali Dia meninggikannya.&quot;
            <span className="not-italic font-semibold block mt-1 text-white/90">— HR. Muslim</span>
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 text-center text-sm text-slate-500">
          © 2026 Koperasi Syariah Digital — Amanah · Berkah · Transparan
        </div>
      </footer>
    </div>
  );
}

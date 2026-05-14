"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 font-sans">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Pendaftaran Berhasil!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Terima kasih telah mendaftar. Data Anda sedang kami verifikasi. Kami akan menghubungi Anda melalui email atau WhatsApp untuk proses selanjutnya.
          </p>
          <Link 
            href="/login" 
            className="block w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-colors"
          >
            Lanjut ke Halaman Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4 text-teal-700 hover:text-teal-900 font-semibold text-sm transition-colors">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            Form Pendaftaran Anggota
          </h1>
          <p className="text-slate-600 text-lg">
            Koperasi Simpan Pinjam dan Pembiayaan Syariah (KSPPS)
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Decorative Header */}
          <div className="h-3 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500"></div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            
            {/* Section 1: Data Pribadi */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-sm">1</span>
                Data Pribadi
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label htmlFor="nik" className="block text-sm font-semibold text-slate-700 mb-2">Nomor Induk Kependudukan (NIK)</label>
                  <input type="text" id="nik" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="16 digit NIK" pattern="[0-9]{16}" />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="nama" className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap (Sesuai KTP)</label>
                  <input type="text" id="nama" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="Masukkan nama lengkap" />
                </div>

                <div>
                  <label htmlFor="tempat_lahir" className="block text-sm font-semibold text-slate-700 mb-2">Tempat Lahir</label>
                  <input type="text" id="tempat_lahir" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="Kota kelahiran" />
                </div>

                <div>
                  <label htmlFor="tanggal_lahir" className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir</label>
                  <input type="date" id="tanggal_lahir" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-700" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Jenis Kelamin</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gender" value="Laki-laki" required className="w-5 h-5 text-teal-600 focus:ring-teal-500 border-slate-300" />
                      <span className="text-slate-700">Laki-laki</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gender" value="Perempuan" required className="w-5 h-5 text-teal-600 focus:ring-teal-500 border-slate-300" />
                      <span className="text-slate-700">Perempuan</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="alamat" className="block text-sm font-semibold text-slate-700 mb-2">Alamat Domisili Lengkap</label>
                  <textarea id="alamat" rows={3} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none" placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan"></textarea>
                </div>
              </div>
            </div>

            {/* Section 2: Kontak & Pekerjaan */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-sm">2</span>
                Kontak & Pekerjaan
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nohp" className="block text-sm font-semibold text-slate-700 mb-2">No. WhatsApp / HP</label>
                  <input type="tel" id="nohp" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="08xxxxxxxxxx" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Alamat Email Aktif</label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="nama@email.com" />
                </div>

                <div>
                  <label htmlFor="pekerjaan" className="block text-sm font-semibold text-slate-700 mb-2">Jenis Pekerjaan</label>
                  <select id="pekerjaan" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-700 bg-white">
                    <option value="">Pilih pekerjaan...</option>
                    <option value="PNS">PNS / TNI / Polri</option>
                    <option value="Pegawai Swasta">Pegawai Swasta</option>
                    <option value="Wiraswasta">Wiraswasta / Pengusaha</option>
                    <option value="Profesional">Profesional (Dokter, Pengacara, dll)</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pendapatan" className="block text-sm font-semibold text-slate-700 mb-2">Pendapatan Rata-rata per Bulan</label>
                  <select id="pendapatan" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-700 bg-white">
                    <option value="">Pilih rentang pendapatan...</option>
                    <option value="< 3 Juta">&lt; Rp 3.000.000</option>
                    <option value="3 - 5 Juta">Rp 3.000.000 - Rp 5.000.000</option>
                    <option value="5 - 10 Juta">Rp 5.000.000 - Rp 10.000.000</option>
                    <option value="> 10 Juta">&gt; Rp 10.000.000</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Persetujuan Akad */}
            <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                Pernyataan & Persetujuan Akad
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-1">
                    <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
                    Saya menyatakan bersedia menjadi anggota Koperasi Syariah Digital dan patuh pada Anggaran Dasar (AD) serta Anggaran Rumah Tangga (ART) yang berlaku.
                  </span>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-1">
                    <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
                    Saya bersedia menyetorkan <strong>Simpanan Pokok</strong> sebesar Rp 5.000.000 (satu kali) dan <strong>Simpanan Wajib</strong> sesuai ketentuan (setiap bulan).
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-1">
                    <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
                    Semua transaksi yang saya lakukan di Koperasi ini akan dilandasi oleh prinsip-prinsip Syariah Islam tanpa unsur Riba, Gharar, dan Maysir.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between flex-col-reverse sm:flex-row gap-4">
              <span className="text-sm text-slate-500 flex items-center gap-1">
                🔒 Data Anda dilindungi dengan enkripsi aman
              </span>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-lg shadow-teal-700/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Kirim Pendaftaran"
                )}
              </button>
            </div>
            
          </form>
        </div>
        
      </div>
    </div>
  );
}

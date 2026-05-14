"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ── Modal Component ── */
function Modal({ open, onClose, title, icon, children }: { open: boolean, onClose: () => void, title: string, icon: React.ReactNode, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white p-1.5">
              {icon}
            </div>
            <h3 className="text-white font-bold text-lg tracking-wide">{title}</h3>
          </div>
          <button onClick={onClose} className="text-teal-100 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all">
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-slate-700">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors">
            Tutup
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}} />
    </div>
  );
}

/* ── Icon Definitions ── */
const IkonPokok = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IkonWajib = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IkonSukarela = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const IkonMurabahah = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const IkonMudharabah = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
const IkonMusyarakah = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IkonIjarah = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4v-3.252l7.743-7.743A6 6 0 0121 9z" /></svg>;
const IkonIstishna = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;

const IkonWallet = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const IkonGrowth = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

/* ── Data ── */
const simpananList = [
  {
    id: 1,
    nama: "Simpanan Pokok",
    ikon: <IkonPokok />,
    desc: "Simpanan awal yang dibayarkan satu kali saat mendaftar menjadi anggota. Tidak dapat ditarik selama masih berstatus anggota aktif.",
    info: "Sekali Bayar",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    detail: "Simpanan Pokok adalah syarat utama menjadi anggota Koperasi Syariah. Dana ini digunakan sebagai modal dasar koperasi untuk menjalankan kegiatan usaha. Karena berstatus sebagai modal kepemilikan, simpanan ini tidak dapat ditarik selama Anda masih berstatus sebagai anggota aktif. Nilainya tetap dan dibayarkan hanya satu kali saat awal pendaftaran.",
    manfaat: ["Menjadi bukti kepemilikan koperasi", "Berhak mendapatkan Sisa Hasil Usaha (SHU)", "Berhak mengikuti Rapat Anggota Tahunan (RAT)"]
  },
  {
    id: 2,
    nama: "Simpanan Wajib",
    ikon: <IkonWajib />,
    desc: "Simpanan rutin bulanan sebagai kewajiban dasar keanggotaan. Dapat ditarik jika keluar dari keanggotaan.",
    info: "Bulanan",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    detail: "Simpanan Wajib adalah sejumlah dana yang wajib dibayarkan oleh anggota kepada koperasi dalam waktu dan kesempatan tertentu (misalnya setiap bulan). Simpanan ini berfungsi untuk memperkuat permodalan koperasi secara berkelanjutan. Sama seperti simpanan pokok, simpanan wajib tidak dapat ditarik sewaktu-waktu, melainkan hanya saat anggota mengundurkan diri.",
    manfaat: ["Meningkatkan porsi SHU tahunan", "Membantu permodalan produktif koperasi", "Sebagai tabungan masa depan"]
  },
  {
    id: 3,
    nama: "Simpanan Sukarela",
    ikon: <IkonSukarela />,
    desc: "Tabungan tambahan yang bisa disetor dan ditarik kapan saja sesuai kesepakatan. Sangat dianjurkan untuk masa depan.",
    info: "Fleksibel",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    detail: "Simpanan Sukarela beroperasi layaknya tabungan biasa dengan akad titipan (Wadi'ah) atau bagi hasil (Mudharabah). Anggota dapat menyetor dan menarik dana kapan saja sesuai ketentuan operasional koperasi. Simpanan ini sangat cocok untuk dana darurat, persiapan pendidikan, atau tujuan keuangan jangka pendek lainnya.",
    manfaat: ["Bisa ditarik kapan saja (Likuid)", "Bebas biaya administrasi bulanan", "Mendapatkan bonus/bagi hasil (nisbah) bulanan"]
  },
];

const pembiayaanList = [
  {
    id: 1,
    nama: "Murabahah",
    ikon: <IkonMurabahah />,
    desc: "Jual-beli barang dengan margin keuntungan yang disepakati bersama secara transparan.",
    info: "Margin 8–12%",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    detail: "Murabahah adalah akad jual beli barang dengan menyatakan harga perolehan dan keuntungan (margin) yang disepakati oleh penjual dan pembeli. Koperasi akan membelikan barang yang Anda butuhkan (misal: kendaraan, elektronik, bahan bangunan), lalu menjualnya kepada Anda dengan harga yang ditambah margin keuntungan. Pembayaran dilakukan secara angsuran.",
    manfaat: ["Harga jual (pokok + margin) tetap hingga lunas", "Barang langsung menjadi milik anggota", "Transparan dalam penentuan margin"]
  },
  {
    id: 2,
    nama: "Mudharabah",
    ikon: <IkonMudharabah />,
    desc: "Bagi hasil antara pemilik modal (Koperasi) dan pengelola usaha (Anggota).",
    info: "Nisbah 60:40",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    detail: "Mudharabah adalah akad kerja sama usaha antara koperasi (sebagai penyedia dana/Shahibul Maal) dengan anggota (sebagai pengelola usaha/Mudharib). Koperasi memberikan modal 100%, dan keuntungan usaha dibagi sesuai porsi (nisbah) yang disepakati di awal (misal 60:40). Jika terjadi kerugian yang bukan karena kelalaian pengelola, kerugian finansial ditanggung oleh koperasi.",
    manfaat: ["Mendukung pengembangan UMKM anggota", "Adil karena bagi hasil sesuai realisasi keuntungan", "Risiko usaha ditanggung bersama"]
  },
  {
    id: 3,
    nama: "Musyarakah",
    ikon: <IkonMusyarakah />,
    desc: "Kemitraan usaha dengan kontribusi modal bersama antara koperasi dan anggota.",
    info: "Sesuai Porsi",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    detail: "Musyarakah adalah akad kerja sama (kemitraan) antara dua pihak atau lebih untuk suatu usaha tertentu, di mana masing-masing pihak memberikan kontribusi modal. Koperasi dan Anggota sama-sama mengeluarkan modal. Keuntungan dibagi berdasarkan kesepakatan, sedangkan kerugian dibagi berdasarkan porsi modal masing-masing.",
    manfaat: ["Beban modal ditanggung bersama", "Cocok untuk proyek skala besar atau gabungan modal", "Meningkatkan sinergi antara anggota dan koperasi"]
  },
  {
    id: 4,
    nama: "Ijarah",
    ikon: <IkonIjarah />,
    desc: "Sewa-menyewa aset atau jasa dengan hak opsi kepemilikan di akhir periode.",
    info: "Ujrah 5–9%",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    detail: "Ijarah adalah akad pemindahan hak guna (manfaat) atas suatu aset atau jasa dalam waktu tertentu dengan pembayaran sewa (ujrah), tanpa diikuti pemindahan kepemilikan aset itu sendiri. Tersedia juga Ijarah Muntahiya Bittamlik (IMBT), di mana di akhir masa sewa, aset tersebut dihibahkan atau dijual kepada penyewa (anggota).",
    manfaat: ["Bisa digunakan untuk sewa mesin, ruko, atau jasa pendidikan", "Biaya sewa yang jelas dan pasti", "Opsi kepemilikan di akhir periode (IMBT)"]
  },
  {
    id: 5,
    nama: "Istishna",
    ikon: <IkonIstishna />,
    desc: "Pemesanan barang atau proyek dengan spesifikasi khusus dan harga yang disepakati di awal.",
    info: "Harga Sepakat",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    detail: "Istishna adalah akad jual beli dalam bentuk pemesanan pembuatan barang tertentu dengan kriteria dan persyaratan tertentu yang disepakati. Biasanya digunakan untuk pembiayaan properti, renovasi rumah, atau pembuatan barang mebel kustom. Pembayaran dapat dilakukan di muka, dicicil selama masa pembuatan, atau setelah barang selesai.",
    manfaat: ["Sangat fleksibel untuk pemesanan rumah/properti", "Spesifikasi barang sesuai keinginan anggota", "Harga dikunci di awal, tidak berubah"]
  },
];

export default function ProdukPage() {
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (item: any) => {
    setModalData(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header Section */}
      <header className="bg-teal-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <Link href="/" className="inline-block mb-6 text-teal-200 hover:text-white font-medium text-sm transition-colors">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Produk & Layanan Kami
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Solusi keuangan syariah yang dirancang untuk kebutuhan Anda, bebas riba, transparan, dan penuh berkah.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-20">
        
        {/* Simpanan Section */}
        <section>
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <IkonWallet />
              </div>
              Simpanan Syariah
            </h2>
            <p className="text-slate-600 mt-3">Persiapkan masa depan Anda dengan tabungan yang aman dan barokah.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simpananList.map((item) => (
              <button 
                key={item.id} 
                onClick={() => openModal(item)}
                className="text-left bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <div className="text-teal-600 mb-4 group-hover:scale-110 group-hover:text-teal-700 transition-all origin-left">
                  {item.ikon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.nama}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{item.desc}</p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between w-full">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${item.color}`}>
                    {item.info}
                  </span>
                  <span className="text-teal-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Lihat Detail →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Pembiayaan Section */}
        <section>
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <IkonGrowth />
              </div>
              Pembiayaan Syariah
            </h2>
            <p className="text-slate-600 mt-3">Raih impian Anda dan kembangkan usaha dengan dukungan modal yang adil.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pembiayaanList.map((item) => (
              <button 
                key={item.id} 
                onClick={() => openModal(item)}
                className="text-left bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <div className="text-amber-600 mb-4 group-hover:scale-110 group-hover:text-amber-700 transition-all origin-left">
                  {item.ikon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.nama}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{item.desc}</p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between w-full">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${item.color}`}>
                    {item.info}
                  </span>
                  <span className="text-amber-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Lihat Detail →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* CTA Footer */}
      <section className="bg-slate-100 border-t border-slate-200 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Tertarik Menggunakan Produk Kami?</h2>
          <p className="text-slate-600 mb-8">
            Daftar sebagai anggota sekarang dan nikmati segala kemudahan serta keberkahan bersama Koperasi Syariah Digital.
          </p>
          <Link 
            href="/register"
            className="inline-block px-8 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-lg shadow-lg shadow-teal-700/20 transition-all transform hover:-translate-y-1"
          >
            Daftar Sebagai Anggota
          </Link>
        </div>
      </section>

      {/* Modal */}
      <Modal open={!!modalData} onClose={() => setModalData(null)} title={modalData ? `Detail ${modalData.nama}` : ""} icon={modalData?.ikon}>
        {modalData && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl border ${modalData.color} bg-opacity-30`}>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Informasi Utama</p>
              <p className="text-xl font-black">{modalData.info}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">Deskripsi Produk</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {modalData.detail}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Keunggulan & Manfaat</h4>
              <ul className="space-y-2">
                {modalData.manfaat.map((m: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-teal-500 mt-0.5">✓</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2">
              <Link 
                href="/register" 
                className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-teal-950 font-bold py-3 rounded-xl shadow-md transition-colors"
              >
                Daftar & Ajukan Sekarang →
              </Link>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}

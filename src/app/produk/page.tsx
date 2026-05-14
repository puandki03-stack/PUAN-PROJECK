"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ── Modal Component ── */
function Modal({ open, onClose, title, children }: { open: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 px-6 py-5 flex justify-between items-center shrink-0">
          <h3 className="text-white font-bold text-lg tracking-wide">{title}</h3>
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

const simpananList = [
  {
    id: 1,
    nama: "Simpanan Pokok",
    ikon: "💎",
    desc: "Simpanan awal yang dibayarkan satu kali saat mendaftar menjadi anggota. Tidak dapat ditarik selama masih berstatus anggota aktif.",
    info: "Sekali Bayar",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    detail: "Simpanan Pokok adalah syarat utama menjadi anggota Koperasi Syariah. Dana ini digunakan sebagai modal dasar koperasi untuk menjalankan kegiatan usaha. Karena berstatus sebagai modal kepemilikan, simpanan ini tidak dapat ditarik selama Anda masih berstatus sebagai anggota aktif. Nilainya tetap dan dibayarkan hanya satu kali saat awal pendaftaran.",
    manfaat: ["Menjadi bukti kepemilikan koperasi", "Berhak mendapatkan Sisa Hasil Usaha (SHU)", "Berhak mengikuti Rapat Anggota Tahunan (RAT)"]
  },
  {
    id: 2,
    nama: "Simpanan Wajib",
    ikon: "📌",
    desc: "Simpanan rutin bulanan sebagai kewajiban dasar keanggotaan. Dapat ditarik jika keluar dari keanggotaan.",
    info: "Bulanan",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    detail: "Simpanan Wajib adalah sejumlah dana yang wajib dibayarkan oleh anggota kepada koperasi dalam waktu dan kesempatan tertentu (misalnya setiap bulan). Simpanan ini berfungsi untuk memperkuat permodalan koperasi secara berkelanjutan. Sama seperti simpanan pokok, simpanan wajib tidak dapat ditarik sewaktu-waktu, melainkan hanya saat anggota mengundurkan diri.",
    manfaat: ["Meningkatkan porsi SHU tahunan", "Membantu permodalan produktif koperasi", "Sebagai tabungan masa depan"]
  },
  {
    id: 3,
    nama: "Simpanan Sukarela",
    ikon: "🎁",
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
    ikon: "🏷️",
    desc: "Jual-beli barang dengan margin keuntungan yang disepakati bersama secara transparan.",
    info: "Margin 8–12%",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    detail: "Murabahah adalah akad jual beli barang dengan menyatakan harga perolehan dan keuntungan (margin) yang disepakati oleh penjual dan pembeli. Koperasi akan membelikan barang yang Anda butuhkan (misal: kendaraan, elektronik, bahan bangunan), lalu menjualnya kepada Anda dengan harga yang ditambah margin keuntungan. Pembayaran dilakukan secara angsuran.",
    manfaat: ["Harga jual (pokok + margin) tetap hingga lunas", "Barang langsung menjadi milik anggota", "Transparan dalam penentuan margin"]
  },
  {
    id: 2,
    nama: "Mudharabah",
    ikon: "🤝",
    desc: "Bagi hasil antara pemilik modal (Koperasi) dan pengelola usaha (Anggota).",
    info: "Nisbah 60:40",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    detail: "Mudharabah adalah akad kerja sama usaha antara koperasi (sebagai penyedia dana/Shahibul Maal) dengan anggota (sebagai pengelola usaha/Mudharib). Koperasi memberikan modal 100%, dan keuntungan usaha dibagi sesuai porsi (nisbah) yang disepakati di awal (misal 60:40). Jika terjadi kerugian yang bukan karena kelalaian pengelola, kerugian finansial ditanggung oleh koperasi.",
    manfaat: ["Mendukung pengembangan UMKM anggota", "Adil karena bagi hasil sesuai realisasi keuntungan", "Risiko usaha ditanggung bersama"]
  },
  {
    id: 3,
    nama: "Musyarakah",
    ikon: "🏗️",
    desc: "Kemitraan usaha dengan kontribusi modal bersama antara koperasi dan anggota.",
    info: "Sesuai Porsi",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    detail: "Musyarakah adalah akad kerja sama (kemitraan) antara dua pihak atau lebih untuk suatu usaha tertentu, di mana masing-masing pihak memberikan kontribusi modal. Koperasi dan Anggota sama-sama mengeluarkan modal. Keuntungan dibagi berdasarkan kesepakatan, sedangkan kerugian dibagi berdasarkan porsi modal masing-masing.",
    manfaat: ["Beban modal ditanggung bersama", "Cocok untuk proyek skala besar atau gabungan modal", "Meningkatkan sinergi antara anggota dan koperasi"]
  },
  {
    id: 4,
    nama: "Ijarah",
    ikon: "🔑",
    desc: "Sewa-menyewa aset atau jasa dengan hak opsi kepemilikan di akhir periode.",
    info: "Ujrah 5–9%",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    detail: "Ijarah adalah akad pemindahan hak guna (manfaat) atas suatu aset atau jasa dalam waktu tertentu dengan pembayaran sewa (ujrah), tanpa diikuti pemindahan kepemilikan aset itu sendiri. Tersedia juga Ijarah Muntahiya Bittamlik (IMBT), di mana di akhir masa sewa, aset tersebut dihibahkan atau dijual kepada penyewa (anggota).",
    manfaat: ["Bisa digunakan untuk sewa mesin, ruko, atau jasa pendidikan", "Biaya sewa yang jelas dan pasti", "Opsi kepemilikan di akhir periode (IMBT)"]
  },
  {
    id: 5,
    nama: "Istishna",
    ikon: "🏠",
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
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-lg">💰</span>
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
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{item.ikon}</div>
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
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg">🤝</span>
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
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{item.ikon}</div>
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
      <Modal open={!!modalData} onClose={() => setModalData(null)} title={modalData ? `${modalData.ikon} Detail ${modalData.nama}` : ""}>
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

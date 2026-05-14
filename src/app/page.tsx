import Link from "next/link";
import { cookies } from "next/headers";

export default async function LandingPage() {
  // Check auth status
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get("mock_user")?.value;
  
  let isLoggedIn = false;
  let userRole = null;

  if (cookieVal) {
    isLoggedIn = true;
    try {
      const parsed = JSON.parse(cookieVal);
      userRole = parsed.role;
    } catch (e) {
      const safeVal = cookieVal?.toLowerCase() || "";
      userRole = (safeVal.includes("pengurus") || safeVal.includes("admin")) ? "Pengurus" : "Anggota";
    }
  }

  // Determine dashboard link based on role
  const dashboardLink = userRole === "Pengurus" ? "/dashboard-pengurus" : "/dashboard-anggota";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-teal-600/30 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 rounded-full bg-amber-500/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-amber-100 tracking-wider uppercase">Platform KSPPS Modern</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Digitalisasi Koperasi Syariah yang <span className="text-amber-400">Amanah</span>, Transparan, dan Modern.
            </h1>
            
            <p className="text-lg md:text-xl text-teal-100 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Kelola simpanan dan pembiayaan berdasarkan prinsip Shiddiq tanpa riba. Gabung sekarang untuk masa depan finansial yang barokah.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {isLoggedIn ? (
                <Link 
                  href={dashboardLink}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-teal-950 font-bold text-lg shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-1"
                >
                  Ke Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    href="/produk"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-teal-950 font-bold text-lg shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-1"
                  >
                    Produk
                  </Link>
                  <Link 
                    href="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-teal-500 backdrop-blur-sm text-white font-bold text-lg transition-all"
                  >
                    Masuk
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Visual (Mockup) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10 hidden md:block">
            <div className="relative rounded-2xl bg-white/10 p-2 backdrop-blur-xl border border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="rounded-xl bg-white overflow-hidden shadow-inner">
                {/* Mockup Header */}
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                {/* Mockup Body */}
                <div className="p-6 space-y-4 bg-slate-50">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="h-4 w-24 bg-slate-200 rounded-md mb-2"></div>
                      <div className="h-8 w-40 bg-teal-700 rounded-md"></div>
                    </div>
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-xl">💰</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                      <div className="h-3 w-16 bg-slate-200 rounded-md mb-3"></div>
                      <div className="h-4 w-full bg-emerald-100 rounded-md mb-2"></div>
                      <div className="h-4 w-2/3 bg-emerald-100 rounded-md"></div>
                    </div>
                    <div className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                      <div className="h-3 w-16 bg-slate-200 rounded-md mb-3"></div>
                      <div className="h-4 w-full bg-blue-100 rounded-md mb-2"></div>
                      <div className="h-4 w-2/3 bg-blue-100 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,200.7,109.9,242.49,104.28,283.47,84.84,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Pilar Koperasi Digital Kami
            </h2>
            <p className="text-slate-600">
              Membangun ekosistem keuangan yang lebih adil dan transparan dengan memegang teguh nilai-nilai keislaman dan teknologi modern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Transparansi (Shiddiq)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Pencatatan real-time yang bisa dipantau anggota kapan saja. Tidak ada biaya tersembunyi, semua dana dikelola secara terbuka.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-amber-100 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                ⚖️
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Keadilan (Adl)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Sistem bagi hasil dan margin yang adil tanpa bunga statis. Keuntungan dan risiko ditanggung bersama demi keberkahan bersama.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                📱
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Kemudahan Akses
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Akses dashboard melalui perangkat apa pun dengan performa tinggi dan cepat berkat teknologi Next.js terbaru.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF & TRUST SECTION */}
      <section className="py-20 relative bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-slate-300"></span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Dipercaya & Tersertifikasi</span>
            <span className="h-[1px] w-12 bg-slate-300"></span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <span className="text-3xl text-emerald-600">🏛️</span> SAK EP
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <span className="text-3xl text-amber-500">✅</span> Syariah Verified
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <span className="text-3xl text-teal-600">🔒</span> SecureData
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <span className="text-3xl text-blue-600">🌐</span> Kominfo
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-24 bg-teal-900 text-white text-center relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(60deg, #ffffff77 25%, transparent 25.5%, transparent 75%, #ffffff77 75%, #ffffff77), linear-gradient(60deg, #ffffff77 25%, transparent 25.5%, transparent 75%, #ffffff77 75%, #ffffff77)', backgroundSize: '40px 70px', backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px' }}></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Menjadi Bagian dari Ekosistem Ekonomi Syariah?</h2>
          <p className="text-teal-200 mb-10 text-lg">
            Bergabunglah bersama ribuan anggota lainnya yang telah merasakan manfaat pengelolaan dana sesuai prinsip Islam.
          </p>
          
          {!isLoggedIn && (
            <Link 
              href="/register"
              className="inline-block px-10 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-teal-950 font-bold text-lg shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-1"
            >
              Daftar Sebagai Anggota
            </Link>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 Koperasi Syariah Digital. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Syarat & Ketentuan</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Kebijakan Privasi</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">Bantuan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

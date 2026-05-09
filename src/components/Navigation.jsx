"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

export default function Navigation({ userEmail, userRole }) {
  const pathname = usePathname();

  // Jangan tampilkan navbar di halaman login
  if (pathname.startsWith("/login")) return null;
  if (!userEmail) return null;

  const isPengurus = userRole === "Pengurus" || userEmail === "Pengurus@Koperasi.com";
  const isAnggota = userRole === "Anggota" || (!isPengurus && userEmail);

  // Menentukan label tampilan untuk user (Anggota KSD / Pengurus KSD)
  const displayUser = isPengurus ? "Pengurus KSD" : "Anggota KSD";

  return (
    <nav className="bg-teal-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6 overflow-x-auto">
            <Link href="/" className="font-bold text-lg text-teal-100 tracking-wide hidden sm:block hover:text-white transition-colors">
              KS Digital
            </Link>
            <div className="flex gap-2 sm:gap-4 whitespace-nowrap">
              {isAnggota && (
                <Link 
                  href="/dashboard-anggota" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/dashboard-anggota" ? "bg-teal-900 text-white" : "text-teal-200 hover:bg-teal-700 hover:text-white"}`}
                >
                  Dashboard Anggota
                </Link>
              )}
              <Link 
                href="/simpanan" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/simpanan" ? "bg-teal-900 text-white" : "text-teal-200 hover:bg-teal-700 hover:text-white"}`}
              >
                Pembiayaan
              </Link>
              {isPengurus && (
                <Link 
                  href="/dashboard-pengurus" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/dashboard-pengurus" ? "bg-teal-900 text-white" : "text-teal-200 hover:bg-teal-700 hover:text-white"}`}
                >
                  Panel Pengurus
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-teal-200 hidden md:block font-medium">{displayUser}</span>
            <button 
              onClick={async () => { await logout() }}
              className="text-sm bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded transition-colors whitespace-nowrap"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

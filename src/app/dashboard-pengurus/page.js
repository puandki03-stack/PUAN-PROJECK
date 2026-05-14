import PanelPengurus from "@/components/PanelPengurus";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Panel Pengurus — Koperasi Syariah Digital",
  description:
    "Halaman pengurus koperasi: manajemen transaksi, laporan keuangan real-time, dan verifikasi dewan pengawas syariah.",
};

export default async function PengurusPage() {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get('mock_user')?.value;

  if (!cookieVal) {
    redirect("/login-admin");
  }

  try {
    const parsed = JSON.parse(cookieVal);
    if (parsed.role !== "Pengurus") {
      redirect("/dashboard-anggota");
    }
  } catch (e) {
    const safeVal = cookieVal?.toLowerCase() || "";
    if (!safeVal.includes("pengurus") && !safeVal.includes("admin")) {
      redirect("/dashboard-anggota");
    }
  }

  return <PanelPengurus />;
}

import DashboardAnggota from "@/components/DashboardAnggota";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Dashboard Anggota — Koperasi Syariah Digital",
  description:
    "Halaman dashboard anggota koperasi syariah: portofolio simpanan, katalog pembiayaan, dan riwayat transaksi.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get('mock_user')?.value;

  if (!cookieVal) {
    redirect("/login");
  }

  try {
    const parsed = JSON.parse(cookieVal);
    if (parsed.role !== "Anggota") {
      redirect("/dashboard-pengurus");
    }
  } catch (e) {
    const safeVal = cookieVal?.toLowerCase() || "";
    if (safeVal.includes("pengurus") || safeVal.includes("admin")) {
      redirect("/dashboard-pengurus");
    }
  }

  // Mengubah tulisan raw JSON menjadi 'Anggota KSD' sesuai permintaan
  const user = { email: "Anggota KSD" };

  return <DashboardAnggota user={user} />;
}

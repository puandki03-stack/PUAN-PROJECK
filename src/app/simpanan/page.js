import SimpananProses from "@/components/SimpananProses";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Proses Simpanan — Koperasi Syariah Digital",
  description:
    "Halaman pengajuan pembiayaan, kalkulator zakat mal, dan infaq sukarela.",
};

export default async function SimpananPage() {
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

  return <SimpananProses />;
}

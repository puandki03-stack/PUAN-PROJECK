import DashboardAnggota from "@/components/DashboardAnggota";

export const metadata = {
  title: "Dashboard Anggota — Koperasi Syariah Digital",
  description:
    "Halaman dashboard anggota koperasi syariah: portofolio simpanan, katalog pembiayaan, dan riwayat transaksi.",
};

export default function DashboardPage() {
  return <DashboardAnggota />;
}

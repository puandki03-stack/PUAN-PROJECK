import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Koperasi Syariah Digital",
  description:
    "Platform digital koperasi syariah — simpanan, pembiayaan, dan laporan keuangan berbasis prinsip syariah. Amanah · Berkah · Transparan.",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get("mock_user")?.value;
  let userEmail = null;
  let userRole = null;

  if (cookieVal) {
    try {
      const parsed = JSON.parse(cookieVal);
      userEmail = parsed.email;
      userRole = parsed.role;
    } catch (e) {
      userEmail = cookieVal;
      const safeEmail = userEmail?.toLowerCase() || "";
      userRole = (safeEmail.includes("pengurus") || safeEmail.includes("admin")) ? "Pengurus" : "Anggota";
    }
  }

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <Navigation userEmail={userEmail} userRole={userRole} />
        {children}
      </body>
    </html>
  );
}

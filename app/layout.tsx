import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/layout/ClientProvider";
import NewsTicker from "@/components/common/NewsTicker";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/theme/ThemeContext";
import LanguageProvider from "@/components/theme/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Babasaheb Kavad Patsanstha — Nighoj Nagari Sahakari Patsanstha",
  description: "Official web portal of Babasaheb Kavad Nighoj Nagari Sahakari Patsanstha. Class-A audited co-operative society offering premium interest rates on deposits, instant gold loans, property loans, and digital e-banking services.",
  keywords: ["Babasaheb Kavad", "Nighoj", "Nagari Patsanstha", "Sahakari Patsanstha", "Cooperative Bank", "Gold Loan Nighoj", "Fixed Deposit Rates Maharashtra", "Pune Patsanstha"],
  authors: [{ name: "Babasaheb Kavad Patsanstha" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F36F21] text-white">
        <ThemeProvider>
          <LanguageProvider>
            <ClientProvider>
              <NewsTicker />
              <Header />
              <main className="flex-grow flex flex-col">{children}</main>
              <Footer />
            </ClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}




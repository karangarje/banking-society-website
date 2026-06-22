"use client";
import "./globals.css";
import "antd/dist/reset.css";
import ThemeProvider from "@/components/theme/ThemeContext";
import { usePathname } from "next/navigation";
import LanguageProvider from "@/components/theme/LanguageContext";
import ClientProvider from "@/components/layout/ClientProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { App as AntdApp } from "antd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isEmployeeDashboard = pathname?.startsWith("/employee-dashboard");
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full max-w-full">
        <ThemeProvider>
          <LanguageProvider>
            <ClientProvider>
              <AntdApp>
                {!isEmployeeDashboard && <Header />}
                <main className="flex-grow flex flex-col overflow-x-hidden w-full max-w-full">{children}</main>
                {!isEmployeeDashboard && <Footer />}
              </AntdApp>
            </ClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

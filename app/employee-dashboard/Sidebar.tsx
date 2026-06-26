// app/employee-dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarProps {
  role: string;
  isManagerOrAdmin: boolean;
}

const menuItems = [
  { name: "Dashboard", href: "/employee-dashboard", icon: "📊", managerOnly: false },
  { name: "Employees", href: "/employee-dashboard/employees", icon: "👥", managerOnly: true },
  { name: "Loan Applications", href: "/employee-dashboard/loan-applications", icon: "💰", managerOnly: false },
  { name: "Content (CMS)", href: "/employee-dashboard/content", icon: "🗂️", managerOnly: false },
  { name: "Gallery & Media", href: "/employee-dashboard/gallery-media", icon: "🖼️", managerOnly: false },
  { name: "Calculator Settings", href: "/employee-dashboard/calculator-settings", icon: "⚙️", managerOnly: false },
  { name: "Home Banners", href: "/employee-dashboard/home-banners", icon: "🏙️", managerOnly: false },
  { name: "Downloads", href: "/employee-dashboard/downloads", icon: "📥", managerOnly: false },
  { name: "Branches", href: "/employee-dashboard/branches", icon: "🏢", managerOnly: false },
  { name: "Interest Rates", href: "/employee-dashboard/interest-rates", icon: "📈", managerOnly: false },
  { name: "News & Notices", href: "/employee-dashboard/news", icon: "📰", managerOnly: false },
  { name: "About Us Content", href: "/employee-dashboard/about-content", icon: "ℹ️", managerOnly: false },
  { name: "Contact Inquiries", href: "/employee-dashboard/contact-inquiries", icon: "✉️", managerOnly: false },
  { name: "Audit Logs", href: "/employee-dashboard/audit-logs", icon: "📜", managerOnly: true },
];

export default function Sidebar({ role, isManagerOrAdmin }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-[260px] bg-white border-r border-[#E5E7EB] text-[#AD002E]/70 fixed top-[208px] sm:top-[144px] md:top-[112px] h-[calc(100vh-208px)] sm:h-[calc(100vh-144px)] md:h-[calc(100vh-112px)] flex flex-col z-10">
      {/* Header */}
      <div className="p-6 border-b border-[#AD002E]/20 bg-white">
        <h2 className="text-xl font-bold tracking-wider text-[#AD002E]">BANK PORTAL</h2>
        <p className="text-sm text-[#6B7280] mt-1 uppercase tracking-widest">Employee Access</p>
      </div>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            if (item.managerOnly && !isManagerOrAdmin) return null;
            const active = isActive(item.href);
            const baseClasses =
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors";
            const activeClasses = active
              ? "bg-[#FCE7EF] border-l-4 border-[#AD002E] text-[#AD002E] font-semibold"
              : "text-[#AD002E]/70 hover:bg-[#F3F4F6] hover:text-[#AD002E]";
            const iconClasses = active ? "text-[#AD002E]" : "text-[#6B7280]";
            return (
              <li key={item.name}>
                <Link href={item.href} className={`${baseClasses} ${active ? activeClasses : activeClasses}`}>
                  <span className={iconClasses}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Logout */}
      <div className="p-4 border-t border-[#AD002E]/20 bg-white">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#AD002E] bg-white hover:bg-[#FEF2F2] transition-colors"
        >
          <span className="text-[#AD002E]">🚪</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

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
  { name: "Audit Logs", href: "/employee-dashboard/audit-logs", icon: "📜", managerOnly: true },
];

export default function Sidebar({ role, isManagerOrAdmin }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-[260px] bg-white border-r border-[#E5E7EB] text-gray-900 fixed h-full flex flex-col z-10">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-black tracking-wider text-[#111827]">BANK PORTAL</h2>
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
              ? "bg-[#FCE7EF] border-l-4 border-[#B3003C] text-[#B3003C] font-semibold"
              : "text-gray-900 hover:bg-[#F3F4F6] hover:text-[#B3003C]";
            const iconClasses = active ? "text-[#B3003C]" : "text-[#6B7280]";
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
      <div className="p-4 border-t border-gray-200 bg-white">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#111827] bg-white hover:bg-[#FEF2F2] transition-colors"
        >
          <span className="text-[#B3003C]">🚪</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

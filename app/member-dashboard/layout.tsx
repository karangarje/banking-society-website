"use client";

import React from "react";
import Link from "next/link";
import { 
  DashboardOutlined, 
  BankOutlined, 
  FilePdfOutlined, 
  UserOutlined,
  LogoutOutlined,
  BellOutlined
} from "@ant-design/icons";



export default function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#AD002E] text-white flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6 border-b border-[#AD002E]/20">
          <h2 className="text-xl font-bold tracking-wider text-white">MEMBER PORTAL</h2>
          <p className="text-xs text-[#AD002E] mt-1 uppercase tracking-widest">Babasaheb Kavad</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/member-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <DashboardOutlined />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link href="/member-dashboard/loans/apply" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <BankOutlined />
                <span>Apply for Loan</span>
              </Link>
            </li>
            <li>
              <Link href="/member-dashboard/statements" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <FilePdfOutlined />
                <span>Statements & EMI</span>
              </Link>
            </li>
            <li>
              <Link href="/member-dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <UserOutlined />
                <span>My Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-[#AD002E]/20">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#AD002E] hover:bg-white/20 transition-colors">
            <LogoutOutlined />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-white flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-[#AD002E]/20 px-6 flex items-center justify-between sticky top-0 z-20">
          <h1 className="text-lg font-bold text-[#AD002E]/70 hidden sm:block">Welcome back, Member</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#AD002E]/70 hover:text-[#AD002E] transition-colors">
              <BellOutlined className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#AD002E] rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#AD002E]/10 flex items-center justify-center text-[#AD002E] font-bold">
              M
            </div>
          </div>
        </header>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

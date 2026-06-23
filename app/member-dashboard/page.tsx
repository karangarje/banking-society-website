"use client";

import React from "react";
import { 
  WalletOutlined, 
  BankOutlined, 
  PieChartOutlined, 
  ArrowRightOutlined
} from "@ant-design/icons";
import Link from "next/link";

export default function MemberDashboard() {
  const accounts = [
    { label: "Share Account Balance", value: "₹50,000", accNo: "SH-10294", icon: <PieChartOutlined />, color: "bg-[#AD002E]" },
    { label: "Total Deposit Balance", value: "₹2,50,000", accNo: "MULTIPLE", icon: <WalletOutlined />, color: "bg-[#AD002E]" },
    { label: "Active Loan Balance", value: "₹0", accNo: "NONE", icon: <BankOutlined />, color: "bg-[#AD002E]" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">My Accounts Overview</h1>
          <p className="text-sm text-[#AD002E]/70 mt-1">Manage your shares, deposits, and loans</p>
        </div>
        <Link 
          href="/member-dashboard/loans/apply"
          className="bg-[#AD002E] text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#AD002E] transition-colors"
        >
          Apply for Loan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20 flex flex-col justify-between min-h-[160px] relative overflow-hidden group hover:shadow-md transition-shadow-md">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${acc.color}`} />
            
            <div className="flex items-center gap-3 z-10">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md ${acc.color}`}>
                {acc.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-[#AD002E]/70 uppercase tracking-wider">{acc.label}</p>
                <p className="text-xs font-semibold text-[#AD002E]/70 mt-0.5">Acc: {acc.accNo}</p>
              </div>
            </div>
            
            <div className="mt-4 z-10 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-[#AD002E]/70">{acc.value}</h3>
              <button className="text-[#AD002E] hover:text-[#AD002E] p-2">
                <ArrowRightOutlined />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-[#AD002E]/20 mt-8 overflow-hidden">
        <div className="p-6 border-b border-[#AD002E]/20 bg-white/50">
          <h3 className="text-lg font-bold text-[#AD002E]/70">Recent Transactions & EMI Deductions</h3>
        </div>
        <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-[#AD002E]/70">
          <p className="font-normal text-sm">No recent transactions found.</p>
        </div>
      </div>
    </div>
  );
}

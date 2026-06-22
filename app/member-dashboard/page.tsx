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
    { label: "Share Account Balance", value: "₹50,000", accNo: "SH-10294", icon: <PieChartOutlined />, color: "bg-purple-500" },
    { label: "Total Deposit Balance", value: "₹2,50,000", accNo: "MULTIPLE", icon: <WalletOutlined />, color: "bg-emerald-500" },
    { label: "Active Loan Balance", value: "₹0", accNo: "NONE", icon: <BankOutlined />, color: "bg-[#AD002E]" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800">My Accounts Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your shares, deposits, and loans</p>
        </div>
        <Link 
          href="/member-dashboard/loans/apply"
          className="bg-[#B3003C] text-white px-4 py-2 rounded font-bold text-sm uppercase tracking-wider hover:bg-[#850024] transition-colors"
        >
          Apply for Loan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px] relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${acc.color}`} />
            
            <div className="flex items-center gap-3 z-10">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md ${acc.color}`}>
                {acc.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{acc.label}</p>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">Acc: {acc.accNo}</p>
              </div>
            </div>
            
            <div className="mt-4 z-10 flex items-end justify-between">
              <h3 className="text-3xl font-black text-gray-800">{acc.value}</h3>
              <button className="text-[#B3003C] hover:text-[#850024] p-2">
                <ArrowRightOutlined />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions & EMI Deductions</h3>
        </div>
        <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-gray-400">
          <p className="font-medium text-sm">No recent transactions found.</p>
        </div>
      </div>
    </div>
  );
}

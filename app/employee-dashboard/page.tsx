"use client";

import React, { useState, useEffect } from "react";
import { 
  TeamOutlined, 
  BankOutlined, 
  DollarOutlined, 
  GlobalOutlined 
} from "@ant-design/icons";
import Link from "next/link";

export default function EmployeeDashboard() {
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);

  useEffect(() => {
    const fetchInquiriesCount = async () => {
      try {
        const res = await fetch("/api/admin/contact-inquiries");
        if (res.ok) {
          const json = await res.json();
          const count = json.filter((item: any) => item.status === "NEW").length;
          setNewInquiriesCount(count);
        }
      } catch (err) {
        console.error("Failed to fetch contact inquiries count:", err);
      }
    };
    fetchInquiriesCount();
  }, []);

  const stats = [
    { label: "Total Members", value: "24,183", icon: <TeamOutlined />, color: "bg-[#AD002E]" },
    { label: "Total Loans", value: "1,432", icon: <BankOutlined />, color: "bg-[#AD002E]" },
    { label: "Total Deposits", value: "₹269.46 Cr", icon: <DollarOutlined />, color: "bg-[#AD002E]" },
    { label: "Website Visitors", value: "8,942", icon: <GlobalOutlined />, color: "bg-[#AD002E]" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#AD002E]/70">Dashboard Overview</h1>
          <p className="text-sm text-[#AD002E]/70 mt-1">Real-time metrics and system status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shadow-md ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#AD002E]/70 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#AD002E]/70">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
          <h3 className="text-lg font-bold text-[#AD002E]/70 mb-4">Recent Audit Logs</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[#AD002E]/70">Admin updated Hero Banner</span>
              <span className="text-xs text-[#AD002E]/70">2 mins ago</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[#AD002E]/70">Manager approved Loan APP-1002</span>
              <span className="text-xs text-[#AD002E]/70">1 hour ago</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[#AD002E]/70">System Backup Completed</span>
              <span className="text-xs text-[#AD002E]/70">12 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-[#AD002E]/20">
          <h3 className="text-lg font-bold text-[#AD002E]/70 mb-4">Pending Tasks</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#AD002E]/5 text-[#AD002E] rounded-lg text-sm font-semibold border border-[#AD002E]">
              <span>5 New Loan Applications</span>
              <Link href="/employee-dashboard/loan-applications" className="text-xs uppercase bg-[#AD002E] text-white px-2 py-1 rounded-lg">Review</Link>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#AD002E]/5 text-[#AD002E] rounded-lg text-sm font-semibold border border-[#AD002E]">
              <span>New Contact Inquiries: {newInquiriesCount}</span>
              <Link href="/employee-dashboard/contact-inquiries" className="text-xs uppercase bg-[#AD002E] text-white px-2 py-1 rounded-lg">Review</Link>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#AD002E]/5 text-[#AD002E] rounded-lg text-sm font-semibold border border-[#AD002E]">
              <span>2 Employee Access Requests</span>
              <Link href="/employee-dashboard/employees" className="text-xs uppercase bg-[#AD002E] text-white px-2 py-1 rounded-lg">Review</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

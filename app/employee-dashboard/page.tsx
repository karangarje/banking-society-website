"use client";

import React from "react";
import { 
  TeamOutlined, 
  BankOutlined, 
  DollarOutlined, 
  GlobalOutlined 
} from "@ant-design/icons";

export default function EmployeeDashboard() {
  const stats = [
    { label: "Total Members", value: "24,183", icon: <TeamOutlined />, color: "bg-blue-500" },
    { label: "Total Loans", value: "1,432", icon: <BankOutlined />, color: "bg-[#AD002E]" },
    { label: "Total Deposits", value: "₹269.46 Cr", icon: <DollarOutlined />, color: "bg-emerald-500" },
    { label: "Website Visitors", value: "8,942", icon: <GlobalOutlined />, color: "bg-purple-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time metrics and system status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-md ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Audit Logs</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">Admin updated Hero Banner</span>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">Manager approved Loan APP-1002</span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">System Backup Completed</span>
              <span className="text-xs text-gray-400">12 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pending Tasks</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded-lg text-sm font-semibold border border-red-100">
              <span>5 New Loan Applications</span>
              <button className="text-xs uppercase bg-red-600 text-white px-2 py-1 rounded">Review</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
              <span>2 Employee Access Requests</span>
              <button className="text-xs uppercase bg-blue-600 text-white px-2 py-1 rounded">Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

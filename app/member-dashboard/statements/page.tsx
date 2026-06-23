"use client";

import React from "react";
import { DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";

export default function StatementsPage() {
  const statements = [
    { month: "May 2026", date: "May 31, 2026", type: "Account Statement" },
    { month: "April 2026", date: "Apr 30, 2026", type: "Account Statement" },
    { month: "March 2026", date: "Mar 31, 2026", type: "Account Statement" },
    { month: "Financial Year 2025-26", date: "Mar 31, 2026", type: "Interest Certificate" }
  ];

  return (
    <div className="max-w-4xl space-y-6 py-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#AD002E]/70">Statements & Certificates</h1>
        <p className="text-sm text-[#AD002E]/70 mt-1">Download your monthly statements and interest certificates</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-[#AD002E]/20 overflow-hidden">
        <div className="p-6 border-b border-[#AD002E]/20 bg-white/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#AD002E]/70">Recent Documents</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {statements.map((stmt, idx) => (
            <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#AD002E]/5 text-[#AD002E] rounded-lg flex items-center justify-center text-xl">
                  <FilePdfOutlined />
                </div>
                <div>
                  <h4 className="font-bold text-[#AD002E]/70">{stmt.month}</h4>
                  <p className="text-xs font-semibold text-[#AD002E]/70 uppercase tracking-wider">{stmt.type} • {stmt.date}</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-white text-white text-sm font-bold rounded-lg transition-colors">
                <DownloadOutlined />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

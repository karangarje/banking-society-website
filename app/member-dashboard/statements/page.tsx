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
        <h1 className="text-2xl font-black text-gray-800">Statements & Certificates</h1>
        <p className="text-sm text-gray-500 mt-1">Download your monthly statements and interest certificates</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Documents</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {statements.map((stmt, idx) => (
            <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xl">
                  <FilePdfOutlined />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{stmt.month}</h4>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stmt.type} • {stmt.date}</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-lg transition-colors">
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

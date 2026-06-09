"use client";

import React, { useState } from "react";
import { 
  FilePdfOutlined, 
  DownloadOutlined, 
  SearchOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { message } from "antd";

interface DownloadDoc {
  id: number;
  title: string;
  category: "form" | "publication";
  size: string;
  format: "PDF" | "DOCX";
  description: string;
}

export default function Download() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const documents: DownloadDoc[] = [
    {
      id: 1,
      title: "Saving Account Opening Form",
      category: "form",
      size: "1.2 MB",
      format: "PDF",
      description: "Standard application template required to open single or joint savings accounts.",
    },
    {
      id: 2,
      title: "Gold Loan Request Application Form",
      category: "form",
      size: "840 KB",
      format: "PDF",
      description: "Gold asset description details, borrower declaration, and guarantor signing page.",
    },
    {
      id: 3,
      title: "KYC Record Update & Details Form",
      category: "form",
      size: "450 KB",
      format: "PDF",
      description: "Required to submit updated Aadhaar Card, PAN Card, and active mobile specifications.",
    },
    {
      id: 4,
      title: "Safe Locker Vault Agreement Form",
      category: "form",
      size: "950 KB",
      format: "PDF",
      description: "Locker hire terms, nominee declarations, and liability clause agreements.",
    },
    {
      id: 5,
      title: "Annual Balance Sheet & Audit Report 2024-25",
      category: "publication",
      size: "4.8 MB",
      format: "PDF",
      description: "Official publication detailing our assets, liability ratios, and profit audits.",
    },
    {
      id: 6,
      title: "Society Bye-Laws & Operational Regulations",
      category: "publication",
      size: "2.1 MB",
      format: "PDF",
      description: "The regulatory handbook and legal guidelines governing our co-operative governance.",
    },
  ];

  const handleDownload = (title: string) => {
    message.loading(`Preparing document: ${title}...`, 1).then(() => {
      message.success(`Downloading started: ${title}`);
    });
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || doc.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#0B0B0F]">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#12121A] to-[#0B0B0F] border-b border-[rgba(255,255,255,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            Resource Library
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Downloads & Forms
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Access and download essential banking forms, KYC templates, and annual audit files offline.
          </p>
        </div>
      </section>

      {/* Filter & Search Panel */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-96 flex items-center">
            <SearchOutlined className="absolute left-3.5 text-gray-400 text-base" />
            <input
              type="text"
              placeholder="Search forms by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0B0F] border border-[rgba(255,255,255,0.1)] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#F36B21] transition-colors"
            />
          </div>

          {/* Category Toggle */}
          <div className="flex gap-2">
            {[
              { key: "All", label: "All Documents" },
              { key: "form", label: "Application Forms" },
              { key: "publication", label: "Publications" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-xs px-4 py-2 rounded-lg font-black uppercase tracking-wider transition-all border ${
                  activeCategory === cat.key
                    ? "bg-[#7B1010] text-white border-[#9c1a1a]"
                    : "bg-[#12121A] text-gray-400 border-[rgba(255,255,255,0.06)] hover:border-white hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Downloads List Table */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Responsive Table Wrapper */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              
              {/* Table Header */}
              <thead className="bg-[#12121A] border-b border-[rgba(255,255,255,0.06)] text-[#F36B21] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Document Title</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Type</th>
                  <th className="py-4 px-6">Size / Format</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-gray-300">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                      
                      {/* Title & Desc */}
                      <td className="py-5 px-6 max-w-xs sm:max-w-md">
                        <div className="flex gap-3 items-start">
                          <FilePdfOutlined className="text-xl text-[#7B1010] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-extrabold text-white">{doc.title}</h4>
                            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{doc.description}</p>
                          </div>
                        </div>
                      </td>

                      {/* Type Category */}
                      <td className="py-5 px-6 hidden sm:table-cell">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          doc.category === "form" 
                            ? "bg-[rgba(243,107,33,0.1)] text-[#F36B21] border border-[rgba(243,107,33,0.2)]" 
                            : "bg-[rgba(123,16,16,0.15)] text-[#FFFFFF] border border-[#9c1a1a]"
                        }`}>
                          {doc.category === "form" ? "Form" : "Audited File"}
                        </span>
                      </td>

                      {/* Size / Format */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-400 block">{doc.size}</span>
                          <span className="text-[9px] font-bold text-white bg-red-600/90 border border-red-500 rounded px-1">{doc.format}</span>
                        </div>
                      </td>

                      {/* Download Action */}
                      <td className="py-5 px-6 text-center">
                        <button
                          onClick={() => handleDownload(doc.title)}
                          className="bg-[#7B1010] hover:bg-[#9c1a1a] border border-[#9c1a1a] hover:border-[#F36B21] text-white p-2 sm:px-4 sm:py-2 rounded font-bold uppercase tracking-wider text-xs inline-flex items-center gap-1.5 transition-all shadow-md shadow-[#7B1010]/20 cursor-pointer"
                        >
                          <DownloadOutlined />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400 font-medium">
                      No documents found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Regulatory Alert */}
        <div className="mt-8 p-4 rounded-xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] flex gap-3 items-start text-xs text-gray-400 leading-relaxed max-w-4xl">
          <InfoCircleOutlined className="text-[#F36B21] text-base shrink-0 mt-0.5" />
          <p>
            💡 <strong className="text-gray-300">Instructions:</strong> Completed application forms must be signed physically and submitted to your base branch. Ensure you affix recent passport-sized photos and enclose photocopies of self-attested Aadhaar and PAN documents for identity validation checks.
          </p>
        </div>

      </section>

    </div>
  );
}

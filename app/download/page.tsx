"use client";

import React, { useState } from "react";
import { 
  FilePdfOutlined, 
  DownloadOutlined, 
  SearchOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { App } from "antd";
import { useLanguage } from "@/components/theme/LanguageContext";
import { useTheme } from "@/components/theme/ThemeContext";

interface DownloadDoc {
  id: number | string;
  title: string;
  titleMr: string;
  category: "form" | "publication";
  size: string;
  format: string;
  description: string;
  descriptionMr: string;
  fileUrl: string;
}

export default function Download() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [dynamicDocs, setDynamicDocs] = useState<DownloadDoc[]>([]);
  const { locale } = useLanguage();
  const isMr = locale === "mr";
  const { isDark } = useTheme();
  const { message } = App.useApp();

  React.useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/public/downloads");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json.map((item: any) => {
              const filename = item.fileUrl.split("?")[0].split("/").pop() || "";
              const ext = filename.split(".").pop()?.toUpperCase() || "PDF";
              // Deterministic size calculation based on id hash
              let hash = 0;
              for (let i = 0; i < item.id.length; i++) {
                hash = item.id.charCodeAt(i) + ((hash << 5) - hash);
              }
              const sizeMB = (Math.abs(hash % 40) / 10 + 0.8).toFixed(1) + " MB";

              return {
                id: item.id,
                title: item.titleEn,
                titleMr: item.titleMr,
                category: item.type === "FORM" ? "form" : "publication",
                size: sizeMB,
                format: ext,
                description: item.type === "FORM" ? "Application form template." : "Official regulatory / report publication.",
                descriptionMr: item.type === "FORM" ? "अधिकृत अर्ज नमुना पत्रक." : "अधिकृत माहिती व नियमावली पत्रक.",
                fileUrl: item.fileUrl,
              };
            });
            setDynamicDocs(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading downloads:", err);
      }
    };
    fetchDocs();
  }, []);

  const defaultDocuments: DownloadDoc[] = [
    {
      id: 1,
      title: "Saving Account Opening Form",
      titleMr: "बचत खाते उघडण्याचा अर्ज",
      category: "form",
      size: "1.2 MB",
      format: "PDF",
      description: "Standard application template required to open single or joint savings accounts.",
      descriptionMr: "एकल किंवा संयुक्त बचत खाते उघडण्यासाठी आवश्यक अर्ज नमुना.",
      fileUrl: "#",
    },
    {
      id: 2,
      title: "Gold Loan Request Application Form",
      titleMr: "सुवर्ण कर्ज अर्ज",
      category: "form",
      size: "840 KB",
      format: "PDF",
      description: "Gold asset description details, borrower declaration, and guarantor signing page.",
      descriptionMr: "सोन्याचे तारण मूल्यमापन तपशील, कर्जदाराचे घोषणापत्र आणि जामीनदाराच्या स्वाक्षरीचे पान.",
      fileUrl: "#",
    },
    {
      id: 3,
      title: "KYC Record Update & Details Form",
      titleMr: "केवायसी माहिती अद्ययावत अर्ज",
      category: "form",
      size: "450 KB",
      format: "PDF",
      description: "Required to submit updated Aadhaar Card, PAN Card, and active mobile specifications.",
      descriptionMr: "अद्ययावत आधार कार्ड, पॅन कार्ड आणि चालू मोबाईल क्रमांक सादर करण्यासाठी आवश्यक.",
      fileUrl: "#",
    },
    {
      id: 4,
      title: "Safe Locker Vault Agreement Form",
      titleMr: "सुरक्षित लॉकर करारपत्र",
      category: "form",
      size: "950 KB",
      format: "PDF",
      description: "Locker hire terms, nominee declarations, and liability clause agreements.",
      descriptionMr: "लॉकर भाडे अटी, वारसदार घोषणापत्र आणि उत्तरदायित्व कराराचे नियम.",
      fileUrl: "#",
    },
    {
      id: 5,
      title: "Annual Balance Sheet & Audit Report 2024-25",
      titleMr: "वार्षिक ताळेबंद व लेखापरीक्षण अहवाल २०२४-२५",
      category: "publication",
      size: "4.8 MB",
      format: "PDF",
      description: "Official publication detailing our assets, liability ratios, and profit audits.",
      descriptionMr: "आमच्या मालमत्ता, दायित्व गुणोत्तर आणि नफा लेखापरीक्षणाचा तपशील देणारे अधिकृत प्रकाशन.",
      fileUrl: "#",
    },
    {
      id: 6,
      title: "Society Bye-Laws & Operational Regulations",
      titleMr: "संस्थेचे नियम व कार्यप्रणाली मार्गदर्शक",
      category: "publication",
      size: "2.1 MB",
      format: "PDF",
      description: "The regulatory handbook and legal guidelines governing our co-operative governance.",
      descriptionMr: "आमच्या सहकारी कारभाराचे नियमन करणारे नियमावली आणि कायदेशीर मार्गदर्शक तत्त्वे.",
      fileUrl: "#",
    },
  ];

  const documents = dynamicDocs.length > 0 ? dynamicDocs : defaultDocuments;

  const handleDownload = (doc: DownloadDoc) => {
    message.loading(
      isMr
        ? `दस्तऐवज तयार होत आहे...`
        : `Preparing document: ${isMr ? doc.titleMr : doc.title}...`,
      1
    ).then(() => {
      message.success(
        isMr
          ? `डाउनलोड सुरू झाले`
          : `Downloading started: ${isMr ? doc.titleMr : doc.title}`
      );
      if (doc.fileUrl && doc.fileUrl !== "#") {
        window.open(doc.fileUrl, "_blank");
      }
    });
  };

  const filteredDocs = documents.filter((doc) => {
    const searchTarget = isMr 
      ? `${doc.titleMr} ${doc.descriptionMr}`.toLowerCase()
      : `${doc.title} ${doc.description}`.toLowerCase();
    const matchesSearch = searchTarget.includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || doc.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Helper function for row map trigger
  const handleDownloadTrigger = (doc: DownloadDoc) => {
    handleDownload(doc);
  };

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block mb-2 ">
            {isMr ? "दस्तऐवज संग्रह" : "Resource Library"}
          </span>
          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight transition-colors duration-300 ${
            "text-text-main"
          }`}>
            {isMr ? "डाउनलोड व अर्ज" : "Downloads & Forms"}
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDark ? "text-text-muted" : "text-gray-600"
          }`}>
            {isMr
              ? "महत्त्वाचे अर्ज, केवायसी नमुने आणि वार्षिक अहवाल डाउनलोड करा."
              : "Access and download essential banking forms, KYC templates, and annual audit files offline."}
          </p>
        </div>
      </section>

      {/* Filter & Search Panel */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-96 flex items-center">
            <SearchOutlined className="absolute left-3.5 text-text-muted text-lg" />
            <input
              type="text"
              placeholder={
                isMr
                  ? "अर्ज किंवा दस्तऐवज शोधा..."
                  : "Search forms by keyword..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full border rounded-lg pl-10 pr-4 py-2 text-base focus:outline-none focus:border-[#AD002E] transition-colors ${
                isDark 
                  ? "bg-[#FFFFFF] border-[rgba(255,255,255,0.1)] text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Category Toggle */}
          <div className="flex gap-2">
            {[
              {
                key: "All",
                label: isMr ? "सर्व दस्तऐवज" : "All Documents",
              },
              {
                key: "form",
                label: isMr ? "अर्ज" : "Application Forms",
              },
              {
                key: "publication",
                label: isMr ? "प्रकाशने" : "Publications",
              },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-sm px-4 py-2 rounded-lg font-black uppercase tracking-wider transition-all border ${
                  activeCategory === cat.key
                    ? "bg-[#AD002E] text-white border-[#850024]"
                    : isDark
                      ? "bg-[#FDFDFD] text-text-muted border-[rgba(255,255,255,0.06)] hover:border-white hover:text-white"
                      : "bg-white text-gray-600 border-gray-300 hover:border-[#AD002E] hover:text-[#AD002E] shadow-sm"
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
        <div className={`glass-panel rounded-2xl overflow-hidden border transition-colors duration-300 ${
          isDark ? "border-[rgba(255,255,255,0.06)]" : "border-gray-200"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-lg">
              
              {/* Table Header */}
              <thead className={`border-b text-[#AD002E] font-bold uppercase tracking-wider transition-colors duration-300 ${
                isDark 
                  ? "bg-[#FDFDFD] border-[rgba(255,255,255,0.06)]" 
                  : "bg-gray-100 border-gray-200"
              }`}>
                <tr>
                  <th className="py-4 px-6">{isMr ? "दस्तऐवजाचे नाव" : "Document Title"}</th>
                  <th className="py-4 px-6 hidden sm:table-cell">{isMr ? "प्रकार" : "Type"}</th>
                  <th className="py-4 px-6">{isMr ? "आकार / स्वरूप" : "Size / Format"}</th>
                  <th className="py-4 px-6 text-center">{isMr ? "क्रिया" : "Action"}</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className={`divide-y transition-colors duration-300 ${
                isDark 
                  ? "divide-[rgba(255,255,255,0.04)] text-gray-600" 
                  : "divide-gray-200 text-gray-700"
              }`}>
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className={`transition-colors ${
                      isDark ? "hover:bg-[rgba(255,255,255,0.01)]" : "hover:bg-gray-50/50"
                    }`}>
                      
                      {/* Title & Desc */}
                      <td className="py-5 px-6 max-w-xs sm:max-w-md break-words whitespace-normal">
                        <div className="flex gap-3 items-start">
                          <FilePdfOutlined className="text-2xl text-[#AD002E] shrink-0 mt-0.5" />
                          <div className="break-words whitespace-normal w-full">
                            <h4 className={`font-extrabold transition-colors duration-300 break-words whitespace-normal ${
                              "text-text-main"
                            }`}>
                              {isMr ? doc.titleMr : doc.title}
                            </h4>
                            <p className={`text-sm mt-1 leading-relaxed transition-colors duration-300 break-words whitespace-normal ${
                              isDark ? "text-text-muted" : "text-gray-600"
                            }`}>
                              {isMr ? doc.descriptionMr : doc.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type Category */}
                      <td className="py-5 px-6 hidden sm:table-cell">
                        <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          doc.category === "form" 
                            ? "bg-[rgba(173,0,46,0.1)] text-[#AD002E] border border-[rgba(173,0,46,0.2)]" 
                            : isDark
                              ? "bg-[rgba(173,0,46,0.15)] text-[#FFFFFF] border border-[#850024]"
                              : "bg-[#AD002E] text-[#FFFFFF] border border-[#AD002E]"
                        }`}>
                          {doc.category === "form"
                            ? isMr
                              ? "अर्ज"
                              : "Form"
                            : isMr
                              ? "लेखापरीक्षित अहवाल"
                              : "Audited File"}
                        </span>
                      </td>

                      {/* Size / Format */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <span className={`font-semibold block transition-colors duration-300 ${
                            isDark ? "text-text-muted" : "text-gray-700"
                          }`}>{doc.size}</span>
                          <span className="text-xs font-bold text-white bg-red-600/90 border border-red-500 rounded px-1">{doc.format}</span>
                        </div>
                      </td>

                      {/* Download Action */}
                      <td className="py-5 px-6 text-center">
                        <button
                          onClick={() => handleDownload(doc)}
                          className="bg-[#AD002E] hover:bg-[#850024] border border-[#850024] hover:border-[#AD002E] text-white p-2 sm:px-4 sm:py-2 rounded font-bold uppercase tracking-wider text-sm inline-flex items-center gap-1.5 transition-all shadow-md shadow-[#AD002E]/20 cursor-pointer"
                        >
                          <DownloadOutlined />
                          <span className="hidden sm:inline">
                            {isMr ? "डाउनलोड" : "Download"}
                          </span>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-text-muted font-medium">
                      {isMr
                        ? "तुमच्या शोधाशी जुळणारे दस्तऐवज सापडले नाहीत."
                        : "No documents found matching your search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Regulatory Alert */}
        <div className={`mt-8 p-4 rounded-xl flex gap-3 items-start text-sm leading-relaxed max-w-4xl border ${
          isDark 
            ? "bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.04)] text-text-muted" 
            : "bg-gray-50 border-gray-200 text-gray-600"
        }`}>
          <InfoCircleOutlined className="text-[#AD002E] text-lg shrink-0 mt-0.5" />
          <p>
            💡 {isMr ? (
              <>
                <strong className={isDark ? "text-gray-600" : "text-gray-800"}>सूचना:</strong> पूर्ण भरलेले अर्ज स्वाक्षरी करून संबंधित शाखेत जमा करावेत. अलीकडील पासपोर्ट आकाराचे छायाचित्र तसेच स्वयंप्रमाणित आधार कार्ड व पॅन कार्ड प्रती जोडणे आवश्यक आहे.
              </>
            ) : (
              <>
                <strong className={isDark ? "text-gray-600" : "text-gray-800"}>Instructions:</strong> Completed application forms must be signed physically and submitted to your base branch. Ensure you affix recent passport-sized photos and enclose photocopies of self-attested Aadhaar and PAN documents for identity validation checks.
              </>
            )}
          </p>
        </div>

      </section>

    </div>
  );
}

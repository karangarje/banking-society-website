"use client";

import React from "react";
import { 
  TeamOutlined, 
  AuditOutlined, 
  EyeOutlined, 
  AimOutlined
} from "@ant-design/icons";
import { useTheme } from "@/components/theme/ThemeContext";

export default function About() {
  const { isDark } = useTheme();

  const directors = [
    { name: "Shri. Sopanrao Kavad", role: "Chairman", designation: "Founder & Senior Co-operative Leader" },
    { name: "Shri. Rambhau Kavad", role: "Vice Chairman", designation: "Agricultural Credit Specialist" },
    { name: "Shri. Machhindra Kavad", role: "Managing Director", designation: "Finance & Operations Lead" },
    { name: "Sau. Sujata K. Kavad", role: "Director (Women Representative)", designation: "Social Welfare Activist" },
    { name: "Shri. Dnyaneshwar Lalge", role: "Director (Expert Director)", designation: "Chartered Accountant" },
    { name: "Shri. Eknath G. Pathare", role: "Director", designation: "Local Trader Representative" },
    { name: "Shri. Bhausaheb S. Varal", role: "Director", designation: "Rural Development Consultant" },
    { name: "Shri. Balasaheb T. Shelke", role: "Director", designation: "Agri-Business Planner" },
  ];

  const milestones = [
    { year: "1998", title: "Inception & First Branch", desc: "Founded in Nighoj village (Ahmednagar) with 150 members to cater to rural microfinance." },
    { year: "2005", title: "Class 'A' Audit Rating", desc: "Achieved the highest auditing standards from the State Co-operative Commissioner." },
    { year: "2012", title: "Core Banking Expansion", desc: "Implemented centralized core banking software across all branches for unified ledgers." },
    { year: "2018", title: "₹300 Crore Deposit Milestone", desc: "Crossed ₹300 Cr in deposit reserves and expanded to major cities including Pune and Mumbai." },
    { year: "2024", title: "Mobile & QR Digital Launch", desc: "Rolled out secure mobile banking application, IMPS fund transfers, and merchant QR scan cards." },
  ];

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            Our Legacy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight transition-colors duration-300">
            About Our Co-operative Society
          </h1>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Building trusted bridges of credit and prosperity for businesses, farmers, and families since 1998.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-aos="fade-right" className="glass-panel p-8 rounded-2xl space-y-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7B1010]/20 border border-[#7B1010]/40 flex items-center justify-center">
              <EyeOutlined className="text-xl text-[#F36B21]" />
            </div>
            <h3 className="text-xl font-bold text-text-main transition-colors duration-300">Our Vision</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed transition-colors duration-300">
            To emerge as the most trusted, technology-driven, and socially-responsible financial co-operative society in Maharashtra, offering high-returns on deposits and seamless credit to empower common citizens.
          </p>
        </div>

        <div data-aos="fade-left" className="glass-panel p-8 rounded-2xl space-y-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7B1010]/20 border border-[#7B1010]/40 flex items-center justify-center">
              <AimOutlined className="text-xl text-[#F36B21]" />
            </div>
            <h3 className="text-xl font-bold text-text-main transition-colors duration-300">Our Mission</h3>
          </div>
          <p className="text-xs text-text-muted leading-relaxed transition-colors duration-300">
            To provide affordable financial schemes, reduce paperwork barriers, maintain absolute financial integrity through Class &quot;A&quot; governance, and deliver digital banking benefits directly to rural and urban households.
          </p>
        </div>
      </section>

      {/* 3. Chairman's Message */}
      <section id="chairman" className="py-16 px-4 bg-base-card/40 border-y border-base-border/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
          {/* Chairman Image / Frame */}
          <div data-aos="fade-right" className="flex justify-center">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-base-border bg-gradient-to-tr from-[#7B1010] to-[#F36B21] p-1.5 shadow-2xl transition-all duration-300">
              <div className="relative w-full h-full bg-base-card rounded-xl overflow-hidden flex flex-col justify-end p-4 transition-all duration-300">
                {/* SVG profile avatar representation */}
                <div className="absolute inset-0 flex items-center justify-center bg-base-bg transition-colors duration-300">
                  <TeamOutlined className="text-6xl text-text-muted/30 transition-colors" />
                </div>
                <div className="z-10 bg-base-bg/90 p-3 rounded-lg border border-base-border text-center transition-all duration-300">
                  <h4 className="text-sm font-bold text-text-main transition-colors duration-300">Shri. Sopanrao Kavad</h4>
                  <p className="text-[10px] text-[#F36B21] font-semibold mt-0.5">Society Chairman</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chairman Message Text */}
          <div data-aos="fade-up" className="lg:col-span-2 space-y-5">
            <span className="text-xs font-bold text-[#F36B21] uppercase tracking-wider">Leadership Statement</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main transition-colors duration-300">Message from the Chairman</h2>
            <div className="w-12 h-1 bg-[#F36B21] rounded-full" />
            
            <div className="space-y-4 text-xs sm:text-sm text-text-main leading-relaxed font-medium transition-colors duration-300">
              <p>
                &quot;Dear Members and Partners, since our foundation in 1998, Babasaheb Kavad Patsanstha has operated on the absolute foundation of mutual benefit and financial safety. We understand that every rupee you deposit with us represents hard-earned labor and future dreams. That is why our board and management execute the strictest risk policies to safeguard your funds.&quot;
              </p>
              <p>
                &quot;Our continuous Class &apos;A&apos; Auditing status stands as testament to our compliance. As we step into the digital banking era, we are modernizing our services, providing real-time SMS alerts, instant online transfers, and merchant support services, without losing the warm relationship-driven service that defines our co-operative.&quot;
              </p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-text-muted font-bold transition-colors">In Co-operation,</p>
              <p className="text-sm font-extrabold text-text-main mt-0.5 transition-colors">Shri. Sopanrao Kavad</p>
              <p className="text-[10px] text-text-muted transition-colors">Chairman, Babasaheb Kavad Patsanstha</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Timeline / History Milestones */}
      <section id="history" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main transition-colors">Our Journey Through Time</h2>
          <p className="text-xs text-text-muted max-w-xl mx-auto transition-colors">
            From a tiny room in Nighoj village to a state-wide network, here are our major milestones.
          </p>
        </div>

        <div className="relative border-l-2 border-[#7B1010]/30 ml-4 md:ml-32 space-y-8">
          {milestones.map((stone, idx) => (
            <div key={idx} data-aos="fade-up" className="relative pl-8 md:pl-12 group">
              {/* Year circle indicator */}
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-base-card border-2 border-[#7B1010] group-hover:border-[#F36B21] group-hover:bg-[#7B1010] transition-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              
              {/* Year floating block on left for wide screens */}
              <div className="hidden md:block absolute -left-32 top-0 w-24 text-right">
                <span className="text-sm font-black text-[#F36B21] tracking-wider">{stone.year}</span>
              </div>

              {/* Milestone details card */}
              <div className="glass-card p-5 rounded-lg border border-base-border/50 relative transition-all duration-300">
                <span className="md:hidden block text-xs font-black text-[#F36B21] mb-1">{stone.year}</span>
                <h4 className="text-sm sm:text-base font-bold text-text-main mb-1.5 transition-colors">{stone.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed transition-colors">{stone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Board of Directors */}
      <section id="directors" className="py-20 px-4 bg-base-card/40 border-t border-base-border/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
              Governance
            </span>
            <h2 className="text-3xl font-extrabold text-text-main transition-colors">Board of Directors</h2>
            <p className="text-xs text-text-muted max-w-xl mx-auto transition-colors">
              Our visionary leaders dedicated to maintaining financial transparency and supporting our members.
            </p>
          </div>

          {/* Directors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directors.map((dir, idx) => (
              <div 
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={(idx % 4) * 100}
                className="group relative rounded-xl p-5 bg-base-card border border-base-border hover:border-[#F36B21] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Avatar SVG outline */}
                  <div className="w-12 h-12 rounded-lg bg-base-bg group-hover:bg-[#7B1010] border border-base-border flex items-center justify-center text-lg text-text-muted/65 group-hover:text-white transition-all">
                    <TeamOutlined />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-text-main group-hover:text-[#F36B21] transition-colors">{dir.name}</h4>
                    <p className="text-[10px] text-[#F36B21] font-bold uppercase tracking-wider mt-1">{dir.role}</p>
                    <p className="text-[11px] text-text-muted leading-normal mt-1.5 transition-colors">{dir.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Audited Financial Highlights */}
      <section id="financials" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main transition-colors">Audit & Financial Strength</h2>
          <p className="text-xs text-text-muted max-w-xl mx-auto transition-colors">
            Our consistent audit history and year-on-year deposit metrics indicate our structural security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div data-aos="fade-up" className="glass-panel p-6 rounded-xl space-y-3">
            <AuditOutlined className="text-2xl text-[#F36B21]" />
            <h4 className="text-sm font-bold text-text-main uppercase transition-colors">State Audit Rating</h4>
            <p className="text-xs text-text-muted leading-relaxed transition-colors">
              Consistently rated with <span className="text-text-main font-bold transition-colors">&quot;Class A&quot; Audit certificate</span> under Maharashtra State Cooperative Societies Act, 1960.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className="glass-panel p-6 rounded-xl space-y-3">
            <AuditOutlined className="text-2xl text-[#7B1010]" />
            <h4 className="text-sm font-bold text-text-main uppercase transition-colors">Reserve Capital</h4>
            <p className="text-xs text-text-muted leading-relaxed transition-colors">
              Holds healthy capital-to-risk weighted asset ratios (CRAR) exceeding RBI-cooperative buffer margins.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="glass-panel p-6 rounded-xl space-y-3">
            <AuditOutlined className="text-2xl text-[#F36B21]" />
            <h4 className="text-sm font-bold text-text-main uppercase transition-colors">NPA Ratio</h4>
            <p className="text-xs text-text-muted leading-relaxed transition-colors">
              Maintains industry-low Net NPA levels of <span className="text-text-main font-bold transition-colors">under 1.5%</span> thanks to highly secured asset lending strategies.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

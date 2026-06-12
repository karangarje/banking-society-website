"use client";

import React from "react";
import { 
  TeamOutlined, 
  AuditOutlined, 
  EyeOutlined, 
  AimOutlined
} from "@ant-design/icons";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

const content = {
  en: {
    legacy: "Our Legacy",
    title: "About Our Co-operative Society",
    subtitle: "Building trusted bridges of credit and prosperity for businesses, farmers, and families since 1998.",
    visionTitle: "Our Vision",
    visionDesc: "To emerge as the most trusted, technology-driven, and socially-responsible financial co-operative society in Maharashtra, offering high-returns on deposits and seamless credit to empower common citizens.",
    missionTitle: "Our Mission",
    missionDesc: "To provide affordable financial schemes, reduce paperwork barriers, maintain absolute financial integrity through Class \"A\" governance, and deliver digital banking benefits directly to rural and urban households.",
    leadership: "Leadership Statement",
    chairmanTitle: "Message from the Chairman",
    chairmanImageLabel: "Society Chairman",
    chairmanPara1: "Dear Members and Partners, since our foundation in 1998, Babasaheb Kavad Patsanstha has operated on the absolute foundation of mutual benefit and financial safety. We understand that every rupee you deposit with us represents hard-earned labor and future dreams. That is why our board and management execute the strictest risk policies to safeguard your funds.",
    chairmanPara2: "Our continuous Class 'A' Auditing status stands as testament to our compliance. As we step into the digital banking era, we are modernizing our services, providing real-time SMS alerts, instant online transfers, and merchant support services, without losing the warm relationship-driven service that defines our co-operative.",
    inCooperation: "In Co-operation,",
    chairmanPost: "Chairman, Babasaheb Kavad Patsanstha",
    timelineTitle: "Our Journey Through Time",
    timelineSubtitle: "From a tiny room in Nighoj village to a state-wide network, here are our major milestones.",
    directorsTitle: "Board of Directors",
    directorsSubtitle: "Our visionary leaders dedicated to maintaining financial transparency and supporting our members.",
    governance: "Governance",
    auditTitle: "Audit & Financial Strength",
    auditSubtitle: "Our consistent audit history and year-on-year deposit metrics indicate our structural security.",
    stateAudit: "State Audit Rating",
    stateAuditDesc: "Consistently rated with \"Class A\" Audit certificate under Maharashtra State Cooperative Societies Act, 1960.",
    reserveCapital: "Reserve Capital",
    reserveCapitalDesc: "Holds healthy capital-to-risk weighted asset ratios (CRAR) exceeding RBI-cooperative buffer margins.",
    npaRatio: "NPA Ratio",
    npaRatioDesc: "Maintains industry-low Net NPA levels of under 1.5% thanks to highly secured asset lending strategies."
  },
  mr: {
    legacy: "आमचा वारसा",
    title: "आमच्या सहकारी संस्थेबद्दल",
    subtitle: "१९९८ पासून व्यवसाय, शेतकरी आणि कुटुंबांच्या प्रगतीसाठी विश्वासार्ह आर्थिक सेवा.",
    visionTitle: "आमची दृष्टी",
    visionDesc: "महाराष्ट्रातील सर्वाधिक विश्वासार्ह, तंत्रज्ञानाधारित आणि सामाजिकदृष्ट्या उत्तरदायी सहकारी संस्था बनणे.",
    missionTitle: "आमचे ध्येय",
    missionDesc: "परवडणाऱ्या आर्थिक योजना उपलब्ध करून देणे, पारदर्शकता राखणे आणि ग्रामीण तसेच शहरी भागांपर्यंत डिजिटल बँकिंग पोहोचवणे.",
    leadership: "नेतृत्व विधान",
    chairmanTitle: "अध्यक्षांचा संदेश",
    chairmanImageLabel: "संस्थेचे अध्यक्ष",
    chairmanPara1: "प्रिय सभासद व हितचिंतकांनो,\n१९९८ पासून बाबासाहेब कवड पतसंस्था विश्वास, सुरक्षितता आणि पारदर्शकतेच्या तत्त्वांवर कार्यरत आहे. आम्हाला माहित आहे की आपण आमच्याकडे जमा केलेला प्रत्येक रुपया हा आपल्या कष्टाचा आणि भविष्यातील स्वप्नांचा आहे. म्हणूनच तुमचे पैसे सुरक्षित ठेवण्यासाठी आमचे मंडळ आणि व्यवस्थापन अत्यंत कडक जोखीम धोरणे राबवते.",
    chairmanPara2: "आमचा सातत्यपूर्ण 'वर्ग अ' लेखापरीक्षण दर्जा आमच्या नियमांच्या पालनाची साक्ष देतो. आपण डिजिटल बँकिंगच्या युगात पाऊल टाकत असताना, आमच्या सहकारी संस्थेचे वैशिष्ट्य असणारी जिव्हाळ्याची नातेसंबंध-आधारित सेवा न गमावता, आम्ही रिअल-टाइम एसएमएस अलर्ट, इन्स्टंट ऑनलाईन ट्रान्सफर आणि व्यापारी सहाय्य सेवा प्रदान करून आमच्या सेवा आधुनिक करत आहोत.",
    inCooperation: "सहकार्याबद्दल धन्यवाद,",
    chairmanPost: "अध्यक्ष, बाबासाहेब कवड पतसंस्था",
    timelineTitle: "आमचा प्रवास",
    timelineSubtitle: "निघोज गावातील एका छोट्या खोलीपासून ते राज्यभरातील नेटवर्कपर्यंत, आमचे काही महत्त्वाचे टप्पे खालीलप्रमाणे आहेत.",
    directorsTitle: "संचालक मंडळ",
    directorsSubtitle: "आर्थिक पारदर्शकता राखण्यासाठी आणि आमच्या सदस्यांना पाठिंबा देण्यासाठी समर्पित आमचे दूरदर्शी नेते.",
    governance: "व्यवस्थापन",
    auditTitle: "लेखापरीक्षण व आर्थिक सामर्थ्य",
    auditSubtitle: "आमचा सातत्यपूर्ण लेखापरीक्षण इतिहास आणि वर्षानुवर्षांची ठेव आकडेवारी आमची संरचनात्मक सुरक्षा दर्शवते.",
    stateAudit: "राज्य लेखापरीक्षण दर्जा",
    stateAuditDesc: "महाराष्ट्र सहकारी संस्था कायदा, १९६० अंतर्गत सातत्याने \"वर्ग अ\" लेखापरीक्षण प्रमाणपत्र मिळवले आहे.",
    reserveCapital: "राखीव भांडवल",
    reserveCapitalDesc: "आरबीआय-सहकारी बफर मर्यादेपेक्षा जास्त असलेले निरोगी भांडवल-ते-जोखीम भारित मालमत्ता गुणोत्तर (CRAR) राखले आहे.",
    npaRatio: "एनपीए प्रमाण",
    npaRatioDesc: "अत्यंत सुरक्षित मालमत्ता कर्ज धोरणामुळे नेट एनपीए पातळी १.५% पेक्षा कमी राखली आहे."
  }
};

export default function About() {
  const { isDark } = useTheme();
  const { locale } = useLanguage();
  const isMr = locale === "mr";
  const t = content[locale];

  const directors = [
    {
      name: isMr ? "श्री. सोपानराव कवड" : "Shri. Sopanrao Kavad",
      role: isMr ? "अध्यक्ष" : "Chairman",
      designation: isMr ? "संस्थापक आणि ज्येष्ठ सहकार नेते" : "Founder & Senior Co-operative Leader"
    },
    {
      name: isMr ? "श्री. रामभाऊ कवड" : "Shri. Rambhau Kavad",
      role: isMr ? "उपाध्यक्ष" : "Vice Chairman",
      designation: isMr ? "कृषी पत पुरवठा तज्ज्ञ" : "Agricultural Credit Specialist"
    },
    {
      name: isMr ? "श्री. मच्छिंद्र कवड" : "Shri. Machhindra Kavad",
      role: isMr ? "व्यवस्थापकीय संचालक" : "Managing Director",
      designation: isMr ? "वित्त आणि ऑपरेशन्स प्रमुख" : "Finance & Operations Lead"
    },
    {
      name: isMr ? "सौ. सुजाता के. कवड" : "Sau. Sujata K. Kavad",
      role: isMr ? "महिला प्रतिनिधी संचालक" : "Director (Women Representative)",
      designation: isMr ? "सामाजिक कल्याण कार्यकर्त्या" : "Social Welfare Activist"
    },
    {
      name: isMr ? "श्री. ज्ञानेश्वर लाळगे" : "Shri. Dnyaneshwar Lalge",
      role: isMr ? "तज्ज्ञ संचालक" : "Director (Expert Director)",
      designation: isMr ? "चार्टर्ड अकाउंटंट" : "Chartered Accountant"
    },
    {
      name: isMr ? "श्री. एकनाथ जी. पठारे" : "Shri. Eknath G. Pathare",
      role: isMr ? "संचालक" : "Director",
      designation: isMr ? "स्थानिक व्यापारी प्रतिनिधी" : "Local Trader Representative"
    },
    {
      name: isMr ? "श्री. भाऊसाहेब एस. वरळ" : "Shri. Bhausaheb S. Varal",
      role: isMr ? "संचालक" : "Director",
      designation: isMr ? "ग्रामीण विकास सल्लागार" : "Rural Development Consultant"
    },
    {
      name: isMr ? "श्री. बाळासाहेब टी. शेळके" : "Shri. Balasaheb T. Shelke",
      role: isMr ? "संचालक" : "Director",
      designation: isMr ? "कृषी-व्यवसाय नियोजक" : "Agri-Business Planner"
    },
  ];

  const milestones = [
    { 
      year: isMr ? "१९९८" : "1998", 
      title: isMr ? "स्थापना व पहिली शाखा" : "Inception & First Branch", 
      desc: isMr ? "निघोज येथे १५० सभासदांसह संस्थेची स्थापना." : "Founded in Nighoj village (Ahmednagar) with 150 members to cater to rural microfinance." 
    },
    { 
      year: isMr ? "२००५" : "2005", 
      title: isMr ? "वर्ग 'अ' लेखापरीक्षण मानांकन" : "Class 'A' Audit Rating", 
      desc: isMr ? "राज्य सहकार आयुक्तांकडून उच्च लेखापरीक्षण दर्जा." : "Achieved the highest auditing standards from the State Co-operative Commissioner." 
    },
    { 
      year: isMr ? "२०१२" : "2012", 
      title: isMr ? "कोअर बँकिंग विस्तार" : "Core Banking Expansion", 
      desc: isMr ? "सर्व शाखांमध्ये संगणकीकृत बँकिंग प्रणाली लागू." : "Implemented centralized core banking software across all branches for unified ledgers." 
    },
    { 
      year: isMr ? "२०१८" : "2018", 
      title: isMr ? "₹३०० कोटी ठेवींचा टप्पा" : "₹300 Crore Deposit Milestone", 
      desc: isMr ? "ठेवींच्या वाढीसह पुणे व मुंबई येथे विस्तार." : "Crossed ₹300 Cr in deposit reserves and expanded to major cities including Pune and Mumbai." 
    },
    { 
      year: isMr ? "२०२४" : "2024", 
      title: isMr ? "मोबाईल बँकिंग व QR सेवा" : "Mobile & QR Digital Launch", 
      desc: isMr ? "IMPS, QR पेमेंट आणि डिजिटल सुविधा सुरू." : "Rolled out secure mobile banking application, IMPS fund transfers, and merchant QR scan cards." 
    },
  ];

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">
      
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-6 relative text-center space-y-4">
          <span className="text-white text-xs font-black uppercase tracking-widest bg-[#8B0000] border border-[#8B0000] px-3 py-1 rounded">
            {t.legacy}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#8B0000]">
            {t.title}
          </h1>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-aos="fade-right" className="glass-panel p-8 rounded-2xl space-y-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7B1010]/20 border border-[#7B1010]/40 flex items-center justify-center">
              <EyeOutlined className="text-xl text-[#F36B21]" />
            </div>
            <h3 className={`text-xl font-bold transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>{t.visionTitle}</h3>
          </div>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.visionDesc}
          </p>
        </div>

        <div data-aos="fade-left" className="glass-panel p-8 rounded-2xl space-y-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7B1010]/20 border border-[#7B1010]/40 flex items-center justify-center">
              <AimOutlined className="text-xl text-[#F36B21]" />
            </div>
            <h3 className={`text-xl font-bold transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>{t.missionTitle}</h3>
          </div>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.missionDesc}
          </p>
        </div>
      </section>

      {/* 3. Chairman's Message */}
      <section id="chairman" className="py-16 px-4 bg-base-card/40 border-y border-base-border/50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
          {/* Chairman Image / Frame */}
          <div data-aos="fade-right" className="flex justify-center">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-base-border bg-gradient-to-tr from-[#7B1010] to-[#F36B21] p-1.5 shadow-2xl transition-all duration-300">
              <div className="relative w-full h-full bg-base-card rounded-xl overflow-hidden flex flex-col justify-end p-4 transition-all duration-300">
                {/* SVG profile avatar representation */}
                <div className="absolute inset-0 flex items-center justify-center bg-base-bg transition-colors duration-300">
                  <TeamOutlined className="text-6xl text-text-muted/30 transition-colors" />
                </div>
                <div className="z-10 bg-base-bg/90 p-3 rounded-lg border border-base-border text-center transition-all duration-300">
                  <h4 className={`text-sm font-bold transition-colors duration-300 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>{isMr ? "श्री. सोपानराव कवड" : "Shri. Sopanrao Kavad"}</h4>
                  <p className="text-[10px] text-[#F36B21] font-semibold mt-0.5">{t.chairmanImageLabel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chairman Message Text */}
          <div data-aos="fade-up" className="lg:col-span-2 space-y-5">
            <span className="text-xs font-bold text-[#F36B21] uppercase tracking-wider">{t.leadership}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8B0000]">{t.chairmanTitle}</h2>
            <div className="w-12 h-1 bg-[#F36B21] rounded-full" />
            
            <div className={`space-y-4 text-xs sm:text-sm leading-relaxed font-medium transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-800"
            }`}>
              {t.chairmanPara1.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {t.chairmanPara2.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="pt-2">
              <p className={`text-xs font-bold transition-colors ${
                isDark ? "text-text-muted" : "text-gray-500"
              }`}>{t.inCooperation}</p>
              <p className={`text-sm font-extrabold mt-0.5 transition-colors ${
                isDark ? "text-white" : "text-gray-900"
              }`}>{isMr ? "श्री. सोपानराव कवड" : "Shri. Sopanrao Kavad"}</p>
              <p className={`text-[10px] transition-colors ${
                isDark ? "text-text-muted" : "text-gray-500"
              }`}>{t.chairmanPost}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Timeline / History Milestones */}
      <section id="history" className="py-20 max-w-[1400px] mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8B0000]">{t.timelineTitle}</h2>
          <p className={`text-xs max-w-xl mx-auto transition-colors ${
            isDark ? "text-text-muted" : "text-gray-600"
          }`}>
            {t.timelineSubtitle}
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
                <h4 className={`text-sm sm:text-base font-bold mb-1.5 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>{stone.title}</h4>
                <p className={`text-xs leading-relaxed transition-colors ${
                  isDark ? "text-text-muted" : "text-gray-600"
                }`}>{stone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Board of Directors */}
      <section id="directors" className="py-20 px-4 bg-base-card/40 border-t border-base-border/50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#8B0000] text-xs font-black uppercase tracking-widest bg-[rgba(139,0,0,0.15)] border border-[rgba(139,0,0,0.4)] px-3 py-1 rounded">
              {t.governance}
            </span>
            <h2 className="text-3xl font-extrabold text-[#8B0000]">{t.directorsTitle}</h2>
            <p className={`text-xs max-w-xl mx-auto transition-colors ${
              isDark ? "text-text-muted" : "text-gray-600"
            }`}>
              {t.directorsSubtitle}
            </p>
          </div>

          {/* Directors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directors.map((dir, idx) => (
              <div 
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={(idx % 4) * 100}
                className="group relative rounded-xl p-5 bg-[#F36F21] text-white border border-[#F36F21] hover:border-[#F36B21] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Avatar SVG outline */}
                  <div className="w-12 h-12 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center text-lg text-white transition-all">
                    <TeamOutlined />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{dir.name}</h4>
                    <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider mt-1">{dir.role}</p>
                    <p className="text-[11px] leading-normal mt-1.5 text-white/70">{dir.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Audited Financial Highlights */}
      <section id="financials" className="py-20 max-w-[1400px] mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8B0000]">{t.auditTitle}</h2>
          <p className={`text-xs max-w-xl mx-auto transition-colors ${
            isDark ? "text-text-muted" : "text-gray-600"
          }`}>
            {t.auditSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div data-aos="fade-up" className="glass-panel p-6 rounded-xl space-y-3">
            <AuditOutlined className="text-2xl text-[#F36B21]" />
            <h4 className={`text-sm font-bold uppercase transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}>{t.stateAudit}</h4>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDark ? "text-text-muted" : "text-gray-600"
            }`}>
              {t.stateAuditDesc}
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="100" className="glass-panel p-6 rounded-xl space-y-3">
            <AuditOutlined className="text-2xl text-[#7B1010]" />
            <h4 className={`text-sm font-bold uppercase transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}>{t.reserveCapital}</h4>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDark ? "text-text-muted" : "text-gray-600"
            }`}>
              {t.reserveCapitalDesc}
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" className="glass-panel p-6 rounded-xl space-y-3">
            <AuditOutlined className="text-2xl text-[#F36B21]" />
            <h4 className={`text-sm font-bold uppercase transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}>{t.npaRatio}</h4>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDark ? "text-text-muted" : "text-gray-600"
            }`}>
              {t.npaRatioDesc}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

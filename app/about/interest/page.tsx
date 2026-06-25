"use client";

import React, { useState, useEffect } from "react";
import {
  PercentageOutlined,
  WalletOutlined,
  DollarOutlined,
  SafetyOutlined,
  InfoCircleOutlined,
  RiseOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  GoldOutlined,
  ShopOutlined,
  CarOutlined,
  UserOutlined,
  CreditCardOutlined,
  HomeOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

const content = {
  en: {
    heroTitle: "Interest Rate Information",
    heroSubtitle: "Babasaheb Kavad Nagari Sahakari Patsanstha Ltd., Nighoj",
    heroDesc: "Attractive deposit schemes and competitive loan interest rates for members.",
    legacy: "About Us",
    title: "Interest Rates",
    subtitle: "Transparent and highly beneficial rate structure for our valued members",
    
    navHero: "Overview",
    navDeposits: "Deposit Rates",
    navSpecial: "Special Schemes",
    navLoans: "Loan Rates",
    navStats: "Quick Stats",
    printButton: "Print Rates",

    depositTitle: "Deposit Interest Rates",
    depositSubtitle: "Attractive and safe deposit schemes designed for maximum growth",
    colDepositType: "Deposit Type",
    colDuration: "Period / Duration",
    colGeneralRate: "Interest Rate",
    colSeniorRate: "Senior Citizen Rate",

    savingsType: "Individual Savings Account",
    fixedDepositType: "Fixed Deposit",
    doubleDepositType: "Double Deposit Scheme (Damduppat)",
    pensionDepositType: "Pension Deposit Scheme",
    doubleDepositPeriod: "91 Months",
    pensionPeriod: "3 Years",
    noPeriod: "-",

    specialTitle: "Special Schemes",
    specialSubtitle: "Exclusive savings plans offering exponential returns",
    lakhpatiTitle: "Lakhpati Deposit Scheme",
    lakhpatiSubtitle: "Lakhpati Deposit Scheme",
    lakhpatiPeriod: "Period: 5 Years",
    lakhpatiSanctitTitle: "Lakhpati Cumulative Deposit",
    lakhpatiSanctitSubtitle: "Lakhpati Cumulative Deposit",
    lakhpatiSanctitPeriod: "Period: 5 Years",
    monthlyLabel: "monthly",
    maturityLabel: "Maturity",

    loanTitle: "Loan Interest Rates",
    loanSubtitle: "Empowering your dreams and ventures with competitive credit rates",
    colLoanType: "Loan Category",
    colLoanRate: "Interest Rate (p.a.)",
    goldLoan: "Gold Loan",
    businessLoan: "Business Loan",
    vehicleLoan: "Vehicle Loan",
    personalLoan: "Personal Loan",
    cashCreditLoan: "Cash Credit Loan",
    propertyLoan: "Property Loan",
    depositAgainstLoan: "Loan Against Deposit",
    depositAgainstLoanDesc: "Related Deposit Rate + 2%",

    noticeTitle: "Important Notice",
    noticeText1: "Interest rates are subject to change from time to time according to the society's policies.",
    noticeText2: "For more details and custom queries, please contact your nearest branch.",

    statsTitle: "Financial Stats (2024-25)",
    statsSubtitle: "Key milestones achieved from our Annual Report 2024-2025",
    statDeposits: "Total Deposits",
    statLoans: "Total Loan Distribution",
    statMembers: "Total Members",
    statNpa: "Net NPA",
    depositsVal: "₹269.46 Cr",
    loansVal: "₹169.22 Cr",
    membersVal: "24,183",
    npaVal: "0.00%"
  },
  mr: {
    heroTitle: "व्याजदर माहिती",
    heroSubtitle: "बाबासाहेब कावड नागरी सहकारी पतसंस्था मर्या., निघोज",
    heroDesc: "सभासदांसाठी आकर्षक ठेव योजना व स्पर्धात्मक कर्ज व्याजदर.",
    legacy: "आमच्याबद्दल",
    title: "व्याजदर",
    subtitle: "आमच्या आदरणीय सभासदांसाठी पारदर्शक आणि अत्यंत फायदेशीर व्याजदर रचना",
    
    navHero: "आढावा",
    navDeposits: "ठेव व्याजदर",
    navSpecial: "विशेष योजना",
    navLoans: "कर्ज व्याजदर",
    navStats: "ठळक आकडेवारी",
    printButton: "प्रिंट करा",

    depositTitle: "ठेव व्याजदर",
    depositSubtitle: "तुमच्या बचतीला सुरक्षितता आणि सर्वाधिक वाढ देणाऱ्या ठेव योजना",
    colDepositType: "ठेव प्रकार",
    colDuration: "कालावधी",
    colGeneralRate: "व्याजदर",
    colSeniorRate: "ज्येष्ठ नागरिक व्याजदर",

    savingsType: "व्यक्तिगत सेव्हिंग्स",
    fixedDepositType: "मुदत ठेव",
    doubleDepositType: "दामदुप्पट ठेव",
    pensionDepositType: "पेन्शन ठेव",
    doubleDepositPeriod: "९१ महिने",
    pensionPeriod: "३ वर्षे",
    noPeriod: "-",

    specialTitle: "विशेष ठेव योजना",
    specialSubtitle: "तुमची संपत्ती वेगाने वाढवण्यासाठी डिझाइन केलेल्या विशेष ठेव योजना",
    lakhpatiTitle: "लखपती ठेव योजना",
    lakhpatiSubtitle: "लखपती ठेव योजना",
    lakhpatiPeriod: "कालावधी: ५ वर्षे",
    lakhpatiSanctitTitle: "लखपती संचित ठेव",
    lakhpatiSanctitSubtitle: "लखपती संचित ठेव",
    lakhpatiSanctitPeriod: "कालावधी: ५ वर्षे",
    monthlyLabel: "प्रति महिना",
    maturityLabel: "मॅच्युरिटी",

    loanTitle: "कर्ज व्याजदर",
    loanSubtitle: "स्पर्धात्मक कर्ज व्याजदरांसह तुमची स्वप्ने आणि व्यवसाय साकार करा",
    colLoanType: "कर्ज प्रकार",
    colLoanRate: "व्याजदर (वार्षिक)",
    goldLoan: "सोने तारण कर्ज",
    businessLoan: "व्यवसाय कर्ज",
    vehicleLoan: "वाहन तारण कर्ज",
    personalLoan: "वैयक्तिक कर्ज",
    cashCreditLoan: "कॅश क्रेडिट कर्ज",
    propertyLoan: "स्थावर तारण कर्ज",
    depositAgainstLoan: "ठेव तारण कर्ज",
    depositAgainstLoanDesc: "संबंधित ठेव व्याजदर + २%",

    noticeTitle: "महत्त्वाची टीप",
    noticeText1: "व्याजदर संस्थेच्या धोरणानुसार वेळोवेळी बदलू शकतात.",
    noticeText2: "अधिक माहितीसाठी जवळच्या शाखेशी संपर्क साधावा.",

    statsTitle: "ठळक आर्थिक आकडेवारी (२०२४-२५)",
    statsSubtitle: "वार्षिक अहवाल २०२४-२५ मधील अधिकृत प्रगतीची आकडेवारी",
    statDeposits: "एकूण ठेवी",
    statLoans: "एकूण कर्ज वितरण",
    statMembers: "सभासद संख्या",
    statNpa: "एनपीए (NPA)",
    depositsVal: "₹२६९.४६ कोटी",
    loansVal: "₹१६९.२२ कोटी",
    membersVal: "२४,१८३",
    npaVal: "०.००%"
  }
};

export default function InterestPage() {
  const { isDark } = useTheme();
  const { locale } = useLanguage();
  const isMr = locale === "mr";
  const t = content[locale];

  const [activeSec, setActiveSec] = useState("hero");
  const [dynamicDepositRates, setDynamicDepositRates] = useState<any[]>([]);
  const [dynamicLoanRates, setDynamicLoanRates] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      const sections = ["hero", "deposit-rates", "special-schemes", "loan-rates", "quick-stats"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSec(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    const fetchRates = async () => {
      try {
        const res = await fetch("/api/public/interest-rates");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const deposits = json.filter((r: any) => r.type === "DEPOSIT");
            const loans = json.filter((r: any) => r.type === "LOAN");
            
            if (deposits.length > 0) {
              setDynamicDepositRates(deposits.map((r: any) => {
                const baseRate = parseFloat(r.rate);
                const srRate = r.seniorCitizenRate !== undefined && r.seniorCitizenRate !== null ? parseFloat(r.seniorCitizenRate) : baseRate;
                return {
                  type: isMr ? r.schemeNameMr : r.schemeNameEn,
                  duration: isMr ? r.durationMr : r.durationEn,
                  rate: baseRate.toFixed(2) + "%",
                  seniorRate: srRate.toFixed(2) + "%",
                  isSpecial: r.schemeNameEn.toLowerCase().includes("special") || 
                             r.schemeNameEn.toLowerCase().includes("double") || 
                             r.schemeNameEn.toLowerCase().includes("damduppat") ||
                             r.schemeNameEn.toLowerCase().includes("pension")
                };
              }));
            }
            if (loans.length > 0) {
              setDynamicLoanRates(loans.map((r: any) => {
                let icon = <DollarOutlined className="text-2xl text-[#AD002E]" />;
                const nameEn = r.schemeNameEn.toLowerCase();
                if (nameEn.includes("gold") || nameEn.includes("सोने")) {
                  icon = <GoldOutlined className="text-2xl text-[#AD002E]" />;
                } else if (nameEn.includes("business") || nameEn.includes("व्यवसाय")) {
                  icon = <ShopOutlined className="text-2xl text-[#AD002E]" />;
                } else if (nameEn.includes("vehicle") || nameEn.includes("वाहन") || nameEn.includes("car")) {
                  icon = <CarOutlined className="text-2xl text-[#AD002E]" />;
                } else if (nameEn.includes("personal") || nameEn.includes("वैयक्तिक")) {
                  icon = <UserOutlined className="text-2xl text-[#AD002E]" />;
                } else if (nameEn.includes("credit") || nameEn.includes("क्रेडिट")) {
                  icon = <CreditCardOutlined className="text-2xl text-[#AD002E]" />;
                } else if (nameEn.includes("property") || nameEn.includes("स्थावर") || nameEn.includes("home") || nameEn.includes("house")) {
                  icon = <HomeOutlined className="text-2xl text-[#AD002E]" />;
                } else if (nameEn.includes("deposit") || nameEn.includes("ठेव")) {
                  icon = <SafetyOutlined className="text-2xl text-[#AD002E]" />;
                }
                return {
                  title: isMr ? r.schemeNameMr : r.schemeNameEn,
                  rate: parseFloat(r.rate).toFixed(2) + "%",
                  icon,
                  isFullWidth: nameEn.includes("deposit against loan") || nameEn.includes("ठेव तारण कर्ज")
                };
              }));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching interest rates:", err);
      }
    };

    fetchRates();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMr]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Height of header + sticky nav bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const depositRates = dynamicDepositRates.length > 0 ? dynamicDepositRates : [
    { type: t.savingsType, duration: t.noPeriod, rate: "3.00%", seniorRate: "3.00%", isSpecial: false },
    { type: t.fixedDepositType, duration: isMr ? "४६ दिवस" : "46 Days", rate: "7.00%", seniorRate: "7.00%", isSpecial: false },
    { type: t.fixedDepositType, duration: isMr ? "९० दिवस" : "90 Days", rate: "7.25%", seniorRate: "7.25%", isSpecial: false },
    { type: t.fixedDepositType, duration: isMr ? "१८० दिवस" : "180 Days", rate: "7.50%", seniorRate: "7.50%", isSpecial: false },
    { type: t.fixedDepositType, duration: isMr ? "१ वर्ष" : "1 Year", rate: "8.00%", seniorRate: "8.50%", isSpecial: false },
    { type: t.fixedDepositType, duration: isMr ? "२ वर्षे" : "2 Years", rate: "8.50%", seniorRate: "9.00%", isSpecial: false },
    { type: t.fixedDepositType, duration: isMr ? "३ वर्षे" : "3 Years", rate: "9.00%", seniorRate: "9.50%", isSpecial: false },
    { type: t.doubleDepositType, duration: t.doubleDepositPeriod, rate: "9.25%", seniorRate: "9.25%", isSpecial: true },
    { type: t.pensionDepositType, duration: t.pensionPeriod, rate: "9.00%", seniorRate: "9.50%", isSpecial: true },
  ];

  const loanRates = dynamicLoanRates.length > 0 ? dynamicLoanRates : [
    { title: t.goldLoan, rate: "9%", icon: <GoldOutlined className="text-2xl text-[#AD002E]" /> },
    { title: t.businessLoan, rate: "12%", icon: <ShopOutlined className="text-2xl text-[#AD002E]" /> },
    { title: t.vehicleLoan, rate: "12%", icon: <CarOutlined className="text-2xl text-[#AD002E]" /> },
    { title: t.personalLoan, rate: "12%", icon: <UserOutlined className="text-2xl text-[#AD002E]" /> },
    { title: t.cashCreditLoan, rate: "13%", icon: <CreditCardOutlined className="text-2xl text-[#AD002E]" /> },
    { title: t.propertyLoan, rate: "12%", icon: <HomeOutlined className="text-2xl text-[#AD002E]" /> },
    { title: t.depositAgainstLoan, rate: t.depositAgainstLoanDesc, icon: <SafetyOutlined className="text-2xl text-[#AD002E]" />, isFullWidth: true },
  ];

  const stats = [
    { label: t.statDeposits, value: t.depositsVal, icon: <WalletOutlined className="text-3xl text-[#AD002E]" /> },
    { label: t.statLoans, value: t.loansVal, icon: <DollarOutlined className="text-3xl text-[#AD002E]" /> },
    { label: t.statMembers, value: t.membersVal, icon: <TeamOutlined className="text-3xl text-[#AD002E]" /> },
    { label: t.statNpa, value: t.npaVal, icon: <CheckCircleOutlined className="text-3xl text-[#AD002E]" /> }
  ];

  return (
    <div className="w-full bg-white transition-colors duration-300">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print { display: none !important; }
          .print-full-width { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .print-card { border: 1px solid #666 !important; box-shadow-md: none !important; background: transparent !important; color: black !important; }
          .print-table { border: 1px solid #333 !important; border-collapse: collapse !important; width: 100% !important; }
          .print-table th, .print-table td { border: 1px solid #333 !important; padding: 8px !important; color: black !important; background: transparent !important; }
          body { background: white !important; color: black !important; }
          h1, h2, h3, h4, p, span, td, th { color: black !important; }
        }
      `}} />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-[#AD002E]/20/50 overflow-hidden transition-all duration-300 print-full-width">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl no-print" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-[#AD002E] bg-[#AD002E]/10 rounded-full uppercase tracking-wider">
            {t.legacy}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-main transition-colors duration-300">
            {t.heroTitle}
          </h1>
          <p className="text-lg font-bold text-[#AD002E] max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* STICKY SECTION NAVIGATION */}
      <div className="sticky top-[80px] z-20 w-full bg-white/90 backdrop-blur border-b border-[#AD002E]/20/50 py-3 shadow-md transition-all duration-300 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              { id: "hero", label: t.navHero },
              { id: "deposit-rates", label: t.navDeposits },
              { id: "special-schemes", label: t.navSpecial },
              { id: "loan-rates", label: t.navLoans },
              { id: "quick-stats", label: t.navStats },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeSec === sec.id
                    ? "bg-[#AD002E] text-white shadow-md shadow-[#AD002E]/20"
                    : isDark
                    ? "text-[#AD002E]/70 hover:bg-white/5 hover:text-white"
                    : "text-[#AD002E]/70 hover:bg-white hover:text-[#AD002E]"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-[#AD002E]/10 text-[#AD002E] border border-[#AD002E]/20 hover:bg-[#AD002E] hover:text-white transition-all duration-200"
          >
            <PrinterOutlined />
            <span>{t.printButton}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-24 print-full-width">

        {/* 2. DEPOSIT INTEREST RATES SECTION */}
        <section id="deposit-rates" className="space-y-8 scroll-mt-28 print-full-width">
          <div className="text-center space-y-3" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-main transition-colors">
              {t.depositTitle}
            </h2>
            <p className={`text-sm max-w-2xl mx-auto transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>
              {t.depositSubtitle}
            </p>
            <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#AD002E]/20/50 shadow-md bg-white transition-colors duration-300 print-card" data-aos="fade-up">
            <table className="w-full text-left border-collapse print-table">
              <thead>
                <tr className="bg-[#AD002E] text-white text-xs sm:text-sm font-bold">
                  <th className="p-4 sm:p-5">{t.colDepositType}</th>
                  <th className="p-4 sm:p-5">{t.colDuration}</th>
                  <th className="p-4 sm:p-5">{t.colGeneralRate}</th>
                  <th className="p-4 sm:p-5 bg-[#AD002E]">{t.colSeniorRate}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-border/50 text-xs sm:text-sm font-normal">
                {depositRates.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-white/80 ${
                      row.isSpecial
                        ? "bg-[#AD002E]/5 dark:bg-[#AD002E]/10"
                        : idx % 2 === 0
                        ? "bg-transparent"
                        : "bg-white/20"
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-bold text-text-main flex items-center gap-2">
                      {row.isSpecial && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#AD002E] text-white rounded-lg">
                          {isMr ? "विशेष" : "Special"}
                        </span>
                      )}
                      {row.type}
                    </td>
                    <td className="p-4 sm:p-5 text-text-main">{row.duration}</td>
                    <td className="p-4 sm:p-5 text-[#AD002E] font-bold text-base">{row.rate}</td>
                    <td className="p-4 sm:p-5 bg-[#AD002E]/5 dark:bg-[#AD002E]/15 text-[#AD002E] font-bold text-base print-card">
                      {row.seniorRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. SPECIAL DEPOSIT SCHEMES SECTION */}
        <section id="special-schemes" className="space-y-8 scroll-mt-28 print-full-width">
          <div className="text-center space-y-3" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-main transition-colors">
              {t.specialTitle}
            </h2>
            <p className={`text-sm max-w-2xl mx-auto transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>
              {t.specialSubtitle}
            </p>
            <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print-full-width">
            {/* Card 1 */}
            <div
              className="glass-card rounded-lg p-6 sm:p-8 border border-[#AD002E]/20/50 shadow-md hover:shadow-md hover:-translate-y-1 transition-all duration-300 print-card"
              data-aos="fade-right"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center">
                  <WalletOutlined className="text-2xl text-[#AD002E]" />
                </div>
                <span className="px-3 py-1 text-xs font-bold text-[#AD002E] border border-[#AD002E]/30 rounded-full">
                  {t.lakhpatiPeriod}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-main mb-1">{t.lakhpatiTitle}</h3>
              <p className="text-xs font-semibold text-text-muted tracking-wider uppercase mb-6">{t.lakhpatiSubtitle}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/30 transition-colors">
                  <div className="text-sm font-bold text-text-main">
                    {isMr ? "गुंतवणूक" : "Investment"}
                  </div>
                  <div className="flex items-center gap-3 text-lg font-bold text-[#AD002E]">
                    <span>{isMr ? "₹३२,५००" : "₹32,500"}</span>
                    <ArrowRightOutlined className="text-xs text-text-muted" />
                    <span className="px-2 py-0.5 text-xs bg-[#AD002E]/10 rounded-lg">{t.maturityLabel} {isMr ? "₹५०,०००" : "₹50,000"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/30 transition-colors">
                  <div className="text-sm font-bold text-text-main">
                    {isMr ? "गुंतवणूक" : "Investment"}
                  </div>
                  <div className="flex items-center gap-3 text-lg font-bold text-[#AD002E]">
                    <span>{isMr ? "₹६५,०००" : "₹65,000"}</span>
                    <ArrowRightOutlined className="text-xs text-text-muted" />
                    <span className="px-2 py-0.5 text-xs bg-[#AD002E]/10 rounded-lg">{t.maturityLabel} {isMr ? "₹१,००,०००" : "₹1,00,000"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="glass-card rounded-lg p-6 sm:p-8 border border-[#AD002E]/20/50 shadow-md hover:shadow-md hover:-translate-y-1 transition-all duration-300 print-card"
              data-aos="fade-left"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center">
                  <PercentageOutlined className="text-2xl text-[#AD002E]" />
                </div>
                <span className="px-3 py-1 text-xs font-bold text-[#AD002E] border border-[#AD002E]/30 rounded-full">
                  {t.lakhpatiSanctitPeriod}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-text-main mb-1">{t.lakhpatiSanctitTitle}</h3>
              <p className="text-xs font-semibold text-text-muted tracking-wider uppercase mb-6">{t.lakhpatiSanctitSubtitle}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/30 transition-colors">
                  <div className="text-sm font-bold text-text-main">
                    {isMr ? "मासिक ठेव" : "Monthly Installment"}
                  </div>
                  <div className="flex items-center gap-3 text-lg font-bold text-[#AD002E]">
                    <span>{isMr ? "₹६५०" : "₹650"} / {t.monthlyLabel}</span>
                    <ArrowRightOutlined className="text-xs text-text-muted" />
                    <span className="px-2 py-0.5 text-xs bg-[#AD002E]/10 rounded-lg">{t.maturityLabel} {isMr ? "₹५०,०००" : "₹50,000"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/30 transition-colors">
                  <div className="text-sm font-bold text-text-main">
                    {isMr ? "मासिक ठेव" : "Monthly Installment"}
                  </div>
                  <div className="flex items-center gap-3 text-lg font-bold text-[#AD002E]">
                    <span>{isMr ? "₹१,३००" : "₹1,300"} / {t.monthlyLabel}</span>
                    <ArrowRightOutlined className="text-xs text-text-muted" />
                    <span className="px-2 py-0.5 text-xs bg-[#AD002E]/10 rounded-lg">{t.maturityLabel} {isMr ? "₹१,००,०००" : "₹1,00,000"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. LOAN INTEREST RATES SECTION */}
        <section id="loan-rates" className="space-y-8 scroll-mt-28 print-full-width">
          <div className="text-center space-y-3" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-main transition-colors">
              {t.loanTitle}
            </h2>
            <p className={`text-sm max-w-2xl mx-auto transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>
              {t.loanSubtitle}
            </p>
            <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print-full-width">
            {loanRates.map((loan, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-lg p-5 border border-[#AD002E]/20/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between print-card ${
                  loan.isFullWidth ? "sm:col-span-2 lg:col-span-3 border-l-4 border-l-[#AD002E]" : ""
                }`}
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 50}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#AD002E]/10 flex items-center justify-center flex-shrink-0">
                    {loan.icon}
                  </div>
                  <h4 className="text-base font-bold text-text-main">{loan.title}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#AD002E] whitespace-nowrap">{loan.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. IMPORTANT NOTICE SECTION */}
        <section className="print-full-width" data-aos="fade-up">
          <div className="rounded-lg p-6 bg-[#AD002E]/5 border border-[#AD002E]/20 border-l-4 border-l-[#AD002E] flex flex-col sm:flex-row items-center gap-4 transition-colors print-card">
            <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center flex-shrink-0">
              <InfoCircleOutlined className="text-2xl text-[#AD002E]" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-[#AD002E]">{t.noticeTitle}</h4>
              <p className={`text-sm leading-relaxed transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70 font-normal"}`}>
                • {t.noticeText1} <br className="hidden sm:inline" />
                • {t.noticeText2}
              </p>
            </div>
          </div>
        </section>

        {/* 6. QUICK STATS SECTION */}
        <section id="quick-stats" className="space-y-8 scroll-mt-28 print-full-width">
          <div className="text-center space-y-3" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-main transition-colors">
              {t.statsTitle}
            </h2>
            <p className={`text-sm max-w-2xl mx-auto transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>
              {t.statsSubtitle}
            </p>
            <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 print-full-width">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card rounded-lg p-6 text-center border border-[#AD002E]/20/50 shadow-md hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center print-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="w-14 h-14 rounded-full bg-[#AD002E]/10 flex items-center justify-center mb-4 flex-shrink-0">
                  {stat.icon}
                </div>
                <h4 className="text-sm font-bold text-text-muted mb-2">{stat.label}</h4>
                <p className="text-2xl sm:text-3xl font-bold text-[#AD002E] tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

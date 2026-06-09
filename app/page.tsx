"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CalculatorOutlined, 
  ArrowRightOutlined, 
  SafetyOutlined,
  UnlockOutlined,
  ThunderboltOutlined 
} from "@ant-design/icons";
import { Tabs, Slider } from "antd";
import HeroSlider from "@/components/home/HeroSlider";
import StatsSection from "@/components/home/StatsSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import BranchesGrid from "@/components/home/BranchesGrid";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function Home() {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  // Calculator States
  const [calculatorTab, setCalculatorTab] = useState("loan");
  
  // EMI Calculator States
  const [loanAmt, setLoanAmt] = useState(500000); // INR
  const [loanRate, setLoanRate] = useState(10.5); // % p.a.
  const [loanTenure, setLoanTenure] = useState(5); // Years

  // FD Calculator States
  const [depositAmt, setDepositAmt] = useState(100000); // INR
  const [depositRate, setDepositRate] = useState(9.5); // % p.a.
  const [depositTenure, setDepositTenure] = useState(3); // Years

  // Calculation logic
  const calculateEMI = () => {
    const principal = loanAmt;
    const monthlyRate = (loanRate / 100) / 12;
    const numberOfPayments = loanTenure * 12;

    const emi = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyEMI: isNaN(emi) ? 0 : Math.round(emi),
      totalInterest: isNaN(totalInterest) ? 0 : Math.round(totalInterest),
      totalRepayment: isNaN(totalPayment) ? 0 : Math.round(totalPayment),
    };
  };

  const calculateFD = () => {
    const principal = depositAmt;
    const rate = depositRate / 100;
    // Compounded quarterly (std in Indian banks)
    const timesCompounded = 4; 
    const years = depositTenure;

    const maturityValue = principal * Math.pow((1 + rate / timesCompounded), (timesCompounded * years));
    const interestEarned = maturityValue - principal;

    return {
      maturityAmount: Math.round(maturityValue),
      interestEarned: Math.round(interestEarned),
    };
  };

  const emiResult = calculateEMI();
  const fdResult = calculateFD();

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">
      {/* 1. Hero Section Banner */}
      <HeroSlider />

      {/* 2. Co-operative Overview and Key Pillars */}
      <section className="py-20 px-4 bg-base-bg relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div data-aos="fade-right" className="space-y-6">
            <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
              {t("welcome.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main leading-tight transition-colors duration-300">
              {t("welcome.title")}
            </h2>
            <p className="text-sm text-text-muted leading-relaxed transition-colors duration-300">
              {t("welcome.desc")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-base-card border border-base-border space-y-2 transition-all duration-300">
                <SafetyOutlined className="text-xl text-[#F36B21]" />
                <h4 className="text-xs font-bold text-text-main uppercase transition-colors duration-300">{t("welcome.pillar1_title")}</h4>
                <p className="text-[10px] text-text-muted transition-colors duration-300">{t("welcome.pillar1_desc")}</p>
              </div>
              <div className="p-4 rounded-lg bg-base-card border border-base-border space-y-2 transition-all duration-300">
                <UnlockOutlined className="text-xl text-[#7B1010]" />
                <h4 className="text-xs font-bold text-text-main uppercase transition-colors duration-300">{t("welcome.pillar2_title")}</h4>
                <p className="text-[10px] text-text-muted transition-colors duration-300">{t("welcome.pillar2_desc")}</p>
              </div>
              <div className="p-4 rounded-lg bg-base-card border border-base-border space-y-2 transition-all duration-300">
                <ThunderboltOutlined className="text-xl text-[#F36B21]" />
                <h4 className="text-xs font-bold text-text-main uppercase transition-colors duration-300">{t("welcome.pillar3_title")}</h4>
                <p className="text-[10px] text-text-muted transition-colors duration-300">{t("welcome.pillar3_desc")}</p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#F36B21] hover:text-[#7B1010] transition-colors"
              >
                <span>{t("welcome.btn_history")}</span>
                <ArrowRightOutlined />
              </Link>
            </div>
          </div>

          {/* Decorative graphic block representing co-operative building */}
          <div data-aos="fade-left" className="relative p-6 rounded-2xl bg-base-card border border-base-border aspect-video flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B1010]/10 rounded-full blur-3xl" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded text-[10px] font-bold text-green-400 uppercase tracking-widest">
                {t("welcome.integrity_badge")}
              </div>
              <h3 className="text-xl font-bold text-text-main transition-colors duration-300">
                {t("welcome.integrity_title")}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-base-border pt-4 mt-6 transition-colors duration-300">
              <div>
                <p className="text-[10px] text-text-muted uppercase font-semibold transition-colors duration-300">{t("welcome.audit_standing")}</p>
                <p className="text-sm font-black text-text-main transition-colors duration-300">{t("welcome.audit_val")}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase font-semibold transition-colors duration-300">{t("welcome.dividend")}</p>
                <p className="text-sm font-black text-[#F36B21] transition-colors">{t("welcome.dividend_val")}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Stats Section counters */}
      <StatsSection />

      {/* 4. Core Schemes and Offerings Grid */}
      <ServicesGrid />

      {/* 5. Interactive Financial Tools (EMI / FD Calculators) */}
      <section className="py-20 px-4 bg-base-bg border-t border-base-border relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
              {t("calculator.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight transition-colors duration-300">
              {t("calculator.title")}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7B1010] to-[#F36B21] mx-auto rounded-full" />
            <p className="text-sm text-text-muted leading-relaxed transition-colors duration-300">
              {t("calculator.desc")}
            </p>
          </div>

          {/* Calculator Grid */}
          <div data-aos="fade-up" className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden transition-all duration-300">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F36B21]/5 rounded-full blur-3xl" />
            
            <Tabs
              activeKey={calculatorTab}
              onChange={setCalculatorTab}
              centered
              items={[
                {
                  key: "loan",
                  label: (
                    <span className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider">
                      <CalculatorOutlined />
                      <span>{t("calculator.tab_loan")}</span>
                    </span>
                  ),
                  children: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                      {/* Left: Input sliders */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-text-muted transition-colors duration-300">
                            <span>{t("calculator.label_loan_amt")}</span>
                            <span className="text-[#F36B21]">₹{loanAmt.toLocaleString()}</span>
                          </div>
                          <Slider
                            min={10000}
                            max={5000000}
                            step={10000}
                            value={loanAmt}
                            onChange={(val) => setLoanAmt(val)}
                            tooltip={{ formatter: (v) => `₹${v?.toLocaleString()}` }}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-text-muted transition-colors duration-300">
                            <span>{t("calculator.label_rate")}</span>
                            <span className="text-[#F36B21]">{loanRate}%</span>
                          </div>
                          <Slider
                            min={5}
                            max={20}
                            step={0.1}
                            value={loanRate}
                            onChange={(val) => setLoanRate(val)}
                            tooltip={{ formatter: (v) => `${v}%` }}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-text-muted transition-colors duration-300">
                            <span>{t("calculator.label_tenure")}</span>
                            <span className="text-[#F36B21]">{loanTenure} {t("calculator.label_tenure").includes("YEARS") ? "Years" : "वर्षे"}</span>
                          </div>
                          <Slider
                            min={1}
                            max={20}
                            step={1}
                            value={loanTenure}
                            onChange={(val) => setLoanTenure(val)}
                            tooltip={{ formatter: (v) => `${v} Yrs` }}
                          />
                        </div>
                      </div>

                      {/* Right: Results Display */}
                      <div className="bg-base-card border border-base-border rounded-xl p-6 flex flex-col justify-between text-center relative transition-all duration-300">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest transition-colors duration-300">{t("calculator.est_emi")}</span>
                            <h4 className="text-3xl font-black text-[#F36B21] mt-1">₹{emiResult.monthlyEMI.toLocaleString()}</h4>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-base-border pt-4 transition-colors duration-300">
                            <div>
                              <span className="text-[9px] text-text-muted uppercase font-semibold transition-colors duration-300">{t("calculator.total_interest")}</span>
                              <p className="text-sm font-bold text-text-main mt-0.5 transition-colors duration-300">₹{emiResult.totalInterest.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-[9px] text-text-muted uppercase font-semibold transition-colors duration-300">{t("calculator.total_repayment")}</span>
                              <p className="text-sm font-bold text-text-main mt-0.5 transition-colors duration-300">₹{emiResult.totalRepayment.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6">
                          <Link href="/services?tab=loans" className="block text-center bg-[#7B1010] hover:bg-[#9c1a1a] text-white py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors border border-[#9c1a1a]">
                            {t("calculator.btn_apply_loan")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "fd",
                  label: (
                    <span className="flex items-center gap-1.5 font-bold uppercase text-xs tracking-wider">
                      <CalculatorOutlined />
                      <span>{t("calculator.tab_fd")}</span>
                    </span>
                  ),
                  children: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                      {/* Left: Input sliders */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-text-muted transition-colors duration-300">
                            <span>{t("calculator.label_dep_amt")}</span>
                            <span className="text-[#F36B21]">₹{depositAmt.toLocaleString()}</span>
                          </div>
                          <Slider
                            min={1000}
                            max={10000000}
                            step={5000}
                            value={depositAmt}
                            onChange={(val) => setDepositAmt(val)}
                            tooltip={{ formatter: (v) => `₹${v?.toLocaleString()}` }}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-text-muted transition-colors duration-300">
                            <span>{t("calculator.label_rate")}</span>
                            <span className="text-[#F36B21]">{depositRate}%</span>
                          </div>
                          <Slider
                            min={4}
                            max={15}
                            step={0.1}
                            value={depositRate}
                            onChange={(val) => setDepositRate(val)}
                            tooltip={{ formatter: (v) => `${v}%` }}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-text-muted transition-colors duration-300">
                            <span>{t("calculator.label_tenure")}</span>
                            <span className="text-[#F36B21]">{depositTenure} {t("calculator.label_tenure").includes("YEARS") ? "Years" : "वर्षे"}</span>
                          </div>
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={depositTenure}
                            onChange={(val) => setDepositTenure(val)}
                            tooltip={{ formatter: (v) => `${v} Yrs` }}
                          />
                        </div>
                      </div>

                      {/* Right: Results Display */}
                      <div className="bg-base-card border border-base-border rounded-xl p-6 flex flex-col justify-between text-center relative transition-all duration-300">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest transition-colors duration-300">{t("calculator.exp_maturity")}</span>
                            <h4 className="text-3xl font-black text-[#F36B21] mt-1">₹{fdResult.maturityAmount.toLocaleString()}</h4>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-base-border pt-4 transition-colors duration-300">
                            <div>
                              <span className="text-[9px] text-text-muted uppercase font-semibold transition-colors duration-300">{t("calculator.interest_earned")}</span>
                              <p className="text-sm font-bold text-text-main mt-0.5 transition-colors duration-300">₹{fdResult.interestEarned.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-[9px] text-text-muted uppercase font-semibold transition-colors duration-300">{t("calculator.term_period")}</span>
                              <p className="text-sm font-bold text-text-main mt-0.5 transition-colors duration-300">{depositTenure} {t("calculator.label_tenure").includes("YEARS") ? "Years" : "वर्षे"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6">
                          <Link href="/services?tab=deposits" className="block text-center bg-[#7B1010] hover:bg-[#9c1a1a] text-white py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors border border-[#9c1a1a]">
                            {t("calculator.btn_open_fd")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>

        </div>
      </section>

      {/* 6. Branches Directory Grid Buttons */}
      <BranchesGrid />
    </div>
  );
}

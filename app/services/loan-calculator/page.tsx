// app/services/loan-calculator/page.tsx
"use client";

import React, { useState, useRef } from "react";
import LoanHero from "@/components/loan/LoanHero";
import LoanForm from "@/components/loan/LoanForm";
import LoanSummary from "@/components/loan/LoanSummary";
import ScheduleTable from "@/components/loan/ScheduleTable";
import { LoanInputs } from "@/types/loan";
import { calculateLoanEMI } from "@/lib/emi";
import { generateRepaymentSchedule } from "@/lib/schedule";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function LoanCalculatorPage() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();

  const defaultInputs: LoanInputs = {
    loanAmount: 500000,
    interestRate: 10.5,
    loanTenure: 60,
    startDate: new Date().toISOString().split("T")[0],
    emiType: "monthly",
    interestCalculation: "monthly",
  };

  const [inputs, setInputs] = useState<LoanInputs>(defaultInputs);
  const [summary, setSummary] = useState(calculateLoanEMI(defaultInputs));
  const [schedule, setSchedule] = useState(generateRepaymentSchedule(defaultInputs));

  const handleCalculate = (newInputs: LoanInputs) => {
    setInputs(newInputs);
    setSummary(calculateLoanEMI(newInputs));
    setSchedule(generateRepaymentSchedule(newInputs));
  };

  const handleScrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-locale={locale} className="loan-calculator-light min-h-screen bg-white text-[#AD002E]">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Main Calculate Button styling */
        .loan-calculator-light form button[type="submit"] {
          background-color: #B3003C !important;
          color: white !important;
          font-size: 0 !important;
          transition: background-color 0.2s ease, transform 0.1s ease !important;
        }
        .loan-calculator-light form button[type="submit"]:hover {
          background-color: #900030 !important;
        }
        .loan-calculator-light form button[type="submit"]:active {
          transform: scale(0.98) !important;
        }
        .loan-calculator-light form button[type="submit"]:disabled {
          background-color: #E5E7EB !important;
          cursor: not-allowed !important;
        }

        .loan-calculator-light[data-locale="en"] form button[type="submit"]::after {
          content: "Calculate EMI" !important;
          font-size: 0.875rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: white !important;
        }
        .loan-calculator-light[data-locale="mr"] form button[type="submit"]::after {
          content: "EMI मोजा" !important;
          font-size: 0.875rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: white !important;
        }
        .loan-calculator-light[data-locale="en"] form button[type="submit"]:disabled::after {
          color: #9CA3AF !important;
        }
        .loan-calculator-light[data-locale="mr"] form button[type="submit"]:disabled::after {
          color: #9CA3AF !important;
        }

        /* Export PDF Button styling */
        .loan-calculator-light button:has(svg.lucide-download),
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type {
          background-color: #B3003C !important;
          color: white !important;
          transition: background-color 0.2s ease !important;
        }
        .loan-calculator-light button:has(svg.lucide-download):hover,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type:hover {
          background-color: #900030 !important;
        }
        .loan-calculator-light button:has(svg.lucide-download):disabled,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type:disabled {
          background-color: #E5E7EB !important;
          cursor: not-allowed !important;
        }

        .loan-calculator-light button:has(svg.lucide-download) svg,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type svg {
          color: white !important;
          stroke: white !important;
        }
        .loan-calculator-light button:has(svg.lucide-download):disabled svg,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type:disabled svg {
          color: #9CA3AF !important;
          stroke: #9CA3AF !important;
        }

        .loan-calculator-light button:has(svg.lucide-download) span,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type span {
          font-size: 0 !important;
        }

        .loan-calculator-light[data-locale="en"] button:has(svg.lucide-download) span::after,
        .loan-calculator-light[data-locale="en"] .flex.flex-wrap.items-center.gap-2 button:first-of-type span::after {
          content: "Export PDF" !important;
          font-size: 0.875rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: white !important;
        }
        .loan-calculator-light[data-locale="mr"] button:has(svg.lucide-download) span::after,
        .loan-calculator-light[data-locale="mr"] .flex.flex-wrap.items-center.gap-2 button:first-of-type span::after {
          content: "PDF डाउनलोड" !important;
          font-size: 0.875rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: white !important;
        }
        .loan-calculator-light button:has(svg.lucide-download):disabled span::after,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:first-of-type:disabled span::after {
          color: #9CA3AF !important;
        }

        /* Search Input and Pseudo-Button styling */
        .loan-calculator-light .relative.w-full.sm\:w-60 {
          display: flex !important;
          align-items: center !important;
        }
        .loan-calculator-light .relative.w-full.sm\:w-60 input {
          padding-right: 4.5rem !important;
          border-color: rgba(173, 0, 46, 0.2) !important;
        }
        .loan-calculator-light .relative.w-full.sm\:w-60 input::placeholder {
          color: #AD002E !important;
          opacity: 0.5 !important;
        }
        .loan-calculator-light .relative.w-full.sm\:w-60::after {
          position: absolute !important;
          right: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
          background-color: #B3003C !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 0.875rem !important;
          border-radius: 0 0.5rem 0.5rem 0 !important;
          font-size: 0.875rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          pointer-events: none !important;
          transition: background-color 0.2s ease !important;
        }
        .loan-calculator-light[data-locale="en"] .relative.w-full.sm\:w-60::after {
          content: "Search" !important;
        }
        .loan-calculator-light[data-locale="mr"] .relative.w-full.sm\:w-60::after {
          content: "शोधा" !important;
        }

        /* Print Button readability fix */
        .loan-calculator-light button.bg-\\[\\#1E1B6B\\],
        .loan-calculator-light button:has(svg.lucide-printer),
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:nth-of-type(2) {
          color: white !important;
          background-color: #1E1B6B !important;
        }
        .loan-calculator-light button.bg-\\[\\#1E1B6B\\] span,
        .loan-calculator-light button:has(svg.lucide-printer) span,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:nth-of-type(2) span {
          color: white !important;
        }
        .loan-calculator-light button.bg-\\[\\#1E1B6B\\] svg,
        .loan-calculator-light button:has(svg.lucide-printer) svg,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:nth-of-type(2) svg {
          color: white !important;
          stroke: white !important;
        }
        .loan-calculator-light button.bg-\\[\\#1E1B6B\\]:hover,
        .loan-calculator-light button:has(svg.lucide-printer):hover,
        .loan-calculator-light .flex.flex-wrap.items-center.gap-2 button:nth-of-type(2):hover {
          background-color: #141249 !important;
        }
      ` }} />
      <LoanHero onCtaClick={handleScrollToCalculator} />
      <div ref={calculatorRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        <div className="lg:col-span-1">
          <LoanForm onSubmit={handleCalculate} initialValues={inputs} />
        </div>
        <div className="lg:col-span-1">
          <LoanSummary inputs={inputs} summary={summary} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:py-20">
        <ScheduleTable inputs={inputs} schedule={schedule} summary={summary} />
      </div>
    </div>
  );
}

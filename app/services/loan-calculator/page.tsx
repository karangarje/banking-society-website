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

export default function LoanCalculatorPage() {
  const calculatorRef = useRef<HTMLDivElement>(null);

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
    <div className="loan-calculator-light min-h-screen bg-white text-[#AD002E]">
      <LoanHero onCtaClick={handleScrollToCalculator} />
      <div ref={calculatorRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        <div className="lg:col-span-1">
          <LoanForm onSubmit={handleCalculate} initialValues={inputs} />
        </div>
        <div className="lg:col-span-1">
          <LoanSummary inputs={inputs} summary={summary} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        <ScheduleTable inputs={inputs} schedule={schedule} summary={summary} />
      </div>
    </div>
  );
}

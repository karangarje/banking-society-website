"use client";

import React from "react";
import { useLanguage } from "@/components/theme/LanguageContext";
import { LoanInputs, LoanSummaryData } from "@/types/loan";
import { motion } from "framer-motion";
import {
  Banknote,
  Percent,
  Calendar,
  CreditCard,
  TrendingUp,
  Coins,
} from "lucide-react";

interface LoanSummaryProps {
  inputs: LoanInputs;
  summary: LoanSummaryData;
}

export default function LoanSummary({ inputs, summary }: LoanSummaryProps) {
  const { t } = useLanguage();

  const cards = [
    {
      title: t("loanCalculator.card_amount") || "Loan Amount",
      value: `₹${inputs.loanAmount.toLocaleString()}`,
      icon: <Banknote className="w-6 h-6 text-[#B3003C]" />,
      color: "border-l-4 border-l-[#B3003C]",
    },
    {
      title: t("loanCalculator.card_rate") || "Interest Rate",
      value: `${inputs.interestRate}% p.a.`,
      icon: <Percent className="w-6 h-6 text-[#1E1B6B]" />,
      color: "border-l-4 border-l-[#1E1B6B]",
    },
    {
      title: t("loanCalculator.card_tenure") || "Tenure",
      value: `${inputs.loanTenure} ${t("loanCalculator.weekly").includes("साप्ताहिक") ? "महिने" : "Months"}`,
      icon: <Calendar className="w-6 h-6 text-[#D4AF37]" />,
      color: "border-l-4 border-l-[#D4AF37]",
    },
    {
      title: t("loanCalculator.card_emi") || "EMI Amount",
      value: `₹${summary.emi.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subtitle: inputs.emiType === "weekly" ? t("loanCalculator.weekly_emi") : t("loanCalculator.monthly_emi"),
      icon: <CreditCard className="w-6 h-6 text-[#B3003C]" />,
      color: "border-l-4 border-l-[#B3003C]",
    },
    {
      title: t("loanCalculator.card_interest") || "Total Interest Accrued",
      value: `₹${summary.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: <TrendingUp className="w-6 h-6 text-[#1E1B6B]" />,
      color: "border-l-4 border-l-[#1E1B6B]",
    },
    {
      title: t("loanCalculator.card_payment") || "Total Payment Cost",
      value: `₹${summary.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: <Coins className="w-6 h-6 text-[#D4AF37]" />,
      color: "border-l-4 border-l-[#D4AF37]",
    },
  ];

  return (
    <div className="space-y-5 bg-white border border-gray-200 rounded-2xl shadow-md p-6 text-[#111827]">
      <h3 className="text-xl font-extrabold text-[#111827] border-b border-gray-200 pb-3">
        {t("loanCalculator.summary_title") || "Loan Summary"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
          className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between transition-all duration-200 ${card.color}`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  {card.title}
                </span>
                <h4 className="text-xl md:text-2xl font-extrabold text-[#111827]">
                  {card.value}
                </h4>
                {card.subtitle && (
                  <p className="text-xs text-gray-500">
                    {card.subtitle}
                  </p>
                )}
              </div>
              <div className="p-3 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

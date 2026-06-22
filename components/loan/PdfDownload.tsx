"use client";

import React from "react";
import { useLanguage } from "@/components/theme/LanguageContext";
import { generateLoanPdf } from "@/lib/pdf";
import { LoanInputs, ScheduleRow, LoanSummaryData } from "@/types/loan";
import { Download } from "lucide-react";

interface PdfDownloadProps {
  inputs: LoanInputs;
  schedule: ScheduleRow[];
  summary: LoanSummaryData;
}

export default function PdfDownload({ inputs, schedule, summary }: PdfDownloadProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={() => generateLoanPdf(inputs, schedule, summary)}
      className="flex items-center gap-1.5 bg-[#B3003C] hover:bg-[#92002f] text-white px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider transition-colors duration-200 shadow-sm"
    >
      <Download className="w-4 h-4" />
      <span>{t("loanCalculator.btn_export_pdf") || "Export PDF"}</span>
    </button>
  );
}

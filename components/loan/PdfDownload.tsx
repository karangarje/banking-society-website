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
      className="flex items-center gap-1.5 bg-[#AD002E] hover:bg-[#AD002E] text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors duration-200 shadow-md"
    >
      <Download className="w-4 h-4" />
      <span>{t("loanCalculator.btn_export_pdf") || "Export PDF"}</span>
    </button>
  );
}

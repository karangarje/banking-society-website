"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/components/theme/LanguageContext";
import { LoanInputs, ScheduleRow, LoanSummaryData } from "@/types/loan";
import PdfDownload from "./PdfDownload";
import {
  Search,
  Printer,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface ScheduleTableProps {
  inputs: LoanInputs;
  schedule: ScheduleRow[];
  summary: LoanSummaryData;
}

export default function ScheduleTable({
  inputs,
  schedule,
  summary,
}: ScheduleTableProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter schedule based on search term
  const filteredSchedule = useMemo(() => {
    if (!searchTerm.trim()) return schedule;
    const term = searchTerm.toLowerCase();
    return schedule.filter(
      (row) =>
        row.installment.toString().includes(term) ||
        row.dueDate.toLowerCase().includes(term)
    );
  }, [schedule, searchTerm]);

  // Reset pagination on search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  // Pagination bounds
  const totalItems = filteredSchedule.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  const paginatedSchedule = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSchedule.slice(startIndex, startIndex + pageSize);
  }, [filteredSchedule, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Table Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#AD002E]/20 pb-4">
        <h3 className="text-xl font-bold text-[#AD002E]">
          {t("loanCalculator.table_title") || "Repayment Schedule"}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-60">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder={t("loanCalculator.placeholder_search") || "Search installments..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border border-[#AD002E]/20 focus:border-[#AD002E] focus:ring-[#AD002E]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-[#AD002E] outline-none transition-colors duration-200"
              
            />
          </div>

          {/* Export PDF Button */}
          <PdfDownload inputs={inputs} schedule={schedule} summary={summary} />

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#1E1B6B] hover:bg-[#141249] text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors duration-200 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden xs:inline">{t("loanCalculator.print") || "Print"}</span>
          </button>
        </div>
      </div>

      {/* Main Repayment Table */}
      <div className="bg-white border border-[#AD002E]/20 rounded-lg overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full table-fixed">
            {/* Sticky Table Header */}
            <thead className="sticky top-0 bg-[#AD002E] text-white z-10">
              <tr>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-center w-[12%] whitespace-nowrap">
                  {t("loanCalculator.col_installment") || "Installment No."}
                </th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-center w-[16%] whitespace-nowrap">
                  {t("loanCalculator.col_due_date") || "Due Date"}
                </th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right w-[14%] whitespace-nowrap">
                  {t("loanCalculator.col_emi") || "EMI"}
                </th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right w-[18%] whitespace-nowrap">
                  {t("loanCalculator.col_principal") || "Principal"}
                </th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right w-[18%] whitespace-nowrap">
                  {t("loanCalculator.col_interest") || "Interest"}
                </th>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-right w-[22%] whitespace-nowrap">
                  {t("loanCalculator.col_balance") || "Outstanding Balance"}
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 text-sm text-[#AD002E]">
              {paginatedSchedule.length > 0 ? (
                paginatedSchedule.map((row) => (
                  <tr key={row.installment} className="hover:bg-white">
                    <td className="px-4 py-4 text-center font-bold w-[12%] whitespace-nowrap">
                      {row.installment}
                    </td>
                    <td className="px-4 py-4 text-center w-[16%] whitespace-nowrap">
                      {row.dueDate}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-[#AD002E] w-[14%] whitespace-nowrap">
                      ₹{row.emi.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right font-normal w-[18%] whitespace-nowrap">
                      ₹{row.principal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right w-[18%] whitespace-nowrap">
                      ₹{row.interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-[#1E1B6B] w-[22%] whitespace-nowrap">
                      ₹{row.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-text-muted font-semibold">
                    No installments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#AD002E]/20 bg-white">
            {/* Size selector & Info */}
            <div className="flex items-center gap-4 text-xs font-semibold text-text-muted">
              <div className="flex items-center gap-1.5">
                <span>Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))} className="bg-white border border-[#AD002E]/20 rounded-lg px-2 py-1 outline-none text-[#AD002E]"
                  
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <span>
                Showing {Math.min(totalItems, (currentPage - 1) * pageSize + 1)}-
                {Math.min(totalItems, currentPage * pageSize)} of {totalItems}
              </span>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1} className="p-1.5 rounded-lg border border-[#AD002E]/20 hover:bg-white disabled:opacity-40 transition-colors"
                                
              >
                                  <ChevronsLeft className="w-4 h-4 text-[#AD002E]" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1} className="p-1.5 rounded-lg border border-[#AD002E]/20 hover:bg-white disabled:opacity-40 transition-colors"
                
              >
                                  <ChevronLeft className="w-4 h-4 text-[#AD002E]" />
              </button>

                              <span className="text-xs font-bold text-[#AD002E] px-2">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-[#AD002E]/20 hover:bg-white disabled:opacity-40 transition-colors"
                
              >
                                  <ChevronRight className="w-4 h-4 text-[#AD002E]" />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                
              >
                                  <ChevronsRight className="w-4 h-4 text-[#AD002E]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/components/theme/LanguageContext";
import { LoanInputs } from "@/types/loan";
import { motion } from "framer-motion";

interface LoanFormProps {
  onSubmit: (data: LoanInputs) => void;
  initialValues?: Partial<LoanInputs>;
}

export default function LoanForm({ onSubmit, initialValues }: LoanFormProps) {
  const { t } = useLanguage();

  const loanSchema = z.object({
    loanAmount: z.number().positive(),
    interestRate: z.number().positive(),
    loanTenure: z.number().int().positive(),
    startDate: z.string().min(1),
    emiType: z.enum(["monthly", "weekly"]),
    interestCalculation: z.enum(["monthly", "weekly"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanInputs>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loanAmount: initialValues?.loanAmount ?? 500000,
      interestRate: initialValues?.interestRate ?? 10.5,
      loanTenure: initialValues?.loanTenure ?? 60,
      startDate:
        initialValues?.startDate ?? new Date().toISOString().split("T")[0],
      emiType: initialValues?.emiType ?? "monthly",
      interestCalculation: initialValues?.interestCalculation ?? "monthly",
    },
  });

  const labelClass = "block text-xs font-bold uppercase tracking-wide text-[#111827] mb-1.5";

  const inputClass = "w-full h-12 bg-white text-[#111827] placeholder:text-gray-500 border border-gray-300 focus:border-[#B3003C] focus:ring-2 focus:ring-[#B3003C]/20 rounded-xl px-4 text-sm outline-none transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-white border border-gray-200 rounded-2xl p-6 text-[#111827] loan-card"
    >
      <h3 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white mb-5 text-center">
        {t("loanCalculator.form_title") || "Loan Details Form"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div>
          <label className={labelClass}>
            {t("loanCalculator.field_amount") || "Loan Amount (INR)"}
          </label>
          <input
            type="number"
            step="any"
            {...register("loanAmount", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.loanAmount && (
            <p className="text-xs text-[#B3003C] mt-1 font-semibold">
              {errors.loanAmount.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            {t("loanCalculator.field_rate") || "Annual Interest Rate (%)"}
          </label>
          <input
            type="number"
            step="any"
            {...register("interestRate", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            {t("loanCalculator.field_tenure") || "Loan Tenure (Months)"}
          </label>
          <input
            type="number"
            {...register("loanTenure", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            {t("loanCalculator.field_start_date") || "Repayment Start Date"}
          </label>
          <input
            type="date"
            {...register("startDate")}
            className={`${inputClass} [&::-webkit-calendar-picker-indicator]:dark:invert`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              {t("loanCalculator.field_emi_type") || "EMI Type"}
            </label>
            <select {...register("emiType")} className={inputClass}>
              <option value="monthly">
                {t("loanCalculator.monthly_emi") || "Monthly EMI"}
              </option>
              <option value="weekly">
                {t("loanCalculator.weekly_emi") || "Weekly EMI"}
              </option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              {t("loanCalculator.field_interest_calc") ||
                "Interest Calculation Period"}
            </label>
            <select
              {...register("interestCalculation")}
              className={inputClass}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full pt-2"
        >
          <button
            type="submit"
            className="w-full bg-[#B3003C] hover:bg-[#92002f] text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {t("loanCalculator.btn_generate") || "Generate Schedule"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
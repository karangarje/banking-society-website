import { LoanInputs, ScheduleRow } from "@/types/loan";
import { calculateLoanEMI } from "./emi";

/**
 * Adds a specific number of months or weeks to a starting date string (YYYY-MM-DD).
 */
export function addPeriodsToDate(startDateStr: string, periods: number, type: "monthly" | "weekly"): string {
  const date = new Date(startDateStr);
  if (isNaN(date.getTime())) {
    return startDateStr;
  }
  if (type === "weekly") {
    date.setDate(date.getDate() + periods * 7);
  } else {
    date.setMonth(date.getMonth() + periods);
  }
  return date.toISOString().split("T")[0];
}

/**
 * Generates the full amortization schedule row-by-row based on the EMI inputs.
 */
export function generateRepaymentSchedule(inputs: LoanInputs): ScheduleRow[] {
  const { loanAmount, interestRate, loanTenure, emiType, interestCalculation, startDate } = inputs;

  if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
    return [];
  }

  const schedule: ScheduleRow[] = [];
  let balance = loanAmount;

  let n = 0;
  let periodRate = 0;

  // Determine number of periods and rate based on interestCalculation
  if (interestCalculation === "weekly") {
    n = Math.round(loanTenure * (52 / 12));
    periodRate = interestRate / 52 / 100;
  } else {
    n = loanTenure;
    periodRate = interestRate / 12 / 100;
  }

  const { emi } = calculateLoanEMI(inputs);

  for (let i = 1; i <= n; i++) {
    const dueDate = addPeriodsToDate(startDate, i, emiType);
    const interest = balance * periodRate;
    let principal = emi - interest;

    // For the last installment or if principal exceeds remaining balance
    if (i === n || balance <= principal) {
      principal = balance;
      const finalEmi = principal + interest;
      balance = 0;
      schedule.push({
        installment: i,
        dueDate,
        emi: Math.round(finalEmi * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: 0,
      });
      break;
    } else {
      balance = balance - principal;
      schedule.push({
        installment: i,
        dueDate,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(balance * 100) / 100,
      });
    }
  }

  return schedule;
}

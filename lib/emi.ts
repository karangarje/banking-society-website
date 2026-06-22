import { LoanInputs, LoanSummaryData } from "@/types/loan";


/**
 * Calculates the installment payment (EMI), total interest, and total payment.
 * Matches monthly/weekly periods based on the input parameters.
 */
export function calculateLoanEMI(inputs: LoanInputs): LoanSummaryData {
  const { loanAmount, interestRate, loanTenure, interestCalculation } = inputs;

  if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }

  let r = 0; // Rate per period
  let n = 0; // Number of periods (installments)

  if (interestCalculation === "weekly") {
    // Weekly interest calculation
    n = Math.round(loanTenure * (52 / 12));
    r = interestRate / 52 / 100;
  } else {
    // Monthly interest calculation
    n = loanTenure;
    r = interestRate / 12 / 100;
  }

  if (r === 0) {
    const emi = loanAmount / n;
    return { emi: Math.round(emi * 100) / 100, totalInterest: 0, totalPayment: loanAmount };
  }

  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;
  return { emi: Math.round(emi * 100) / 100, totalInterest: Math.round(totalInterest * 100) / 100, totalPayment: Math.round(totalPayment * 100) / 100 };
}

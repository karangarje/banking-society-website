export interface LoanInputs {
  loanAmount: number;
  interestRate: number; // Annual interest rate in %
  loanTenure: number;   // Tenure in months
  startDate: string;    // YYYY-MM-DD ISO format
  emiType: "monthly" | "weekly";
  interestCalculation: "monthly" | "weekly";
}


export interface ScheduleRow {
  installment: number;
  dueDate: string;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanSummaryData {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

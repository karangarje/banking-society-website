import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { LoanInputs, ScheduleRow, LoanSummaryData } from "@/types/loan";

/**
 * Renders a PDF file containing the cooperative's loan schedule details
 * and triggers a browser download.
 */
export function generateLoanPdf(
  inputs: LoanInputs,
  schedule: ScheduleRow[],
  summary: LoanSummaryData
): void {
  const doc = new jsPDF();

  // 1. Header Design
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(179, 0, 60); // Maroon (#B3003C)
  doc.text("BABASAHEB KAVAD CO-OPERATIVE PATSANSTHA", 105, 20, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(30, 27, 107); // Dark Blue (#1E1B6B)
  doc.text("Loan Repayment Schedule", 105, 27, { align: "center" });

  // Gold accent divider
  doc.setDrawColor(212, 175, 55); // Gold (#D4AF37)
  doc.setLineWidth(0.75);
  doc.line(14, 32, 196, 32);

  // 2. Loan Details Section
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");

  const leftMargin = 14;
  const rightColMargin = 110;

  // Left Column
  doc.text(`Loan Amount: INR ${inputs.loanAmount.toLocaleString()}`, leftMargin, 42);
  doc.text(`Interest Rate: ${inputs.interestRate}% p.a.`, leftMargin, 48);
  doc.text(`EMI Type: ${inputs.emiType === "weekly" ? "Weekly EMI" : "Monthly EMI"}`, leftMargin, 54);
  doc.text(`Start Date: ${inputs.startDate}`, leftMargin, 60);

  // Right Column
  doc.text(`Tenure: ${inputs.loanTenure} Months`, rightColMargin, 42);
  doc.text(`Period Installment: INR ${summary.emi.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, rightColMargin, 48);
  doc.text(`Interest Calc: ${inputs.interestCalculation === "weekly" ? "Weekly Basis" : "Monthly Basis"}`, rightColMargin, 54);
  doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, rightColMargin, 60);

  // Gold accent line under info card
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.25);
  doc.line(14, 65, 196, 65);

  const startY = 70;

  // 3. Repayment Schedule Table
  const tableHeaders = [
    "Installment No.",
    "Due Date",
    "EMI (INR)",
    "Principal (INR)",
    "Interest (INR)",
    "Outstanding Balance (INR)",
  ];

  const tableRows = schedule.map((row) => [
    row.installment.toString(),
    row.dueDate,
    row.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    row.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    row.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    row.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  ]);

  autoTable(doc, {
    head: [tableHeaders],
    body: tableRows,
    startY: startY,
    theme: "striped",
    headStyles: {
      fillColor: [179, 0, 60], // Maroon background
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
      4: { halign: "right" },
      5: { halign: "right" },
    },
    alternateRowStyles: {
      fillColor: [250, 245, 247], // Very light pink/gray tint
    },
    margin: { left: 14, right: 14 },
    didDrawPage: () => {
      // Standard running footer per page
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text(
        `BABASAHEB KAVAD CO-OPERATIVE PATSANSTHA — Page ${doc.getNumberOfPages()}`,
        105,
        287,
        { align: "center" }
      );
    },
  });

  // 4. Totals Block (Footer Summary)
  const totalPrincipal = inputs.loanAmount;
  const totalInterest = summary.totalInterest;
  const totalPayment = summary.totalPayment;

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  if (finalY > 240) {
    // Add page if there's no room for the totals block
    doc.addPage();
    drawFooterTotals(doc, 25, totalPrincipal, totalInterest, totalPayment);
  } else {
    drawFooterTotals(doc, finalY, totalPrincipal, totalInterest, totalPayment);
  }

  doc.save(`bk_loan_repayment_schedule_${new Date().toISOString().split("T")[0]}.pdf`);
}

function drawFooterTotals(
  doc: jsPDF,
  y: number,
  principal: number,
  interest: number,
  total: number
): void {
  // Border box
  doc.setFillColor(250, 250, 252);
  doc.setDrawColor(212, 175, 55); // Gold outline
  doc.rect(14, y, 182, 36, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(30, 27, 107); // Dark Blue

  doc.text("LOAN REPAYMENT SUMMARY (GRAND TOTALS)", 20, y + 8);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.25);
  doc.line(20, y + 11, 190, y + 11);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);
  doc.text("Total Principal Repaid:", 20, y + 18);
  doc.setFont("helvetica", "bold");
  doc.text(`INR ${principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 85, y + 18);

  doc.setFont("helvetica", "normal");
  doc.text("Total Interest Accrued:", 20, y + 24);
  doc.setFont("helvetica", "bold");
  doc.text(`INR ${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 85, y + 24);

  doc.setFont("helvetica", "normal");
  doc.text("Total Repayment Amount:", 20, y + 30);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(179, 0, 60); // Maroon for primary total
  doc.text(`INR ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 85, y + 30);

  // Institution verification text
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "italic");
  doc.text(
    "* Disclaimer: This repayment schedule is for informational purposes. Actual accruals may vary slightly based on payment times.",
    14,
    y + 44
  );
}

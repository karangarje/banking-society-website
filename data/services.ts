export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  category: "deposits" | "loans" | "digital" | "vault";
  interestRate?: string;
  features: string[];
  eligibility: string[];
  documents: string[];
}

export const servicesData: ServiceDetail[] = [

  {
    id: "savings-account",
    title: "Savings Account",
    shortDesc: "Start saving with a low minimum balance and earn high returns with absolute deposit security.",
    icon: "WalletOutlined",
    category: "deposits",
    interestRate: "4.5% p.a. (Calculated Daily)",
    features: [
      "Low minimum balance requirement of only ₹500.",
      "Free SMS Alert service for instant transaction updates.",
      "Free RuPay ATM / Debit card for cash withdrawal and shopping.",
      "Standing Instruction facility for automated transfers.",
    ],
    eligibility: [
      "Indian Residents (Individuals, Joint accounts, Minors).",
      "Local Trusts, Co-operative Institutions, and Clubs.",
      "Sole Proprietors and Partnership firms.",
    ],
    documents: [
      "Account Opening Form duly filled.",
      "Aadhaar Card and PAN Card (Mandatory).",
      "Address proof if different from Aadhaar card.",
      "Two passport-sized photographs.",
    ],
  },
  {
    id: "fixed-deposit",
    title: "Fixed Deposits (FD)",
    shortDesc: "Maximize your returns on surplus funds with flexible tenures and guaranteed, secure growth.",
    icon: "SafetyCertificateOutlined",
    category: "deposits",
    interestRate: "Up to 9.5% p.a. (10.0% for Senior Citizens)",
    features: [
      "Tenure options ranging from 15 days to 5 years.",
      "Compounding option (quarterly/half-yearly) or monthly interest payouts.",
      "Loan facility available up to 90% of the deposit amount.",
      "Premature withdrawal allowed under society regulations.",
    ],
    eligibility: [
      "All registered members of the society.",
      "Individual accounts (single or joint) and corporate associations.",
    ],
    documents: [
      "Fixed Deposit Application Form.",
      "Membership Reference or Share Certificate Number.",
      "PAN Card copy.",
      "Active savings account inside the society for auto-credit of interest.",
    ],
  },
  {
    id: "recurring-deposit",
    title: "Recurring Deposit (RD)",
    shortDesc: "Develop a systematic savings habit. Deposit a fixed amount monthly and earn high term interest.",
    icon: "CalendarOutlined",
    category: "deposits",
    interestRate: "8.5% p.a. (9.0% for Senior Citizens)",
    features: [
      "Flexible monthly deposit starting from ₹500.",
      "Tenures available from 12 months up to 60 months.",
      "Ideal tool to accumulate funds for child's education, wedding, or vacations.",
      "Automated standing instructions from savings account.",
    ],
    eligibility: [
      "Members of the society (individual or joint).",
      "Minors represented by parent/legal guardian.",
    ],
    documents: [
      "RD Application Form.",
      "KYC Verification documents (Aadhaar & PAN).",
      "Standing instruction form (if applicable).",
    ],
  },
  {
    id: "gold-loan",
    title: "Instant Gold Loan",
    shortDesc: "Unlock the value of your gold jewelry and get instant cash at competitive interest rates with zero hassle.",
    icon: "DollarOutlined",
    category: "loans",
    interestRate: "10.5% p.a.",
    features: [
      "Sanctioned within 30 minutes with instant cash/bank transfer.",
      "High valuation of gold ornaments based on market rate.",
      "Safe and highly secure vault storage under CCTV surveillance.",
      "Flexible repayment options: bullet repayment or monthly interest.",
    ],
    eligibility: [
      "Must be a member of the society (instant membership available).",
      "Owner of gold ornaments/jewelry of 18 to 22 karats.",
      "Age group between 18 to 70 years.",
    ],
    documents: [
      "Gold Loan Application Form.",
      "KYC Proof (Aadhaar Card and PAN Card).",
      "Original Gold Invoice (if available).",
      "Declaration of gold ownership.",
    ],
  },
  {
    id: "home-loan",
    title: "Home & Property Loan",
    shortDesc: "Fulfill your dream of owning a home. We provide low-interest loans for house purchase, construction, or renovation.",
    icon: "HomeOutlined",
    category: "loans",
    interestRate: "9.0% - 10.5% p.a.",
    features: [
      "Funding up to 80% of the property value.",
      "Long repayment tenure up to 15 years.",
      "No hidden administrative charges or penalty clauses.",
      "Expert legal and technical evaluation support.",
    ],
    eligibility: [
      "Salaried individuals with stable jobs (minimum 2 years service).",
      "Self-employed individuals / businessmen with 3 years filed IT returns.",
      "Must hold active membership of the society.",
    ],
    documents: [
      "Home Loan Application Form.",
      "Salary slips of last 6 months + Form 16 (for salaried).",
      "IT Returns and Balance Sheets of last 3 years (for self-employed).",
      "Original property documents, title deed search, and blueprints.",
      "6 months bank statements of main transactional account.",
    ],
  },
  {
    id: "business-loan",
    title: "Business & Personal Loan",
    shortDesc: "Boost your business working capital or cover immediate family expenses with quick disbursals.",
    icon: "ShopOutlined",
    category: "loans",
    interestRate: "11.5% - 13.0% p.a.",
    features: [
      "Speedy evaluation and loan sanctioning.",
      "Flexible repayment tenures from 12 to 60 months.",
      "Repayable via easy monthly EMIs.",
      "Guarantor facility based on member references.",
    ],
    eligibility: [
      "Registered members running businesses or with regular monthly wages.",
      "Age limits: 21 to 58 years.",
      "Requires co-signature of two sound members as guarantors.",
    ],
    documents: [
      "Loan Application Form.",
      "KYC documents of Borrower and both Guarantors.",
      "Income proof (Salary slip / Business income certificate).",
      "Business registration papers (Shop Act, GST, MSME, etc.).",
    ],
  },
  {
    id: "digital-banking",
    title: "E-Services & Core Banking",
    shortDesc: "Enjoy modern digital banking services, including our safe mobile application, SMS alerts, and merchant QR codes.",
    icon: "MobileOutlined",
    category: "digital",
    interestRate: "Complimentary Service",
    features: [
      "Real-time funds transfer via IMPS and NEFT.",
      "Interactive mobile app supporting balance checks and statements.",
      "Personalized UPI QR code cards for shop owners.",
      "Instant SMS updates for deposit maturity or loan payments.",
    ],
    eligibility: [
      "All active Savings and Current account holders.",
      "Mobile number must be registered with the branch.",
    ],
    documents: [
      "E-Services Enrollment Form.",
      "Mobile number registration validation.",
    ],
  },
  {
    id: "safe-deposit",
    title: "Safe Deposit Locker Vaults",
    shortDesc: "Keep your jewelry, land title deeds, and precious items safe in our state-of-the-art secure vaults.",
    icon: "LockOutlined",
    category: "vault",
    interestRate: "Nominal Annual Rental",
    features: [
      "Multiple locker sizes available (Small, Medium, Large).",
      "Heavy duty physical steel safes and security systems.",
      "CCTV-monitored locker room access with dual-key protection.",
      "Nomination facility available.",
    ],
    eligibility: [
      "Active account holders with a security deposit or fixed deposit cover.",
      "Single or joint operational options.",
    ],
    documents: [
      "Locker Agreement Form.",
      "Fixed Deposit proof or security advance receipt.",
      "KYC documentation.",
    ],
  },
];

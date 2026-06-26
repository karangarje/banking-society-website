export interface MenuItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
  subItems?: MenuItem[];
}

export interface MegaMenuSection {
  title: string;
  layout?: "list" | "grid" | "categorized";
  items: MenuItem[];
}

export interface NavigationLink {
  title: string;
  href?: string;
  megaMenu?: MegaMenuSection[];
}

export const navigationData: NavigationLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    megaMenu: [
      {
        title: "About Us",
        layout: "list",
        items: [
          {
            title: "History",
            href: "/about/history",
            description: "Foundation, vision and past milestones.",
            icon: "HistoryOutlined",
          },
          {
            title: "Awards & Achievements",
            href: "/about/awards",
            description: "Recognitions, member trust, and community performance.",
            icon: "TrophyOutlined",
          },
          {
            title: "Board of Directors",
            href: "/about/directors",
            description: "Meet the leadership guiding member-first finance.",
            icon: "TeamOutlined",
          },
        ],
      },
    ],
  },
  {
    title: "Services",
    megaMenu: [
      {
        title: "Services",
        layout: "list",
        items: [
          {
            title: "Banking Services",
            href: "/services?tab=deposits",
            description: "Core banking products and financial services.",
            icon: "BankOutlined",
          },
          {
            title: "Loan Calculator",
            href: "/services/loan-calculator",
            description: "Calculate EMIs and repayment schedules.",
            icon: "CalculatorOutlined",
          },
          {
            title: "Interest Rate",
            href: "/services/interest",
            description: "Current deposit and loan rate details.",
            icon: "PercentageOutlined",
          },
        ],
      },
    ],
  },
  {
    title: "Branches",
    href: "/branches",
  },
  {
    title: "Photos",
    href: "/photo-gallery",
  },
  {
    title: "Videos",
    href: "/video-gallery",
  },
  {
    title: "Download",
    megaMenu: [
      {
        title: "Download",
        layout: "list",
        items: [
          {
            title: "Annual Reports",
            href: "/download?category=reports",
            description: "Full PDF reports for member review.",
            icon: "FileDoneOutlined",
            badge: "PDF",
          },
          {
            title: "Forms",
            href: "/download?category=forms",
            description: "All application and service request forms.",
            icon: "FileTextOutlined",
            badge: "PDF",
          },
          {
            title: "GST Certificate",
            href: "/download?category=gst-certificate",
            description: "Official compliance certificate for the society.",
            icon: "FilePdfOutlined",
            badge: "PDF",
          },
        ],
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export interface MenuItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
}

export interface MegaMenuSection {
  title: string;
  layout?: "list" | "grid"; // list = single column, grid = 2 columns
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
            href: "/about#history",
            description: "Foundation, vision and past milestones.",
            icon: "HistoryOutlined",
          },
          {
            title: "Awards & Achievements",
            href: "/about#awards",
            description: "Recognitions, member trust, and community performance.",
            icon: "TrophyOutlined",
          },
          {
            title: "Board of Directors",
            href: "/about#directors",
            description: "Meet the leadership guiding member-first finance.",
            icon: "TeamOutlined",
          },
          {
            title: "Interest Rate",
            href: "/about#interest",
            description: "Current deposit and loan rate details.",
            icon: "PercentageOutlined",
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
        layout: "grid",
        items: [
          {
            title: "Shares",
            href: "/services?tab=shares",
            description: "Member share plans and dividend access.",
            icon: "TeamOutlined",
          },
          {
            title: "Deposits",
            href: "/services?tab=deposits",
            description: "Secure savings options with attractive returns.",
            icon: "WalletOutlined",
          },
          {
            title: "Loans",
            href: "/services?tab=loans",
            description: "Flexible loan products for personal and business needs.",
            icon: "DollarOutlined",
          },
          {
            title: "Core Banking",
            href: "/services?tab=digital",
            description: "Reliable banking support across branches.",
            icon: "BankOutlined",
          },
          {
            title: "E-Services",
            href: "/services?tab=digital",
            description: "Digital account access from any device.",
            icon: "MobileOutlined",
          },
          {
            title: "Safe Deposit Vaults",
            href: "/services?tab=vault",
            description: "Secure storage for valuables and documents.",
            icon: "LockOutlined",
          },
          {
            title: "SMS Banking",
            href: "/services?tab=digital",
            description: "Instant transaction alerts and balance updates.",
            icon: "MessageOutlined",
          },
          {
            title: "Video Conferencing",
            href: "/services?tab=digital",
            description: "Remote member service consultations.",
            icon: "VideoCameraOutlined",
          },
          {
            title: "Upcoming Services",
            href: "/services",
            description: "New products and digital expansion plans.",
            icon: "RocketOutlined",
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
    title: "Photo Gallery",
    megaMenu: [
      {
        title: "Photo Gallery",
        layout: "list",
        items: [
          {
            title: "Photo Gallery",
            href: "/photo-gallery",
            description: "Member events, branch updates, and community moments.",
            icon: "PictureOutlined",
          },
          {
            title: "New Branch Openings",
            href: "/photo-gallery",
            description: "Opening ceremonies and branch inauguration photos.",
            icon: "HomeOutlined",
          },
          {
            title: "Vikhroli New Head Office Opening",
            href: "/photo-gallery",
            description: "Highlights from the new head office launch event.",
            icon: "BankOutlined",
          },
        ],
      },
    ],
  },
  {
    title: "Video Gallery",
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
            href: "/download#reports",
            description: "Full PDF reports for member review.",
            icon: "FileDoneOutlined",
            badge: "PDF",
          },
          {
            title: "Forms",
            href: "/download#forms",
            description: "All application and service request forms.",
            icon: "FileTextOutlined",
            badge: "PDF",
          },
          {
            title: "GST Certificate",
            href: "/download#reports",
            description: "Official compliance certificate for the society.",
            icon: "FilePdfOutlined",
            badge: "PDF",
          },
        ],
      },
    ],
  },
  {
    title: "Social Activities",
    href: "/social-activities",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

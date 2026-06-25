"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  TrophyOutlined, 
  ArrowDownOutlined, 
  CheckCircleOutlined,
  HistoryOutlined,
  TeamOutlined,
  BranchesOutlined,
  WalletOutlined,
  DollarOutlined,
  LikeOutlined,
  ArrowRightOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

interface TranslationContent {
  hero: {
    title: string;
    subtitle: string;
    viewBtn: string;
  };
  timeline: {
    heading: string;
    subtitle: string;
    milestones: {
      title: string;
      description: string;
      highlights: string[];
    }[];
  };
  stats: {
    heading: string;
    items: {
      value: string;
      label: string;
      desc: string;
    }[];
  };
  quote: {
    text: string;
    subtitle: string;
  };
  cta: {
    heading: string;
    subtitle: string;
    contactBtn: string;
    historyBtn: string;
  };
}

const contentData: Record<"en" | "mr", TranslationContent> = {
  en: {
    hero: {
      title: "Awards & Achievements",
      subtitle: "Recognizing excellence, leadership, trust, and contribution to the co-operative sector.",
      viewBtn: "View Achievements",
    },
    timeline: {
      heading: "Our Historic Milestones",
      subtitle: "A chronological timeline of key leadership recognitions and co-operative achievements.",
      milestones: [
        {
          title: "International Co-operative Conference Recognition",
          description: "The society's representatives were honored at the International Co-operative Conference held in Ahmednagar.",
          highlights: ["Conference Participation", "Award Received", "Co-operative Contribution"],
        },
        {
          title: "Leadership Recognition Ceremony",
          description: "A felicitation ceremony organized to honor the selection of the society's mentors.",
          highlights: ["Leadership Honour", "Institutional Growth", "Social Contribution"],
        },
        {
          title: "Federation Selection Honour",
          description: "A special ceremony organized to honour the appointment of the society's office bearers.",
          highlights: ["Institutional Leadership", "Co-operative Development", "Social Commitment"],
        },
      ],
    },
    stats: {
      heading: "Our Financial Strength & Trust",
      items: [
        {
          value: "25+",
          label: "Years of Service",
          desc: "Est. 1998",
        },
        {
          value: "24,183+",
          label: "Members",
          desc: "Growing Community",
        },
        {
          value: "13+",
          label: "Branches",
          desc: "Regional Network",
        },
        {
          value: "₹269.46 Cr+",
          label: "Deposits",
          desc: "Trusted Reserves",
        },
        {
          value: "₹169.22 Cr+",
          label: "Loan Portfolio",
          desc: "Empowering Members",
        },
        {
          value: "98%",
          label: "Satisfaction Rate",
          desc: "Member Feedback",
        },
      ],
    },
    quote: {
      text: "Prosperity through Co-operation",
      subtitle: "Babasaheb Kavad Co-operative Patsanstha",
    },
    cta: {
      heading: "Become Part of Our Journey",
      subtitle: "Join a trusted co-operative institution committed to growth, transparency and member prosperity.",
      contactBtn: "Contact Us",
      historyBtn: "View History",
    },
  },
  mr: {
    hero: {
      title: "पुरस्कार आणि यश",
      subtitle: "सहकारी क्षेत्रातील उत्कृष्टता, नेतृत्व, विश्वास आणि योगदानाचा गौरव.",
      viewBtn: "यशस्वी टप्पे पहा",
    },
    timeline: {
      heading: "आमचे ऐतिहासिक टप्पे",
      subtitle: "महत्त्वाच्या नेतृत्व सन्मानांचा आणि सहकारी यशाचा कालक्रमानुसार इतिहास.",
      milestones: [
        {
          title: "आंतरराष्ट्रीय सहकार परिषद सन्मान",
          description: "अहमदनगर येथे आयोजित आंतरराष्ट्रीय सहकार परिषदेमध्ये संस्थेच्या प्रतिनिधींना सन्मानित करण्यात आले.",
          highlights: ["परिषद सहभाग", "सन्मान प्राप्त", "सहकार क्षेत्र योगदान"],
        },
        {
          title: "नेतृत्व सत्कार समारंभ",
          description: "संस्थेच्या मार्गदर्शकांच्या निवडीबद्दल आयोजित सत्कार समारंभ.",
          highlights: ["नेतृत्व गौरव", "संस्था विकास", "सामाजिक योगदान"],
        },
        {
          title: "फेडरेशन निवड सत्कार",
          description: "संस्थेच्या पदाधिकाऱ्यांच्या निवडीबद्दल विशेष गौरव सोहळा.",
          highlights: ["संस्थात्मक नेतृत्व", "सहकार क्षेत्र विकास", "सामाजिक बांधिलकी"],
        },
      ],
    },
    stats: {
      heading: "आमचे आर्थिक सामर्थ्य आणि विश्वास",
      items: [
        {
          value: "25+",
          label: "सेवेची वर्षे",
          desc: "स्थापना १९९८",
        },
        {
          value: "24,183+",
          label: "सभासद",
          desc: "वाढता समुदाय",
        },
        {
          value: "13+",
          label: "शाखा",
          desc: "प्रादेशिक नेटवर्क",
        },
        {
          value: "₹269.46 Cr+",
          label: "एकूण ठेवी",
          desc: "विश्वसनीय गंगाजळी",
        },
        {
          value: "₹169.22 Cr+",
          label: "कर्ज वितरण",
          desc: "सशक्त सभासद",
        },
        {
          value: "98%",
          label: "समाधान दर",
          desc: "सभासद अभिप्राय",
        },
      ],
    },
    quote: {
      text: "सहकारातून समृद्धी",
      subtitle: "बाबासाहेब कवाद नागरी सहकारी पतसंस्था",
    },
    cta: {
      heading: "आमच्या प्रवासाचा भाग व्हा",
      subtitle: "वाढ, पारदर्शकता आणि सभासदांच्या समृद्धीसाठी कटिबद्ध असलेल्या एका विश्वसनीय सहकारी संस्थेशी जोडा.",
      contactBtn: "संपर्क साधा",
      historyBtn: "इतिहास पहा",
    },
  },
};

interface HeroSectionProps {
  content: typeof contentData.en.hero;
  onScrollToAchievements: () => void;
}

function HeroSection({ content, onScrollToAchievements }: HeroSectionProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-[#AD002E] overflow-hidden text-white flex flex-col justify-center items-center text-center px-4 sm:px-6">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Decorative Gold Circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#AD002E]/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
        {/* Animated Trophy Container */}
        <div 
          data-aos="zoom-in"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-[#AD002E]/20 flex items-center justify-center shadow-md relative group hover:scale-110 hover:border-[#D4AF37]/50 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <TrophyOutlined className="text-4xl sm:text-5xl text-[#D4AF37] animate-pulse" />
        </div>

        {/* Title */}
        <h1 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="text-4xl sm:text-6xl font-bold tracking-tight"
        >
          {content.title}
        </h1>

        {/* Subtitle */}
        <p 
          data-aos="fade-up" 
          data-aos-delay="200"
          className="text-base sm:text-xl font-normal text-white/80 max-w-2xl leading-relaxed"
        >
          {content.subtitle}
        </p>

        {/* Scroll Button */}
        <div data-aos="fade-up" data-aos-delay="300" className="pt-6">
          <button
            onClick={onScrollToAchievements}
            className="group flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold bg-[#D4AF37] hover:bg-[#c59e2b] text-[#1E1B6B] hover:text-[#1E1B6B] shadow-md hover:shadow-md transition-all duration-300 transform active:scale-95"
          >
            <span>{content.viewBtn}</span>
            <ArrowDownOutlined className="text-xs group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

interface TimelineSectionProps {
  content: typeof contentData.en.timeline;
}

function TimelineSection({ content }: TimelineSectionProps) {
  const images = [
    "/images/history/awards/award-01.png",
    "/images/history/awards/award-02.png",
    "/images/history/awards/award-03.png",
  ];
  
  const imageAlts = [
    "International Co-operative Conference 2025 Recognition",
    "Director Appointment Recognition Ceremony",
    "Federation Selection Honour Ceremony",
  ];

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-white/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Title */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#AD002E] dark:text-[#D4AF37] transition-colors">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#AD002E]/70 dark:text-[#AD002E]/70 max-w-xl mx-auto">
            {content.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#AD002E] dark:bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Timeline Stack */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {content.milestones.map((item, idx) => {
            const isReverse = idx % 2 !== 0;
            return (
              <div 
                key={idx}
                data-aos={isReverse ? "fade-left" : "fade-right"}
                className={`flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 bg-white rounded-[30px] shadow-md hover:shadow-md hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-[#AD002E]/20 dark:border-[#AD002E]/20 ${
                  isReverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* LEFT / IMAGE AREA */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full aspect-[2.64/1] lg:aspect-auto overflow-hidden bg-[#1E1B6B]">
                  <Image
                    src={images[idx] || "/images/history/awards/award-01.png"}
                    alt={imageAlts[idx] || ""}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </div>

                {/* RIGHT / BLUE TEXT PANEL */}
                <div className="w-full lg:w-1/2 bg-[#AD002E] text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center space-y-6">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#D4AF37] leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed text-white/90 font-normal">
                    {item.description}
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-0.5 bg-[#AD002E]" />

                  {/* Highlights */}
                  <div className="space-y-3">
                    {item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold">
                        <CheckCircleOutlined className="text-[#D4AF37] mt-1 flex-shrink-0" />
                        <span className="text-white/85">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StatsSectionProps {
  content: typeof contentData.en.stats;
}

function StatsSection({ content }: StatsSectionProps) {
  const icons = [
    <HistoryOutlined key="1" className="text-3xl text-[#D4AF37]" />,
    <TeamOutlined key="2" className="text-3xl text-[#D4AF37]" />,
    <BranchesOutlined key="3" className="text-3xl text-[#D4AF37]" />,
    <WalletOutlined key="4" className="text-3xl text-[#D4AF37]" />,
    <DollarOutlined key="5" className="text-3xl text-[#D4AF37]" />,
    <LikeOutlined key="6" className="text-3xl text-[#D4AF37]" />
  ];

  return (
    <section id="stats" className="relative py-20 bg-[#1E1B6B] overflow-hidden text-white">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#AD002E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Title */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {content.heading}
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {content.items.map((stat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              className="bg-white/5 backdrop-blur-md rounded-lg p-6 text-center border border-[#AD002E]/20 hover:bg-white/10 hover:border-[#AD002E]/20 hover:-translate-y-1.5 transition-all duration-300 shadow-md flex flex-col items-center justify-center space-y-4"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                {icons[idx]}
              </div>

              {/* Data Text */}
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-white/70 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[10px] text-white/50 italic font-semibold">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CTASectionProps {
  quote: typeof contentData.en.quote;
  cta: typeof contentData.en.cta;
}

function CTASection({ quote, cta }: CTASectionProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* QUOTE SECTION */}
      <section className="w-full py-16 bg-[#121046] border-b border-[#AD002E]/20 relative text-center text-white px-4">
        {/* Quote Accent Icon */}
        <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
          <div className="w-10 h-10 rounded-full bg-[#AD002E] text-white flex items-center justify-center text-2xl font-serif">
            "
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4" data-aos="zoom-in">
          <h3 className="text-3xl sm:text-5xl font-bold text-[#D4AF37] tracking-wider leading-relaxed">
            {quote.text}
          </h3>
          <p className="text-sm sm:text-base font-bold text-white/60 tracking-widest uppercase">
            {quote.subtitle}
          </p>
        </div>
      </section>

      {/* CTA ACTIONS SECTION */}
      <section className="w-full py-20 bg-white/30 dark:bg-white/10 text-center px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto space-y-8" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#AD002E] dark:text-[#D4AF37] leading-tight">
            {cta.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#AD002E]/70 dark:text-[#AD002E]/70 max-w-xl mx-auto leading-relaxed">
            {cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Contact Button */}
            <Link
              href="/contact"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-[#AD002E] hover:bg-[#990033] text-white shadow-md hover:shadow-md transition-all duration-300 transform active:scale-95"
            >
              <PhoneOutlined />
              <span>{cta.contactBtn}</span>
              <ArrowRightOutlined className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* View History Button */}
            <Link
              href="/about/history"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-transparent hover:bg-white dark:hover:bg-white/5 text-[#AD002E]/70 dark:text-[#AD002E]/70 border border-[#AD002E]/20 dark:border-[#AD002E]/20 hover:border-[#AD002E]/20 transition-all duration-300 transform active:scale-95"
            >
              <HistoryOutlined />
              <span>{cta.historyBtn}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AwardsPage() {
  const { locale } = useLanguage();
  const currentLocale = (locale === "mr" ? "mr" : "en") as "en" | "mr";
  const data = contentData[currentLocale];

  const scrollToTimeline = () => {
    const el = document.getElementById("timeline");
    if (el) {
      const offset = 80; // Height of header navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    document.title = currentLocale === "mr" 
      ? "पुरस्कार आणि यश | बाबासाहेब कवाद" 
      : "Awards & Achievements | Babasaheb Kavad";
  }, [currentLocale]);

  return (
    <div className="w-full bg-white dark:bg-white transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection content={data.hero} onScrollToAchievements={scrollToTimeline} />

      {/* Timeline / Achievements Section */}
      <TimelineSection content={data.timeline} />

      {/* Stats Section */}
      <StatsSection content={data.stats} />

      {/* CTA Section */}
      <CTASection quote={data.quote} cta={data.cta} />
    </div>
  );
}

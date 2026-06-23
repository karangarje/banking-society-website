"use client";

import React from "react";
import {
  HistoryOutlined,
  TeamOutlined,
  BranchesOutlined,
  WalletOutlined,
  DollarOutlined,
  LikeOutlined
} from "@ant-design/icons";

export default function Stats() {
  const statList = [
    {
      value: "25+",
      label: "Years of Service",
      icon: <HistoryOutlined className="text-3xl text-[#D4AF37]" />,
      desc: "Est. 1998"
    },
    {
      value: "24,183+",
      label: "Members",
      icon: <TeamOutlined className="text-3xl text-[#D4AF37]" />,
      desc: "Growing Community"
    },
    {
      value: "13+",
      label: "Branches",
      icon: <BranchesOutlined className="text-3xl text-[#D4AF37]" />,
      desc: "Regional Network"
    },
    {
      value: "₹269.46 Cr+",
      label: "Deposits",
      icon: <WalletOutlined className="text-3xl text-[#D4AF37]" />,
      desc: "Trusted Reserves"
    },
    {
      value: "₹169.22 Cr+",
      label: "Loan Portfolio",
      icon: <DollarOutlined className="text-3xl text-[#D4AF37]" />,
      desc: "Empowering Members"
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      icon: <LikeOutlined className="text-3xl text-[#D4AF37]" />,
      desc: "Member Feedback"
    }
  ];

  return (
    <section id="stats" className="relative py-20 bg-[#1E1B6B] overflow-hidden text-white">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#B3003C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        {/* Title */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Our Financial Strength & Trust
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {statList.map((stat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1.5 transition-all duration-300 shadow-xl flex flex-col items-center justify-center space-y-4"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                {stat.icon}
              </div>

              {/* Data Text */}
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
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

"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  TeamOutlined, 
  AuditOutlined, 
  BankOutlined,
  RiseOutlined
} from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

interface CounterItemProps {
  end: number;
  suffix?: string;
  duration?: number;
}

// Client-side animated counter hook component
const CounterItem: React.FC<CounterItemProps> = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const steps = duration / 16; // 16ms per frame (approx 60fps)
    const increment = end / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef} className="font-extrabold text-4xl sm:text-5xl text-text-main transition-colors duration-300">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <BankOutlined className="text-4xl text-[#AD002E] group-hover:text-white transition-colors duration-400" />,
      value: 12,
      suffix: "+",
      labelKey: "stats.branches",
      descKey: "stats.branches_desc",
    },
    {
      icon: <TeamOutlined className="text-4xl text-[#AD002E] group-hover:text-white transition-colors duration-400" />,
      value: 50000,
      suffix: "+",
      labelKey: "stats.members",
      descKey: "stats.members_desc",
    },
    {
      icon: <RiseOutlined className="text-4xl text-[#AD002E] group-hover:text-white transition-colors duration-400" />,
      value: 500,
      suffix: " Cr+",
      labelKey: "stats.deposits",
      descKey: "stats.deposits_desc",
    },
    {
      icon: <AuditOutlined className="text-4xl text-[#AD002E] group-hover:text-white transition-colors duration-400" />,
      value: 350,
      suffix: " Cr+",
      labelKey: "stats.loans",
      descKey: "stats.loans_desc",
    },
  ];

  return (
    <section className="relative py-16 px-4 bg-base-bg z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Main Stats Panel with Glassmorphism */}
        <div 
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300"
        >
          {/* Subtle decorative lights inside the card */}
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-[#AD002E]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#AD002E]/5 rounded-full blur-3xl" />

          {stats.map((stat, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl border border-[rgba(0,0,0,0.04)] bg-base-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 relative group"
            >
              {/* Icon Container with glowing effect */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(173,0,46,0.05)] border border-[rgba(173,0,46,0.1)] group-hover:border-[#AD002E] group-hover:bg-[#AD002E] transition-all duration-400">
                {stat.icon}
              </div>

              {/* Stat Value */}
              <div className="flex items-baseline gap-1 mt-2">
                <CounterItem end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Labels */}
              <div>
                <h4 className="text-base font-bold text-[#AD002E] uppercase tracking-wide">
                  {t(stat.labelKey)}
                </h4>
                <p className="text-sm text-text-muted mt-1 transition-colors duration-300">
                  {t(stat.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

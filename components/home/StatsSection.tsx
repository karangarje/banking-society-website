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
    <span ref={elementRef} className="stat-number transition-colors duration-300">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <BankOutlined className="text-3xl text-[#F36B21]" />,
      value: 12,
      suffix: "+",
      labelKey: "stats.branches",
      descKey: "stats.branches_desc",
    },
    {
      icon: <TeamOutlined className="text-3xl text-[#7B1010]" />,
      value: 50000,
      suffix: "+",
      labelKey: "stats.members",
      descKey: "stats.members_desc",
    },
    {
      icon: <RiseOutlined className="text-3xl text-[#F36B21]" />,
      value: 500,
      suffix: " Cr+",
      labelKey: "stats.deposits",
      descKey: "stats.deposits_desc",
    },
    {
      icon: <AuditOutlined className="text-3xl text-[#7B1010]" />,
      value: 350,
      suffix: " Cr+",
      labelKey: "stats.loans",
      descKey: "stats.loans_desc",
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-white to-[#FFF8F3] z-10 transition-colors duration-300">
      <div className="max-w-[1400px] w-[95%] mx-auto">
        {/* Main Stats Panel with Glassmorphism */}
        <div 
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300"
        >
          {/* Subtle decorative lights inside the card */}
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-[#7B1010]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#F36B21]/5 rounded-full blur-3xl" />

          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card flex flex-col items-center text-center space-y-4 relative group"
            >
              {/* Icon Container with glowing effect */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF8F3] border border-[#F36F21]/30 group-hover:border-[#F36F21] group-hover:bg-[#F36F21]/10 transition-all duration-300">
                {stat.icon}
              </div>

              {/* Stat Value */}
              <div className="flex items-baseline gap-1 mt-2">
                <CounterItem end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Labels */}
              <div>
                <h4 className="stat-label uppercase tracking-wide">
                  {t(stat.labelKey)}
                </h4>
                <p className="text-sm text-gray-500 mt-1 transition-colors duration-300">
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

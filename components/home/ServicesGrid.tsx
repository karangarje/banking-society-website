"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "@ant-design/icons";
import { servicesData } from "@/data/services";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

// Helper to resolve icon by string name dynamically
const renderServiceCardIcon = (iconName: string) => {
  const IconComp = (Icons as any)[iconName];
  if (!IconComp) return <Icons.BankOutlined className="text-3xl text-[#F36B21]" />;
  return <IconComp className="text-3xl text-[#F36B21] transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />;
};

export default function ServicesGrid() {
  const { t } = useLanguage();
  
  // We can choose the main services to highlight on the homepage grid (max 8 items)
  const homeServices = servicesData.slice(0, 8);

  return (
    <section id="services-grid" className="py-20 px-4 bg-base-bg relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            {t("services.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight transition-colors duration-300">
            {t("services.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#7B1010] to-[#F36B21] mx-auto rounded-full" />
          <p className="text-sm text-text-muted leading-relaxed transition-colors duration-300">
            {t("services.desc")}
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homeServices.map((service, idx) => {
            const getLocalizedArray = (key: string, defaultArray: string[]) => {
              const localized = t(key);
              return Array.isArray(localized) ? (localized as string[]) : defaultArray;
            };
            const serviceTitle = t(`services.items.${service.id}.title`) !== `services.items.${service.id}.title`
              ? t(`services.items.${service.id}.title`)
              : service.title;
            const serviceDesc = t(`services.items.${service.id}.desc`) !== `services.items.${service.id}.desc`
              ? t(`services.items.${service.id}.desc`)
              : service.shortDesc;
            const serviceFeatures = getLocalizedArray(`services.items.${service.id}.features`, []);

            return (
              <div
                key={idx}
                className="group relative bg-base-card p-6 rounded-2xl border border-base-border hover:border-[#F36B21] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
              >
                {/* Subtle Background Glow on Card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#7B1010]/5 rounded-full blur-2xl group-hover:bg-[#F36B21]/10 transition-colors" />

                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-base-card border border-base-border group-hover:bg-[#7B1010] group-hover:border-[#F36B21] transition-all duration-300">
                    {renderServiceCardIcon(service.icon)}
                  </div>

                  {/* Service Metadata */}
                  <div>
                    {service.interestRate && (
                      <span className="text-[10px] font-black text-[#F36B21] uppercase tracking-wide">
                        {t(`services.rates.${service.id.replace(/-/g, "_")}`) !== `services.rates.${service.id.replace(/-/g, "_")}`
                          ? t(`services.rates.${service.id.replace(/-/g, "_")}`)
                          : service.interestRate}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-text-main group-hover:text-[#F36B21] transition-colors duration-300 mt-1">
                      {serviceTitle}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 transition-colors duration-300">
                    {serviceDesc}
                  </p>

                  {/* Features (Mini List) */}
                  <ul className="space-y-1.5 pt-2 border-t border-base-border/50 transition-colors duration-300">
                    {Array.isArray(serviceFeatures) ? serviceFeatures.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="text-[10px] text-text-muted flex items-center gap-1.5 transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-[#F36B21]" />
                        <span className="truncate">{feat}</span>
                      </li>
                    )) : null}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-6 mt-4 border-t border-base-border/50 transition-colors duration-300">
                  <Link
                    href={`/services?tab=${service.category}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F36B21] group-hover:text-[#7B1010] transition-colors"
                  >
                    <span>{t("services.btn_explore")}</span>
                    <ArrowRightOutlined className="text-[9px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            href="/services"
            className="inline-flex bg-base-card hover:bg-base-bg border border-base-border hover:border-[#F36B21] text-text-main px-8 py-3 rounded-lg font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
          >
            {t("services.btn_compare")}
          </Link>
        </div>

      </div>
    </section>
  );
}

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
  if (!IconComp) return <Icons.BankOutlined className="text-4xl text-[#AD002E]" />;
  return <IconComp className="text-4xl text-[#AD002E] transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />;
};

export default function ServicesGrid() {
  const { t } = useLanguage();
  
  // We can choose the main services to highlight on the homepage grid (max 8 items)
  const homeServices = servicesData.slice(0, 8);

  return (
    <section id="services-grid" className="py-12 md:py-16 lg:py-20 px-4 bg-base-bg relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block mb-3 px-3 py-1 bg-[rgba(173,0,46,0.08)] text-[#AD002E] text-xs font-black uppercase tracking-widest rounded shadow-sm border border-[rgba(173,0,46,0.1)]">
            {t("services.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-main tracking-tight transition-colors duration-300">
            {t("services.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#AD002E] to-[#AD002E] mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-text-muted leading-relaxed transition-colors duration-300">
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
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 100}
                className="group relative bg-base-card hover:bg-[#AD002E] p-6 rounded-2xl border border-[rgba(0,0,0,0.04)] transition-all duration-400 shadow-sm hover:shadow-[0_12px_30px_-8px_rgba(173,0,46,0.4)] hover:-translate-y-1.5 flex flex-col justify-between h-full break-words max-w-full"
              >
                {/* Subtle Background Glow on Card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#AD002E]/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />

                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[rgba(173,0,46,0.05)] border border-[rgba(173,0,46,0.1)] group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-400">
                    {renderServiceCardIcon(service.icon)}
                  </div>

                  {/* Service Metadata */}
                  <div>
                    {service.interestRate && (
                      <span className="text-sm font-black text-[#AD002E] group-hover:text-white/90 uppercase tracking-wide transition-colors">
                        {t(`services.rates.${service.id.replace(/-/g, "_")}`) !== `services.rates.${service.id.replace(/-/g, "_")}`
                          ? t(`services.rates.${service.id.replace(/-/g, "_")}`)
                          : service.interestRate}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-text-main group-hover:text-white transition-colors duration-300 mt-1">
                      {serviceTitle}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-muted group-hover:text-white/80 leading-relaxed transition-colors duration-300">
                    {serviceDesc}
                  </p>

                  {/* Features (Mini List) */}
                  <ul className="space-y-1.5 pt-2 border-t border-base-border/50 group-hover:border-white/20 transition-colors duration-300">
                    {Array.isArray(serviceFeatures) ? serviceFeatures.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="text-sm text-text-muted group-hover:text-white/90 flex items-center gap-1.5 transition-colors duration-300">
                        <span className="w-1 h-1 rounded-full bg-[#AD002E] group-hover:bg-white transition-colors" />
                        <span className="truncate">{feat}</span>
                      </li>
                    )) : null}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-6 mt-4 border-t border-base-border/50 group-hover:border-white/20 transition-colors duration-300">
                  <Link
                    href={`/services?tab=${service.category}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#AD002E] group-hover:text-white transition-colors"
                  >
                    <span>{t("services.btn_explore")}</span>
                    <ArrowRightOutlined className="text-xs group-hover:translate-x-1 transition-transform" />
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
            className="inline-flex bg-base-card hover:bg-[rgba(173,0,46,0.05)] border border-[rgba(0,0,0,0.1)] hover:border-[#AD002E] text-text-main hover:text-[#AD002E] px-8 py-3.5 rounded-lg font-black text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            {t("services.btn_compare")}
          </Link>
        </div>

      </div>
    </section>
  );
}

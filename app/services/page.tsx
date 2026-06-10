"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs } from "antd";
import { 
  TeamOutlined, 
  WalletOutlined, 
  DollarOutlined, 
  MobileOutlined, 
  LockOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { servicesData } from "@/data/services";
import { useLanguage } from "@/components/theme/LanguageContext";

// Helper to resolve icon by string name dynamically
const renderServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "TeamOutlined": return <TeamOutlined className="text-2xl text-[#F36B21]" />;
    case "WalletOutlined": return <WalletOutlined className="text-2xl text-[#F36B21]" />;
    case "SafetyCertificateOutlined": return <SafetyCertificateOutlined className="text-2xl text-[#F36B21]" />;
    case "CalendarOutlined": return <WalletOutlined className="text-2xl text-[#F36B21]" />;
    case "DollarOutlined": return <DollarOutlined className="text-2xl text-[#F36B21]" />;
    case "HomeOutlined": return <DollarOutlined className="text-2xl text-[#F36B21]" />;
    case "ShopOutlined": return <DollarOutlined className="text-2xl text-[#F36B21]" />;
    case "MobileOutlined": return <MobileOutlined className="text-2xl text-[#F36B21]" />;
    case "LockOutlined": return <LockOutlined className="text-2xl text-[#F36B21]" />;
    default: return <WalletOutlined className="text-2xl text-[#F36B21]" />;
  }
};

// Internal component to handle useSearchParams under Suspense
function ServicesTabs() {
  const { t, locale } = useLanguage();
  const isMr = locale === "mr";
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "shares";

  const handleTabChange = (key: string) => {
    router.push(`/services?tab=${key}`, { scroll: false });
  };

  const getLocalizedArray = (key: string, defaultArray: string[]) => {
    const localized = t(key, { returnObjects: true });
    return Array.isArray(localized) ? localized : defaultArray;
  };

  const renderTabContent = (category: string) => {
    const filtered = servicesData.filter((s) => s.category === category);
    
    return (
      <div className="space-y-8 mt-8">
        {filtered.map((service) => {
          const serviceTitle = t(`services.items.${service.id}.title`) !== `services.items.${service.id}.title`
            ? t(`services.items.${service.id}.title`)
            : service.title;

          const serviceDesc = t(`services.items.${service.id}.desc`) !== `services.items.${service.id}.desc`
            ? t(`services.items.${service.id}.desc`)
            : service.shortDesc;

          const detailKey = `services_details.${service.id.replace(/-/g, "_")}`;
          const features = isMr ? getLocalizedArray(`${detailKey}.benefits`, service.features) : service.features;
          const eligibility = isMr ? getLocalizedArray(`${detailKey}.eligibility`, service.eligibility) : service.eligibility;
          const documents = isMr ? getLocalizedArray(`${detailKey}.documents`, service.documents) : service.documents;


          const rateKey = `services.rates.${service.id.replace(/-/g, "_")}`;
          const serviceRate = t(rateKey) !== rateKey ? t(rateKey) : service.interestRate;

          return (
            <div 
              key={service.id}
              data-aos="fade-up"
              className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-base-border transition-all duration-300"
            >
              {/* Corner visual accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B1010]/5 rounded-full blur-3xl" />
              
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-border pb-5 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-base-card border border-base-border flex items-center justify-center transition-all duration-300">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-text-main transition-colors duration-300">
                      {serviceTitle}
                    </h3>
                    <span className="text-xs text-text-muted font-medium tracking-wide uppercase transition-colors duration-300">
                      {t("services.category_label")}: {t(`services.tabs.${service.category}`)}
                    </span>
                  </div>
                </div>

                {serviceRate && (
                  <div className="bg-[rgba(243,107,33,0.1)] border border-[rgba(243,107,33,0.3)] rounded-lg px-4 py-2 text-right shrink-0">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest transition-colors duration-300">
                      {t("services.rate_benefit_label")}
                    </p>
                    <p className="text-sm font-black text-[#F36B21] mt-0.5">{serviceRate}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed my-5 break-words whitespace-normal transition-colors duration-300">
                {serviceDesc}
              </p>

              {/* Structured details grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                
                {/* Features Column */}
                <div className="space-y-3 p-4 rounded-lg bg-base-card/50 border border-base-border/50 transition-all duration-300">
                  <h4 className="text-xs font-black text-[#F36B21] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircleOutlined />
                    <span>{t("services.key_benefits_label")}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-text-main transition-colors duration-300">
                      {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7B1010] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility Column */}
                <div className="space-y-3 p-4 rounded-lg bg-base-card/50 border border-base-border/50 transition-all duration-300">
                  <h4 className="text-xs font-black text-[#F36B21] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircleOutlined />
                    <span>{t("services.eligibility_label")}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-text-main transition-colors duration-300">
                    {eligibility.map((elig, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F36B21] mt-1.5 shrink-0" />
                        <span>{elig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents Column */}
                <div className="space-y-3 p-4 rounded-lg bg-base-card/50 border border-base-border/50 transition-all duration-300">
                  <h4 className="text-xs font-black text-[#F36B21] uppercase tracking-wider flex items-center gap-1.5">
                    <FileTextOutlined />
                    <span>{t("services.documents_label")}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-text-main transition-colors duration-300">
                    {documents.map((doc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-1.5 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    );
  };

  const tabsItems = [
    {
      key: "shares",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider">
          <TeamOutlined />
          <span>{t("services.tabs.shares")}</span>
        </span>
      ),
      children: renderTabContent("shares"),
    },
    {
      key: "deposits",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider">
          <WalletOutlined />
          <span>{t("services.tabs.deposits")}</span>
        </span>
      ),
      children: renderTabContent("deposits"),
    },
    {
      key: "loans",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider">
          <DollarOutlined />
          <span>{t("services.tabs.loans")}</span>
        </span>
      ),
      children: renderTabContent("loans"),
    },
    {
      key: "digital",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider">
          <MobileOutlined />
          <span>{t("services.tabs.digital")}</span>
        </span>
      ),
      children: renderTabContent("digital"),
    },
    {
      key: "vault",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-xs sm:text-sm tracking-wider">
          <LockOutlined />
          <span>{t("services.tabs.vault")}</span>
        </span>
      ),
      children: renderTabContent("vault"),
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={handleTabChange}
      centered
      items={tabsItems}
      className="custom-services-tabs"
    />
  );
}

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            {t("services.badge")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight transition-colors duration-300">
            {t("services.title")}
          </h1>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {t("services.desc")}
          </p>
        </div>
      </section>

      {/* Tabs Section wrapped in Suspense for Next.js query parsing */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <Suspense fallback={<div className="text-center py-20 text-text-muted font-bold uppercase tracking-wider animate-pulse">Synchronizing Portfolios...</div>}>
          <ServicesTabs />
        </Suspense>
      </section>

    </div>
  );
}

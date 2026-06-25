"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs } from "antd";
import { 
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
    case "WalletOutlined": return <WalletOutlined className="text-3xl text-[#AD002E]" />;
    case "SafetyCertificateOutlined": return <SafetyCertificateOutlined className="text-3xl text-[#AD002E]" />;
    case "CalendarOutlined": return <WalletOutlined className="text-3xl text-[#AD002E]" />;
    case "DollarOutlined": return <DollarOutlined className="text-3xl text-[#AD002E]" />;
    case "HomeOutlined": return <DollarOutlined className="text-3xl text-[#AD002E]" />;
    case "ShopOutlined": return <DollarOutlined className="text-3xl text-[#AD002E]" />;
    case "MobileOutlined": return <MobileOutlined className="text-3xl text-[#AD002E]" />;
    case "LockOutlined": return <LockOutlined className="text-3xl text-[#AD002E]" />;
    default: return <WalletOutlined className="text-3xl text-[#AD002E]" />;
  }
};

// Marathi translations for deposit and loan schemes
const marathiServicesData: Record<
  string,
  { features: string[]; eligibility: string[]; documents: string[] }
> = {
  "savings-account": {
    features: [
      "फक्त ₹५०० ची कमीत कमी शिल्लक ठेवण्याची आवश्यकता.",
      "झटपट व्यवहारांच्या माहितीसाठी मोफत एसएमएस (SMS) अलर्ट सेवा.",
      "रोख काढण्यासाठी आणि खरेदीसाठी मोफत रुपे (RuPay) एटीएम/डेबिट कार्ड.",
      "स्वयंचलित हस्तांतरणासाठी स्टँडिंग इन्स्ट्रक्शन (Standing Instruction) सुविधा.",
    ],
    eligibility: [
      "भारतीय रहिवासी (वैयक्तिक, संयुक्त खाती, अल्पवयीन).",
      "स्थानिक ट्रस्ट, सहकारी संस्था आणि क्लब.",
      "एकल मालक आणि भागीदारी संस्था.",
    ],
    documents: [
      "पूर्ण भरलेला खाते उघडण्याचा अर्ज.",
      "आधार कार्ड आणि पॅन कार्ड (अनिवार्य).",
      "आधार कार्डवरील पत्त्यापेक्षा वेगळा पत्ता असल्यास पत्त्याचा पुरावा.",
      "दोन पासपोर्ट आकाराचे फोटो.",
    ],
  },
  "fixed-deposit": {
    features: [
      "१५ दिवस ते ५ वर्षांपर्यंतचे मुदतीचे पर्याय.",
      "चक्रवाढ व्याज (त्रैमासिक/अर्धवार्षिक) किंवा मासिक व्याज परतावा पर्याय.",
      "ठेव रकमेच्या ९०% पर्यंत कर्ज मिळण्याची सुविधा.",
      "संस्थेच्या नियमांनुसार मुदतपूर्व ठेव काढण्याची परवानगी.",
    ],
    eligibility: [
      "संस्थेचे सर्व नोंदणीकृत सभासद.",
      "वैयक्तिक खाती (एकल किंवा संयुक्त) आणि संस्थात्मक संघटना.",
    ],
    documents: [
      "मुदत ठेव (FD) अर्ज.",
      "सभासदत्व संदर्भ किंवा शेअर प्रमाणपत्र क्रमांक.",
      "पॅन कार्डची प्रत.",
      "व्याज थेट जमा होण्यासाठी संस्थेमध्ये सक्रिय बचत खाते.",
    ],
  },
  "recurring-deposit": {
    features: [
      "फक्त ₹५०० पासून सुरू होणारी लवचिक मासिक ठेव.",
      "१२ महिने ते ६० महिन्यांपर्यंत उपलब्ध मुदत.",
      "मुलांचे शिक्षण, लग्न किंवा सुट्ट्यांच्या नियोजनासाठी निधी गोळा करण्याचे उत्तम साधन.",
      "बचत खात्यातून स्वयंचलित पैसे जमा होण्यासाठी स्टँडिंग इन्स्ट्रक्शन.",
    ],
    eligibility: [
      "संस्थेचे सभासद (वैयक्तिक किंवा संयुक्त).",
      "पालक/कायदेशीर पालकांद्वारे प्रतिनिधित्व केलेले अल्पवयीन.",
    ],
    documents: [
      "आवर्ती ठेव (RD) अर्ज.",
      "केवायसी (KYC) पडताळणी कागदपत्रे (आधार आणि पॅन).",
      "स्टँडिंग इन्स्ट्रक्शन (स्वयंचलित पेमेंट) अर्ज (लागू असल्यास).",
    ],
  },
  "gold-loan": {
    features: [
      "झटपट रोख/बँक हस्तांतरणासह ३० मिनिटांत कर्ज मंजूर.",
      "बाजारभावानुसार सोन्याच्या दागिन्यांचे उच्च मूल्यांकन.",
      "सीसीटीव्ही देखरेखीखाली अत्यंत सुरक्षित लॉकर स्टोरेज.",
      "लवचिक परतफेड पर्याय: बुलेट रिपेमेंट किंवा मासिक व्याज.",
    ],
    eligibility: [
      "संस्थेचे सभासद असणे आवश्यक (झटपट सभासदत्व उपलब्ध).",
      "१८ ते २२ कॅरेट सोन्याच्या दागिन्यांचे/दागिन्यांचे मालक.",
      "वय १८ ते ७० वर्षे दरम्यान असावे.",
    ],
    documents: [
      "सोने तारण कर्ज अर्ज.",
      "केवायसी पुरावा (आधार कार्ड आणि पॅन कार्ड).",
      "सोन्याचे मूळ बिल/इनव्हॉइस (उपलब्ध असल्यास).",
      "सोन्याच्या मालकीचे घोषणापत्र.",
    ],
  },
  "home-loan": {
    features: [
      "मालमत्ता मूल्याच्या ८०% पर्यंत कर्ज साहाय्य.",
      "१५ वर्षांपर्यंतची दीर्घ परतफेड मुदत.",
      "कोणतेही छुपे प्रशासकीय शुल्क किंवा दंडाच्या अटी नाहीत.",
      "तज्ज्ञ कायदेशीर आणि तांत्रिक मूल्यमापन सहाय्य.",
    ],
    eligibility: [
      "स्थिर नोकरी असलेले पगारदार व्यक्ती (किमान २ वर्षे सेवा).",
      "३ वर्षांचे आयटी रिटर्न भरलेले स्वयंरोजगारीत व्यक्ती / व्यावसायिक.",
      "संस्थेचे सक्रिय सभासदत्व असावे.",
    ],
    documents: [
      "गृहकर्ज अर्ज.",
      "मागील ६ महिन्यांचे पगार पत्रक + फॉर्म १६ (पगारदारांसाठी).",
      "मागील ३ वर्षांचे आयटी रिटर्न आणि ताळेबंद (स्वयंरोजगारासाठी).",
      "मूळ मालमत्तेची कागदपत्रे, टायटल डीड शोध आणि ब्ल्यूप्रिंट्स.",
      "मुख्य बँक खात्याचे मागील ६ महिन्यांचे बँक स्टेटमेंट.",
    ],
  },
  "business-loan": {
    features: [
      "जलद मूल्यमापन आणि कर्ज मंजुरी.",
      "१२ ते ६० महिन्यांपर्यंतचे लवचिक परतफेड पर्याय.",
      "सुलभ मासिक ईएमआय (EMI) द्वारे परतफेड.",
      "सभासद संदर्भावर आधारित जामीनदार सुविधा.",
    ],
    eligibility: [
      "व्यवसाय करणारे किंवा नियमित मासिक उत्पन्न असलेले नोंदणीकृत सभासद.",
      "वयोमर्यादा: २१ ते ५८ वर्षे.",
      "जामीनदार म्हणून दोन सक्षम सभासदांची सह-स्वाक्षरी आवश्यक.",
    ],
    documents: [
      "कर्ज अर्ज.",
      "कर्जदार आणि दोन्ही जामीनदारांची केवायसी (KYC) कागदपत्रे.",
      "उत्पन्नाचा पुरावा (पगार पत्रक / व्यवसाय उत्पन्न प्रमाणपत्र).",
      "व्यवसाय नोंदणी कागदपत्रे (शॉप ॲक्ट, जीएसटी, एमएसएमई इ.).",
    ],
  },
  "digital-banking": {
    features: [
      "IMPS आणि NEFT द्वारे रिअल-टाइम निधी हस्तांतरण.",
      "शिल्लक तपासणी आणि स्टेटमेंटसाठी अनुकूल मोबाईल ॲप.",
      "दुकानदारांसाठी वैयक्तिकृत युपीआय (UPI) क्यूआर (QR) कोड कार्ड.",
      "ठेव मॅच्युरिटी किंवा कर्ज पेमेंटसाठी झटपट एसएमएस (SMS) अपडेट्स.",
    ],
    eligibility: [
      "सर्व सक्रिय बचत आणि चालू खातेदार.",
      "मोबाईल क्रमांक शाखेकडे नोंदणीकृत असणे आवश्यक आहे.",
    ],
    documents: [
      "ई-सेवा (E-Services) नोंदणी अर्ज.",
      "मोबाईल क्रमांक नोंदणीची पडताळणी.",
    ],
  },
  "safe-deposit": {
    features: [
      "विविध आकारांचे लॉकर्स उपलब्ध (लहान, मध्यम, मोठे).",
      "मजकूर आणि प्रगत सुरक्षा प्रणालीसह मजबूत स्टीलचे सेफ.",
      "दोन चाव्यांच्या संरक्षणासह सीसीटीव्ही (CCTV) देखरेखीखालील लॉकर रूम.",
      "वारसदार (Nomination) नोंदणीची सुविधा उपलब्ध.",
    ],
    eligibility: [
      "सुरक्षा ठेव किंवा मुदत ठेव (FD) असलेले सक्रिय खातेदार.",
      "एकल किंवा संयुक्तरीत्या लॉकर चालवण्याचा पर्याय.",
    ],
    documents: [
      "लॉकर करारनामा (Agreement) अर्ज.",
      "मुदत ठेव (FD) पुरावा किंवा सुरक्षा ठेव पावती.",
      "केवायसी (KYC) पडताळणी कागदपत्रे.",
    ],
  },
};

// Internal component to handle useSearchParams under Suspense
function ServicesTabs() {
  const { t, locale } = useLanguage();
  const isMr = locale === "mr";
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "deposits";

  const handleTabChange = (key: string) => {
    router.push(`/services?tab=${key}`, { scroll: false });
  };

  const getLocalizedArray = (key: string, defaultArray: string[]) => {
    const localized = t(key);
    return Array.isArray(localized) ? (localized as string[]) : defaultArray;
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
          
          const features = isMr && marathiServicesData[service.id]
            ? marathiServicesData[service.id].features
            : (isMr ? getLocalizedArray(`${detailKey}.benefits`, service.features) : service.features);

          const eligibility = isMr && marathiServicesData[service.id]
            ? marathiServicesData[service.id].eligibility
            : (isMr ? getLocalizedArray(`${detailKey}.eligibility`, service.eligibility) : service.eligibility);

          const documents = isMr && marathiServicesData[service.id]
            ? marathiServicesData[service.id].documents
            : (isMr ? getLocalizedArray(`${detailKey}.documents`, service.documents) : service.documents);


          const rateKey = `services.rates.${service.id.replace(/-/g, "_")}`;
          const serviceRate = t(rateKey) !== rateKey ? t(rateKey) : service.interestRate;

          return (
            <div 
              key={service.id}
              data-aos="fade-up"
              className="glass-panel p-6 sm:p-8 rounded-lg relative overflow-hidden border border-[#AD002E]/20 transition-all duration-300"
            >
              {/* Corner visual accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#AD002E]/5 rounded-full blur-3xl" />
              
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#AD002E]/20 pb-5 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-[#AD002E]/20 flex items-center justify-center transition-all duration-300">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-main transition-colors duration-300">
                      {serviceTitle}
                    </h3>
                    <span className="text-sm text-text-muted font-normal tracking-wide uppercase transition-colors duration-300">
                      {t("services.category_label")}: {t(`services.tabs.${service.category}`)}
                    </span>
                  </div>
                </div>

                {serviceRate && (
                  <div className="bg-[rgba(173,0,46,0.1)] border border-[rgba(173,0,46,0.3)] rounded-lg px-4 py-2 text-right shrink-0">
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest transition-colors duration-300">
                      {t("services.rate_benefit_label")}
                    </p>
                    <p className="text-base font-bold text-[#AD002E] mt-0.5">{serviceRate}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-muted leading-relaxed my-5 break-words whitespace-normal transition-colors duration-300">
                {serviceDesc}
              </p>

              {/* Structured details grids */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                
                {/* Features Column */}
                <div className="space-y-3 p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/50 transition-all duration-300">
                  <h4 className="text-sm font-bold text-[#AD002E] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircleOutlined />
                    <span>{t("services.key_benefits_label")}</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-main transition-colors duration-300">
                      {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AD002E] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility Column */}
                <div className="space-y-3 p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/50 transition-all duration-300">
                  <h4 className="text-sm font-bold text-[#AD002E] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircleOutlined />
                    <span>{t("services.eligibility_label")}</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-main transition-colors duration-300">
                    {eligibility.map((elig, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#AD002E] mt-1.5 shrink-0" />
                        <span>{elig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents Column */}
                <div className="space-y-3 p-4 rounded-lg bg-white/50 border border-[#AD002E]/20/50 transition-all duration-300">
                  <h4 className="text-sm font-bold text-[#AD002E] uppercase tracking-wider flex items-center gap-1.5">
                    <FileTextOutlined />
                    <span>{t("services.documents_label")}</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-text-main transition-colors duration-300">
                    {documents.map((doc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
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
      key: "deposits",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-sm sm:text-base tracking-wider">
          <WalletOutlined />
          <span>{t("services.tabs.deposits")}</span>
        </span>
      ),
      children: renderTabContent("deposits"),
    },
    {
      key: "loans",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-sm sm:text-base tracking-wider">
          <DollarOutlined />
          <span>{t("services.tabs.loans")}</span>
        </span>
      ),
      children: renderTabContent("loans"),
    },
    {
      key: "digital",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-sm sm:text-base tracking-wider">
          <MobileOutlined />
          <span>{t("services.tabs.digital")}</span>
        </span>
      ),
      children: renderTabContent("digital"),
    },
    {
      key: "vault",
      label: (
        <span className="flex items-center gap-1.5 font-bold uppercase text-sm sm:text-base tracking-wider">
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
    <div className="w-full bg-white transition-colors duration-300">
      
      {/* Header Banner */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-[#AD002E]/20/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block mb-2 ">
            {t("services.badge")}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-text-main tracking-tight transition-colors duration-300">
            {t("services.title")}
          </h1>
          <p className="text-base text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {t("services.desc")}
          </p>
        </div>
      </section>

      {/* Tabs Section wrapped in Suspense for Next.js query parsing */}
      <section className="py-12 md:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20 text-text-muted font-bold uppercase tracking-wider animate-pulse">Synchronizing Portfolios...</div>}>
          <ServicesTabs />
        </Suspense>
      </section>

    </div>
  );
}

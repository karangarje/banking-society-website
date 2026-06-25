"use client";

import React from "react";
import Image from "next/image";
import {
  TeamOutlined,
  EyeOutlined,
  AimOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CameraOutlined,
  GlobalOutlined,
  BankOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";


const content = {
  en: {
    legacy: "Our Legacy",
    title: "About Our Co-operative Society",
    subtitle: "Building trusted bridges of credit and prosperity for businesses, farmers, and families since 1997.",
    visionTitle: "Our Vision",
    visionDesc: "To emerge as the most trusted, technology-driven, and socially-responsible financial co-operative society in Maharashtra, offering high-returns on deposits and seamless credit to empower common citizens.",
    missionTitle: "Our Mission",
    missionDesc: "To provide affordable financial schemes, reduce paperwork barriers, maintain absolute financial integrity through Class \"A\" governance, and deliver digital banking benefits directly to rural and urban households.",
    leadership: "Leadership Statement",
    chairmanTitle: "Message from the Chairman",
    chairmanImageLabel: "Chairman",
    chairmanPara1: "Dear Members and Partners,\n\nSince our establishment in 1997, Babasaheb Kavad Nighoj Nagari Sahakari Patsanstha has remained committed to providing reliable and member-focused financial services. The continued trust of our members, strong financial performance, and Class 'A' Audit Grade reflect our dedication to transparency, compliance, and responsible growth.",
    chairmanPara2: "During the financial year 2024–25, the institution continued to strengthen its position with more than 24,183 members, deposits exceeding ₹269.46 crore, and a loan portfolio of over ₹169.22 crore. These achievements have been possible because of the confidence placed in us by our members, customers, employees, and well-wishers.\n\nWe remain committed to expanding quality financial services while preserving the cooperative values on which our institution was founded.",
    inCooperation: "In Co-operation,",
    chairmanPost: "Chairman, Babasaheb Kavad Nighoj Nagari Sahakari Patsanstha",
    timelineTitle: "Our Journey Through Time",
    timelineSubtitle: "From a tiny room in Nighoj village to a state-wide network, here are our major milestones.",
    nighojTitle: "Nighoj Kund – Natural Wonder Near Morachi Chincholi",
    nighojSubtitle: "Asia's Largest Natural River Potholes",
    nighojDesc1: "Nighoj Kund, also known as Nighoj Potholes, is a spectacular natural formation on the Kukadi River in Ahmednagar District, Maharashtra. Located approximately 90 km from Pune, this remarkable geological wonder features Asia's largest naturally formed riverine potholes. Over thousands of years, swirling river water carrying pebbles and sediments carved deep circular cavities into the basalt rock bed, creating a breathtaking natural landscape.",
    nighojDesc2: "The village of Nighoj is also known for the sacred Malganga Temple situated along the riverbank. During summer, the water level drops and reveals the full beauty of the giant potholes, while the monsoon season transforms the area into a dramatic canyon with flowing water and seasonal waterfalls.",
    nighojCard1Title: "Geological Wonder",
    nighojCard1Desc: "The potholes were naturally formed through erosion caused by the swirling waters of the Kukadi River over thousands of years.",
    nighojCard2Title: "Natural Whirlpool Formations",
    nighojCard2Desc: "Several potholes contain circular water movements that resemble whirlpools, showcasing nature's power and beauty.",
    nighojCard3Title: "Malganga Temple",
    nighojCard3Desc: "A famous temple dedicated to Goddess Malganga stands beside the river and attracts pilgrims throughout the year.",
    nighojCard4Title: "Tourist Attraction",
    nighojCard4Desc: "A popular destination for photography, family outings, educational visits, and nature enthusiasts.",
    nighojLocTitle: "Location",
    nighojLocDesc: "Nighoj Village, Parner Taluka, Ahmednagar District, Maharashtra. Approximately 90 km from Pune and 220 km from Mumbai.",
    nighojTimeTitle: "Best Time to Visit",
    nighojTimeDesc: "October–February: Pleasant weather. Monsoon: Flowing water and scenic views. Summer: Best visibility of pothole formations.",
    agriTitle: "Mhalasakant Agritourism – Morachi Chincholi",
    agriContent: "Visitors exploring Nighoj Kund can also experience authentic rural hospitality at Mhalasakant Agritourism, Morachi Chincholi. Guests are welcomed with traditional Maharashtrian culture, healthy vegetarian meals, and a peaceful countryside atmosphere.",
    agriHighlightsTitle: "Highlights:",
    agriHighlights: [
      "Traditional Maharashtrian Rural Cuisine",
      "Pure Vegetarian Breakfast & Lunch",
      "Family-Friendly Environment",
      "Nature & Village Experience",
      "Peaceful Weekend Getaway"
    ],
    nighojQuote: "\"Nature has sculpted Nighoj Kund over thousands of years, creating one of Maharashtra's most extraordinary geological wonders.\""
  },
  mr: {
    legacy: "आमचा वारसा",
    title: "आमच्या सहकारी संस्थेबद्दल",
    subtitle: "१९९७ पासून व्यवसाय, शेतकरी आणि कुटुंबांच्या प्रगतीसाठी विश्वासार्ह आर्थिक सेवा.",
    visionTitle: "आमची दृष्टी",
    visionDesc: "महाराष्ट्रातील सर्वाधिक विश्वासार्ह, तंत्रज्ञानाधारित आणि सामाजिकदृष्ट्या उत्तरदायी सहकारी संस्था बनणे.",
    missionTitle: "आमचे ध्येय",
    missionDesc: "परवडणाऱ्या आर्थिक योजना उपलब्ध करून देणे, पारदर्शकता राखणे आणि ग्रामीण तसेच शहरी भागांपर्यंत डिजिटल बँकिंग पोहोचवणे.",
    leadership: "नेतृत्व विधान",
    chairmanTitle: "अध्यक्षांचा संदेश",
    chairmanImageLabel: "अध्यक्ष",
    chairmanPara1: "प्रिय सभासद आणि भागीदारांनो,\n\n१९९७ मधील आमच्या स्थापनेपासून, बाबासाहेब कवाद निघोज नागरी सहकारी पतसंस्था विश्वसनीय आणि सभासद-केंद्रित आर्थिक सेवा प्रदान करण्यासाठी कटिबद्ध आहे. आमच्या सभासदांचा सातत्यपूर्ण विश्वास, मजबूत आर्थिक कामगिरी आणि ऑडिट वर्ग 'अ' मानांकन हे आमची पारदर्शकता, नियमपालन आणि जबाबदार वाढीची वचनबद्धता दर्शवतात.",
    chairmanPara2: "आर्थिक वर्ष २०२४-२५ दरम्यान, संस्थेने २४,१८३ पेक्षा जास्त सभासद, ₹२६९.४६ कोटींपेक्षा जास्त ठेवी आणि ₹१६९.२२ कोटींपेक्षा जास्त कर्ज वितरणासह आपले स्थान मजबूत करणे सुरू ठेवले. हे यश आमचे सभासद, ग्राहक, कर्मचारी आणि हितचिंतकांनी आमच्यावर दाखवलेल्या विश्वासामुळे शक्य झाले आहे.\n\nआमच्या संस्थेची स्थापना ज्या सहकार मूल्यांवर झाली आहे ती मूल्ये जपत दर्जेदार आर्थिक सेवांचा विस्तार करण्यासाठी आम्ही कटिबद्ध आहोत.",
    inCooperation: "सहकार्याबद्दल धन्यवाद,",
    chairmanPost: "अध्यक्ष, बाबासाहेब कवाद निघोज नागरी सहकारी पतसंस्था",
    timelineTitle: "आमचा प्रवास",
    timelineSubtitle: "निघोज गावातील एका छोट्या खोलीपासून ते राज्यभरातील नेटवर्कपर्यंत, आमचे काही महत्त्वाचे टप्पे खालीलप्रमाणे आहेत.",
    nighojTitle: "निघोज कुंड - आशियातील सर्वात मोठी नैसर्गिक नदीची रांजणखळगे",
    nighojSubtitle: "अहमदनगर जिल्ह्यातील मोराची चिंचोली जवळ स्थित एक चित्तथरारक भौगोलिक आश्चर्य.",
    nighojDesc1: "निघोज कुंड, ज्याला निघोज रांजणखळगे म्हणूनही ओळखले जाते, ही कुकडी नदीवरील एक नेत्रदीपक नैसर्गिक निर्मिती आहे. पुण्यापासून सुमारे ९० किमी अंतरावर असलेले हे अद्वितीय ठिकाण आशियातील सर्वात मोठ्या नैसर्गिकरित्या तयार झालेल्या नदीच्या रांजणखळग्यांसाठी प्रसिद्ध आहे. हजारो वर्षांपासून, खडे आणि गाळ वाहून नेणाऱ्या फिरत्या नदीच्या पाण्याने बेसाल्ट खडकाच्या तळामध्ये खोल गोलाकार खड्डे कोरले आणि एक असाधारण भौगोलिक लँडस्केप तयार केला.",
    nighojDesc2: "निघोज गाव हे पवित्र मळगंगा देवीच्या मंदिराचे घर आहे, ज्यामुळे ते निसर्गप्रेमी आणि भाविक दोघांसाठीही एक महत्त्वाचे ठिकाण बनले आहे. उन्हाळ्यात, पाण्याची पातळी कमी होते आणि राक्षस खडक निर्मितीचे पूर्ण सौंदर्य प्रकट होते, तर पावसाळ्यात या भागाचे वाहते पाणी आणि छोट्या धबधब्यांसह एका नाट्यमय लँडस्केपमध्ये रूपांतर होते.",
    nighojCard1Title: "भौगोलिक आश्चर्य",
    nighojCard1Desc: "कुकडी नदीच्या फिरत्या पाण्यामुळे हजारो वर्षांपासून सतत होणाऱ्या झिजेतून रांजणखळगे नैसर्गिकरित्या तयार झाले आहेत.",
    nighojCard2Title: "अद्वितीय नदी निर्मिती",
    nighojCard2Desc: "अनेक रांजणखळग्यांमध्ये पाणी गोलाकार भोवऱ्यासारख्या नमुन्यात फिरते, ज्यामुळे आकर्षक नैसर्गिक घटना घडतात.",
    nighojCard3Title: "मळगंगा मंदिर",
    nighojCard3Desc: "देवी मळगंगेला समर्पित एक आदरणीय मंदिर नदीच्या शेजारी उभे आहे आणि दरवर्षी हजारो भक्तांना आकर्षित करते.",
    nighojCard4Title: "उत्तम पर्यटन स्थळ",
    nighojCard4Desc: "कौटुंबिक सहली, छायाचित्रण, शैक्षणिक भेटी आणि निसर्ग अन्वेषणासाठी एक आदर्श ठिकाण.",
    nighojLocTitle: "ठिकाण",
    nighojLocDesc: "निघोज गाव, पारनेर तालुका, अहमदनगर जिल्हा, महाराष्ट्र. पुण्यापासून अंदाजे ९० किमी आणि मुंबईपासून २२० किमी.",
    nighojTimeTitle: "भेट देण्याची सर्वोत्तम वेळ",
    nighojTimeDesc: "आल्हाददायक हवामानासाठी ऑक्टोबर ते फेब्रुवारी. वाहते पाणी पाहण्यासाठी पावसाळा. स्पष्टपणे रांजणखळगे पाहण्यासाठी उन्हाळा.",
    agriTitle: "म्हाळसाकांत कृषी पर्यटन - मोराची चिंचोली",
    agriContent: "निघोज कुंड पाहणारे पर्यटक मोराची चिंचोली येथील म्हाळसाकांत कृषी पर्यटनाचा अस्सल ग्रामीण आदरातिथ्य अनुभवू शकतात. पारंपारिक महाराष्ट्रीयन संस्कृती, आरोग्यदायी शाकाहारी जेवण आणि शांत ग्रामीण वातावरणाने पाहुण्यांचे स्वागत केले जाते.",
    agriHighlightsTitle: "वैशिष्ट्ये:",
    agriHighlights: [
      "पारंपारिक महाराष्ट्रीयन ग्रामीण खाद्यपदार्थ",
      "शुद्ध शाकाहारी नाश्ता आणि जेवण",
      "कुटुंब-अनुकूल वातावरण",
      "निसर्ग आणि गावाचा अनुभव",
      "शांततापूर्ण सुट्टीची जागा"
    ],
    nighojQuote: "\"निसर्गाने हजारो वर्षांपासून निघोज कुंड कोरले आहे, ज्यामुळे महाराष्ट्रातील सर्वात असाधारण भौगोलिक आश्चर्यांपैकी एक तयार झाले आहे.\""
  }
};

export default function About() {
  const { isDark } = useTheme();
  const { locale } = useLanguage();
  const isMr = locale === "mr";
  const t = content[locale];

  const [visionText, setVisionText] = React.useState("");
  const [missionText, setMissionText] = React.useState("");
  const [chairmanMsg, setChairmanMsg] = React.useState("");
  const [historyText, setHistoryText] = React.useState("");
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    // Initial default values from content
    const defT = content[locale];
    setVisionText(defT.visionDesc);
    setMissionText(defT.missionDesc);
    setChairmanMsg(defT.chairmanPara1 + "\n" + defT.chairmanPara2);
    setHistoryText(defT.subtitle);

    const fetchCMS = async () => {
      try {
        const res = await fetch("/api/public/cms");
        if (res.ok) {
          const map = await res.json();
          const lang = locale;

          if (map["about.vision"]?.[lang]) {
            setVisionText(map["about.vision"][lang]);
          }
          if (map["about.mission"]?.[lang]) {
            setMissionText(map["about.mission"][lang]);
          }
          if (map["about.chairman.message"]?.[lang]) {
            setChairmanMsg(map["about.chairman.message"][lang]);
          }
          if (map["about.history"]?.[lang]) {
            setHistoryText(map["about.history"][lang]);
          }
        }
      } catch (err) {
        console.error("Error loading CMS settings:", err);
      }
    };
    fetchCMS();
  }, [locale]);

  const milestones = [
    {
      year: isMr ? "१९९७" : "1997",
      title: isMr ? "स्थापना व पहिली शाखा" : "Inception & First Branch",
      desc: isMr ? "निघोज येथे १५० सभासदांसह संस्थेची स्थापना." : "Founded in Nighoj village (Ahmednagar) with 150 members to cater to rural microfinance."
    },
    {
      year: isMr ? "२००५" : "2005",
      title: isMr ? "वर्ग 'अ' लेखापरीक्षण मानांकन" : "Class 'A' Audit Rating",
      desc: isMr ? "राज्य सहकार आयुक्तांकडून उच्च लेखापरीक्षण दर्जा." : "Achieved the highest auditing standards from the State Co-operative Commissioner."
    },
    {
      year: isMr ? "२०१२" : "2012",
      title: isMr ? "कोअर बँकिंग विस्तार" : "Core Banking Expansion",
      desc: isMr ? "सर्व शाखांमध्ये संगणकीकृत बँकिंग प्रणाली लागू." : "Implemented centralized core banking software across all branches for unified ledgers."
    },
    {
      year: isMr ? "२०१८" : "2018",
      title: isMr ? "₹३०० कोटी ठेवींचा टप्पा" : "₹300 Crore Deposit Milestone",
      desc: isMr ? "ठेवींच्या वाढीसह पुणे व मुंबई येथे विस्तार." : "Crossed ₹300 Cr in deposit reserves and expanded to major cities including Pune and Mumbai."
    },
    {
      year: isMr ? "२०२४" : "2024",
      title: isMr ? "मोबाईल बँकिंग व QR सेवा" : "Mobile & QR Digital Launch",
      desc: isMr ? "IMPS, QR पेमेंट आणि डिजिटल सुविधा सुरू." : "Rolled out secure mobile banking application, IMPS fund transfers, and merchant QR scan cards."
    },
  ];

  return (
    <div className="w-full bg-white transition-colors duration-300">

      {/* 1. Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-[#AD002E]/20/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block mb-2 ">
            {t.legacy}
          </span>
          <h1 className={`text-4xl sm:text-6xl font-bold tracking-tight transition-colors duration-300 ${"text-text-main"
            }`}>
            {isMr ? "इतिहास" : "History"}
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
            }`}>
            {historyText}
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-aos="fade-right" className="glass-panel p-8 rounded-lg space-y-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#AD002E]/20 border border-[#AD002E]/40 flex items-center justify-center">
              <EyeOutlined className="text-2xl text-[#AD002E]" />
            </div>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${"text-text-main"
              }`}>{t.visionTitle}</h3>
          </div>
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
            }`}>
            {visionText}
          </p>
        </div>

        <div data-aos="fade-left" className="glass-panel p-8 rounded-lg space-y-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#AD002E]/20 border border-[#AD002E]/40 flex items-center justify-center">
              <AimOutlined className="text-2xl text-[#AD002E]" />
            </div>
            <h3 className={`text-2xl font-bold transition-colors duration-300 ${"text-text-main"
              }`}>{t.missionTitle}</h3>
          </div>
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
            }`}>
            {missionText}
          </p>
        </div>
      </section>

      {/* 3. Chairman's Message */}
      <section id="chairman" className="py-16 px-4 bg-white/40 border-y border-[#AD002E]/20/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

          {/* Chairman Image / Frame */}
          <div data-aos="fade-right" className="flex justify-center">
            <div className="relative w-64 h-80 rounded-lg overflow-hidden border-2 border-[#AD002E]/20 bg-gradient-to-tr from-[#AD002E] to-[#AD002E] p-1.5 shadow-md transition-all duration-300">
              <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col transition-all duration-300">
                {/* Image Section */}
                <div className="relative w-full flex-1 bg-white flex items-center justify-center overflow-hidden">
                  {!imageError ? (
                    <Image
                      src="/images/chairman/vasant-babasaheb-kavad.png"
                      alt={isMr ? "श्री. वसंत बाबासाहेब कवाद" : "Shri. Vasant Babasaheb Kavad"}
                      fill
                      className="object-cover object-top rounded-t-lg"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <TeamOutlined className="text-7xl text-text-muted/30 transition-colors" />
                  )}
                </div>
                {/* Bottom Name Card */}
                <div className="w-full bg-white p-3 flex flex-col justify-center items-center text-center rounded-b-lg border-t border-[#AD002E]/10">
                  <h4 className={`text-base font-bold leading-snug transition-colors duration-300 ${"text-text-main"}`}>
                    {isMr ? "श्री. वसंत बाबासाहेब कवाद" : "Shri. Vasant Babasaheb Kavad"}
                  </h4>
                  <p className="text-sm text-[#AD002E] font-semibold mt-0.5">
                    {t.chairmanImageLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chairman Message Text */}
          <div data-aos="fade-up" className="lg:col-span-2 space-y-5">
            <span className="text-sm font-bold text-[#AD002E] uppercase tracking-wider">{t.leadership}</span>
            <h2 className={`text-3xl sm:text-4xl font-bold transition-colors duration-300 ${"text-text-main"
              }`}>{t.chairmanTitle}</h2>
            <div className="w-12 h-1 bg-[#AD002E] rounded-full" />

            <div className={`space-y-4 text-sm sm:text-base leading-relaxed font-normal transition-colors duration-300 ${false ? "text-white" : "text-[#AD002E]/70"
              }`}>
              {chairmanMsg.split("\n").map((para, i) => (
                <p key={i} className="mb-3">{para}</p>
              ))}
            </div>
            <div className="pt-2">
              <p className={`text-sm font-bold transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
                }`}>{t.inCooperation}</p>
              <p className={`text-base font-bold mt-0.5 transition-colors ${"text-text-main"
                }`}>{isMr ? "श्री. वसंत बाबासाहेब कवाद" : "Shri. Vasant Babasaheb Kavad"}</p>
              <p className={`text-sm transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
                }`}>{t.chairmanPost}</p>
            </div>
          </div>

        </div>
      </section>


      {/* 5. Timeline / History Milestones */}
      <section id="history" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className={`text-3xl sm:text-4xl font-bold transition-colors ${"text-text-main"
            }`}>{t.timelineTitle}</h2>
          <p className={`text-sm max-w-xl mx-auto transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
            }`}>
            {t.timelineSubtitle}
          </p>
        </div>

        <div className="relative border-l-2 border-[#AD002E]/30 ml-4 md:ml-32 space-y-8">
          {milestones.map((stone, idx) => (
            <div key={idx} data-aos="fade-up" className="relative pl-8 md:pl-12 group">
              {/* Year circle indicator */}
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white border-2 border-[#AD002E] group-hover:border-[#AD002E] group-hover:bg-[#AD002E] transition-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Year floating block on left for wide screens */}
              <div className="hidden md:block absolute -left-32 top-0 w-24 text-right">
                <span className="text-base font-bold text-[#AD002E] tracking-wider">{stone.year}</span>
              </div>

              {/* Milestone details card */}
              <div className="glass-card p-5 rounded-lg border border-[#AD002E]/20/50 relative transition-all duration-300">
                <span className="md:hidden block text-sm font-bold text-[#AD002E] mb-1">{stone.year}</span>
                <h4 className={`text-base sm:text-lg font-bold mb-1.5 transition-colors ${"text-text-main"
                  }`}>{stone.title}</h4>
                <p className={`text-sm leading-relaxed transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
                  }`}>{stone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Nighoj Kund & Agri Tourism */}
      <section id="nighoj-kund" className="py-24 px-4 bg-white/40 border-t border-[#AD002E]/20/50 overflow-hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors ${"text-text-main"
              }`}>{t.nighojTitle}</h2>
            <p className={`text-lg md:text-xl font-normal transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
              }`}>
              {t.nighojSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left side: Image and Quote */}
            <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-md border border-[#AD002E]/20/50 group">
                <div className="absolute inset-0 bg-[#AD002E]/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                  src="/images/history/nighoj-kund.png"
                  alt="Nighoj Kund - Natural River Potholes on Kukadi River, Maharashtra"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="glass-panel p-8 rounded-lg relative overflow-hidden border-l-4 border-l-[#AD002E]">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="text-8xl font-serif text-[#AD002E]">"</span>
                </div>
                <p className={`text-lg md:text-xl font-normal italic relative z-10 transition-colors ${isDark ? "text-[#AD002E]/70" : "text-[#AD002E]/70"
                  }`}>
                  {t.nighojQuote}
                </p>
              </div>
            </div>

            {/* Right side: Content */}
            <div className="lg:col-span-7 space-y-10" data-aos="fade-left">

              {/* Description */}
              <div className="space-y-6">
                <p className={`text-base md:text-lg leading-relaxed transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
                  }`}>
                  {t.nighojDesc1}
                </p>
                <p className={`text-base md:text-lg leading-relaxed transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
                  }`}>
                  {t.nighojDesc2}
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center mb-4">
                    <GlobalOutlined className="text-2xl text-[#AD002E]" />
                  </div>
                  <h4 className={`text-xl font-bold mb-2 transition-colors ${"text-text-main"}`}>{t.nighojCard1Title}</h4>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.nighojCard1Desc}</p>
                </div>

                <div className="glass-card p-6 rounded-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center mb-4">
                    <AimOutlined className="text-2xl text-[#AD002E]" />
                  </div>
                  <h4 className={`text-xl font-bold mb-2 transition-colors ${"text-text-main"}`}>{t.nighojCard2Title}</h4>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.nighojCard2Desc}</p>
                </div>

                <div className="glass-card p-6 rounded-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center mb-4">
                    <BankOutlined className="text-2xl text-[#AD002E]" />
                  </div>
                  <h4 className={`text-xl font-bold mb-2 transition-colors ${"text-text-main"}`}>{t.nighojCard3Title}</h4>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.nighojCard3Desc}</p>
                </div>

                <div className="glass-card p-6 rounded-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#AD002E]/10 flex items-center justify-center mb-4">
                    <CameraOutlined className="text-2xl text-[#AD002E]" />
                  </div>
                  <h4 className={`text-xl font-bold mb-2 transition-colors ${"text-text-main"}`}>{t.nighojCard4Title}</h4>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.nighojCard4Desc}</p>
                </div>
              </div>

              {/* Location & Time info */}
              <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-lg bg-white border border-[#AD002E]/20">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-[#AD002E] font-bold">
                    <EnvironmentOutlined />
                    <span>{t.nighojLocTitle}</span>
                  </div>
                  <p className={`text-sm ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.nighojLocDesc}</p>
                </div>
                <div className="w-px bg-base-border hidden sm:block" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-[#AD002E] font-bold">
                    <CalendarOutlined />
                    <span>{t.nighojTimeTitle}</span>
                  </div>
                  <p className={`text-sm ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.nighojTimeDesc}</p>
                </div>
              </div>

              {/* Agri Tourism Section */}
              <div className="glass-panel p-8 rounded-lg border-t-4 border-t-[#AD002E] mt-8 shadow-md">
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${"text-text-main"}`}>{t.agriTitle}</h3>
                <p className={`text-base mb-6 ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{t.agriContent}</p>

                <div>
                  <h4 className="font-bold text-[#AD002E] mb-4">{t.agriHighlightsTitle}</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {t.agriHighlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircleOutlined className="text-[#AD002E] mt-1" />
                        <span className={`text-sm font-normal transition-colors ${isDark ? "text-text-muted" : "text-[#AD002E]/70"}`}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

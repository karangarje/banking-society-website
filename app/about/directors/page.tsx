"use client";

import React from "react";
import Image from "next/image";
import {
  TeamOutlined
} from "@ant-design/icons";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";
import { directorsData } from "@/data/directors";

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
    chairmanImageLabel: "Society Chairman",
    chairmanPara1: "Dear Members and Partners, since our foundation in 1998, Babasaheb Kavad Patsanstha has operated on the absolute foundation of mutual benefit and financial safety. We understand that every rupee you deposit with us represents hard-earned labor and future dreams. That is why our board and management execute the strictest risk policies to safeguard your funds.",
    chairmanPara2: "Our continuous Class 'A' Auditing status stands as testament to our compliance. As we step into the digital banking era, we are modernizing our services, providing real-time SMS alerts, instant online transfers, and merchant support services, without losing the warm relationship-driven service that defines our co-operative.",
    inCooperation: "In Co-operation,",
    chairmanPost: "Chairman, Babasaheb Kavad Patsanstha",
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
    chairmanImageLabel: "संस्थेचे अध्यक्ष",
    chairmanPara1: "प्रिय सभासद व हितचिंतकांनो,\n१९९८ पासून बाबासाहेब कवाद पतसंस्था विश्वास, सुरक्षितता आणि पारदर्शकतेच्या तत्त्वांवर कार्यरत आहे. आम्हाला माहित आहे की आपण आमच्याकडे जमा केलेला प्रत्येक रुपया हा आपल्या कष्टाचा आणि भविष्यातील स्वप्नांचा आहे. म्हणूनच तुमचे पैसे सुरक्षित ठेवण्यासाठी आमचे मंडळ आणि व्यवस्थापन अत्यंत कडक जोखीम धोरणे राबवते.",
    chairmanPara2: "आमचा सातत्यपूर्ण 'वर्ग अ' लेखापरीक्षण दर्जा आमच्या नियमांच्या पालनाची साक्ष देतो. आपण डिजिटल बँकिंगच्या युगात पाऊल टाकत असताना, आमच्या सहकारी संस्थेचे वैशिष्ट्य असणारी जिव्हाळ्याची नातेसंबंध-आधारित सेवा न गमावता, आम्ही रिअल-टाइम एसएमएस अलर्ट, इन्स्टंट ऑनलाईन ट्रान्सफर आणि व्यापारी सहाय्य सेवा प्रदान करून आमच्या सेवा आधुनिक करत आहोत.",
    inCooperation: "सहकार्याबद्दल धन्यवाद,",
    chairmanPost: "अध्यक्ष, बाबासाहेब कवाद पतसंस्था",
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

  const [dynamicDirectors, setDynamicDirectors] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const res = await fetch("/api/public/board-members");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json.map((m: any) => ({
              id: m.id,
              name: m.name,
              position: isMr ? m.designationMr : m.designationEn,
              image: m.imageUrl,
            }));
            setDynamicDirectors(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading board members:", err);
      }
    };
    fetchDirectors();
  }, [isMr]);

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

  const directorsList = dynamicDirectors.length > 0 ? dynamicDirectors : directorsData;

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
            {isMr ? "संचालक मंडळ" : "Board of Directors"}
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${isDark ? "text-text-muted" : "text-[#AD002E]/70"
            }`}>
            {t.subtitle}
          </p>
        </div>
      </section>


      {/* 4. Board of Directors */}
      <section id="directors" className="py-20 px-4 max-w-[1536px] mx-auto space-y-12">
        <div className="text-center space-y-3" data-aos="fade-up">
          <h2 className={`text-3xl sm:text-4xl font-bold transition-colors ${"text-text-main"}`}>
            {isMr ? "संचालक मंडळ" : "Board of Directors"}
          </h2>
          <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {directorsList.map((director, idx) => (
            <div 
              key={director.id} 
              data-aos="fade-up" 
              data-aos-delay={(idx % 5) * 50}
              className="glass-card rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-md border border-[#AD002E]/20/50 flex flex-col"
            >
              <div className="aspect-[3/4] relative w-full bg-gradient-to-b from-[#AD002E]/5 to-[#AD002E]/10 dark:from-[#AD002E]/10 dark:to-[#AD002E]/20 overflow-hidden">
                {/* Fallback avatar icon if image fails or isn't loaded */}
                <div className="absolute inset-0 flex items-center justify-center text-[#AD002E]/20">
                  <TeamOutlined className="text-6xl" />
                </div>
                <Image
                  src={director.image}
                  alt={director.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105 z-10 relative"
                />
              </div>
              <div className="p-4 text-center border-t border-[#AD002E]/20/50 bg-white transition-colors flex-grow flex flex-col justify-center">
                <h4 className={`text-[13px] sm:text-sm font-bold mb-1 transition-colors ${"text-text-main"}`}>{director.name}</h4>
                <p className="text-xs font-semibold text-[#AD002E]">{director.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



    </div>
  );
}

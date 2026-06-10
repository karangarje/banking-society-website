"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import { useTheme } from "@/components/theme/ThemeContext";
import { useLanguage } from "@/components/theme/LanguageContext";

interface GalleryItem {
  id: number;
  title: string;
  titleMr: string;
  category: "agm" | "social" | "inauguration";
  image: string;
  date: string;
  description: string;
  descriptionMr: string;
}

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark } = useTheme();
  const { locale } = useLanguage();
  const isMr = locale === "mr";

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Annual General Body Meeting 2024-25",
      titleMr: "वार्षिक सर्वसाधारण सभा २०२४-२५",
      category: "agm",
      image: "/images/image-3.png",
      date: "Sep 15, 2024",
      description: "Members and Directors aligning on society financial growth guidelines during the AGM in Pune.",
      descriptionMr: "पुण्यात आयोजित वार्षिक सर्वसाधारण सभेमध्ये सदस्य व संचालकांनी संस्थेच्या आर्थिक विकासावर चर्चा केली.",
    },
    {
      id: 2,
      title: "Community Blood Donation Camp",
      titleMr: "रक्तदान शिबिर",
      category: "social",
      image: "/images/gallery_donation.png",
      date: "Nov 02, 2024",
      description: "Volunteers and medical staff organizing a blood drive on the founder's birth anniversary.",
      descriptionMr: "संस्थापकांच्या जयंतीनिमित्त स्वयंसेवक आणि वैद्यकीय कर्मचाऱ्यांनी रक्तदान शिबिराचे आयोजन केले.",
    },
    {
      id: 3,
      title: "Village Afforestation Tree Plantation",
      titleMr: "वृक्षारोपण अभियान",
      category: "social",
      image: "/images/gallery_plantation.png",
      date: "Jul 18, 2024",
      description: "Co-operative youth volunteers planting over 1,000 tree saplings in Nighoj village surroundings.",
      descriptionMr: "सहकारी तरुण स्वयंसेवकांनी निघोज गावच्या परिसरात १,००० हून अधिक झाडांची रोपे लावली.",
    },
    {
      id: 4,
      title: "Inauguration of Thane West Branch",
      titleMr: "ठाणे पश्चिम शाखा उद्घाटन",
      category: "inauguration",
      image: "/images/image8.jpeg",
      date: "Jan 10, 2024",
      description: "Opening of our 12th branch at Thane West to serve metropolitan merchant portfolios.",
      descriptionMr: "महानगरीय व्यापारी सेवांसाठी ठाणे पश्चिम येथे आमच्या १२ व्या शाखेचे उद्घाटन करण्यात आले.",
    },
    {
      id: 5,
      title: "Head Office Central Conference Meeting",
      titleMr: "मुख्य कार्यालय केंद्रीय आढावा बैठक",
      category: "inauguration",
      image: "/images/photo-10.jpeg",
      date: "May 22, 2024",
      description: "Review meeting of branch managers discussing core digital banking installations.",
      descriptionMr: "मुख्य डिजिटल बँकिंग सेवांच्या स्थापनेवर चर्चा करण्यासाठी शाखा व्यवस्थापकांची आढावा बैठक.",
    },
    {
      id: 6,
      title: "Technology Summit & Digital Launch",
      titleMr: "तंत्रज्ञान परिषद व डिजिटल सेवा प्रारंभ",
      category: "agm",
      image: "/images/photo-2.jpeg",
      date: "Aug 05, 2024",
      description: "Rollout event introducing mobile application UPI integration for local cooperative businesses.",
      descriptionMr: "स्थानिक सहकारी व्यवसायांसाठी मोबाईल ॲप्लिकेशन युपीआय (UPI) एकत्रीकरण सुरू करण्याचा कार्यक्रम.",
    },
    {
      id: 7,
      title: "Community Cycling & Awareness Event",
      titleMr: "सायकल जनजागृती व सामाजिक सहभाग कार्यक्रम",
      category: "social",
      image: "/images/photo-7.jpeg",
      date: "2025",
      description: "Cycling awareness rally and community participation event organized by the society members.",
      descriptionMr: "संस्थेच्या सदस्यांद्वारे आयोजित सायकल जनजागृती रॅली आणि सामाजिक सहभाग कार्यक्रम.",
    },
    {
      id: 8,
      title: "Society Group Celebration & Meet",
      titleMr: "सदस्य मेळावा व समाज स्नेहसंमेलन",
      category: "social",
      image: "/images/photo-8.jpeg",
      date: "2025",
      description: "Group gathering and celebration with members, directors, and community participants.",
      descriptionMr: "सदस्य, संचालक आणि सामाजिक सहभाग घेणाऱ्यांसोबत एकत्रित सोहळा आणि स्नेहसंमेलन.",
    },
    {
      id: 9,
      title: "Community Felicitation Ceremony",
      titleMr: "समाज गौरव व सत्कार समारंभ",
      category: "social",
      image: "/images/photo-6.jpeg",
      date: "2025",
      description: "Honouring members and dignitaries during a cooperative society felicitation program.",
      descriptionMr: "सहकारी संस्था सत्कार समारंभादरम्यान सदस्य आणि मान्यवरांचा गौरव.",
    },
    {
      id: 10,
      title: "Annual Conference & Public Address",
      titleMr: "वार्षिक परिषद व मार्गदर्शन कार्यक्रम",
      category: "agm",
      image: "/images/photo-5.jpeg",
      date: "2025",
      description: "Leadership addressing members during the annual cooperative society conference.",
      descriptionMr: "वार्षिक सहकारी संस्था परिषदेदरम्यान सदस्यांना मार्गदर्शन करताना नेतृत्व.",
    },
  ];

  const filters = ["All", "agm", "social", "inauguration"];

  const filteredItems = activeFilter === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const handlePhotoClick = (photo: GalleryItem) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">

      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            {isMr ? "माध्यम संग्रह" : "Media Files"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight transition-colors duration-300">
            {isMr ? "फोटो गॅलरी" : "Photo Gallery"}
          </h1>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {isMr
              ? "आमच्या वार्षिक सभा, शाखा विस्तार आणि सामाजिक उपक्रमांचे छायाचित्र संग्रह."
              : "A visual timeline showcasing our annual meetings, branch expansions, and social charity programs."}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-5 py-2 rounded-lg font-black uppercase tracking-wider transition-all border ${activeFilter === filter
                ? "bg-[#7B1010] text-white border-[#9c1a1a] shadow-lg shadow-[#7B1010]/20"
                : isDark
                  ? "bg-[#12121A] text-gray-400 border-base-border hover:border-white hover:text-white"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#7B1010] hover:text-[#7B1010] shadow-sm"
                }`}
            >
              {filter === "agm"
                ? isMr
                  ? "सभा व परिषद"
                  : "AGMs & Summits"
                : filter === "social"
                ? isMr
                  ? "सामाजिक कार्य"
                  : "Social Work"
                : filter === "inauguration"
                ? isMr
                  ? "शाखा उद्घाटन"
                  : "Branch Openings"
                : isMr
                ? "सर्व फोटो"
                : "All Photos"}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(photo)}
              data-aos="zoom-in"
              className="group cursor-pointer rounded-xl overflow-hidden bg-base-card border border-base-border hover:border-[#F36B21] transition-all duration-300 relative shadow-sm hover:shadow"
            >

              {/* Image Frame */}
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                  src={photo.image}
                  alt={isMr ? photo.titleMr : photo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, 33vw"
                />

                {/* Overlay Hover Icon */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#7B1010] border border-[#F36B21] flex items-center justify-center text-white text-lg shadow-lg">
                    <EyeOutlined />
                  </div>
                </div>

                {/* Floating Date Badge */}
                <span className="absolute top-3 left-3 bg-base-bg/85 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-text-main font-bold border border-base-border transition-colors duration-300">
                  {photo.date}
                </span>
              </div>

              {/* Photo Title Footer */}
              <div className="p-4 space-y-1.5">
                <span className="text-[9px] text-[#F36B21] font-black uppercase tracking-wider bg-[rgba(243,107,33,0.1)] px-2 py-0.5 rounded">
                  {photo.category === "agm"
                    ? isMr
                      ? "सभा"
                      : "AGM"
                    : photo.category === "social"
                    ? isMr
                      ? "सामाजिक"
                      : "Social"
                    : isMr
                    ? "उद्घाटन"
                    : "Inauguration"}
                </span>
                <h3 className="text-sm font-bold text-text-main group-hover:text-[#F36B21] transition-colors mt-2 line-clamp-1">
                  {isMr ? photo.titleMr : photo.title}
                </h3>
                <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed transition-colors">
                  {isMr ? photo.descriptionMr : photo.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={720}
        styles={{
          mask: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          body: {
            padding: 0,
          },
        }}
        style={{
          backgroundColor: isDark ? "#12121A" : "#FFFFFF",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {selectedPhoto && (
          <div className="flex flex-col">

            {/* Enlarged Image */}
            <div className="relative w-full h-[320px] sm:h-[450px]">
              <Image
                src={selectedPhoto.image}
                alt={isMr ? selectedPhoto.titleMr : selectedPhoto.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Description Info overlay */}
            <div className={`p-6 space-y-3 transition-colors ${isDark ? "bg-[#12121A]" : "bg-white"}`}>
              <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${isDark ? "border-[rgba(255,255,255,0.06)]" : "border-[rgba(0,0,0,0.06)]"
                }`}>
                <h3 className={`text-base sm:text-lg font-black ${isDark ? "text-white" : "text-[#333333]"}`}>
                  {isMr ? selectedPhoto.titleMr : selectedPhoto.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="bg-[#7B1010] text-white border border-[#9c1a1a] px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-widest">
                    {selectedPhoto.category === "agm"
                      ? isMr
                        ? "सभा"
                        : "AGM"
                      : selectedPhoto.category === "social"
                      ? isMr
                        ? "सामाजिक"
                        : "Social"
                      : isMr
                      ? "उद्घाटन"
                      : "Inauguration"}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarOutlined className="text-[#F36B21]" />
                    {selectedPhoto.date}
                  </span>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-medium transition-colors ${isDark ? "text-gray-300" : "text-gray-700"
                }`}>
                {isMr ? selectedPhoto.descriptionMr : selectedPhoto.description}
              </p>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}

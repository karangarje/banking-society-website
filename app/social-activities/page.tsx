"use client";

import React from "react";
import Image from "next/image";
import { 
  HeartOutlined, 
  GlobalOutlined, 
  BookOutlined, 
  CompassOutlined,
  CalendarOutlined
} from "@ant-design/icons";

interface SocialActivity {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  date: string;
  location: string;
  description: string;
  impact: string;
  image: string;
}

export default function SocialActivities() {
  const activities: SocialActivity[] = [
    {
      id: 1,
      title: "Village Afforestation Tree Plantation",
      category: "Environmental",
      icon: <GlobalOutlined className="text-xl text-[#52c41a]" />,
      date: "Monsoon Season (Annual)",
      location: "Nighoj, Savedi, Savedi Sub-district",
      description: "Driving environmental protection through collective action. Our members, employees, and local students plant thousands of native neem, banyan, and peepal trees to support soil water table retention.",
      impact: "Over 15,000+ trees planted and sustained with 90%+ survival rate.",
      image: "/images/gallery_plantation.png",
    },
    {
      id: 2,
      title: "Community Blood Donation & Health Camps",
      category: "Healthcare Support",
      icon: <HeartOutlined className="text-xl text-red-500" />,
      date: "Semi-Annual Drives",
      location: "Pune Main & Ahmednagar Branches",
      description: "Partnering with municipal blood centers to host donation drives that support local hospitals. We also organize complimentary physical health checkups, diabetic screenings, and eye clinics.",
      impact: "More than 2,500 units of blood accumulated for public emergencies.",
      image: "/images/gallery_donation.png",
    },
    {
      id: 3,
      title: "Student Education Scholarships & Books",
      category: "Education",
      icon: <BookOutlined className="text-xl text-[#F36B21]" />,
      date: "Every June (Academic Start)",
      location: "All 12 Branches Regionwide",
      description: "Distributing school uniforms, reference books, and tuition scholarships to children of farmers and lower-income families who display high academic achievement in local schools.",
      impact: "Aided 5,000+ school students to continue higher secondary education.",
      image: "/images/gallery_agm.png",
    },
    {
      id: 4,
      title: "Drought Relief Water Schemes",
      category: "Rural Relief",
      icon: <CompassOutlined className="text-xl text-[#1890ff]" />,
      date: "Summer Season (Dry periods)",
      location: "Ahmednagar & Rural Satara regions",
      description: "Providing clean drinking water tankers to drought-affected rural villages. We also fund minor checks in streams to construct check-dams assisting rain water harvesting.",
      impact: "Provided relief tanks to 45 villages during major water scarcity months.",
      image: "/images/hero_slide_1.png",
    },
  ];

  return (
    <div className="w-full bg-[#0B0B0F]">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#12121A] to-[#0B0B0F] border-b border-[rgba(255,255,255,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            Giving Back
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Social Activities (CSR)
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Cooperative banks do not just grow deposits; we grow communities. Read about our environmental and welfare initiatives.
          </p>
        </div>
      </section>

      {/* Activities Timeline Block */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {activities.map((act, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={act.id}
              data-aos={isEven ? "fade-right" : "fade-left"}
              className={`flex flex-col lg:flex-row items-center gap-10 p-6 sm:p-8 rounded-2xl glass-panel relative ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              
              {/* Left Side: Photo Frame */}
              <div className="relative w-full lg:w-1/2 h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-neutral-900 shrink-0">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover hover:scale-102 transition-transform duration-500"
                  sizes="(max-w-1024px) 100vw, 50vw"
                />
                
                {/* Visual Accent Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F]/85 via-transparent to-transparent" />
                
                {/* Category Floater */}
                <span className="absolute top-4 left-4 bg-[#0B0B0F]/90 backdrop-blur-sm px-3 py-1 rounded text-xs text-white border border-[rgba(255,255,255,0.08)] flex items-center gap-1.5 font-bold">
                  {act.icon}
                  <span>{act.category}</span>
                </span>
              </div>

              {/* Right Side: Narrative Details */}
              <div className="space-y-4 flex-grow">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold border-b border-[rgba(255,255,255,0.06)] pb-3">
                  <span className="flex items-center gap-1">
                    <CalendarOutlined className="text-[#F36B21]" />
                    {act.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CompassOutlined className="text-[#F36B21]" />
                    {act.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white hover:text-[#F36B21] transition-colors leading-tight">
                  {act.title}
                </h3>

                {/* Body Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {act.description}
                </p>

                {/* Impact Stat */}
                <div className="p-4 rounded-lg bg-[rgba(243,107,33,0.06)] border-l-4 border-[#F36B21] text-xs space-y-1">
                  <p className="text-gray-400 uppercase font-black tracking-widest text-[9px]">Documented Impact</p>
                  <p className="text-white font-extrabold leading-normal">{act.impact}</p>
                </div>

              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}

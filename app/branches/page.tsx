"use client";

import React, { useState, useEffect } from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CompassOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { branchesData } from "@/data/branches";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function Branches() {
  const { locale } = useLanguage();
  const isMr = locale === "mr";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(isMr ? "सर्व" : "All");

  const cities = isMr
    ? ["सर्व", ...Array.from(new Set(branchesData.map((b) => b.cityMr)))]
    : ["All", ...Array.from(new Set(branchesData.map((b) => b.city)))];

  // Reset city filter when language changes
  useEffect(() => {
    setSelectedCity(isMr ? "सर्व" : "All");
  }, [isMr]);

  const filteredBranches = branchesData.filter((branch) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      branch.name.toLowerCase().includes(term) ||
      branch.nameMr.includes(searchTerm) ||
      branch.address.toLowerCase().includes(term) ||
      branch.addressMr.includes(searchTerm) ||
      branch.manager.toLowerCase().includes(term);

    const matchesCity =
      (isMr ? selectedCity === "सर्व" : selectedCity === "All") ||
      (isMr ? branch.cityMr === selectedCity : branch.city === selectedCity);

    return matchesSearch && matchesCity;
  });

  return (
    <div className="w-full bg-base-bg transition-colors duration-300">

      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-base-card to-base-bg border-b border-base-border/50 overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-6 relative text-center space-y-4">
          <span className="text-white text-xs font-black uppercase tracking-widest bg-[#8B0000] border border-[#8B0000] px-3 py-1 rounded">
            {isMr ? "आमचे नेटवर्क" : "Our Network"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#8B0000] tracking-tight transition-colors duration-300">
            {isMr ? "शाखा निर्देशिका" : "Branch Directory"}
          </h1>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {isMr
              ? "विभागातील सर्व १२ शाखांचे पत्ते, संपर्क, कार्यालयीन वेळा आणि नकाशे येथे पहा."
              : "Find addresses, contact desks, operating hours, and maps for all 12 operational branches across the region."}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 max-w-[1400px] mx-auto px-6">
        <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">

          {/* Search Input */}
          <div className="relative w-full md:w-96 flex items-center">
            <SearchOutlined className="absolute left-3.5 text-text-muted text-base transition-colors" />
            <input
              type="text"
              placeholder={isMr ? "शाखेचे नाव, व्यवस्थापक किंवा पत्ता शोधा..." : "Search branch name, manager, or address..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-base-bg border border-base-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-main focus:outline-none focus:border-[#F36B21] transition-all"
            />
          </div>

          {/* City Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-text-muted uppercase mr-2 shrink-0 transition-colors">
              {isMr ? "शहरानुसार:" : "Filter by City:"}
            </span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold uppercase transition-all ${
                  selectedCity === city
                    ? "bg-[#7B1010] text-white border border-[#9c1a1a]"
                    : "bg-base-card text-text-muted border border-base-border hover:border-text-main hover:text-text-main"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Directory Grid */}
      <section className="pb-20 max-w-[1400px] mx-auto px-6">
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch, index) => (
              <div
                key={branch.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
                className="group relative rounded-2xl p-6 glass-card border border-base-border hover:border-[#F36B21] flex flex-col justify-between transition-all duration-300"
              >
                {/* Branch Head Accent */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-text-main group-hover:text-[#F36B21] transition-colors leading-tight">
                      {isMr ? branch.nameMr : branch.name}
                    </h3>
                    <span className="text-[10px] text-[#F36B21] font-bold uppercase tracking-wider">
                      {isMr ? branch.cityMr : branch.city}
                    </span>
                  </div>
                  {branch.isHeadOffice && (
                    <span className="text-[9px] bg-[#7B1010] text-white border border-[#9c1a1a] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                      {isMr ? "मुख्य कार्यालय" : "H.O."}
                    </span>
                  )}
                </div>

                {/* Details list */}
                <div className="space-y-3.5 text-xs text-text-muted border-t border-base-border/50 pt-4 flex-grow transition-colors duration-300">
                  <div className="flex gap-2 items-start">
                    <EnvironmentOutlined className="text-[#F36B21] mt-0.5 shrink-0" />
                    <span>{isMr ? branch.addressMr : branch.address}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <UserOutlined className="text-[#F36B21] shrink-0" />
                    <span>{isMr ? "व्यवस्थापक" : "Manager"}: <strong className="text-text-main transition-colors">{branch.manager}</strong></span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <PhoneOutlined className="text-[#F36B21] shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-[#7B1010] transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MailOutlined className="text-[#F36B21] shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-[#7B1010] transition-colors">
                      {branch.email}
                    </a>
                  </div>
                  <div className="flex gap-2 items-start">
                    <ClockCircleOutlined className="text-[#F36B21] mt-0.5 shrink-0" />
                    <span className="leading-relaxed text-[11px]">{isMr ? branch.hoursMr : branch.hours}</span>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-6 mt-6 border-t border-base-border/50 transition-colors duration-300">
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-base-card hover:bg-[#7B1010] border border-base-border hover:border-[#F36B21] text-text-main hover:text-white py-2 rounded text-xs font-black uppercase tracking-wider transition-all duration-300"
                  >
                    <CompassOutlined />
                    <span>{isMr ? "दिशा मिळवा" : "Get Directions"}</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-card border border-base-border rounded-2xl transition-all duration-300">
            <p className="text-text-muted font-medium transition-colors">
              {isMr ? "तुमच्या शोध फिल्टरशी जुळणारी कोणतीही शाखा सापडली नाही." : "No branches found matching your search filters."}
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCity(isMr ? "सर्व" : "All"); }}
              className="mt-4 text-xs font-bold text-[#F36B21] hover:underline uppercase"
            >
              {isMr ? "फिल्टर रीसेट करा" : "Reset Filters"}
            </button>
          </div>
        )}
      </section>

    </div>
  );
}

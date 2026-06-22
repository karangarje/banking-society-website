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
  const [dynamicBranches, setDynamicBranches] = useState<any[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await fetch("/api/public/branches");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json.map((b: any) => {
              const isNighoj = b.name.includes("निघोज") || b.name.toLowerCase().includes("nighoj");
              return {
                id: b.id,
                name: b.name,
                nameMr: b.name,
                city: isNighoj ? "Nighoj" : "Other",
                cityMr: isNighoj ? "निघोज" : "इतर",
                address: b.address,
                addressMr: b.address,
                phone: b.contact,
                email: "info@kavadbank.com",
                manager: b.managerName,
                hours: "10:00 AM - 5:00 PM",
                hoursMr: "सकाळी १०:०० ते संध्याकाळी ०५:००",
                mapLink: b.googleMapUrl || "#",
                isHeadOffice: b.name.toLowerCase().includes("head") || b.name.toLowerCase().includes("main") || b.name.includes("मुख्य")
              };
            });
            setDynamicBranches(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic branches:", err);
      }
    };
    fetchBranches();
  }, []);

  const branchesList = dynamicBranches.length > 0 ? dynamicBranches : branchesData;

  const cities = isMr
    ? ["सर्व", ...Array.from(new Set(branchesList.map((b) => b.cityMr)))]
    : ["All", ...Array.from(new Set(branchesList.map((b) => b.city)))];

  // Reset city filter when language changes
  useEffect(() => {
    setSelectedCity(isMr ? "सर्व" : "All");
  }, [isMr]);

  const filteredBranches = branchesList.filter((branch) => {
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block mb-2 ">
            {isMr ? "आमचे नेटवर्क" : "Our Network"}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-text-main tracking-tight transition-colors duration-300">
            {isMr ? "शाखा निर्देशिका" : "Branch Directory"}
          </h1>
          <p className="text-base text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {isMr
              ? "विभागातील सर्व १२ शाखांचे पत्ते, संपर्क, कार्यालयीन वेळा आणि नकाशे येथे पहा."
              : "Find addresses, contact desks, operating hours, and maps for all 12 operational branches across the region."}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">

          {/* Search Input */}
          <div className="relative w-full md:w-96 flex items-center">
            <SearchOutlined className="absolute left-3.5 text-text-muted text-lg transition-colors" />
            <input
              type="text"
              placeholder={isMr ? "शाखेचे नाव, व्यवस्थापक किंवा पत्ता शोधा..." : "Search branch name, manager, or address..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-base-bg border border-base-border rounded-lg pl-10 pr-4 py-2 text-base text-text-main focus:outline-none focus:border-[#AD002E] transition-all"
            />
          </div>

          {/* City Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-bold text-text-muted uppercase mr-2 shrink-0 transition-colors">
              {isMr ? "शहरानुसार:" : "Filter by City:"}
            </span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-sm px-3.5 py-1.5 rounded-full font-bold uppercase transition-all ${
                  selectedCity === city
                    ? "bg-[#AD002E] text-white border border-[#850024]"
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
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBranches.map((branch, index) => (
              <div
                key={branch.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
                className="group relative rounded-2xl p-6 glass-card border border-base-border hover:border-[#AD002E] flex flex-col justify-between transition-all duration-300"
              >
                {/* Branch Head Accent */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-text-main group-hover:text-[#AD002E] transition-colors leading-tight">
                      {isMr ? branch.nameMr : branch.name}
                    </h3>
                    <span className="text-sm text-[#AD002E] font-bold uppercase tracking-wider">
                      {isMr ? branch.cityMr : branch.city}
                    </span>
                  </div>
                  {branch.isHeadOffice && (
                    <span className="text-xs bg-[#AD002E] text-white border border-[#850024] px-2 py-0.5 rounded font-black uppercase tracking-wider">
                      {isMr ? "मुख्य कार्यालय" : "H.O."}
                    </span>
                  )}
                </div>

                {/* Details list */}
                <div className="space-y-3.5 text-sm text-text-muted border-t border-base-border/50 pt-4 flex-grow transition-colors duration-300">
                  <div className="flex gap-2 items-start">
                    <EnvironmentOutlined className="text-[#AD002E] mt-0.5 shrink-0" />
                    <span>{isMr ? branch.addressMr : branch.address}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <UserOutlined className="text-[#AD002E] shrink-0" />
                    <span>{isMr ? "व्यवस्थापक" : "Manager"}: <strong className="text-text-main transition-colors">{branch.manager}</strong></span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <PhoneOutlined className="text-[#AD002E] shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-[#AD002E] transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MailOutlined className="text-[#AD002E] shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-[#AD002E] transition-colors">
                      {branch.email}
                    </a>
                  </div>
                  <div className="flex gap-2 items-start">
                    <ClockCircleOutlined className="text-[#AD002E] mt-0.5 shrink-0" />
                    <span className="leading-relaxed text-sm">{isMr ? branch.hoursMr : branch.hours}</span>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-6 mt-6 border-t border-base-border/50 transition-colors duration-300">
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-base-card hover:bg-[#AD002E] border border-base-border hover:border-[#AD002E] text-text-main hover:text-white py-2 rounded text-sm font-black uppercase tracking-wider transition-all duration-300"
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
              className="mt-4 text-sm font-bold text-[#AD002E] hover:underline uppercase"
            >
              {isMr ? "फिल्टर रीसेट करा" : "Reset Filters"}
            </button>
          </div>
        )}
      </section>

    </div>
  );
}

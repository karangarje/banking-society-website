"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

export default function HeroSlider() {
  const { t } = useLanguage();

  const slides = [
    {
      image: "/images/hero_slide_1.png",
      titleKey: "hero.slide1_title",
      descKey: "hero.slide1_desc",
    },
    {
      image: "/images/hero_slide_2.png",
      titleKey: "hero.slide2_title",
      descKey: "hero.slide2_desc",
    },
    {
      image: "/images/hero_slide_3.png",
      titleKey: "hero.slide3_title",
      descKey: "hero.slide3_desc",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <section className="relative w-full overflow-hidden bg-base-bg transition-colors duration-300">
      <Slider {...settings} className="hero-slider-slick">
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full group">
            
            {/* Slide Image Wrapper with Adaptive Height */}
            <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[600px]">
              <Image
                src={slide.image}
                alt={t(slide.titleKey)}
                fill
                priority={idx === 0}
                className="object-cover object-center brightness-50 transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-105"
                sizes="100vw"
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-bg via-transparent to-[rgba(11,11,15,0.4)]" />
            </div>

            {/* Slider Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full text-left">
                <div className="max-w-2xl space-y-4 md:space-y-6">
                  {/* Subtle Top Badge */}
                  <span 
                    data-aos="fade-down"
                    className="inline-block bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded text-[10px] md:text-xs font-black text-[#F36B21] uppercase tracking-widest"
                  >
                    {t("hero.badge")}
                  </span>
                  
                  {/* Title */}
                  <h2 
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md"
                  >
                    {t(slide.titleKey)}
                  </h2>

                  {/* Subtext */}
                  <p 
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed drop-shadow"
                  >
                    {t(slide.descKey)}
                  </p>

                  {/* Buttons */}
                  <div 
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <Link
                      href="/services"
                      className="bg-[#7B1010] hover:bg-[#9c1a1a] border border-[#9c1a1a] hover:border-[#F36B21] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all duration-300 shadow-lg glow-maroon"
                    >
                      <span>{t("hero.btn_schemes")}</span>
                      <ArrowRightOutlined />
                    </Link>
                    <Link
                      href="/about"
                      className="bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
                    >
                      {t("hero.btn_learn")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </Slider>

      {/* Quick Info Bar for Trust Elements */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-base-bg to-transparent py-4 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-xs text-text-muted transition-colors duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{t("hero.trust1")}</span>
          </div>
          <div>
            <span>{t("hero.trust2")}</span>
          </div>
          <div>
            <span>{t("hero.trust3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/theme/LanguageContext";

interface BannerSlide {
  id?: string;
  image: string;
  title: string;
  subtitle: string;
  linkUrl: string | null;
}

export default function HeroSlider() {
  const { locale, t } = useLanguage();
  const isMr = locale === "mr";
  const [slides, setSlides] = useState<BannerSlide[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/public/home-banners");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json.map((b: any) => ({
              id: b.id,
              image: b.imageUrl,
              title: isMr ? b.titleMr : b.titleEn,
              subtitle: isMr ? b.subtitleMr : b.subtitleEn,
              linkUrl: b.linkUrl,
            }));
            setSlides(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading home banners:", err);
      }
    };
    fetchBanners();
  }, [isMr]);

  const defaultSlides: BannerSlide[] = [
    {
      image: "/images/photo-8.jpeg",
      title: isMr ? "बाबासाहेब कावाड पतसंस्था" : "Babasaheb Kavad Co-operative",
      subtitle: isMr ? "आपला विश्वास, आमची परंपरा" : "Your Trust, Our Legacy - Serving Nighoj & Beyond",
      linkUrl: "/about",
    },
    {
      image: "/images/hero_slide_2.png",
      title: isMr ? "सुरक्षित आणि आकर्षक ठेव योजना" : "Secure & Lucrative Deposit Schemes",
      subtitle: isMr ? "तुमच्या ठेवींवर आकर्षक व्याजदर मिळवा" : "Earn attractive interest rates up to 9.5% p.a.",
      linkUrl: "/about/interest",
    },
    {
      image: "/images/hero_slide_3.png",
      title: isMr ? "जलद आणि सुलभ सुवर्ण कर्ज" : "Instant Gold & Business Loans",
      subtitle: isMr ? "किमान कागदपत्रे आणि त्वरित मंजुरी" : "Avail hassle-free credits with competitive rate structures.",
      linkUrl: "/services",
    },
  ];

  const bannerSlides = slides.length > 0 ? slides : defaultSlides;

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
    dotsClass: "slick-dots custom-dots-slider",
  };

  return (
    <section className="relative w-full overflow-hidden bg-base-bg transition-colors duration-300">
      <Slider {...settings} className="hero-slider-slick">
        {bannerSlides.map((slide, idx) => (
          <div key={idx} className="relative w-full group">
            {/* Slide Image Wrapper */}
            <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[700px] bg-black">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center transition-transform duration-[6500ms] ease-out scale-100 group-hover:scale-105 opacity-60"
                sizes="100vw"
              />

              {/* Text Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full text-left text-white space-y-4">
                  <span className="inline-block px-3 py-1 bg-[#B3003C] text-xs font-bold uppercase tracking-widest rounded shadow-sm">
                    {isMr ? "कवाड नागरी सहकारी पतसंस्था" : "Kavad Co-operative Society"}
                  </span>
                  
                  <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none text-white max-w-4xl">
                    {slide.title}
                  </h2>
                  
                  <p className="text-base sm:text-xl lg:text-2xl text-gray-200 max-w-2xl font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {slide.linkUrl && (
                    <div className="pt-4">
                      <Link
                        href={slide.linkUrl}
                        className="inline-block bg-[#B3003C] hover:bg-[#850024] border border-[#B3003C] hover:border-[#850024] text-white px-6 py-3 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#B3003C]/20 hover:-translate-y-0.5"
                      >
                        {isMr ? "अधिक जाणून घ्या" : "Learn More"}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

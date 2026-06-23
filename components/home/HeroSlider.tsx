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
          } else {
            setSlides([]);
          }
        } else {
          setSlides([]);
        }
      } catch (err) {
        console.error("Error loading home banners:", err);
        setSlides([]);
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
    <section className="relative w-full overflow-hidden bg-white transition-colors duration-300">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Section: Static Image */}
        <div className="w-full lg:w-1/3 relative h-[350px] md:h-[450px] lg:h-[700px] border-b-4 lg:border-b-0 lg:border-r-4 border-gray-100 bg-white overflow-hidden">
          <Image
            src="/images/main.png"
            alt="Feature image"
            fill
            className="object-contain object-center p-2 lg:p-4"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
        </div>

        {/* Right Section: Slider */}
        <div className="w-full lg:w-2/3 relative">
          <Slider {...settings} className="hero-slider-slick">
            {bannerSlides.map((slide, idx) => (
              <div key={idx} className="relative w-full group focus:outline-none">
                {/* Slide Image Wrapper */}
                <div className="relative w-full h-[420px] md:h-[550px] lg:h-[700px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center transition-transform duration-[6500ms] ease-out scale-100 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  {/* Subtle dark overlay for better aesthetics */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

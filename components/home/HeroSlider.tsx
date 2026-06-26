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

// Dynamic safe image component with error fallback
function SafeImage({ src, alt, fill, priority, className, sizes, fallbackSrc = "/images/main.png" }: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

export default function HeroSlider() {
  const { locale, t } = useLanguage();
  const isMr = locale === "mr";
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [isMr]);

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
        <div className="w-full lg:w-1/3 relative h-[350px] md:h-[450px] lg:h-[700px] border-b-4 lg:border-b-0 lg:border-r-4 border-gray-100 bg-white overflow-hidden flex items-center justify-center">
          <SafeImage
            src="/images/main.png"
            alt="Feature image"
            fill
            className="object-contain object-center p-2 lg:p-4"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
            fallbackSrc="/images/hero_slide_1.png"
          />
        </div>

        {/* Right Section: Slider / Fallback */}
        <div className="w-full lg:w-2/3 relative min-h-[420px] md:min-h-[550px] lg:min-h-[700px] bg-gray-50 flex">
          {loading ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#AD002E]"></div>
            </div>
          ) : slides.length > 0 ? (
            <div className="w-full relative">
              <Slider {...settings} className="hero-slider-slick h-full">
                {slides.map((slide, idx) => (
                  <div key={idx} className="relative w-full h-[420px] md:h-[550px] lg:h-[700px] group focus:outline-none">
                    {/* Slide Image */}
                    <div className="relative w-full h-full">
                      <SafeImage
                        src={slide.image}
                        alt={slide.title || "Home banner image"}
                        fill
                        priority={idx === 0}
                        className="object-cover object-center transition-transform duration-[6500ms] ease-out scale-100 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        fallbackSrc="/images/main.png"
                      />
                    </div>

                    {/* Conditional Overlay & Text */}
                    {(slide.title || slide.subtitle || slide.linkUrl) ? (
                      <>
                        {/* Dark overlay for readability */}
                        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-700" />
                        
                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 text-white z-10">
                          <div className="max-w-2xl space-y-4 md:space-y-6">
                            {slide.title && (
                              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight drop-shadow-md">
                                {slide.title}
                              </h2>
                            )}
                            {slide.subtitle && (
                              <p className="text-base md:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed drop-shadow-sm">
                                {slide.subtitle}
                              </p>
                            )}
                            {slide.linkUrl && (
                              <div className="pt-2 md:pt-4">
                                <Link
                                  href={slide.linkUrl}
                                  className="inline-block bg-[#AD002E] hover:bg-[#AD002E]/90 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full transition duration-300 shadow-lg transform hover:-translate-y-0.5"
                                >
                                  {isMr ? "अधिक जाणून घ्या" : "Learn More"}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* If everything is empty/null, only show a very subtle overlay */
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            /* Clean Fallback Branded Hero (No static slider images) */
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#AD002E]/10 via-white to-gray-50 p-8 text-center md:text-left">
              <div className="max-w-xl mx-auto space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#AD002E]/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#AD002E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl font-extrabold text-[#AD002E] tracking-tight">
                    {isMr ? "बाबासाहेब कावाड नागरी सहकारी पतसंस्था" : "Babasaheb Kavad Co-operative Society"}
                  </h2>
                  <p className="text-gray-500 text-sm md:text-lg">
                    {isMr ? "निघोज आणि परिसर - आपला विश्वास, आमची परंपरा" : "Your Trust, Our Legacy - Serving Nighoj & Beyond"}
                  </p>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {isMr 
                    ? "ठेव योजनांवर आकर्षक व्याजदरांचा लाभ घ्या. अधिक माहितीसाठी आमच्या योजना व कर्ज सेवा तपासा." 
                    : "Avail handsome interest rates up to 9.5% p.a. on your deposits. Check out our loan options & other financial schemes."}
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <Link href="/about" className="inline-block bg-[#AD002E] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#AD002E]/90 transition duration-300 shadow-md">
                    {isMr ? "आमच्याबद्दल वाचा" : "About Us"}
                  </Link>
                  <Link href="/services" className="inline-block border border-[#AD002E]/30 text-[#AD002E] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#AD002E]/5 transition duration-300">
                    {isMr ? "आमच्या सेवा" : "Our Services"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

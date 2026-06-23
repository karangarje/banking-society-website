"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  CloseOutlined, 
  LeftOutlined, 
  RightOutlined, 
  ZoomInOutlined 
} from "@ant-design/icons";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export default function Gallery() {
  const images: ImageItem[] = [
    {
      id: 0,
      src: "/images/history/awards/award-01.png",
      alt: "International Co-operative Conference 2025 Recognition",
      title: "Co-operative Conference Ceremony"
    },
    {
      id: 1,
      src: "/images/history/awards/award-02.png",
      alt: "Director Appointment Recognition Ceremony",
      title: "Leadership Felicitation Program"
    },
    {
      id: 2,
      src: "/images/history/awards/award-03.png",
      alt: "Federation Selection Honour Ceremony",
      title: "Board Selection Ceremony"
    }
  ];

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") {
        setActiveIdx(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1B6B] dark:text-white transition-colors">
            Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#AD002E]/70 max-w-xl mx-auto">
            Glimpses of memorable moments, award functions and felicitations.
          </p>
          <div className="w-16 h-1 bg-[#AD002E] mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div
              key={img.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onClick={() => setActiveIdx(idx)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-md border border-[#AD002E]/20 dark:border-[#AD002E]/20 cursor-pointer bg-white dark:bg-white"
            >
              {/* Overlay with zoom icon */}
              <div className="absolute inset-0 bg-[#1E1B6B]/40 opacity-0 group-hover:opacity-100 z-15 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-[#AD002E]/20 flex items-center justify-center text-white text-xl">
                  <ZoomInOutlined />
                </div>
              </div>
              
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-750 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Floating banner */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-10">
                <h4 className="text-sm font-bold truncate">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeIdx !== null && (
        <div className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center p-4 sm:p-10 no-print animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all z-50"
            aria-label="Close Lightbox"
          >
            <CloseOutlined />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-10 text-white/70 hover:text-white text-2xl w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all z-50"
            aria-label="Previous Image"
          >
            <LeftOutlined />
          </button>

          {/* Image Display Area */}
          <div className="relative w-full max-w-5xl h-full max-h-[70vh] sm:max-h-[80vh] flex flex-col justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src={images[activeIdx].src}
                alt={images[activeIdx].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Caption */}
            <div className="text-center mt-6 text-white space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37]">
                {images[activeIdx].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                {images[activeIdx].alt}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-10 text-white/70 hover:text-white text-2xl w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all z-50"
            aria-label="Next Image"
          >
            <RightOutlined />
          </button>
        </div>
      )}
    </section>
  );
}

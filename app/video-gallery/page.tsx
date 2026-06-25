"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { 
  VideoCameraOutlined, 
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SoundOutlined,
  PlaySquareOutlined
} from "@ant-design/icons";
import { useLanguage } from "@/components/theme/LanguageContext";

interface VideoItem {
  id: string | number;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  titleEn: string;
  titleMr: string;
  descriptionEn?: string | null;
  descriptionMr?: string | null;
  duration?: string | null;
  createdAt?: string | Date | null;
  isActive?: boolean;
  // mapped helpers for template compatibility
  key?: string;
  title?: string;
  description?: string;
  date?: string;
}

export default function VideoGallery() {
  const { locale, t } = useLanguage();
  const isMr = locale === "mr";
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [dynamicVideos, setDynamicVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/public/videos");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json.map((v: any) => {
              const displayTitle = isMr ? v.titleMr : v.titleEn;
              const displayDesc = isMr ? (v.descriptionMr || v.titleMr) : (v.descriptionEn || v.titleEn);
              return {
                id: v.id,
                videoUrl: v.videoUrl || v.youtubeUrl || null,
                thumbnailUrl: v.thumbnailUrl || null,
                titleEn: v.titleEn,
                titleMr: v.titleMr,
                descriptionEn: v.descriptionEn,
                descriptionMr: v.descriptionMr,
                duration: v.duration || (v.isFeatured ? "06:15" : "03:45"),
                createdAt: v.createdAt,
                // mapped helpers
                key: v.id,
                title: displayTitle,
                description: displayDesc,
                date: new Date(v.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
              };
            });
            setDynamicVideos(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading gallery videos:", err);
      }
    };
    fetchVideos();
  }, [isMr]);

  const getYouTubeEmbedUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return null;
  };

  const defaultVideoItems: VideoItem[] = [
    {
      id: 1,
      key: "founder",
      title: t("videoGallery.videos.founder.title"),
      titleEn: "Founder's Day Celebration Speeches",
      titleMr: "संस्थापक दिन सोहळा भाषणे",
      duration: "08:45",
      date: t("videoGallery.videos.founder.date"),
      description: t("videoGallery.videos.founder.description"),
      descriptionEn: "Keynote address, operational goals, and growth roadmap shared by our esteemed founder on society's anniversary.",
      descriptionMr: "संस्थेच्या वर्धापन दिनानिमित्त आमच्या आदरणीय संस्थापकांनी मांडलेले विचार, धोरणे आणि प्रगतीचा आराखडा.",
      thumbnailUrl: "bg-gradient-to-tr from-[#AD002E]/30 to-[#AD002E]/20",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      key: "mobileBanking",
      title: t("videoGallery.videos.mobileBanking.title"),
      titleEn: "Mobile Banking App Activation Tutorial",
      titleMr: "मोबाईल बँकिंग ॲप सक्रियन मार्गदर्शन",
      duration: "04:12",
      date: t("videoGallery.videos.mobileBanking.date"),
      description: t("videoGallery.videos.mobileBanking.description"),
      descriptionEn: "Detailed step-by-step walkthrough explaining MPIN registration, security keys setup, and transaction safety guidelines.",
      descriptionMr: "एम-पिन (MPIN) नोंदणी, सुरक्षा संकेत आणि सुरक्षित व्यवहार मार्गदर्शक तत्त्वांचे सविस्तर टप्प्याटप्प्याने स्पष्टीकरण.",
      thumbnailUrl: "bg-gradient-to-tr from-[#FFFFFF] to-[#FDFDFD]",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      key: "audit",
      title: t("videoGallery.videos.audit.title"),
      titleEn: "Annual Audit Report Highlights 2024-25",
      titleMr: "वार्षिक ऑडिट अहवाल ठळक मुद्दे २०२४-२५",
      duration: "05:30",
      date: t("videoGallery.videos.audit.date"),
      description: t("videoGallery.videos.audit.description"),
      descriptionEn: "Visual insights into balance sheet audits, asset reserve statistics, and financial health evaluations.",
      descriptionMr: "ताळेबंद लेखापरीक्षण, राखीव निधी आकडेवारी आणि संस्थेच्या आर्थिक स्थितीचे दृश्यात्मक विश्लेषण.",
      thumbnailUrl: "bg-gradient-to-tr from-[#FDFDFD] to-[#AD002E]/20",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      key: "goldLoan",
      title: t("videoGallery.videos.goldLoan.title"),
      titleEn: "Gold Loan Scheme Benefits & Procedure",
      titleMr: "सोने तारण कर्ज योजना फायदे व प्रक्रिया",
      duration: "03:40",
      date: t("videoGallery.videos.goldLoan.date"),
      description: t("videoGallery.videos.goldLoan.description"),
      descriptionEn: "Understand valuation processes, safe storage practices, interest rates calculation, and document requirements.",
      descriptionMr: "सोन्याचे मूल्यांकन, सुरक्षित साठवणूक पद्धती, व्याजदर मोजणी आणि आवश्यक कागदपत्रांची माहिती घ्या.",
      thumbnailUrl: "bg-gradient-to-tr from-[#AD002E]/15 to-[#AD002E]/15",
      videoUrl: null,
      createdAt: new Date().toISOString(),
    },
  ];

  const videoItems = dynamicVideos.length > 0 ? dynamicVideos : defaultVideoItems;

  return (
    <div className="w-full bg-[#FFFFFF]">
      
      {/* Header Banner */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#FDFDFD] to-[#FFFFFF] border-b border-[rgba(255,255,255,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD002E]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="inline-block mb-2 ">
            {t("videoGallery.badge")}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold text-text-main tracking-tight">
            {t("videoGallery.title")}
          </h1>
          <p className="text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
            {t("videoGallery.description")}
          </p>
        </div>
      </section>

      {/* Video Cards Grid */}
      <section className="py-12 md:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoItems.map((video, idx) => {
            const hasVideo = !!video.videoUrl;
            
            // Check if thumbnailUrl is an image link
            const isImgThumb = video.thumbnailUrl && (video.thumbnailUrl.startsWith("http") || video.thumbnailUrl.startsWith("/") || video.thumbnailUrl.includes("."));
            const thumbClass = isImgThumb ? "bg-gradient-to-tr from-[#AD002E]/30 to-[#AD002E]/20" : (video.thumbnailUrl || "bg-gradient-to-tr from-[#AD002E]/30 to-[#AD002E]/20");

            return (
              <div
                key={video.id}
                onClick={() => {
                  if (hasVideo) {
                    setSelectedVideo(video);
                  }
                }}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className={`group rounded-lg overflow-hidden bg-[#FDFDFD] border border-[rgba(255,255,255,0.05)] transition-all duration-300 flex flex-col md:flex-row relative h-full break-words max-w-full ${
                  hasVideo ? "cursor-pointer hover:border-[#AD002E]" : "opacity-85 cursor-not-allowed"
                }`}
              >
                {/* Video Thumbnail */}
                <div className={`relative w-full md:w-56 h-44 shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#AD002E]/20 ${thumbClass} overflow-hidden`}>
                  {isImgThumb && (
                    <img src={video.thumbnailUrl!} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {/* Visual lines resembling equalizer waves */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_8px]" />

                  {/* Big Glowing Play Button */}
                  {hasVideo && (
                    <div className="w-12 h-12 rounded-full bg-[#AD002E]/80 group-hover:bg-[#AD002E] border border-[#AD002E] flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110 shadow-md shadow-[#AD002E]/40 z-10">
                      <PlayCircleOutlined />
                    </div>
                  )}

                  {/* Floating Duration badge */}
                  {video.duration && (
                    <span className="absolute bottom-2.5 right-2.5 bg-[#FFFFFF]/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-sm text-[#AD002E]/70 font-bold border border-[#AD002E]/20 flex items-center gap-1">
                      <ClockCircleOutlined />
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Text metadata */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-text-muted font-bold">
                      <CalendarOutlined className="text-[#AD002E]" />
                      <span>{video.date}</span>
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold text-text-main transition-colors leading-snug line-clamp-2 ${
                      hasVideo ? "group-hover:text-[#AD002E]" : ""
                    }`}>
                      {video.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                  </div>

                  <div className={`text-sm font-bold uppercase tracking-wider mt-4 flex items-center gap-1 ${
                    hasVideo ? "text-[#AD002E]" : "text-gray-400"
                  }`}>
                    <PlaySquareOutlined />
                    <span>
                      {hasVideo 
                        ? t("videoGallery.launchPlayer") 
                        : (isMr ? "व्हिडिओ उपलब्ध नाही" : "Video not available")}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Premium Media Player Modal */}
      <Modal
        open={!!selectedVideo}
        onCancel={() => { setSelectedVideo(null); }}
        footer={null}
        centered
        width="95vw"
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
          maxWidth: "700px",
          backgroundColor: "#FDFDFD",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {selectedVideo && (() => {
          const isYouTube = selectedVideo.videoUrl && (selectedVideo.videoUrl.includes("youtube.com") || selectedVideo.videoUrl.includes("youtu.be"));
          const youtubeEmbedUrl = isYouTube ? getYouTubeEmbedUrl(selectedVideo.videoUrl) : null;
          
          return (
            <div className="flex flex-col bg-[#FDFDFD]">
              
              {/* Real Video Player Container */}
              <div className="relative w-full h-[280px] sm:h-[380px] bg-black flex items-center justify-center overflow-hidden">
                {isYouTube && youtubeEmbedUrl ? (
                  <iframe
                    className="w-full h-full border-none"
                    src={youtubeEmbedUrl}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : selectedVideo.videoUrl ? (
                  <video controls autoPlay className="w-full h-full object-contain">
                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-white text-center p-4">
                    <p className="font-bold text-lg">{isMr ? "व्हिडिओ उपलब्ध नाही" : "Video not available"}</p>
                  </div>
                )}
              </div>

              {/* Description Details */}
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-4 text-sm text-text-muted font-bold border-b border-[#AD002E]/20 pb-3">
                  <span className="flex items-center gap-1">
                    <CalendarOutlined className="text-[#AD002E]" />
                    {selectedVideo.date}
                  </span>
                  {selectedVideo.duration && (
                    <>
                      <span>•</span>
                      <span>{t("videoGallery.documentLength") || "Duration"}: {selectedVideo.duration}</span>
                    </>
                  )}
                </div>
                <p className="text-sm sm:text-base text-[#AD002E]/70 leading-relaxed mt-2">
                  {selectedVideo.description}
                </p>
              </div>

            </div>
          );
        })()}
      </Modal>

    </div>
  );
}

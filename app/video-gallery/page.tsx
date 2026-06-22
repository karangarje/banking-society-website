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
  id: number;
  key: string;
  title: string;
  duration: string;
  date: string;
  description: string;
  thumbnailUrl: string;
}

export default function VideoGallery() {
  const { locale, t } = useLanguage();
  const isMr = locale === "mr";
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dynamicVideos, setDynamicVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/public/videos");
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json.map((v: any) => ({
              id: v.id,
              key: v.id,
              title: isMr ? v.titleMr : v.titleEn,
              duration: v.isFeatured ? "06:15" : "03:45",
              date: new Date(v.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
              description: isMr ? v.titleMr : v.titleEn,
              thumbnailUrl: "bg-gradient-to-tr from-[#AD002E]/30 to-[#AD002E]/20",
            }));
            setDynamicVideos(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading gallery videos:", err);
      }
    };
    fetchVideos();
  }, [isMr]);

  const defaultVideoItems: VideoItem[] = [
    {
      id: 1,
      key: "founder",
      title: t("videoGallery.videos.founder.title"),
      duration: "08:45",
      date: t("videoGallery.videos.founder.date"),
      description: t("videoGallery.videos.founder.description"),
      thumbnailUrl: "bg-gradient-to-tr from-[#AD002E]/30 to-[#AD002E]/20",
    },
    {
      id: 2,
      key: "mobileBanking",
      title: t("videoGallery.videos.mobileBanking.title"),
      duration: "04:12",
      date: t("videoGallery.videos.mobileBanking.date"),
      description: t("videoGallery.videos.mobileBanking.description"),
      thumbnailUrl: "bg-gradient-to-tr from-[#FFFFFF] to-[#FDFDFD]",
    },
    {
      id: 3,
      key: "audit",
      title: t("videoGallery.videos.audit.title"),
      duration: "05:30",
      date: t("videoGallery.videos.audit.date"),
      description: t("videoGallery.videos.audit.description"),
      thumbnailUrl: "bg-gradient-to-tr from-[#FDFDFD] to-[#AD002E]/20",
    },
    {
      id: 4,
      key: "goldLoan",
      title: t("videoGallery.videos.goldLoan.title"),
      duration: "03:40",
      date: t("videoGallery.videos.goldLoan.date"),
      description: t("videoGallery.videos.goldLoan.description"),
      thumbnailUrl: "bg-gradient-to-tr from-[#AD002E]/15 to-[#AD002E]/15",
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
          <h1 className="text-4xl sm:text-6xl font-black text-text-main tracking-tight">
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
          {videoItems.map((video, idx) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#FDFDFD] border border-[rgba(255,255,255,0.05)] hover:border-[#AD002E] transition-all duration-300 flex flex-col md:flex-row relative h-full break-words max-w-full"
            >
              {/* Fake Video Thumbnail (CSS Pattern overlayed with Play Button) */}
              <div className={`relative w-full md:w-56 h-44 shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] ${video.thumbnailUrl}`}>
                
                {/* Visual lines resembling equalizer waves */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_8px]" />

                {/* Big Glowing Play Button */}
                <div className="w-12 h-12 rounded-full bg-[#AD002E]/80 group-hover:bg-[#AD002E] border border-[#AD002E] flex items-center justify-center text-white text-xl transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#AD002E]/40 z-10">
                  <PlayCircleOutlined />
                </div>

                {/* Floating Duration badge */}
                <span className="absolute bottom-2.5 right-2.5 bg-[#FFFFFF]/90 backdrop-blur-sm px-2 py-0.5 rounded text-sm text-gray-600 font-bold border border-[rgba(255,255,255,0.08)] flex items-center gap-1">
                  <ClockCircleOutlined />
                  {video.duration}
                </span>
              </div>

              {/* Text metadata */}
              <div className="p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-muted font-bold">
                    <CalendarOutlined className="text-[#AD002E]" />
                    <span>{video.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-text-main group-hover:text-[#AD002E] transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                    {video.description}
                  </p>
                </div>

                <div className="text-sm text-[#AD002E] font-bold uppercase tracking-wider mt-4 flex items-center gap-1">
                  <PlaySquareOutlined />
                  <span>{t("videoGallery.launchPlayer")}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Simulated Premium Media Player Modal */}
      <Modal
        open={!!selectedVideo}
        onCancel={() => { setSelectedVideo(null); setIsPlaying(false); }}
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
        {selectedVideo && (
          <div className="flex flex-col bg-[#FDFDFD]">
            
            {/* Simulated Player Canvas */}
            <div className="relative w-full h-[280px] sm:h-[380px] bg-[#000] flex flex-col items-center justify-center text-center p-6 select-none">
              
              {/* Backdrop graphics */}
              <div className="absolute inset-0 bg-cover bg-center opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />
              
              {/* Equalizer lines moving mock animation */}
              <div className="flex items-end gap-1.5 h-16 opacity-30 z-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                  <div 
                    key={bar} 
                    className="w-1 bg-[#AD002E]" 
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: isPlaying ? `ticker ${1 + Math.random()}s ease-in-out infinite alternate` : "none",
                    }} 
                  />
                ))}
              </div>

              {/* Player text */}
              <div className="z-10 mt-6 space-y-2">
                <p className="text-sm text-text-muted font-bold tracking-widest uppercase">
                  {isPlaying ? t("videoGallery.nowStreaming") : t("videoGallery.readyBroadcast")}
                </p>
                <h4 className="text-base sm:text-lg font-bold text-text-main max-w-md mx-auto line-clamp-1">
                  {selectedVideo.title}
                </h4>
              </div>

              {/* Big central Play overlay toggle */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors z-20 group"
              >
                <div className="w-16 h-16 rounded-full bg-[#AD002E]/80 group-hover:bg-[#AD002E] border border-[#AD002E] flex items-center justify-center text-white text-4xl transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#AD002E]/30">
                  {isPlaying ? <span className="text-base font-black uppercase select-none tracking-widest">{t("videoGallery.pause")}</span> : <PlayCircleOutlined />}
                </div>
              </button>

              {/* Simulated Progress bar controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-35 flex items-center justify-between gap-4 text-sm text-text-muted font-bold">
                <span>{isPlaying ? "01:24" : "00:00"}</span>
                
                {/* Horizontal Progress Timeline */}
                <div className="flex-grow h-1.5 rounded-full bg-neutral-800 relative overflow-hidden cursor-pointer">
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-[#AD002E] transition-all duration-300"
                    style={{ width: isPlaying ? "22%" : "0%" }}
                  />
                </div>
                
                <span>{selectedVideo.duration}</span>
                
                {/* Volume icon */}
                <SoundOutlined className="text-base text-gray-600" />
              </div>
            </div>

            {/* Description Details */}
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-4 text-sm text-text-muted font-bold border-b border-[rgba(255,255,255,0.06)] pb-3">
                <span className="flex items-center gap-1">
                  <CalendarOutlined className="text-[#AD002E]" />
                  {selectedVideo.date}
                </span>
                <span>•</span>
                <span>{t("videoGallery.documentLength")}: {selectedVideo.duration}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2">
                {selectedVideo.description}
              </p>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}

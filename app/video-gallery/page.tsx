"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { 
  VideoCameraOutlined, 
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SoundOutlined,
  PlaySquareOutlined
} from "@ant-design/icons";

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  date: string;
  description: string;
  thumbnailUrl: string;
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoItems: VideoItem[] = [
    {
      id: 1,
      title: "Founder's Vision and Patsanstha Success Journey",
      duration: "08:45",
      date: "Oct 12, 2024",
      description: "An overview of how Babasaheb Kavad Patsanstha has driven financial inclusion and micro-banking growth since 1998.",
      thumbnailUrl: "bg-gradient-to-tr from-[#7B1010]/30 to-[#F36B21]/20",
    },
    {
      id: 2,
      title: "Guide to Downloading & Setting up Mobile Banking App",
      duration: "04:12",
      date: "Nov 01, 2024",
      description: "Step-by-step tutorial explaining how registered members can activate and configure the new secure mobile app.",
      thumbnailUrl: "bg-gradient-to-tr from-[#0B0B0F] to-[#12121A]",
    },
    {
      id: 3,
      title: "Audits & Compliance: Class 'A' Governance Brief",
      duration: "05:30",
      date: "Dec 18, 2024",
      description: "Auditors and financial experts detail our reserve metrics and asset liquidity that ensure 100% deposit protection.",
      thumbnailUrl: "bg-gradient-to-tr from-[#12121A] to-[#7B1010]/20",
    },
    {
      id: 4,
      title: "Agricultural Gold Loan Scheme Introduction",
      duration: "03:40",
      date: "Feb 05, 2025",
      description: "Understand valuation terms, instant cash disbursement processing, and crop credit alignments for local farming members.",
      thumbnailUrl: "bg-gradient-to-tr from-[#F36B21]/15 to-[#7B1010]/15",
    },
  ];

  return (
    <div className="w-full bg-[#0B0B0F]">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#12121A] to-[#0B0B0F] border-b border-[rgba(255,255,255,0.04)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B1010]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative text-center space-y-4">
          <span className="text-[#F36B21] text-xs font-black uppercase tracking-widest bg-[rgba(243,107,33,0.15)] border border-[rgba(243,107,33,0.4)] px-3 py-1 rounded">
            Media Files
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Video Gallery
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Watch informative clips on how we manage credits, tutorials for mobile apps, and reports on audited compliance.
          </p>
        </div>
      </section>

      {/* Video Cards Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoItems.map((video, idx) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#12121A] border border-[rgba(255,255,255,0.05)] hover:border-[#F36B21] transition-all duration-300 flex flex-col md:flex-row relative"
            >
              {/* Fake Video Thumbnail (CSS Pattern overlayed with Play Button) */}
              <div className={`relative w-full md:w-56 h-44 shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.06)] ${video.thumbnailUrl}`}>
                
                {/* Visual lines resembling equalizer waves */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_8px]" />

                {/* Big Glowing Play Button */}
                <div className="w-12 h-12 rounded-full bg-[#7B1010]/80 group-hover:bg-[#7B1010] border border-[#F36B21] flex items-center justify-center text-white text-lg transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#7B1010]/40 z-10">
                  <PlayCircleOutlined />
                </div>

                {/* Floating Duration badge */}
                <span className="absolute bottom-2.5 right-2.5 bg-[#0B0B0F]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-gray-300 font-bold border border-[rgba(255,255,255,0.08)] flex items-center gap-1">
                  <ClockCircleOutlined />
                  {video.duration}
                </span>
              </div>

              {/* Text metadata */}
              <div className="p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                    <CalendarOutlined className="text-[#F36B21]" />
                    <span>{video.date}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#F36B21] transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {video.description}
                  </p>
                </div>

                <div className="text-[10px] text-[#F36B21] font-bold uppercase tracking-wider mt-4 flex items-center gap-1">
                  <PlaySquareOutlined />
                  <span>Launch Player</span>
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
        width={700}
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
          backgroundColor: "#12121A",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {selectedVideo && (
          <div className="flex flex-col bg-[#12121A]">
            
            {/* Simulated Player Canvas */}
            <div className="relative w-full h-[280px] sm:h-[380px] bg-[#000] flex flex-col items-center justify-center text-center p-6 select-none">
              
              {/* Backdrop graphics */}
              <div className="absolute inset-0 bg-cover bg-center opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />
              
              {/* Equalizer lines moving mock animation */}
              <div className="flex items-end gap-1.5 h-16 opacity-30 z-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                  <div 
                    key={bar} 
                    className="w-1 bg-[#F36B21]" 
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: isPlaying ? `ticker ${1 + Math.random()}s ease-in-out infinite alternate` : "none",
                    }} 
                  />
                ))}
              </div>

              {/* Player text */}
              <div className="z-10 mt-6 space-y-2">
                <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                  {isPlaying ? "▶ NOW STREAMING SECURE HOST" : "⏸ READY TO BROADCAST"}
                </p>
                <h4 className="text-sm sm:text-base font-bold text-white max-w-md mx-auto line-clamp-1">
                  {selectedVideo.title}
                </h4>
              </div>

              {/* Big central Play overlay toggle */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors z-20 group"
              >
                <div className="w-16 h-16 rounded-full bg-[#7B1010]/80 group-hover:bg-[#7B1010] border border-[#F36B21] flex items-center justify-center text-white text-3xl transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#7B1010]/30">
                  {isPlaying ? <span className="text-sm font-black uppercase select-none tracking-widest">Pause</span> : <PlayCircleOutlined />}
                </div>
              </button>

              {/* Simulated Progress bar controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-35 flex items-center justify-between gap-4 text-[10px] text-gray-400 font-bold">
                <span>{isPlaying ? "01:24" : "00:00"}</span>
                
                {/* Horizontal Progress Timeline */}
                <div className="flex-grow h-1.5 rounded-full bg-neutral-800 relative overflow-hidden cursor-pointer">
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-[#F36B21] transition-all duration-300"
                    style={{ width: isPlaying ? "22%" : "0%" }}
                  />
                </div>
                
                <span>{selectedVideo.duration}</span>
                
                {/* Volume icon */}
                <SoundOutlined className="text-sm text-gray-300" />
              </div>
            </div>

            {/* Description Details */}
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-4 text-xs text-gray-400 font-bold border-b border-[rgba(255,255,255,0.06)] pb-3">
                <span className="flex items-center gap-1">
                  <CalendarOutlined className="text-[#F36B21]" />
                  {selectedVideo.date}
                </span>
                <span>•</span>
                <span>Length: {selectedVideo.duration}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2">
                {selectedVideo.description}
              </p>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
}

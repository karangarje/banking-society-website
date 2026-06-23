"use client";

import React from "react";
import Hero from "./Hero";
import Timeline from "./Timeline";
import Stats from "./Stats";

import CTA from "./CTA";

export default function AwardsClientPage() {
  const scrollToTimeline = () => {
    const el = document.getElementById("timeline");
    if (el) {
      const offset = 80; // Height of header navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-white transition-colors duration-300">
      {/* Hero Section */}
      <Hero onScrollToAchievements={scrollToTimeline} />

      {/* Timeline / Achievements Section */}
      <Timeline />

      {/* Stats Section */}
      <Stats />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}

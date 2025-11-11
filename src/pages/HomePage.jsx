import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import ForSellSection from "../components/homepage/ForSellSection";
import PopularPlaceSection from "../components/homepage/PopularPlaceSection";
import ContactSection from "../components/homepage/ContactSection";

export default function HomePage() {
  return (
    <div className="h-full">
      <HeroSection />
      <ForSellSection />
      <PopularPlaceSection />
      <ContactSection />
    </div>
  );
}

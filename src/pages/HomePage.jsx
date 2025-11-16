import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import ForSellSection from "../components/homepage/ForSellSection";
import PopularPlaceSection from "../components/homepage/PopularPlaceSection";
import ContactSection from "../components/homepage/ContactSection";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import FeatureProperties from "../components/homepage/FeatureProperties";

export default function HomePage() {
  return (
    <div className="h-full">
      <HeroSection />
      <FeatureProperties />
      <ForSellSection />
      <PopularPlaceSection />
      <WhyChooseUs />
      <ContactSection />
    </div>
  );
}

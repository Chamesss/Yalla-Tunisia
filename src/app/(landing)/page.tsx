import React from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import HistoricalSection from "@/components/HistoricalSection";
import NatureSection from "@/components/NatureSection";
import HandMade from "@/components/HandMade";
import SportsEntertainment from "@/components/SportsEntertainment";
import Guide from "@/components/Guide";
import Reviews from "@/components/Reviews";
import Join from "@/components/Join";
import Footer from "@/components/Footer";

export default function page() {
  return (
    <div className="text-center relative">
      <NavBar />
      <div className="w-full mt-4 justify-center flex items-center">
        <Hero />
      </div>
      <div className="md:px-24 flex flex-col gap-8 px-8">
        <HistoricalSection />
        <NatureSection />
        <HandMade />
        <SportsEntertainment />
        <Guide />
        <Reviews />
        <Join />
        <Footer />
      </div>
    </div>
  );
}

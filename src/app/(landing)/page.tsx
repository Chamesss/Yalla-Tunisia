import React from "react";
import { ThemeSwitcher } from "@/components/utils/ToggleDarkMode";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
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
    <div className="text-center">
      <NavBar />
      <Hero />
      <SearchBar />
      <HistoricalSection />
      <NatureSection />
      <HandMade />
      <SportsEntertainment />
      <Guide />
      <Reviews />
      <Join />
      <Footer />
    </div>
  );
}

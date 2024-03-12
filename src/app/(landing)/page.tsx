import React, { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HistoricalSection from "@/components/HistoricalSection";
import NatureSection from "@/components/NatureSection";
import HandMade from "@/components/HandMade";
import SportsEntertainment from "@/components/SportsEntertainment";
import Guide from "@/components/Guide";
import Reviews from "@/components/Reviews";
import Join from "@/components/Join";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "react-error-boundary";

export default function page() {
  return (
    <div className="text-center relative">
      <Header />
      <div className="w-full mt-4 justify-center flex items-center">
        <Hero />
      </div>
      <div className="lg:px-16 md:px-6 flex flex-col gap-8 px-4">
        <div className="bg-gray-50 dark:bg-[#181e25] lg:py-0 py-8 px-4 md:px-6">
          <HistoricalSection />
        </div>
        {/* <NatureSection /> */}
        <div className="bg-gray-50 dark:bg-[#181e25] pb-8 pt-4 px-2 md:px-4 lg:px-6">
          <HandMade />
        </div>
        <div className="bg-gray-50 dark:bg-[#181e25] pb-8 pt-4 px-2 md:px-4 lg:px-6">
          <SportsEntertainment />
        </div>
        <div className="bg-gray-50 dark:bg-[#181e25] pb-8 pt-4 px-2 md:px-4 lg:px-6">
          <Guide />
        </div>
        <div className="bg-gray-50 dark:bg-[#181e25] pb-8 pt-4 px-2 md:px-4 lg:px-6">
          <Reviews />
        </div>
        <Join />
        <Footer />
      </div>
    </div>
  );
}

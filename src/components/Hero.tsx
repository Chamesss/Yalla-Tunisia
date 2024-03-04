"use client";
import SearchBar from "./utils/SearchBar";
import Carousel from "./utils/Carousel";
import { useEffect } from "react";

export default function Hero() {
  const data = [
    { image: "/assets/bebbhar.jpg" },
    { image: "/assets/port.jpg" },
    { image: "/assets/madina.jpg" },
    { image: "/assets/mosque.jpg" },
  ];

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const hero = document.getElementById("hero");
    if (navbar && hero) {
      const navbarHeight = navbar.offsetHeight;
      //document.body.style.paddingTop = `${navbarHeight}px`;
      hero.style.marginTop = `${navbarHeight + 10}px`;
    }
  }, []);

  return (
    <div id="hero" className="relative p-6 -z-10">
      <Carousel data={data} />
      <div className="absolute bottom-[0] left-0 right-0 mx-auto w-[50%] mb-16">
        <SearchBar />
      </div>
    </div>
  );
}

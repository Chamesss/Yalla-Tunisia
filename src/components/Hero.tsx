"use client";
import SearchBar from "./utils/SearchBar";
import Carousel from "./utils/Hero/Carousel";
import { useEffect } from "react";

export default function Hero() {
  const data = [
    { image: "/assets/bebbhar.jpg", button: "Option 1", link: "#" },
    { image: "/assets/port.jpg", button: "Option 2", link: "#" },
    { image: "/assets/madina.jpg", button: "Option 3", link: "#" },
    { image: "/assets/mosque.jpg", button: "Option 4", link: "#" },
  ];

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const hero = document.getElementById("hero");
    if (navbar && hero) {
      const navbarHeight = navbar.offsetHeight;
      //document.body.style.paddingTop = `${navbarHeight}px`;
      hero.style.marginTop = `${navbarHeight - 20}px`;
    }
  }, []);

  return (
    <div id="hero" className="relative items-center justify-center p-4 w-[95%]">
      <Carousel data={data} />
      <div className="absolute bottom-[0] left-0 right-0 mx-auto w-[50%] mb-16">
        <SearchBar />
      </div>
    </div>
  );
}

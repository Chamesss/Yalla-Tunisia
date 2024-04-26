"use client";
import SearchBar from "./utils/SearchBar";
import Carousel from "./utils/Hero/Carousel";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Hero() {
  const data = [
    { image: "/assets/bebbhar.jpg", button: "Option 1", link: "#" },
    { image: "/assets/port.jpg", button: "Option 2", link: "#" },
    { image: "/assets/madina.jpg", button: "Option 3", link: "#" },
    { image: "/assets/mosque.jpg", button: "Option 4", link: "#" },
  ];

  return (
    <div className={`relative items-center justify-center md:px-2 w-[100%]`}>
      <Carousel data={data} />
    </div>
  );
}

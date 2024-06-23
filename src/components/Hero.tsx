"use client";
import SearchBar from "./utils/SearchBar";
import Carousel from "./utils/Hero/Carousel";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Hero() {
  const data = [
    {
      image: "/assets/artisanathero.jpg",
      button: "Discover unique artisanal crafts",
      color: "white",
      link: "#",
    },
    {
      image: "/assets/sportshero.jpg",
      button: "Explore thrilling sports adventures",
      color: "black",
      link: "#",
    },
    {
      image: "/assets/guidehero.jpg",
      button: "Join guided city tours and excursions",
      color: "white",
      link: "#",
    },
    {
      image: "/assets/mosque.jpg",
      button: "Immerse in rich cultural heritage",
      color: "white",
      link: "#",
    },
  ];

  return (
    <div className={`relative items-center justify-center md:px-2 w-[100%]`}>
      <Carousel data={data} />
    </div>
  );
}

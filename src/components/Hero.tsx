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

  const buttonLabels = ["Accessories", "Decorations", "Diving", "Kitesurf"];
  const [mounted, setMounted] = useState(false);

  return (
    <div
      id="hero"
      className={`relative items-center md:mt-[120px] mt-16 justify-center md:px-2 w-[100%]`}
    >
      <Carousel data={data} />
      <div className="absolute bottom-[50%] translate-y-[50%] left-0 right-0 mx-auto w-[50%]">
        <div className="flex flex-col gap-2">
          <SearchBar mounted={mounted} setMounted={setMounted} />
          {mounted && (
            <div className=" hidden md:flex flex-row gap-4 items-center justify-center">
              {buttonLabels.map((label, index) => (
                <Button key={index} radius="full" className="font-medium">
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

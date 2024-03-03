"use client";
import SearchBar from "./utils/SearchBar";
import Carousel from "./utils/Carousel";

export default function Hero() {
  const data = [
    { image: "/assets/bebbhar.jpg" },
    { image: "/assets/port.jpg" },
    { image: "/assets/madina.jpg" },
  ];

  return (
    <div className="w-auto h-fit relative">
      <Carousel data={data} />
      <div className="absolute bottom-[0] left-0 right-0 mx-auto w-[50%] mb-16">
        <SearchBar />
      </div>
    </div>
  );
}

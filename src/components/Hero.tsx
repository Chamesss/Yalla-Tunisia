"use client";
import Carousel from "./utils/Carousel";

export default function Hero() {
  const data = [
    { image: "/assets/bebbhar.jpg" },
    { image: "/assets/port.jpg" },
    { image: "/assets/madina.jpg" },
  ];

  return (
    <div>
      <Carousel data={data} />
    </div>
  );
}

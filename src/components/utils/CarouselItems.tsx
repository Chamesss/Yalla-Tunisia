"use client";

import Slider from "react-slick";
import CardItem from "./CardItem";
import { Key } from "react";

export default function SimpleSlider({ data }: any) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="relative gap-4">
      <Slider {...settings} className="gap-4">
        {data.map((d: any, i: Key) => (
          <CardItem key={i} data={d} />
        ))}
      </Slider>
    </div>
  );
}

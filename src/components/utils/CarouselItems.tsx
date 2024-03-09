"use client";

import Slider from "react-slick";
import CardItem from "./CardItem";
import { Key, MouseEventHandler } from "react";
import CarouselLeftArrow from "../icons/CarouselLeftArrow";
import CarouselRightArrow from "../icons/CarouselRightArrow";
import { Button } from "@nextui-org/react";
import IconArrowRight from "../icons/RightArrow";

function SampleNextArrow(props: {
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Button
      className="absolute top-[50%] right-0 z-10 translate-x-4 cursor-pointer"
      onClick={props.onClick}
    >
      <IconArrowRight fill="#707070" width={20} height={20} />
    </Button>
  );
}

function SamplePrevArrow(props: {
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Button
      className="absolute top-[50%] left-0 z-10 -translate-x-4 cursor-pointer px-0"
      onClick={props.onClick}
    >
      <CarouselLeftArrow fill="#707070" width={20} height={20} />
    </Button>
  );
}

export default function SimpleSlider({ data }: any) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="relative">
      <Slider {...settings} className="gap-4">
        {data.map((d: any, i: Key) => (
          <CardItem key={i} data={d} />
        ))}
      </Slider>
    </div>
  );
}

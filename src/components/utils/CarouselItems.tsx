"use client";

import Slider from "react-slick";
import CardItem from "./CardItem";
import { Button } from "@nextui-org/react";
import IconArrowRight from "../icons/RightArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/navigation";

function SampleNextArrow(props: any) {
  return (
    <Button
      className="absolute top-[50%] right-0 z-10 translate-x-4 cursor-pointer min-w-unit-10"
      onClick={props.onClick}
      size="sm"
      variant="flat"
    >
      <IconArrowRight fill="#707070" width={20} height={20} />
    </Button>
  );
}

function SamplePrevArrow(props: any) {
  return (
    <Button
      className="absolute top-[50%] left-0 z-10 -translate-x-4 cursor-pointer min-w-unit-10"
      onClick={props.onClick}
      size="sm"
      variant="flat"
    >
      <div className="rotate-180">
        <IconArrowRight fill="#707070" width={20} height={20} />
      </div>
    </Button>
  );
}

type Props = {
  data: ProductHandMade[] | ProductSports[] | ProductGuides[];
};

export default function SimpleSlider({ data }: Props) {
  let settings = {
    dots: true,
    infinite: false,
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
          infinite: false,
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
          Infinity: false,
        },
      },
    ],
  };
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        autoHeight={true}
        spaceBetween={50}
        slidesPerView={5}
        className="overflow-visible w-full h-full"
      >
        {data.map((d: Product, i: number) => (
          <SwiperSlide key={i}>
            <CardItem data={d} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

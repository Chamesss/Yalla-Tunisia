"use client";
import Slider from "react-slick";
import { ArrowNull } from "@/components/utils/Hero/Carousel";
import Image from "next/image";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

export default function CarouselImages({ data }: any) {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNull />,
    prevArrow: <ArrowNull />,
    appendDots: (
      dots:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
    ) => (
      <div className="w-full bg-green-950">
        <ul className="bg-blue-500 gap-10"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-full bg-slate-500">
        <img src={data[i]} className="!w-[50px] h-[30px]" alt="photo" />
      </div>
    ),
  };
  return (
    <div className="relative w-[30rem] h-[30rem]">
      <Slider {...settings}>
        {data.map((d: any, i: number) => (
          <div>
            <img
              src={d}
              alt="Listing picture"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

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
  console.log(data);
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
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "30px",
          color: "blue",
          border: "1px blue solid",
        }}
      >
        {i + 1}
      </div>
    ),
  };
  return (
    <Slider {...settings} className="gap-4">
      {data.map((d: any, i: number) => (
        <Image
          className="p-2 bg-yellow-200 object-contain"
          src={d}
          width={150}
          height={150}
          alt="Listing picture"
        />
      ))}
    </Slider>
  );
}

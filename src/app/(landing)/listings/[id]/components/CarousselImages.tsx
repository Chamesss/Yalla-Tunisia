"use client";
import Slider from "react-slick";
import { ArrowNull } from "@/components/utils/Hero/Carousel";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  useState,
  SetStateAction,
} from "react";

export default function CarouselImages({ data }: any) {
  const [activeSlide, setActiveSlide] = useState(0);
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNull />,
    prevArrow: <ArrowNull />,
    beforeChange: (_: any, next: SetStateAction<number>) => {
      setActiveSlide(next);
    },
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
      <div className="w-full">
        <ul className="gap-12 justify-center flex"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-[3.8rem] h-[3.8rem] shadow-lg overflow-hidden rounded-lg hover:outline-1 hover:outline focus:outline focus:outline-1 focus:scale-110 outline-black transition-all ease-in-out duration-100 -translate-x-5 hover:scale-110 bg-slate-500 ${
          activeSlide === i && "scale-110"
        }`}
      >
        <img src={data[i]} className="w-full h-full" alt="photo" />
      </div>
    ),
  };
  return (
    <div className="relative w-[30rem] h-[30rem]">
      <Slider {...settings}>
        {data.map((d: any, i: number) => (
          <div key={i}>
            <img
              src={d}
              alt="Listing picture"
              className="object-cover w-full h-full transition-all"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function CarousselImages({ images }: { images: string[] }) {
  const renderThumbs = (children: React.ReactChild[]): React.ReactChild[] => {
    return children
      .map((child, index) => {
        if (React.isValidElement(child) && child.type === "div") {
          //@ts-ignore
          const { children: childElement } = child.props;
          const imgElement = React.Children.toArray(childElement).find(
            (element) => React.isValidElement(element) && element.type === "img"
            //@ts-ignore
          ) as ReactChild | undefined;
          if (imgElement) {
            const styledImgElement = React.cloneElement(imgElement, {
              className: `${imgElement.props.className || ""} custom-thumb-img`,
              style: {
                ...(imgElement.props.style || {}),
                objectFit: "cover",
                width: "100%",
                height: "100%",
              },
            });
            return (
              <div
                key={index}
                className="flex flex-row gap-4 h-[3.1rem] w-full object-fill items-stretch"
              >
                {styledImgElement}
              </div>
            );
          }
        }

        return null;
      })
      .filter(Boolean) as React.ReactChild[];
  };

  return (
    <div className="relative lg:h-[300px] lg:w-[500px]">
      <Carousel
        infiniteLoop={true}
        showStatus={false}
        renderThumbs={renderThumbs}
      >
        {images.map((img: string, i: number) => (
          <div key={i} className="flex items-center justify-center bg-black/10">
            <img
              alt={`product-handmade-${i}`}
              className="object-contain h-full max-h-[14rem] lg:max-h-[18.75rem]"
              src={img}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

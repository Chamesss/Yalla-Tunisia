"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getImages } from "./ImagesPlaceholder";
import { Spinner } from "@nextui-org/react";

export default function ImagesDisplay({ images }: any) {
  const [loading, setLoading] = useState<any>(true);
  const [Images, setImages] = useState<any>(null);

  const urls = images.map((image: any) => image.getUrl());

  useEffect(() => {
    (async () => {
      try {
        const Images: any = await getImages(urls);
        console.log("images === ", Images);
        setImages(Images);
      } catch (error) {
        console.log("error === ", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (Images !== null) {
      setLoading(false);
    }
  }, [Images]);

  if (loading)
    return (
      <small className="italic">
        <Spinner />
        Retrieving images...
      </small>
    );
  return (
    <div className="flex flex-row w-full h-full overflow-auto overflow-x-scroll scrollbar-container gap-2">
      {Images.map(({ base64, url }: any) => (
        <div className="relative shrink-0 !w-[30rem] h-[15rem]" key={url}>
          <Image
            className="object-cover w-full h-full"
            src={url}
            alt="Paint Splashes"
            title="Photo from Unsplash"
            blurDataURL={base64}
            placeholder="blur"
            fill
          />
        </div>
      ))}
    </div>
  );
}

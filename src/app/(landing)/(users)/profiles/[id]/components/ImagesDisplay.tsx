"use client";
import { placesLibrary } from "@/constants/placesLibrairie";
import { Spinner } from "@nextui-org/react";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getImages } from "@/app/(landing)/addlisting/check/components/ImagesPlaceholder";

type TreatedImages = {
  base64: string;
  url: string;
};

export default function ImagesDisplay({ business }: { business: Approvals }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [Images, setImages] = useState<TreatedImages[] | null>(null);

  useEffect(() => {
    setImages(null);
    (async () => {
      try {
        const Images: TreatedImages[] = await getImages(business.imagesUrl);
        setImages(Images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey as string,
    libraries: placesLibrary,
  });
  return (
    <React.Fragment>
      {!isLoaded ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          {Images &&
            Images.map(({ base64, url }: any) => (
              <Image
                key={url}
                width={640}
                height={640}
                alt="store picture"
                blurDataURL={base64}
                placeholder="blur"
                src={url}
                className="h-[14rem] w-auto object-contain"
                unoptimized
              />
            ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

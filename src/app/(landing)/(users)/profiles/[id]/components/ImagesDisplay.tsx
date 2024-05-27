"use client";
import { placesLibrary } from "@/constants/placesLibrairie";
import { Spinner } from "@nextui-org/react";
import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Image from "next/image";

export default function ImagesDisplay({ business }: { business: Approvals }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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
          {business.imagesUrl.map((p, i) => (
            <Image
              key={i}
              width={640}
              height={640}
              alt="store picture"
              src={p}
              className="h-[14rem] w-auto object-contain"
            />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

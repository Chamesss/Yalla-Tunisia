"use client";
import { placesLibrary } from "@/constants/placesLibrairie";
import { Spinner } from "@nextui-org/react";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import { getImages } from "@/app/(landing)/addlisting/check/components/ImagesPlaceholder";

type TreatedImages = {
  base64: string;
  url: string;
};

export default function ImagesDisplay({ business }: { business: Approvals }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [Images, setImages] = useState<TreatedImages[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const Images: TreatedImages[] = await getImages(business.imagesUrl);
        setImages(Images);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
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
          {loading ? (
            <small className="italic flex flex-row items-center justify-center p-4 gap-4">
              <Spinner />
              Récupération des images en cours...
            </small>
          ) : (
            <React.Fragment>
              {error ? (
                <small className="italic flex flex-row items-center justify-center p-4 gap-4">
                  Quelque chose s'est mal passé, essayez de recharger la page.
                </small>
              ) : (
                <React.Fragment>
                  {Images &&
                    Images.map(({ base64, url }: any) => (
                      <Image
                        isZoomed
                        as={NextImage}
                        key={url}
                        width={640}
                        height={640}
                        alt="store picture"
                        blurDataURL={base64}
                        placeholder="blur"
                        src={url}
                        className="h-[13rem] w-auto object-contain rounded-xl"
                        unoptimized
                      />
                    ))}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

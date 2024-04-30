import Image from "next/image";
import { useEffect, useState } from "react";
import { getImages } from "./ImagesPlaceholder";
import { Spinner } from "@nextui-org/react";

type Props = {
  images: google.maps.places.PlacePhoto[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type TreatedImages = {
  base64: string;
  url: string;
};

export default function ImagesDisplay({ images, loading, setLoading }: Props) {
  const [Images, setImages] = useState<TreatedImages[] | null>(null);

  const urls = images.map((image: { getUrl: () => string }) => image.getUrl());

  useEffect(() => {
    setImages(null);
    (async () => {
      try {
        const Images: TreatedImages[] = await getImages(urls);
        setImages(Images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [images]);

  useEffect(() => {
    Images ? setLoading(false) : setLoading(true);
  }, [Images]);

  if (loading)
    return (
      <small className="italic flex flex-row items-center justify-center p-4 gap-4">
        <Spinner />
        Retrieving images...
      </small>
    );
  return (
    <>
      {Images &&
        Images.map(({ base64, url }: any) => (
          <Image
            key={url}
            className=" object-cover shrink-0 w-[10rem] h-[7rem] md:w-[20rem] md:h-[15rem]"
            src={url}
            alt="Paint Splashes"
            title="Photo from Unsplash"
            blurDataURL={base64}
            placeholder="blur"
            width={640}
            height={640}
          />
        ))}
    </>
  );
}

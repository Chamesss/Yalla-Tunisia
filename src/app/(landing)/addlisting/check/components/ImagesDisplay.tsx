import Image from "next/image";
import { Dispatch, useEffect, useState, SetStateAction } from "react";
import { getImages } from "./ImagesPlaceholder";
import { Spinner } from "@nextui-org/react";
import Success from "@/components/icons/Success";

type Props = {
  images: google.maps.places.PlacePhoto[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedImages: string[];
  setSelectedImages: Dispatch<SetStateAction<string[]>>;
};

type TreatedImages = {
  base64: string;
  url: string;
};

export default function ImagesDisplay({
  images,
  loading,
  setLoading,
  selectedImages,
  setSelectedImages,
}: Props) {
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

  const handleSelectImage = (url: string) => {
    const index = selectedImages.findIndex((s) => s === url);
    if (index === -1) {
      setSelectedImages((prev) => [...prev, url]);
    } else {
      setSelectedImages((prev) => prev.filter((s) => s !== url));
    }
  };

  if (loading) {
    return (
      <small className="italic flex flex-row items-center justify-center p-4 gap-4">
        <Spinner />
        Retrieving images...
      </small>
    );
  }

  return (
    <>
      {Images &&
        Images.map(({ base64, url }: any) => (
          <div
            className="relative shrink-0 w-[10rem] h-[7rem] md:w-[20rem] md:h-[15rem]"
            key={url}
          >
            <Image
              onClick={() => handleSelectImage(url)}
              className={`object-cover w-full h-full transition-all hover:opacity-75 cursor-pointer ${
                selectedImages.includes(url) ? " scale-85 rounded-md" : ""
              }`}
              src={url}
              alt="Paint Splashes"
              title="Photo from Unsplash"
              blurDataURL={base64}
              placeholder="blur"
              width={640}
              height={640}
            />
            {selectedImages.includes(url) && (
              <div className="absolute top-5 right-5">
                <Success className="text-green-500" width={35} height={35} />
              </div>
            )}
          </div>
        ))}
    </>
  );
}

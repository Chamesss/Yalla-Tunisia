import CarouselItems from "./utils/CarouselItems";
import getHandmades from "@/lib/getHandmades";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Handmades() {
  const data = (await getHandmades()) as ProductHandMade[];

  return (
    <div className="w-full text-start">
      <div className="flex justify-between mt-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold tracking-wide">Browse Handmades</h1>
          <p>Explore newest articles</p>
        </div>
        <Link
          href={{
            pathname: "/listings",
            query: { cat: "66207a2aeaae61ad28ef0b19" },
          }}
        >
          <Button className="px-4 py-0 bg-black/50 text-white transition-all rounded-lg hover:scale-105">
            Show more
          </Button>
        </Link>
      </div>
      <CarouselItems data={data} />
    </div>
  );
}

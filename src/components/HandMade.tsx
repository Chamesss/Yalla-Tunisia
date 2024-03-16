import CarouselItems from "./utils/CarouselItems";
import { getHomeMades } from "@/lib/getLandingData";
import { Button } from "@nextui-org/react";
import Link from "next/link";

//getStaticProps()

export default async function Handmades() {
  const data = await getHomeMades();
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
            query: { flag: "handmades" },
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

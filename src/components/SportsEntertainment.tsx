"use client";
import { useEffect, useState } from "react";
import CarouselItems from "./utils/CarouselItems";
import { getSports } from "@/lib/getLandingData";

export default async function () {
  const [data, setData] = useState<Result[] | null>(null);
  useEffect(() => {
    (async () => {
      const data: Result[] = await getSports();
      setData(data);
    })();
  }, []);
  if (data)
    return (
      <div className="w-full text-start mt-10">
        <div className="flex justify-between mt-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl">Browse Sports</h1>
            <p>Explore newest Sports</p>
          </div>
          <button className="px-4 py-0 bg-black/50 text-white transition-all rounded-lg hover:scale-105">
            Show more
          </button>
        </div>
        <CarouselItems data={data} />
      </div>
    );
}

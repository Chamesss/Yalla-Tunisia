"use client";
import CardItem from "./utils/CardItem";
import CarouselItems from "./utils/CarouselItems";

export default async function () {
  const res = await fetch("http://localhost:3000/api/handmades/");
  const data: Result[] = await res.json();
  if (data)
    return (
      <div className="w-full text-start">
        <h1 className="text-xl">Browse Handmades</h1>
        <div className="flex justify-between mt-4">
          <p>Explore newest articles</p>
          <button className="px-4 py-2 bg-black/50 text-white transition-all rounded-lg hover:scale-105">
            Show more
          </button>
        </div>
        <div className="flex">
          <CarouselItems data={data} />
        </div>
      </div>
    );
  throw new Error();
}

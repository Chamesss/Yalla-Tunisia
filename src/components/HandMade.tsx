"use client";
import CarouselItems from "./utils/CarouselItems";

export default async function () {
  try {
    const res = await fetch("http://localhost:3000/api/handmades/");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data: Result[] = await res.json();
    if (data) {
      return (
        <div className="w-full text-start mt-10">
          <div className="flex justify-between mt-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">Browse Handmades</h1>
              <p>Explore newest articles</p>
            </div>
            <button className="px-4 py-0 bg-black/50 text-white transition-all rounded-lg hover:scale-105">
              Show more
            </button>
          </div>
          <div className="">
            <CarouselItems data={data} />
          </div>
        </div>
      );
    } else {
      return <p>No data received from the server.</p>;
    }
  } catch (error) {
    return <p>Error fetching handmades. Please try again later.</p>; // Example error message
  }
}

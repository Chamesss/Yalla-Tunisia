"use client";
import { Spinner } from "@nextui-org/react";

export default function EntireScreenLoading() {
  return (
    <div className="fixed flex items-center justify-center top-0 right-0 left-0 mx-auto z-[999999] h-screen w-screen bg-black/[0.5]">
      <div className="bg-white px-8 py-4 rounded-lg items-center justify-start flex flex-col gap-3">
        <p>Loading...</p>
        <Spinner />
      </div>
    </div>
  );
}

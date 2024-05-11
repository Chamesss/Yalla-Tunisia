import IconArrowRight from "@/components/icons/RightArrow";
import { Divider } from "@nextui-org/react";
import React from "react";

export default function PendingForm() {
  return (
    <div className="rounded-xl w-fit flex items-center justify-center flex-col max-w-[45rem]">
      <div className="px-4 py-6 w-full bg-blue-500 rounded-tl-xl rounded-tr-xl">
        <h1 className="text-lg font-semibold text-white text-center">
          Become a Local Artisan: Share Your Craft with the World!
        </h1>
      </div>
      <div className="w-full p-4 border border-opacity-50 border-t-0 rounded-bl-xl rounded-br-xl">
        <p className="my-2 text-center text-lg font-medium">
          Your request is on review, please be patient.
        </p>
      </div>
    </div>
  );
}

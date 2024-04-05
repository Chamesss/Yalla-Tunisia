import { Spinner } from "@nextui-org/react";
import React from "react";

export default function SuccessLoading() {
  return (
    <div className="fixed w-screen top-0 left-0 z-[9999] h-screen bg-black/60">
      <div className="flex w-full h-full px-8 py-8 items-center justify-center">
        <div className="w-[50%] flex items-center justify-center flex-row h-[20%] z-20 bg-white shadow-lg rounded-lg px-4 py-2 gap-4">
          <p className="text-lg font-semibold">Processing...</p>
          <Spinner size="lg" />
        </div>
      </div>
    </div>
  );
}

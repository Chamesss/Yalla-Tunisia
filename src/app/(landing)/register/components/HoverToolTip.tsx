import React from "react";

export default function HoverToolTip({ text }: { text: string }) {
  return (
    <div className="absolute bg-red-500 w-[500px] h-[400px] rounded-xl z-40 top-0 flex">
      <p>{text}</p>
    </div>
  );
}

import React from "react";
import IconArrowRight from "@/components/icons/RightArrow";
import Link from "next/link";

interface HeroButtonProps {
  name: string;
  link: string;
  color: string;
}

export default function HeroButton({ name, link, color }: HeroButtonProps) {
  return (
    <p
      className={`px-4 rounded-md py-3 w-fit text-nowrap bg-black/50 font-bold z-20 text-lg md:text-4xl absolute top-10 md:top-20 mx-auto left-0 right-0 text-white`}
    >
      {name}
    </p>
  );
}

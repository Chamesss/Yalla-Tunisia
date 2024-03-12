import React from "react";
import IconArrowRight from "@/components/icons/RightArrow";
import Link from "next/link";

interface HeroButtonProps {
  name: string;
  link: string;
}

export default function HeroButton({ name, link }: HeroButtonProps) {
  return (
    <p className="text-white font-bold z-20 text-lg md:text-4xl absolute top-10 md:top-20 mx-auto left-0 right-0">
      Lorem ipsum dolor, {name}
    </p>
  );
}

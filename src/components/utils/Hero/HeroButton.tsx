import React from "react";
import IconArrowRight from "@/components/icons/RightArrow";
import Link from "next/link";

interface HeroButtonProps {
  name: string;
  link: string;
}

export default function HeroButton({ name, link }: HeroButtonProps) {
  return (
    <Link
      href={`${link}`}
      className="absolute flex items-center gap-4 rounded-lg bottom-[40%] bg-black/50 text-sm text-white md:text-lg p-2 md:p-4 left-[10%] transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
    >
      {name}
      <IconArrowRight height={20} width={20} />
    </Link>
  );
}

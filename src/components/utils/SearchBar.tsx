"use client";
import { useEffect, useState } from "react";
import Filter from "../icons/Filter";
import Search from "../icons/Search";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function SearchBar() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );
  return (
    <div className="flex-row items-center hidden md:flex bg-slate-50 dark:bg-[#212933] justify-center gap-2 rounded-lg shadow-md px-4 py-3">
      <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110">
        <Filter
          height="1.75rem"
          width="1.75rem"
          color={resolvedTheme === "light" ? "#3b3b3b" : "white"}
        />
      </div>
      <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 dark:bg-white/10" />
      <input
        className="w-full outline-none border-none bg-slate-50 dark:bg-[#212933]"
        placeholder="Search..."
      />
      <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 dark:bg-white/10" />
      <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110">
        <Search
          height="1.75rem"
          width="1.75rem"
          color={resolvedTheme === "light" ? "#3b3b3b" : "white"}
        />
      </div>
    </div>
  );
}

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Filter from "../icons/Filter";
import Search from "../icons/Search";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button, useDisclosure } from "@nextui-org/react";
import FilterModal from "./FilterModal";

type Props = {
  setMounted: Dispatch<SetStateAction<boolean>>;
  mounted: boolean;
};

export default function SearchBar({ setMounted, mounted }: Props) {
  const { theme, resolvedTheme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => setMounted(true), []);

  const openModal = () => {
    onOpen();
  };

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
    <div className="flex-row items-center hidden md:flex bg-slate-50 gap-4 dark:bg-[#212933] justify-center rounded-full py-1.5 px-3">
      <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110">
        <Filter
          onClick={openModal}
          height="1.75rem"
          width="1.75rem"
          color={resolvedTheme === "light" ? "#3b3b3b" : "white"}
        />
      </div>
      <input
        className="w-full outline-none border-none bg-slate-50 dark:bg-[#212933]"
        placeholder="Search..."
      />
      <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 bg-[#48b9ff] dark:bg-[#3d9cd7] p-2 rounded-full">
        <Search height="1.5rem" width="1.5rem" color="white" />
      </div>
      <FilterModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Filter from "../icons/Filter";
import Search from "../icons/Search";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button, Chip, useDisclosure } from "@nextui-org/react";
import FilterModal from "./FilterModal";
import Link from "next/link";

type Props = {
  setMounted: Dispatch<SetStateAction<boolean>>;
  mounted: boolean;
};

export default function SearchBar({ setMounted, mounted }: Props) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const [searchLength, setSearchLength] = useState<number>(0);

  const { theme, resolvedTheme } = useTheme();
  const [keyword, setKeyword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen === false) {
      let length: number = 0;
      selectedCategory.length > 0 && length++;
      selectedSubcategory.length > 0 && length++;
      selectedLocationId.length > 0 && length++;
      if (min.length > 0 || max.length > 0) {
        length++;
      }
      setSearchLength(length);
    }
  }, [isOpen]);

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
      <div className="relative cursor-pointer transition-all duration-500 ease-in-out hover:scale-110">
        <Filter
          onClick={onOpen}
          height="1.75rem"
          width="1.75rem"
          color={resolvedTheme === "light" ? "#3b3b3b" : "white"}
        />
        {searchLength > 0 && (
          <Chip
            size="sm"
            variant="flat"
            color="primary"
            className="absolute -top-1.5 -left-1.5 z-10 p-1 scale-75"
          >
            {searchLength}
          </Chip>
        )}
      </div>
      <input
        className="w-full outline-none border-none bg-slate-50 dark:bg-[#212933]"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Link
        href={{
          pathname: "/listings",
          query: {
            cat: selectedCategory,
            sub: selectedSubcategory,
            locId: selectedLocationId,
            keyword: keyword,
            min: min,
            max: max,
          },
        }}
      >
        <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 bg-[#48b9ff] dark:bg-[#3d9cd7] p-2 rounded-full">
          <Search height="1.5rem" width="1.5rem" color="white" />
        </div>
      </Link>

      <FilterModal
        isOpen={isOpen}
        onClose={onClose}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocationId={selectedLocationId}
        setSelectedLocationId={setSelectedLocationId}
        min={min}
        setMin={setMin}
        max={max}
        setMax={setMax}
      />
    </div>
  );
}

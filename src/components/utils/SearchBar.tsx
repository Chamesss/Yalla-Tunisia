import Filter from "../icons/Filter";
import Search from "../icons/Search";
import { useTheme } from "next-themes";

export default function SearchBar() {
  const { theme } = useTheme();
  return (
    <div className="flex-row items-center hidden md:flex bg-slate-50 dark:bg-[#3b3b3b] justify-center gap-2 rounded-lg shadow-md px-4 py-3">
      <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110">
        <Filter
          height="1.75rem"
          width="1.75rem"
          color={theme === "light" ? "#3b3b3b" : "white"}
        />
      </div>
      <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 dark:bg-white/10" />
      <input
        className="w-full outline-none border-none bg-slate-50 dark:bg-[#3b3b3b]"
        placeholder="Search..."
      />
      <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-200 dark:bg-white/10" />
      <div className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110">
        <Search
          height="1.75rem"
          width="1.75rem"
          color={theme === "light" ? "#3b3b3b" : "white"}
        />
      </div>
    </div>
  );
}

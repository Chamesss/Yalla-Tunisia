import Filter from "../icons/Filter";
import Search from "../icons/Search";

export default function SearchBar() {
  return (
    <div className="flex flex-row items-center p-[2px] bg-slate-50 dark:bg-[#3b3b3b] justify-center gap-4 rounded-full shadow-md">
      <div className=" bg-blue-500 rounded-l-full p-2 px-4">
        <Filter height="1.75rem" width="1.75rem" color="white" />
      </div>
      <input
        className="w-full outline-none border-none bg-slate-50 dark:bg-[#3b3b3b]"
        placeholder="Search..."
      />
      <div className="w-12" />
      <div className=" bg-blue-500 rounded-full p-3 absolute right-0">
        <Search height="1.75rem" width="1.75rem" color="white" />
      </div>
    </div>
  );
}

import { useState } from "react";

interface DropdownItemProps {
  category: CategoryType;
}

type subcategories = {
  id: string;
  name: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export default function DropdownItem({ category }: DropdownItemProps) {
  const CategoryIcon = category.Icon;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-row h-full">
      <div
        className="relative inline-block text-left"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Trigger button */}
        <button
          type="button"
          className={`inline-flex items-center h-full justify-center w-full px-4 py-2 text-sm font-medium ${
            isOpen ? "bg-gray-50 dark:bg-slate-950" : ""
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CategoryIcon className="mr-1" width={30} height={30} />
          {category.name}
          {/* Dropdown arrow */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Dropdown panel */}
        {isOpen && category.subcategories && (
          <div className="origin-top overflow-hidden mt-[0.5px] absolute right-0 left-0 w-full min-w-56 rounded-md shadow-lg ring-1 bg-white dark:bg-slate-700 first-letter ring-black ring-opacity-5 divide-y divide-gray-100">
            {/* Dropdown items */}
            {category.subcategories.map((d: subcategories, i: number) => {
              const SubCategoryIcon = d.Icon;
              return (
                <div
                  key={i}
                  className="flex flex-row items-center justify-between p-1.5 dark:hover:bg-slate-950 hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 dark:text-white gap-1">
                    <SubCategoryIcon className="mr-1" width={30} height={30} />
                    {d.name}
                  </span>
                  <svg
                    className="-mr-1 ml-2 h-5 min-w-5 transform -rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

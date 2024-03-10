import { useState } from "react";

export default function DropdownItem({ category }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-row">
      <div
        className="relative inline-block text-left"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Trigger button */}
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-transparent text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-950"
          onClick={() => setIsOpen((prev) => !prev)}
        >
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
          <div className="origin-top mt-[0.25px] absolute right-0 left-0 w-56 rounded-md shadow-lg ring-1 bg-white dark:bg-slate-700 first-letter ring-black ring-opacity-5 divide-y divide-gray-100">
            {/* Dropdown items */}
            <div className="py-1">
              {category.subcategories.map((d: any) => (
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white dark:hover:bg-slate-950 hover:bg-gray-100"
                >
                  {d.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

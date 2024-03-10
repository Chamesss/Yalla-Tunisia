"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./utils/ToggleDarkMode";
import HeaderDrawer from "./utils/Drawer";
import DropDownItem from "./utils/DropDownItem";
import { getCategories } from "@/lib/getLandingData";

export default function NavBar() {
  // const authenticatedNavigationItems = [
  //   { name: "Home", href: "/" },
  //   { name: "Profile", href: "/Profile" },
  // ];
  // const notAuthenticatedNavigationItems = [
  //   { name: "View all stores", href: "/stores" },
  // ];
  // // const navigationItems = session
  // //   ? authenticatedNavigationItems
  // //   : notAuthenticatedNavigationItems;

  // const navigationItems = notAuthenticatedNavigationItems;

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res);
    })();
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="navbar"
      className="bg-white dark:bg-[#293749] shadow-sm fixed w-full z-50 top-0"
    >
      <nav
        className={`flex flex-row transition-all duration-500 ease-in-out justify-between items-center w-[92%]  mx-auto ${
          isHeaderFixed ? "py-0" : "py-2"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <HeaderDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
          <img
            className="w-16 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
            alt="..."
          />
        </div>
        <div
          className={`bg-white dark:bg-[#293749] nav-links transition-bottom absolute duration-500 ease-in-out md:static md:min-h-fit min-h-[60vh] left-0 md:w-auto  w-full flex items-center px-5 bottom-20`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a className="hover:text-gray-500" href="#">
                Products
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Solution
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Resource
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Developers
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <ThemeSwitcher />
          <button className="bg-[#a6c1ee] dark:bg-[#425b86] px-5 py-2 rounded-full hover:bg-[#6f8cbe] dark:hover:bg-[#364a6d]">
            Sign in
          </button>
        </div>
      </nav>
      <div className="flex justify-center items-center">
        {categories &&
          categories.map((category) => <DropDownItem category={category} />)}
      </div>
    </header>
  );
}

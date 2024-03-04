"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./utils/ToggleDarkMode";
import SideBarButton from "./utils/NavBar/SideBarButton";

export default function NavBar() {
  const authenticatedNavigationItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/Profile" },
  ];
  const notAuthenticatedNavigationItems = [
    { name: "View all stores", href: "/stores" },
  ];
  // const navigationItems = session
  //   ? authenticatedNavigationItems
  //   : notAuthenticatedNavigationItems;

  const navigationItems = notAuthenticatedNavigationItems;

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  //const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    console.log(isHeaderFixed);
  }, [isHeaderFixed]);

  useEffect(() => {
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
      className={`flex min-h-20 flex-row shadow-lg transition-all items-center duration-500 delay-100 ease-in-out bg-slate-50 dark:bg-slate-900 w-full fixed top-0 ${
        isHeaderFixed ? " bg-slate-50 dark:bg-black " : " bg-red-500 "
      }`}
      id="navbar"
    >
      <div className="w-20 h-20 md:w-0 md:h-0 transition-all opacity-100 md:opacity-0 duration-500 delay-100 ease-in-out relative">
        <SideBarButton />
      </div>
      <div className="flex flex-row md:justify-between justify-around w-full items-center transition-all duration-500 ease-in-out">
        <div className="">
          <p className="text-lg">App logo</p>
        </div>
        <div className="flex flex-row gap-5 items-center justify-center opacity-0 md:opacity-100 transition-all duration-500 ease-in-out md:w-auto w-0">
          <p className="text-lg">Home</p>
          <p className="text-lg">Info</p>
          <p className="text-lg">Services</p>
          <p className="text-lg">Join</p>
          <p className="text-lg">Profile</p>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

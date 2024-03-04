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
      className={`flex flex-row transition-all items-center duration-500 delay-100 ease-in-out bg-slate-500 w-full fixed top-0 ${
        isHeaderFixed
          ? "py-4 bg-slate-50 dark:bg-black shadow-lg"
          : "py-8 bg-red-500 "
      }`}
      id="navbar"
    >
      <div className="flex items-center justify-center bg-red-900 mr-14">
        <SideBarButton />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div>
          <p className="text-lg">App logo</p>
        </div>
        <div className="flex flex-row gap-5 items-center justify-center opacity-0 md:opacity-100 transition-all duration-500 ease-in-out md:w-auto w-0">
          <p className="text-lg">Home</p>
          <p className="text-lg">Info</p>
          <p className="text-lg">Services</p>
          <p className="text-lg">Join</p>
          <p className="text-lg">Profile</p>
          {/* <div>
          <ThemeSwitcher />
        </div> */}
        </div>
      </div>
    </header>
  );
}

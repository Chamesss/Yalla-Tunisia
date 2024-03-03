"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./utils/ToggleDarkMode";

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
      className={`flex flex-row p-4 transition-all ease-in-out justify-around bg-slate-500 w-full fixed top-0 z-50 ${
        isHeaderFixed ? "p-4 bg-white dark:bg-black " : "p-8 bg-transparent"
      }`}
    >
      <div>
        <p>App logo</p>
      </div>
      <div className="flex flex-row gap-5">
        <p>Home</p>
        <p>Info</p>
        <p>Services</p>
        <p>Join?</p>
        <p>Profile</p>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

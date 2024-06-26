"use client";

import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./utils/ToggleDarkMode";
import HeaderDrawer from "./utils/Header/Drawer";
import DropDownItem from "./utils/DropDownItem";
import { useTheme } from "next-themes";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalWindow from "@/app/Modals/ModalWindow";
import { userState } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import ProfileDropDown from "./utils/Header/ProfileDropDown";
import { categories as CATEGORIES } from "@/constants/categories";
import { useRouter } from "next/navigation";
import SearchBar from "./utils/SearchBar";
import Link from "next/link";

export default function Header() {
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
  const [IsOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[] | []>(CATEGORIES);
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { resolvedTheme } = useTheme();
  const user: userSlice = useSelector(userState);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      scrollPosition === 0 ? setIsHeaderFixed(false) : setIsHeaderFixed(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = () => {
    if (user.isLogged) {
      router.push("/addlisting");
    } else {
      onOpen();
    }
  };

  return (
    <header className="bg-white dark:bg-[#000000] fixed w-full z-50 top-0">
      <nav
        className={`flex flex-row transition-all duration-500 ease-in-out justify-between items-center w-[92%]  mx-auto ${
          isHeaderFixed ? "py-3" : "py-5"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <HeaderDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            IsOpen={IsOpen}
            setIsOpen={setIsOpen}
            user={user}
            isLogged={user.isLogged}
            categories={categories}
          />
          <Link
            href="/"
            className="text-3xl font-bold drop-shadow-md text-[#48b9ff] dark:text-[#3d9cd7]"
          >
            Yalla Tunisia
          </Link>
        </div>
        <div className="max-w-[40rem] w-full">
          <SearchBar mounted={mounted} setMounted={setMounted} />
        </div>
        <div className="flex items-center gap-6">
          <ThemeSwitcher />
          {user.isLogged && user.user ? (
            <ProfileDropDown user={user} />
          ) : (
            <Button
              onClick={onOpen}
              className="bg-[#48b9ff] text-white dark:bg-[#3d9cd7] px-5 py-2 rounded-full hover:bg-[#41a6e5] dark:hover:bg-[#3688bc]"
            >
              Sign in
            </Button>
          )}
        </div>
      </nav>
      <div>
        <div className="md:flex w-full justify-between min-h-0 md:min-h-10 gap-4 items-center hidden">
          <div className="flex justify-between w-full items-center px-4 bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-row place-self-stretch items-center">
              {categories.map((category) => (
                <DropDownItem key={category.id} category={category} />
              ))}
              {/* <DropDownItem category={Tours} /> */}
            </div>
            <div className="flex justify-self-end py-2">
              <Button
                className="mr-10 bg-white dark:bg-black ring-1 border-none ring-[#48b9ff] dark:ring-[#48b9ff]"
                size="sm"
                variant="bordered"
                radius="full"
                onClick={() => handleNavigation()}
              >
                Sell Item
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalWindow isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </header>
  );
}

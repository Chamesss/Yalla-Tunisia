"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { ThemeSwitcher } from "./utils/ToggleDarkMode";
import HeaderDrawer from "./utils/Drawer";
import DropDownItem from "./utils/DropDownItem";
import { getCategories } from "@/lib/getLandingData";
import { CategoryType } from "@/Types";
import { Tours } from "./utils/Constants";
import { useTheme } from "next-themes";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import LoginModal from "@/app/Modals/LoginModal";

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
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    (async () => {
      getCategories()
        .then((res) => {
          setCategories(res), setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
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
      className="bg-white dark:bg-[#000000] fixed w-full z-50 top-0"
    >
      <nav
        className={`flex flex-row transition-all duration-500 ease-in-out justify-between items-center w-[92%]  mx-auto ${
          isHeaderFixed ? "py-3" : "py-5"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <HeaderDrawer isOpen={IsOpen} setIsOpen={setIsOpen} />
          {mounted && (
            <img
              className="w-16 cursor-pointer"
              src={
                resolvedTheme === "dark"
                  ? "https://creatella.ventures/wp-content/uploads/2021/10/282-2824123_stripe-logo-png-stripe-logo-white-transparent-clipart.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
              }
              alt="..."
            />
          )}
        </div>
        <div
          className={`bg-white dark:bg-black nav-links transition-bottom absolute duration-500 ease-in-out md:static md:min-h-fit min-h-[60vh] left-0 md:w-auto  w-full flex items-center px-5 bottom-20`}
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
          <Button
            onPress={onOpen}
            className="bg-[#48b9ff] text-white dark:bg-[#3d9cd7] px-5 py-2 rounded-full hover:bg-[#41a6e5] dark:hover:bg-[#3688bc]"
          >
            Sign in
          </Button>
        </div>
      </nav>
      <div>
        <div className="md:flex w-full justify-between min-h-0 md:min-h-10 gap-4 items-center hidden">
          {!loading && (
            <div className="flex justify-between w-full items-center px-4 bg-gray-200 dark:bg-gray-900">
              <div className="flex flex-row place-self-stretch items-center">
                {categories.map((category) => (
                  <DropDownItem key={category.id} category={category} />
                ))}
                <DropDownItem category={Tours} />
              </div>
              <div className="flex justify-self-end py-2">
                <Button
                  className="mr-10 bg-white dark:bg-black ring-1 border-none ring-[#48b9ff] dark:ring-[#48b9ff]"
                  size="sm"
                  variant="bordered"
                  radius="full"
                >
                  Sell Item
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </header>
  );
}

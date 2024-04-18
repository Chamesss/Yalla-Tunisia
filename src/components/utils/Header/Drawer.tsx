import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import IconThreeBars16 from "../../icons/ThreeBars";
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { User } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import { useEffect } from "react";

interface HeaderDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  IsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: userInfoType | null;
  isLogged: boolean;
  categories: CategoryType[];
}

export default function HeaderDrawer({
  IsOpen,
  onOpen,
  setIsOpen,
  user,
  isLogged,
  categories,
}: HeaderDrawerProps) {
  const logout = useLogout();
  const pathname = usePathname();
  const values0 = [
    {
      name: "Home",
      link: "/",
    },
  ];
  const values1 = [
    {
      name: "Add Listing",
      link: "/addlisting",
    },
    {
      name: "Cart",
      link: "/cart",
    },
    {
      name: "Favorites",
      link: "/favorites",
    },
    {
      name: "My Listings",
      link: "/mylistings",
    },
  ];

  const values2 = [
    {
      name: "About us",
      link: "/aboutus",
    },
    {
      name: "Contact us",
      link: "/contactus",
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleLogin = () => {
    setIsOpen((prevState) => !prevState);
    onOpen();
  };

  return (
    <>
      <IconThreeBars16
        onClick={toggleDrawer}
        className="text-3xl cursor-pointer"
      />
      <Drawer
        open={IsOpen}
        onClose={toggleDrawer}
        direction="left"
        className="w-[100%] bg-white dark:bg-[#000000]"
      >
        <div className="px-4 py-8 flex items-start flex-col w-full bg-white dark:bg-[#000000] h-full">
          {isLogged ? (
            <div>
              <Link href="/profile">
                <User
                  className="cursor-pointer hover:underline"
                  name={user?.user.firstname + " " + user?.user.firstname}
                  avatarProps={{ src: user?.user.picture }}
                  description="State"
                />
              </Link>
            </div>
          ) : (
            <div>
              <Button onClick={handleLogin}>Login</Button>
            </div>
          )}
          <Divider className="my-3" />
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="px-0 flex flex-col gap-2 w-full">
              <Link
                href="/"
                className={`text-md px-1 py-1 rounded-lg pl-4 font-medium hover:underline w-full ${
                  pathname === values0[0].link &&
                  "bg-[#3091CC] text-white dark:bg-gray-800 bg"
                }`}
              >
                Home
              </Link>
              {isLogged && (
                <>
                  {values1.map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      className={`text-md px-1 py-1 rounded-lg pl-4 font-medium hover:underline w-full ${
                        pathname === item.link &&
                        "bg-[#3091CC] dark:bg-gray-800 bg text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
            <Divider />
            <Accordion
              isCompact
              showDivider={false}
              itemClasses={{
                title: "font-normal font-medium text-sm hover:underline",
                base: "w-full",
              }}
            >
              <AccordionItem key="1" aria-label="Handmades" title="Handmades">
                {categories[0].subcategories.map((d, i) => (
                  <p
                    key={i}
                    className="ml-2 text-sm py-1 italic cursor-pointer hover:underline"
                  >
                    {d.name}
                  </p>
                ))}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Sports & Entertainments"
                title="Sports & Entertainments"
              >
                {categories[1].subcategories.map((d, i) => (
                  <p
                    key={i}
                    className="ml-2 text-sm py-1 italic cursor-pointer hover:underline"
                  >
                    {d.name}
                  </p>
                ))}
              </AccordionItem>
              <AccordionItem key="3" aria-label="Guides" title="Guides">
                {categories[2].subcategories.map((d, i) => (
                  <p
                    key={i}
                    className="ml-2 text-sm py-1 italic cursor-pointer hover:underline"
                  >
                    {d.name}
                  </p>
                ))}
              </AccordionItem>
            </Accordion>
            <Divider />
            {values2.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className={`text-md px-1 py-1 rounded-lg pl-4 font-medium hover:underline w-full ${
                  pathname === item.link &&
                  "bg-[#3091CC] dark:bg-gray-800 bg text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isLogged && (
              <span
                className="text-md px-1 py-1 pl-4 font-medium text-danger hover:underline cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </span>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import IconThreeBars16 from "../icons/ThreeBars";
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { User } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface HeaderDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: userType | null;
  isLogged: boolean;
  categories: CategoryType[];
}

export default function HeaderDrawer({
  isOpen,
  setIsOpen,
  user,
  isLogged,
  categories,
}: HeaderDrawerProps) {
  console.log(categories);
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

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  console.log(user);

  return (
    <>
      <IconThreeBars16
        onClick={toggleDrawer}
        className="text-3xl cursor-pointer"
      />
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="w-[100%] bg-white dark:bg-[#000000]"
      >
        <div className="px-4 py-8 flex items-start flex-col w-full bg-white dark:bg-[#000000] h-full">
          {isLogged ? (
            <div>
              <User
                className="cursor-pointer hover:underline"
                name={user?.firstname + " " + user?.lastname}
                avatarProps={{ src: user?.picture }}
                description="State"
              />
            </div>
          ) : (
            <div>
              <Button>Login</Button>
            </div>
          )}
          <Divider className="my-3" />
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="px-0 flex flex-col gap-2 w-full">
              <Link
                href="/"
                className={`text-md text-white px-1 py-1 rounded-lg pl-4 font-medium hover:underline w-full ${
                  pathname === values0[0].link
                    ? "bg-[#3091CC] dark:bg-gray-800 bg"
                    : ""
                }`}
              >
                Home
              </Link>
              {isLogged && (
                <>
                  {values1.map((item, index) => (
                    <Link
                      href={item.link}
                      className={`text-md px-1 py-1 rounded-lg pl-4 font-medium hover:underline w-full ${
                        pathname === item.link
                          ? "bg-[#3091CC] dark:bg-gray-800 bg text-white"
                          : "text-black dark:text-white"
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
                {categories[0].subcategories.map((d) => (
                  <p className="ml-2 text-sm py-1 italic cursor-pointer hover:underline">
                    {d.name}
                  </p>
                ))}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Sports & Entertainments"
                title="Sports & Entertainments"
              >
                {categories[1].subcategories.map((d) => (
                  <p className="ml-2 text-sm py-1 italic cursor-pointer hover:underline">
                    {d.name}
                  </p>
                ))}
              </AccordionItem>
              <AccordionItem key="3" aria-label="Guides" title="Guides">
                {categories[2].subcategories.map((d) => (
                  <p className="ml-2 text-sm py-1 italic cursor-pointer hover:underline">
                    {d.name}
                  </p>
                ))}
              </AccordionItem>
            </Accordion>
            <Divider />
            {values2.map((item, index) => (
              <Link
                href={item.link}
                className={`text-md px-1 py-1 rounded-lg pl-4 font-medium hover:underline w-full ${
                  pathname === item.link
                    ? "bg-[#3091CC] dark:bg-gray-800 bg text-white"
                    : "text-black dark:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              className="text-md px-1 py-1 pl-4 font-medium text-danger hover:underline"
              href="#"
            >
              Logout
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
}

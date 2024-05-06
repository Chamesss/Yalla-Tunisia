import { Divider, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { categories } from "@/constants/categories";
import EditIcon from "@/components/icons/EditIcon";
import { useState, useEffect, useRef } from "react";
import DeleteListingModal from "./DeleteListingModal";
import { useRouter } from "next/navigation";

export default function ListingCard({
  listing,
}: {
  listing: ProductHandMade | ProductSports | ProductGuides;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Open, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  console.log(listing);

  const categoryId = listing.categoryId;
  const categoryData = categories.find(
    (category) => category.id === categoryId
  );
  const CategoryIcon = categoryData?.Icon;
  let SubIcon = null;
  let SubName = null;
  if (categoryData?.name !== "Guides") {
    const subCategoryData = categoryData?.subcategories.find(
      //@ts-ignore
      (c) => c.id === listing.subCategoryId
    );
    SubIcon = subCategoryData?.Icon;
    SubName = subCategoryData?.name;
  }

  function truncateDescription(description: string) {
    const maxLength = 120;
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  }

  const navigateEdit = () => {
    setIsOpen(false);
    router.push(`/addlisting/panel/edit?id=${listing.id}&cid=${categoryId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      menuRef.current &&
        !menuRef.current.contains(event.target) &&
        setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [onOpenChange]);

  return (
    <div className="relative border border-opacity-50 rounded-xl p-3 shadow-sm">
      <div className="relative box-border overflow-hidden">
        <Image
          alt={listing.title}
          width={640}
          height={640}
          src={listing.imageUrls[0]}
          className={`h-[12rem] w-full object-contain`}
        />
        <Image
          alt={listing.title}
          width={640}
          height={640}
          src={listing.imageUrls[0]}
          className={`h-[12rem] w-full object-fill -z-10 blur absolute top-0 box-border`}
        />
      </div>
      <Divider className="my-1" />
      <div className="flex flex-col gap-1 p-1 overflow-hidden ">
        <div className="flex flex-row items-center opacity-50 italic">
          {CategoryIcon && (
            <CategoryIcon className="mr-1" width={20} height={20} />
          )}
          <small className=" text-nowrap">{categoryData?.name}</small>
        </div>
        {SubIcon && SubName && (
          <div className="flex flex-row items-center opacity-50 italic">
            {CategoryIcon && (
              <SubIcon className="mr-1" width={20} height={20} />
            )}
            <small className="text-nowrap">{SubName}</small>
          </div>
        )}
      </div>
      <Divider className="my-1" />
      <p className="text-lg font-medium">{listing.title}</p>
      <small className="italic opacity-75">
        {truncateDescription(listing.description)}
      </small>
      <br />
      <p className="text-green-600 flex justify-end mt-1">{listing.price} Dt</p>
      <div ref={menuRef} className="dropdown absolute top-0 right-0">
        <button
          className={`p-2 flex items-center justify-center bg-white text-blue-500 rounded-full shadow-md hover:opacity-60 cursor-pointer ${
            Open && "opacity-75"
          }`}
          onClick={() => setIsOpen(!Open)}
        >
          <EditIcon width={20} height={20} />
        </button>
        <div className="relative">
          <div
            className={`bg-white dark:bg-black flex flex-col p-2 min-w-28 text-start absolute right-0 rounded-xl shadow-sm gap-1 ${
              Open ? "h-fit" : "h-0 hidden"
            }`}
          >
            <div
              onClick={navigateEdit}
              className="cursor-pointer p-2 focus:bg-blue-500 hover:bg-blue-500 rounded-xl hover:text-white focus:text-white transition-all duration-150"
            >
              <p className="cursor-pointer text-nowrap">Edit</p>
            </div>
            <div
              onClick={onOpen}
              className="cursor-pointer p-2 focus:bg-danger-500 focus:text-white hover:bg-danger-500 rounded-xl hover:text-white transition-all duration-150"
            >
              <p className="cursor-pointer text-nowrap">Delete</p>
            </div>
          </div>
        </div>
      </div>
      <DeleteListingModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div
        className={`absolute -top-1 -left-1 w-5 h-5 rounded-full ${
          listing.status === true
            ? "bg-success-500"
            : listing.disabled === true
            ? "bg-default-300"
            : "bg-warning-500"
        }`}
      />
    </div>
  );
}

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";
import { categories } from "@/constants/categories";
import EditIcon from "@/components/icons/EditIcon";
import { useState } from "react";

export default function ListingCard({
  listing,
}: {
  listing: ProductHandMade | ProductSports | ProductGuides;
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = () => {
    setIsOpen(false);
  };

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
      <small>{listing.price}</small>
      <div className="dropdown absolute top-0 right-0">
        <button
          className="p-2 flex items-center justify-center bg-white text-blue-500 rounded-full shadow-md hover:opacity-60 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <EditIcon width={20} height={20} />
        </button>
        <div className="relative">
          {isOpen && (
            <div className=" bg-white dark:bg-black p-2 absolute right-0">
              <div
                className="dropdown-item text-nowrap"
                onClick={() => handleSelect()}
              >
                test value
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonPLoader() {
  return (
    <Skeleton className="rounded-lg w-[10rem]">
      <div className="h-[12rem] w-full rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}

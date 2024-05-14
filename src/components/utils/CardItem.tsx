"use client";
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import Category from "./../icons/Category";
import Location from "./../icons/Location";
import Link from "next/link";
import { categories as CATEGORIES } from "@/constants/categories";
import { useEffect, useState } from "react";
import getUserFromCookies from "@/lib/getUserFromCookies";
import addToFavorites from "@/lib/UserActions/addToFavorites";
import HeartEmpty from "../icons/HeartEmpty";
import HeartFull from "../icons/HeartFull";
import { useSelector } from "react-redux";
import {
  addProductToFavorites,
  favoritesState,
  removeProductFromFavorites,
} from "@/redux/slices/favoritesSlice";
import { useDispatch } from "@/redux/store";
import removeFromFavorites from "@/lib/UserActions/removeFromfavorites";
import LoginModal from "@/app/Modals/LoginModal";
import ModalWindow from "@/app/Modals/ModalWindow";
import useAuthModal from "@/hooks/useAuthModal";

type Props = {
  data: ProductHandMade | ProductSports | ProductGuides;
};

export default function CardItem({ data }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const { isModalOpen, openModal, closeModal } = useAuthModal();
  const dispatch = useDispatch();

  const truncatedTitle =
    data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title;

  const categoriesWithIdsAndNames = CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  const category = categoriesWithIdsAndNames.find(
    (category) => category.id === data.categoryId
  );

  const CategoryNameValue = category ? category.name : null;
  const CategoryName =
    CategoryNameValue === "Hand-Made"
      ? "Handmades"
      : CategoryNameValue === "Sports & Entertainments"
      ? "Sports"
      : "Guides";

  const { productsIds } = useSelector(favoritesState);

  useEffect(() => {
    if (productsIds.some((item) => item.id === data.id)) {
      setIsFavorite(true);
    }
  }, [productsIds]);

  const handleAddToFavorites = async () => {
    const user = await getUserFromCookies();
    if (user && user.userId) {
      if (isFavorite) {
        setIsFavorite(false);
        await removeFromFavorites(user.userId, data.id);
        dispatch(removeProductFromFavorites(data.id));
      } else {
        setIsFavorite(true);
        await addToFavorites(user.userId, data.id, CategoryName);
        dispatch(
          addProductToFavorites({
            productId: data.id,
            categoryName: CategoryName,
          })
        );
      }
    } else {
      openModal();
    }
  };

  return (
    <div className="p-1 md:p-4 flex items-center justify-center">
      <Card className="py-0 min-w-32 md:w-48 lg:w-56 shadow-[0_0px_12px_-5px_rgba(0,0,0,0.1)] hover:scale-[103%] cursor-pointer rounded-xl relative">
        <Link href={`/listings/${CategoryName}/${data.id}`}>
          <CardHeader className="p-0 overflow-hidden rounded-sm bg-white items-center justify-center">
            <Image
              alt="Card background"
              className="object-cover rounded-none w-full bg-blue-200"
              src={data.imageUrls[0]}
            />
          </CardHeader>
          <CardBody className="overflow-hidden py-2 px-2">
            <Divider className="my-1" />
            <p className="text-sm mb-2 uppercase font-bold inline-block break-all min-h-10 lg:min-h-0">
              {truncatedTitle}
            </p>
            <div className="flex flex-col justify-self-end">
              <small className="text-default-500 flex items-center gap-1">
                <Location />
                Location, Static
              </small>
              <small className="text-default-500 flex items-center gap-1">
                <Category />
                {/* {data.subcategory
                  ? `${data.subcategory[0].name}`
                  : `${data.category[0].name}`} */}
              </small>
              <div className="flex justify-end items-center p-0 mt-2">
                <p className="font-semibold text-[#309980] text-lg">
                  {data.price} DT
                </p>
              </div>
            </div>
          </CardBody>
        </Link>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full absolute top-2 right-2 z-20 pointer-events-auto transition-all hover:scale-110 active:scale-105"
          onClick={handleAddToFavorites}
        >
          {isFavorite ? (
            <HeartFull className="text-red-500 text-3xl" />
          ) : (
            <HeartEmpty className="text-3xl" />
          )}
        </div>
      </Card>
      <ModalWindow isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

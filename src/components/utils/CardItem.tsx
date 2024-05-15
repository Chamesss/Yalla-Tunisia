"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Skeleton,
  Chip,
} from "@nextui-org/react";
import Location from "./../icons/Location";
import Link from "next/link";
import { categories as CATEGORIES } from "@/constants/categories";
import { Suspense, useEffect, useState } from "react";
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
import ModalWindow from "@/app/Modals/ModalWindow";
import useAuthModal from "@/hooks/useAuthModal";
import { handleCity } from "@/helpers/getLocationNan";
import LanguagesDisplay from "./Card/LanguagesDisplay";
import {
  isProductHandmades,
  isProductSports,
  isProductGuides,
} from "@/helpers/TypeGuard";
import getBusinessName from "@/lib/ListingActions/getBusinessName";

type Props = {
  data: ProductHandMade | ProductSports | ProductGuides;
};

type BusinessData = {
  submitData: Approvals;
  userId: string;
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
    icon: category.Icon,
  }));

  const category = categoriesWithIdsAndNames.find(
    (category) => category.id === data.categoryId
  );

  const Icon = category?.icon!;

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

  async function getBusinessNamePromise(userId: string) {
    try {
      const result = (await getBusinessName(userId)) as BusinessData | boolean;
      if (typeof result === "object") {
        return result.submitData.bName;
      } else return "Data unavailable";
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="p-1 md:p-4 flex items-center justify-center">
      <Card className="py-0 min-w-32 md:w-48 lg:w-56 shadow-[0_0px_12px_-5px_rgba(0,0,0,0.1)] hover:scale-[103%] cursor-pointer rounded-xl relative">
        <Link href={`/listings/${CategoryName}/${data.id}`}>
          <CardHeader className="p-1 relative overflow-hidden rounded-sm items-center justify-center">
            <div className="relative w-full rounded-lg overflow-hidden border-box">
              <Image
                alt={data.title}
                width={640}
                height={640}
                src={data.imageUrls[0]}
                className={`h-[10rem] w-full object-contain rounded-none`}
              />
              <Image
                alt={data.title}
                width={640}
                height={640}
                src={data.imageUrls[0]}
                className={`h-[10rem] w-full object-cover -z-10 blur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-none bottom-0 my-auto box-border`}
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-hidden py-2 px-2">
            <p className="text-sm mb-2 uppercase font-bold break-all min-h-10 lg:min-h-0 flex flex-row items-center gap-2">
              {<Icon className="mb-[0.1rem] text-lg opacity-75" />}
              {truncatedTitle}
            </p>
            <div className="flex flex-col justify-self-end">
              <small className="text-default-500 flex items-center gap-1 capitalize">
                <Location />
                <Suspense fallback={<SkeletonString />}>
                  {handleCity(data)}
                </Suspense>
              </small>
              {isProductHandmades(data) && (
                <Suspense fallback={<SkeletonString />}>
                  <Chip className="mt-1" variant="flat" radius="md" size="sm">
                    <small>{getBusinessNamePromise(data.userId)}</small>
                  </Chip>
                </Suspense>
              )}
              {isProductSports(data) && (
                <Suspense fallback={<SkeletonString />}>
                  <Chip className="mt-1" variant="flat" radius="md" size="sm">
                    <small>{getBusinessNamePromise(data.userId)}</small>
                  </Chip>
                </Suspense>
              )}
              {isProductGuides(data) && <LanguagesDisplay data={data} />}
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

function SkeletonString() {
  return (
    <Skeleton className="w-2/5 rounded-lg flex self-end">
      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}

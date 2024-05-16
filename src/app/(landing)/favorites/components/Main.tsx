"use client";
import Star from "@/components/icons/Star";
import CardItem from "@/components/utils/CardItem";
import Title from "@/components/utils/Title";
import { favoritesState } from "@/redux/slices/favoritesSlice";
import {
  Card,
  CardBody,
  CheckboxGroup,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomCheckbox } from "../../addlisting/panel/create/utils/CustomCheckBoxUnselected";
import CardSkeleton from "@/components/utils/CardSkeleton";

type FavoritesRef = {
  data: ProductGuides | ProductHandMade | ProductSports;
  ref: string;
};

export default function Main() {
  const { productsIds } = useSelector(favoritesState);
  const [favorites, setFavorites] = useState<FavoritesRef[]>();
  const [favoritesGlobal, setFavoritesGlobal] = useState<FavoritesRef[]>();
  const [groupSelected, setGroupSelected] = React.useState<string[]>([
    "Handmades",
    "Sports",
    "Guides",
  ]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const fetchedFavorites: FavoritesRef[] = [];

        for (const product of productsIds) {
          const result = await fetch("/api/listings/getsinglelisting", {
            headers: {
              id: product.id,
              ref: product.ref,
            },
            cache: "reload",
            next: {
              revalidate: 120,
            },
          });

          const res = (await result.json()) as
            | ProductGuides
            | ProductHandMade
            | ProductSports;
          if (res) {
            fetchedFavorites.push({ data: res, ref: product.ref });
          }
        }

        setFavorites(fetchedFavorites);
        setFavoritesGlobal(fetchedFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (productsIds && productsIds.length > 0) {
      fetchFavorites();
    }
  }, [productsIds]);

  const handleFilter = (e: string[]) => {
    setFavorites(undefined);
    setGroupSelected(e);
    const filteredCategories: FavoritesRef[] = [];
    if (favoritesGlobal) {
      for (const category of e) {
        for (const item of favoritesGlobal) {
          if (item.ref.toLocaleLowerCase() === category.toLocaleLowerCase()) {
            filteredCategories.push({
              data: item.data,
              ref: item.ref,
            });
          }
        }
      }
    }
    setFavorites(filteredCategories);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-5 max-w-[78rem] sm:px-10 md:px-20 py-4 flex flex-col flex-1">
        <div className="pt-4 mt-2 px-2 sm:px-4">
          <h1 className="text-2xl font-semibold mb-4 sm:mb-0 ">
            <Star className="text-red-500 mb-[0.6rem] inline-block mr-2" />
            <span className="text-3xl">Favorites</span>
          </h1>
          <h1 className="opacity-75 italic text-sm mt-1">
            Here you can find all your favorite offers saved for later.
          </h1>
        </div>
        <Divider className="mt-4" />
        <div className="px-0 py-4 flex-1 flex flex-col">
          <CheckboxGroup
            className="gap-1 mb-2 flex flex-wrap"
            orientation="horizontal"
            value={groupSelected}
            onChange={(e) => handleFilter(e)}
          >
            <CustomCheckbox value="Handmades">
              <p className="text-tiny sm:text-sm md:text-medium">Handmades</p>
            </CustomCheckbox>
            <CustomCheckbox value="Sports">
              <p className="text-tiny sm:text-sm md:text-medium">
                Sports & Entertainment
              </p>
            </CustomCheckbox>
            <CustomCheckbox value="Guides">
              <p className="text-tiny sm:text-sm md:text-medium">Guides</p>
            </CustomCheckbox>
          </CheckboxGroup>
          <div className="flex mt-8 flex-1 items-center justify-center">
            {favorites ? (
              <div className="grid auto-cols-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 grid-cols-2 gap-4">
                {favorites.length > 0 ? (
                  favorites.map((f, i) => (
                    <React.Fragment key={i}>
                      <CardItem data={f.data} />
                    </React.Fragment>
                  ))
                ) : (
                  <div className="text-center w-full">
                    <p>No items do display.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid auto-cols-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 grid-cols-2 gap-4">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="w-fit flex justify-center items-center opacity-75"
                  >
                    <CardSkeleton key={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

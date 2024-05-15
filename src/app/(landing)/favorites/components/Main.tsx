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

  // useEffect(() => {
  //   const filteredCategories: FavoritesRef[] = [];
  //   for (const category in groupSelected) {
  //     if (favorites) {
  //       for (const item in favorites) {
  //         if (
  //           favorites[item].ref.toLocaleLowerCase() ===
  //           category.toLocaleLowerCase()
  //         )
  //           filteredCategories.push({
  //             data: favorites[item].data,
  //             ref: favorites[item].ref,
  //           });
  //       }
  //     }
  //   }
  //   console.log(filteredCategories);
  //   setFavorites(filteredCategories);
  // }, [groupSelected]);

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
    <div className="px-20 py-4 flex flex-col flex-1">
      <div className="border border-opacity-50 rounded-2xl">
        <div className="py-4 mt-2 px-8">
          <h1 className="flex flex-row text-2xl gap-4">
            <Star className="text-red-500" /> Favorites
          </h1>
          <h1 className="opacity-75 italic text-sm mt-1">
            Here you can find all your favorite offers saved for later.
          </h1>
        </div>
        <Divider className="my-4" />
        <div className="px-8 py-4 rounded-xl flex-1 ">
          <CheckboxGroup
            className="gap-1"
            orientation="horizontal"
            value={groupSelected}
            onChange={(e) => handleFilter(e)}
          >
            <CustomCheckbox value="Handmades">Handmades</CustomCheckbox>
            <CustomCheckbox value="Sports">
              Sports & Entertainment
            </CustomCheckbox>
            <CustomCheckbox value="Guides">Guides</CustomCheckbox>
          </CheckboxGroup>
          <div className="flex flex-row items-start flex-wrap gap-4 ">
            {favorites ? (
              <React.Fragment>
                {favorites.length > 0 ? (
                  favorites.map((f, i) => (
                    <React.Fragment key={i}>
                      <CardItem data={f.data} />
                    </React.Fragment>
                  ))
                ) : (
                  <p>No items do display.</p>
                )}
              </React.Fragment>
            ) : (
              <div className="flex flex-row flex-wrap gap-8">
                {[...Array(10)].map((_, index) => (
                  <Card
                    key={index}
                    className="w-[200px] space-y-5 p-1 pb-3"
                    radius="lg"
                  >
                    <Skeleton className="rounded-lg">
                      <div className="h-[11rem] rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3 flex flex-col px-1 pb-3">
                      <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="w-2/5 rounded-lg flex self-end">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

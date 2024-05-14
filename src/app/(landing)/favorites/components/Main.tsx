"use client";
import CardItem from "@/components/utils/CardItem";
import { favoritesState } from "@/redux/slices/favoritesSlice";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Favorites = Array<ProductGuides | ProductHandMade | ProductSports>;

export default function Main() {
  const { productsIds } = useSelector(favoritesState);
  const [favorites, setFavorites] = useState<Favorites>();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const fetchedFavorites: Favorites = [];

        for (const product of productsIds) {
          const result = await fetch("/api/listings/getsinglelisting", {
            headers: {
              id: product.id,
              ref: product.ref,
            },
          });

          const res = await result.json();
          console.log(res);
          if (res) {
            fetchedFavorites.push(res);
          }
        }

        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (productsIds && productsIds.length > 0) {
      fetchFavorites();
    }
  }, [productsIds]);

  return (
    <div className="px-8 py-8 flex flex-row flex-wrap gap-8">
      {favorites ? (
        favorites.map((f, i) => (
          <React.Fragment key={i}>
            <CardItem data={f} />
          </React.Fragment>
        ))
      ) : (
        <div className="flex flex-row flex-wrap gap-8">
          {[...Array(10)].map((_, index) => (
            <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

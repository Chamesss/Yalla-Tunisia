"use client";
import React, { useEffect } from "react";
import SelectionMenu from "./SelectionMenu";
import { Chip } from "@nextui-org/react";
import { isProductHandmades, isProductSports } from "@/helpers/TypeGuard";
import { categories } from "@/constants/categories";
import { useCityNameFromUser } from "@/hooks/useGetCityNameFromUser";
import SkeletonString from "@/components/utils/Card/SkeletonString";
import Location from "@/components/icons/Location";

type Props = {
  data: Product;
};

const handleCategoryId = (categoryId: string) => {
  const category = categories.find((c) => c.id === categoryId);
  if (category) {
    const Icon = category.Icon;
    return (
      <span>
        <Icon className="inline-flex mb-1" /> {category.name}
      </span>
    );
  } else {
    return <span>Something went wrong</span>;
  }
};

const handleSubCategoryId = (categoryId: string, subCategoryId: string) => {
  const category = categories.find((c) => c.id === categoryId);
  if (category) {
    const subCategory = category.subcategories.find(
      (s) => s.id === subCategoryId
    );
    if (subCategory) {
      const Icon = subCategory.Icon;
      return (
        <span>
          <Icon className="inline-flex mb-1" /> {subCategory.name}
        </span>
      );
    } else {
      return <span>Something went wrong</span>;
    }
  } else {
    return <span>Something went wrong</span>;
  }
};

export default function InfoSection({ data }: Props) {
  const { city, loadingCity, error, handleCity } = useCityNameFromUser();

  useEffect(() => {
    handleCity(data);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-2xl font-semibold tracking-wide">{data.title}</p>
        <SelectionMenu />
      </div>
      <span className="text-2xl font-semibold tracking-wide flex flex-row text-[#fd384f]">
        <p className="text-3xl">{data.price}&nbsp;</p>
        TND
      </span>
      <div className="my-1">
        {loadingCity ? (
          <Chip variant="flat" size="lg" color="primary">
            <span className="capitalize flex flex-row justify-center items-center gap-2">
              <SkeletonString />
            </span>
          </Chip>
        ) : (
          <Chip variant="flat" size="lg" color="primary">
            <span className="capitalize flex flex-row justify-center items-center gap-2">
              <Location /> {city}
            </span>
          </Chip>
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <Chip className="italic text-opacity-75" size="sm">
          {handleCategoryId(data.categoryId)}
        </Chip>
        {(isProductHandmades(data) || isProductSports(data)) && (
          <Chip className="italic text-opacity-75" size="sm">
            {handleSubCategoryId(data.categoryId, data.subCategoryId)}
          </Chip>
        )}
      </div>
    </>
  );
}

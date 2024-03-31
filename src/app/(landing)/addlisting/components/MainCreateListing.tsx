"use client";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useState } from "react";
import CategorySection from "./CategorySection";
import HandmadeInfo from "./HandmadeInfo";
import SportsInfo from "./SportsInfo";
import GuideInfo from "./GuideInfo";
import LocationSection from "./LocationSection";

export default function MainCreateListing() {
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  const [isInfoSelected, setIsInfoSelected] = useState(false);
  const { categories, loading } = useFetchCategories();
  const [categoryIdSelected, setCategoryIdSelected] = useState<number | null>(
    null
  );
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-1 md:flex-none md:w-[30%] gap-4">
          <div className="border border-opacity-50 rounded-xl px-4 py-6">
            <CategorySection
              categories={categories}
              loading={loading}
              setCategoryIdSelected={setCategoryIdSelected}
              categoryIdSelected={categoryIdSelected}
            />
          </div>
          <div className="border border-opacity-50 rounded-xl px-4 py-6">
            <LocationSection />
          </div>
        </div>
        <div className="border border-opacity-50 rounded-xl px-4 py-6 flex-1 flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Listing Details</h1>
          <div className="justify-center items-center flex w-full h-full">
            {categoryIdSelected === null && <p>Select a category</p>}
            {categoryIdSelected === 0 && <HandmadeInfo />}
            {categoryIdSelected === 1 && <SportsInfo />}
            {categoryIdSelected === 2 && <GuideInfo />}
          </div>
        </div>
      </div>
    </div>
  );
}

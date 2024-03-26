"use client";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useState } from "react";
import CategorySection from "./CategorySection";
import HandmadeInfo from "./HandmadeInfo";
import SportsInfo from "./SportsInfo";
import GuideInfo from "./GuideInfo";

export default function MainCreateListing() {
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  const [isInfoSelected, setIsInfoSelected] = useState(false);
  const { categories, loading } = useFetchCategories();
  const [categoryIdSelected, setCategoryIdSelected] = useState<number | null>(
    null
  );
  return (
    <div>
      <div className="flex flex-row gap-4">
        <div className="border border-opacity-50 rounded-xl px-4 py-6 flex-1">
          <CategorySection
            categories={categories}
            loading={loading}
            setCategoryIdSelected={setCategoryIdSelected}
            categoryIdSelected={categoryIdSelected}
          />
        </div>
        <div className="border border-opacity-50 rounded-xl px-4 py-6 flex-1">
          <h1 className="text-xl font-semibold">Listing Details:</h1>
          <div className="justify-center items-center flex w-full">
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

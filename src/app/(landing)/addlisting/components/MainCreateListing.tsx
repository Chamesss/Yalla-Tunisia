"use client";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import HandmadeInfo from "./HandmadeInfo";
import SportsInfo from "./SportsInfo";
import GuideInfo from "./GuideInfo";
import LocationSection from "./LocationSection";
import { Button, Spinner } from "@nextui-org/react";

export default function MainCreateListing() {
  const { categories, loading } = useFetchCategories();
  const [categoryIdSelected, setCategoryIdSelected] = useState<number | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryIdSelected !== null) setLoading(true);
  }, [categoryIdSelected]);

  useEffect(() => {
    isLoading &&
      setTimeout(() => {
        setLoading(false);
      }, 800);
  }, [isLoading]);

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
        <div className="flex-1 items-center justify-center flex flex-col gap-4">
          {categoryIdSelected === null ? (
            <p>Select a category</p>
          ) : (
            <>
              {isLoading ? (
                <div>
                  <Spinner size="lg" />
                </div>
              ) : (
                <>
                  <div className="border border-opacity-50 rounded-xl px-4 py-6 w-full h-full gap-4">
                    <div className="justify-center items-center flex w-full h-full">
                      {categoryIdSelected === 0 && <HandmadeInfo />}
                      {categoryIdSelected === 1 && <SportsInfo />}
                      {categoryIdSelected === 2 && <GuideInfo />}
                    </div>
                  </div>
                  <div className="px-8 py-2 gap-4 flex w-full justify-between">
                    <Button color="danger">Cancel</Button>
                    <Button color="primary">Submit</Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

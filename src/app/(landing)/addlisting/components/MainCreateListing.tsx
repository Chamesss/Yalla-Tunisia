"use client";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import HandmadeInfo from "./HandmadeInfo";
import SportsInfo from "./SportsInfo";
import GuideInfo from "./GuideInfo";
import LocationSection from "./LocationSection";
import { Spinner } from "@nextui-org/react";
import { userSlice, userState } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";

export default function MainCreateListing() {
  const { categories, loading } = useFetchCategories();
  const [categoryIdSelected, setCategoryIdSelected] = useState<string | null>(
    null
  );
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>("");
  const [isLoading, setLoading] = useState(false);
  const [locationChecked, setLocationChecked] = useState<boolean>(false);
  const [locationError, setLocationError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);

  const user: userSlice = useSelector(userState);

  useEffect(() => {
    setCategoryError(false);
    setLocationError(false);
    setSubCategoryError(false);
    if (categoryIdSelected !== null) setLoading(true);
  }, [categoryIdSelected]);

  useEffect(() => {
    isLoading &&
      setTimeout(() => {
        setLoading(false);
      }, 800);
  }, [isLoading]);

  useEffect(() => {
    setLocationError(false);
  }, [location]);

  useEffect(() => {
    setSubCategoryError(false);
  }, [subCategoryId]);

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col flex-1 md:flex-none md:w-[30%] gap-4">
          <div
            id="categorySection"
            className="border border-opacity-50 rounded-xl px-4 py-6"
          >
            <CategorySection
              categories={categories}
              setCategoryIdSelected={setCategoryIdSelected}
              categoryIdSelected={categoryIdSelected}
              setSubCategoryId={setSubCategoryId}
              subCategoryId={subCategoryId}
              categoryError={categoryError}
              subCategoryError={subCategoryError}
            />
          </div>
          <div
            id="locationSection"
            className="border border-opacity-50 rounded-xl px-4 py-6"
          >
            <LocationSection
              location={location}
              setLocation={setLocation}
              locationChecked={locationChecked}
              setLocationChecked={setLocationChecked}
              locationError={locationError}
            />
          </div>
        </div>
        <div className="flex-1 items-center justify-center flex flex-col gap-4">
          {categoryIdSelected === null ? (
            <p>Select a category</p>
          ) : (
            <>
              {isLoading ? (
                <Spinner size="lg" />
              ) : (
                <div className="border border-opacity-50 rounded-xl px-4 py-6 w-full h-full gap-4">
                  <div className="justify-center items-center flex w-full h-full">
                    {Number(categoryIdSelected) === 1 && (
                      <HandmadeInfo
                        userId={user.userId}
                        categoryId={categoryIdSelected}
                        subCategoryId={subCategoryId}
                        location={location}
                        setLocationError={setLocationError}
                        setCategoryError={setCategoryError}
                        setSubCategoryError={setSubCategoryError}
                      />
                    )}
                    {Number(categoryIdSelected) === 2 && (
                      <SportsInfo
                        userId={user.userId}
                        categoryId={categoryIdSelected}
                        subCategoryId={subCategoryId}
                        location={location}
                        setLocationError={setLocationError}
                        setCategoryError={setCategoryError}
                        setSubCategoryError={setSubCategoryError}
                      />
                    )}
                    {Number(categoryIdSelected) === 3 && (
                      <GuideInfo
                        userId={user.userId}
                        categoryId={categoryIdSelected}
                        subCategoryId={subCategoryId}
                        location={location}
                        setLocationError={setLocationError}
                        setCategoryError={setCategoryError}
                        setSubCategoryError={setSubCategoryError}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

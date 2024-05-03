"use client";
import { useSearchParams } from "next/navigation";
import { categories } from "@/constants/categories";
import GoBack from "./components/GoBack";
import { useEffect, useState } from "react";
import { getItemById } from "@/lib/ListingActions/getListingById";
import Loading from "./components/Loading";
import MainHandMade from "./components/handmadeEdit/MainHandMade";
import MainSports from "./components/sportEdit/MainSports";
import MainGuide from "./components/guideEdit/MainGuide";
import CategorySection from "./components/CategorySection";
import LocationSection from "./components/LocationSection";

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const cid = searchParams.get("cid");
  const validateCid = categories.find((c) => c.id === cid);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [categoryIdSelected, setCategoryIdSelected] = useState<string>();
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>();
  const [location, setLocation] = useState<string | null>("");
  const [locationChecked, setLocationChecked] = useState<boolean>(false);
  const [locationError, setLocationError] = useState(false);

  if (!validateCid) {
    return <GoBack />;
  }

  const CategoryName =
    validateCid.name === "Hand-Made"
      ? "Handmades"
      : validateCid.name === "Sports & Entertainments"
      ? "Sports"
      : "Guides";

  useEffect(() => {
    (async () => {
      const result = (await getItemById(CategoryName, id as string)) as
        | ProductHandMade
        | ProductGuides
        | ProductSports
        | undefined;
      if (result === undefined) {
        setError(true);
        setLoading(false);
      } else {
        setData(result);
        setCategoryIdSelected(result.categoryId);
        if (CategoryName !== "Guides") {
          setSubCategoryId(() => {
            const subcategory = validateCid.subcategories.find(
              //@ts-ignore
              (s) => result.subCategoryId === s.id
            );
            return subcategory?.id;
          });
        } else {
          setSubCategoryId(undefined);
        }
        setLocation(result.location);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GoBack />;
  }

  return (
    <div className="flex flex-row p-8 gap-4">
      <div className="flex flex-col flex-1 md:flex-none md:w-[30%] gap-4">
        <div className="border border-opacity-50 rounded-xl px-4 py-6">
          <CategorySection
            categoryIdSelected={categoryIdSelected}
            subCategoryId={subCategoryId}
          />
        </div>
        <div className="border border-opacity-50 rounded-xl px-4 py-6">
          <LocationSection
            location={data.location}
            setLocation={setLocation}
            locationChecked={locationChecked}
            setLocationChecked={setLocationChecked}
            locationError={locationError}
          />
        </div>
      </div>
      <div className="flex-1">
        {CategoryName === "Handmades" && <MainHandMade data={data} />}
        {CategoryName === "Sports" && <MainSports data={data} />}
        {CategoryName === "Guides" && <MainGuide data={data} />}
      </div>
    </div>
  );
}

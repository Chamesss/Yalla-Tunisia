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

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const cid = searchParams.get("cid");
  const validateCid = categories.find((c) => c.id === cid);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

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
      const result = await getItemById(CategoryName, id as string);
      if (result === undefined) {
        setError(true);
        setLoading(false);
      } else {
        setData(result);
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
    <div className="p-6">
      {CategoryName === "Handmades" && <MainHandMade data={data} />}
      {CategoryName === "Sports" && <MainSports data={data} />}
      {CategoryName === "Guides" && <MainGuide data={data} />}
    </div>
  );
}

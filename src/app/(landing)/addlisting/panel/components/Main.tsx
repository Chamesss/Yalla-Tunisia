"use client";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Skeleton, Spinner } from "@nextui-org/react";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import ListingCard from "./ListingCard";

export default function Main() {
  const user: userInfoType = useSelector(userState);
  const userId = user.userId;
  const [Loading, setLoading] = useState(true);
  const [handmades, setHandmades] = useState<ProductHandMade[] | null>(null);
  const [sports, setSports] = useState<ProductSports[] | null>(null);
  const [guides, setGuides] = useState<ProductGuides[] | null>(null);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    (async () => {
      const result = await getListingsByUserId(userId);
      const { Handmades, Sports, Guides } = result;
      Handmades.length > 0 && setHandmades(Handmades);
      Sports.length > 0 && setSports(Sports);
      Guides.length > 0 && setGuides(Guides);
      const total = Handmades.length + Sports.length + Guides.length;
      setTotal(total);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex-1 p-4">
      <div className="border border-opacity-50 rounded-xl p-8 flex flex-col">
        <div className="px-4 pb-2">
          {Loading ? <SkeletonPLoader /> : <p className="">Total: {total}</p>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
          <div className="border border-opacity-50 rounded-xl p-4 shadow-sm flex items-center justify-center">
            <p>Add New Listing +</p>
          </div>
          {Loading ? (
            Array(10).fill(<SkeletonLoader />)
          ) : (
            <>
              {handmades &&
                handmades.map((listing) => <ListingCard listing={listing} />)}
              {sports &&
                sports.map((listing) => <ListingCard listing={listing} />)}
              {guides &&
                guides.map((listing) => <ListingCard listing={listing} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <Skeleton className="rounded-lg">
      <div className="h-24 w-[20rem] rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}

function SkeletonPLoader() {
  return (
    <Skeleton className="rounded-lg w-[10rem]">
      <div className="h-5 !w-[2rem] rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}

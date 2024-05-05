"use client";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import ListingCard from "./ListingCard";
import CreatePlus from "@/components/icons/CreatePlus";
import EmptyFolder from "@/components/icons/EmptyFolder";
import Link from "next/link";

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
    <div className="flex flex-col flex-1 p-4">
      <div className="p-8 flex flex-col">
        <div className="border border-opacity-50 rounded-xl p-4">
          <div className="w-full flex flex-row justify-between items-center">
            <small className="italic flex flex-row gap-4">
              Total ={" "}
              {Loading ? (
                <>
                  <SkeletonPLoader />
                </>
              ) : (
                <>{total}</>
              )}
            </small>
            <Link href={"/addlisting/panel/create"}>
              <Button color="primary">Create new service</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Loading ? (
            Array(10).fill(<SkeletonLoader />)
          ) : (
            <div
              className={`${
                total === 0 || total === undefined
                  ? "border-none"
                  : "border border-opacity-50 rounded-xl p-1"
              }`}
            >
              {handmades &&
                handmades.map((listing) => <ListingCard listing={listing} />)}
              {sports &&
                sports.map((listing) => <ListingCard listing={listing} />)}
              {guides &&
                guides.map((listing) => <ListingCard listing={listing} />)}
            </div>
          )}
        </div>
      </div>
      {(total === 0 || total === undefined) && (
        <div className="w-full flex-auto flex flex-col gap-4 items-center justify-center opacity-75">
          <EmptyFolder width={100} height={100} />
          <small className="italic">No items to display</small>
        </div>
      )}
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
    <Skeleton className="rounded-lg w-[2rem]">
      <div className="h-5 !w-[2rem] rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}

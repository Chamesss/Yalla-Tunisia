"use client";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import React, { useEffect, useState, useRef } from "react";
import { Button, Skeleton } from "@nextui-org/react";
import {
  getCountItems,
  getListingsByUserId,
} from "@/lib/ListingActions/getListingsByUserId";
import ListingCard from "./ListingCard";
import EmptyFolder from "@/components/icons/EmptyFolder";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import SideBar from "./SideBar";

type Result = {
  active: number;
  pending: number;
  disabled: number;
  inProgress: number;
};

type lastDocs = {
  lastDoc1: string | null | number;
  lastDoc2: string | null | number;
  lastDoc3: string | null | number;
};

export default function Main() {
  const user: userSlice = useSelector(userState);
  const userId = user.userId!;
  const [Loading, setLoading] = useState(true);
  const [handmades, setHandmades] = useState<ProductHandMade[]>();
  const [sports, setSports] = useState<ProductSports[]>();
  const [guides, setGuides] = useState<ProductGuides[]>();
  const [total, setTotal] = useState<number>();
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [inProgress, setInProgress] = useState<number>();
  const [component, setComponent] = useState<string>("dashboard");
  const [page, setPage] = useState(0);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const pageSize = 8;

  const [lastDocsList, setLastDocsList] = useState<lastDocs[]>([
    {
      lastDoc1: null,
      lastDoc2: null,
      lastDoc3: null,
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const result: Result = await getCountItems(userId);
        setActive(result.active);
        setPending(result.pending);
        setDisabled(result.disabled);
        setInProgress(result.inProgress);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    getListingsNext();
  }, []);

  const getListingsNext = async () => {
    setLoading(true);
    const result = await getListingsByUserId(
      userId,
      pageSize,
      lastDocsList[lastDocsList.length - 1]
    );
    const { Handmades, Sports, Guides, lastDoc1, lastDoc2, lastDoc3 } = result;
    setHandmades(Handmades);
    setSports(Sports);
    setGuides(Guides);
    const length = Handmades.length + Sports.length + Guides.length;
    setTotal(length);
    setLastDocsList((prev) => [...prev, { lastDoc1, lastDoc2, lastDoc3 }]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const getListingsPrev = async () => {
    setLoading(true);
    console.log(lastDocsList[lastDocsList.length - 2]);
    const result = await getListingsByUserId(
      userId,
      pageSize,
      lastDocsList[lastDocsList.length - 3]
    );
    const { Handmades, Sports, Guides, lastDoc1, lastDoc2, lastDoc3 } = result;
    setHandmades(Handmades);
    setSports(Sports);
    setGuides(Guides);
    const length = Handmades.length + Sports.length + Guides.length;
    setTotal(length);
    setLastDocsList((prev) => {
      const newArray = prev.slice(0, -1);
      return newArray;
    });
    setPage((prev) => prev - 1);
    setLoading(false);
  };

  useEffect(() => {
    (() => {
      const scrollDiv = scrollDivRef.current;
      setTimeout(() => {
        scrollDiv &&
          scrollDiv.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    })();
  }, [Loading]);

  return (
    <div className="flex flex-row flex-1 overflow-hidden p-4 gap-4">
      <div className="max-w-[11rem] min-w-[11rem] sticky flex-1 bg-black text-gray-400 rounded-xl overflow-hidden text-wrap p-4">
        <SideBar component={component} setComponent={setComponent} />
      </div>
      <div className="flex flex-col flex-auto gap-4">
        <div
          ref={scrollDivRef}
          className="border border-opacity-50 rounded-xl py-4 px-12"
        >
          <h1 className="text-xl mb-1 mt-1 font-semibold">Summary </h1>
          <div className="w-full flex flex-row justify-between items-center">
            {typeof active === "number" &&
            typeof pending === "number" &&
            typeof disabled === "number" ? (
              <>
                <Chip variant="shadow" className="text-white" color="success">
                  Active: {active}
                </Chip>
                <Chip variant="shadow" className="text-white" color="primary">
                  In Progress: {inProgress}
                </Chip>
                <Chip variant="shadow" className="text-white" color="warning">
                  Pending: {pending}
                </Chip>
                <Chip variant="shadow" color="default">
                  Disabled: {disabled}
                </Chip>
              </>
            ) : (
              <>
                <SkeletonPLoader />
                <SkeletonPLoader />
                <SkeletonPLoader />
                <SkeletonPLoader />
              </>
            )}
          </div>
        </div>
        <div className="border border-opacity-75 p-4 h-full flex-auto flex flex-col items-center justify-center rounded-xl">
          <div className="flex justify-between w-full items-center px-8 mb-4">
            <h1 className="text-xl mb-1 mt-1 font-semibold">Services</h1>
            <Link href={"/addlisting/panel/create"}>
              <Button className="shadow-sm" color="primary">
                Create new service
              </Button>
            </Link>
          </div>
          {total === 0 ? (
            <div className="w-full flex-auto flex flex-col gap-4 items-center justify-center">
              <EmptyFolder className="opacity-75" width={100} height={100} />
              <p className="font-semibold">No items to display</p>
              <small className="italic opacity-75">
                Create a service in the right side panel
              </small>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Loading ? (
                Array(10).fill(<SkeletonLoader />)
              ) : (
                <>
                  {handmades &&
                    handmades.map((listing, i) => (
                      <React.Fragment key={i}>
                        <ListingCard listing={listing} />
                      </React.Fragment>
                    ))}
                  {sports &&
                    sports.map((listing, i) => (
                      <React.Fragment key={i}>
                        <ListingCard listing={listing} />
                      </React.Fragment>
                    ))}
                  {guides &&
                    guides.map((listing, i) => (
                      <React.Fragment key={i}>
                        <ListingCard listing={listing} />
                      </React.Fragment>
                    ))}
                </>
              )}
            </div>
          )}
          <div className="flex justify-between w-full px-8 mt-4">
            <Button
              disabled={page <= 1}
              onClick={getListingsPrev}
              color="primary"
            >
              Previous
            </Button>
            <Button
              isDisabled={typeof total === "number" && total < pageSize}
              onClick={getListingsNext}
              color="primary"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <Skeleton className="rounded-lg opacity-50">
      <div className="h-24 w-[20rem] rounded-lg bg-default-300 opacity-50"></div>
    </Skeleton>
  );
}

export function SkeletonPLoader() {
  return (
    <Skeleton className="rounded-lg w-[5rem] h-[1rem] opacity-50">
      <Chip className="h-5 !w-[2rem] rounded-lg bg-default-300 opacity-50"></Chip>
    </Skeleton>
  );
}

function countOfferStatus(
  Handmades: ProductHandMade[],
  Sports: ProductSports[],
  Guides: ProductGuides[]
) {
  let active = 0;
  let pending = 0;
  let inProgress = 0;
  let disabled = 0;
  for (const i in Handmades) {
    if (Handmades[i].status === true) {
      active++;
    } else if (
      Handmades[i].status === false &&
      Handmades[i].disabled === false
    ) {
      pending++;
    } else if (Handmades[i].disabled === true) {
      disabled++;
    }
    if (Handmades[i].sold === true && Handmades[i].disabled === false) {
      inProgress++;
    }
  }
  for (const i in Sports) {
    if (Sports[i].status === true) {
      active++;
    } else if (Sports[i].status === false && Sports[i].disabled === false) {
      pending++;
    } else if (Sports[i].disabled === true) {
      disabled++;
    }
    if (Sports[i].sold === true && Sports[i].disabled === false) {
      inProgress++;
    }
  }
  for (const i in Guides) {
    if (Guides[i].status === true) {
      active++;
    } else if (Guides[i].status === false && Guides[i].disabled === false) {
      pending++;
    } else if (Guides[i].disabled === true) {
      disabled++;
    }
    if (Guides[i].sold === true && Guides[i].disabled === false) {
      inProgress++;
    }
  }
  return { active, pending, disabled, inProgress };
}

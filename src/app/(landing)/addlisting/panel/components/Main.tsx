"use client";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Button, Skeleton, Divider } from "@nextui-org/react";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import ListingCard from "./ListingCard";
import CreatePlus from "@/components/icons/CreatePlus";
import EmptyFolder from "@/components/icons/EmptyFolder";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import IconArrowRight from "@/components/icons/RightArrow";
import CarouselRightArrow from "@/components/icons/CarouselRightArrow";
import IconHome from "@/components/icons/Home";
import Bell from "@/components/icons/Bell";
import Help from "@/components/icons/Help";
import SideBar from "./SideBar";

export default function Main() {
  const user: userSlice = useSelector(userState);
  const userId = user.userId!;
  const [Loading, setLoading] = useState(true);
  const [handmades, setHandmades] = useState<ProductHandMade[] | null>(null);
  const [sports, setSports] = useState<ProductSports[] | null>(null);
  const [guides, setGuides] = useState<ProductGuides[] | null>(null);
  const [total, setTotal] = useState<number>();
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [component, setComponent] = useState<string>("dashboard");

  useEffect(() => {
    (async () => {
      const result = await getListingsByUserId(userId);
      const {
        Handmades,
        Sports,
        Guides,
      }: {
        Handmades: ProductHandMade[];
        Sports: ProductSports[];
        Guides: ProductGuides[];
      } = result;
      const count = countPendingAndActive(Handmades, Sports, Guides);
      console.log(count);
      setActive(count.active);
      setPending(count.pending);
      setDisabled(count.disabled);
      Handmades.length > 0 && setHandmades(Handmades);
      Sports.length > 0 && setSports(Sports);
      Guides.length > 0 && setGuides(Guides);
      const total = Handmades.length + Sports.length + Guides.length;
      setTotal(total);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-row flex-1 overflow-hidden p-4 gap-4">
      <div className="max-w-[11rem] min-w-[11rem] sticky flex-1 bg-black text-gray-400 rounded-xl overflow-hidden text-wrap p-4">
        <SideBar component={component} setComponent={setComponent} />
      </div>
      <div className="flex flex-col flex-auto gap-4">
        <div className="border border-opacity-50 rounded-xl py-4 px-12">
          <h1 className="text-xl mb-1 mt-1 font-semibold">Summary </h1>
          <div className="w-full flex flex-row justify-between items-center">
            {typeof active === "number" &&
            typeof pending === "number" &&
            typeof disabled === "number" ? (
              <>
                <Chip variant="shadow" className="text-white" color="success">
                  Active: {active}
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
              </>
            )}
          </div>
        </div>
        <div className="border border-opacity-75 p-4 h-full flex-auto flex flex-col items-center justify-center rounded-xl">
          <div className="flex justify-between w-full items-center px-8">
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
                    handmades.map((listing) => (
                      <ListingCard listing={listing} />
                    ))}
                  {sports &&
                    sports.map((listing) => <ListingCard listing={listing} />)}
                  {guides &&
                    guides.map((listing) => <ListingCard listing={listing} />)}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <Skeleton className="rounded-lg opacity-50">
      <div className="h-24 w-[20rem] rounded-lg bg-default-300 opacity-50"></div>
    </Skeleton>
  );
}

function SkeletonPLoader() {
  return (
    <Skeleton className="rounded-lg w-[2rem] opacity-50">
      <Chip className="h-5 !w-[2rem] rounded-lg bg-default-300 opacity-50"></Chip>
    </Skeleton>
  );
}

function countPendingAndActive(
  Handmades: ProductHandMade[],
  Sports: ProductSports[],
  Guides: ProductGuides[]
) {
  let active = 0;
  let pending = 0;
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
  }
  for (const i in Sports) {
    if (Sports[i].status === true) {
      active++;
    } else if (Sports[i].status === false && Sports[i].disabled === false) {
      pending++;
    } else if (Sports[i].disabled === true) {
      disabled++;
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
  }
  return { active, pending, disabled };
}

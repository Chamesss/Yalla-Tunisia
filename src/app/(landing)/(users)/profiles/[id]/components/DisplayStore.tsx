"use client";
import getBusinessName from "@/lib/ListingActions/getBusinessName";
import React, { useEffect, useState } from "react";
import GoogleTilesContainer from "./GoogleTilesContainer";
import ImagesDisplay from "./ImagesDisplay";
import { Chip } from "@nextui-org/react";
import Store from "@/components/icons/Store";
import Phone from "@/components/icons/Phone";

export default function DisplayStore({ id }: { id: string }) {
  const [business, setBusiness] = useState<Approvals | boolean | undefined>();

  useEffect(() => {
    (async () => {
      const business = (await getBusinessName(id)) as Approvals | boolean;
      setBusiness(business);
    })();
  }, []);

  if (typeof business === "undefined") {
    return <p>Loading...</p>;
  }

  if (typeof business === "boolean") {
    return (
      <div>
        <p>No store to display.</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <Chip variant="flat" color="primary" size="lg">
              <Store className="inline-block text-lg mr-2 mb-[0.125rem]" />
              {business.bName}
            </Chip>
            <Chip variant="flat" color="primary" size="lg">
              <Phone className="inline-block text-lg mr-2 mb-[0.125rem]" />
              {business.bPhone}
            </Chip>
          </div>
          <div className="flex flex-row overflow-x-auto scrollbar-container gap-3 px-2 py-1">
            <ImagesDisplay business={business} />
          </div>
          <div className="flex flex-row overflow-auto overflow-x-auto gap-3 mt-10 px-2 py-1 scrollbar-container">
            <GoogleTilesContainer business={business} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

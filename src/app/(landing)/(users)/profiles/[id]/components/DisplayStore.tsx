"use client";
import getBusinessName from "@/lib/ListingActions/getBusinessName";
import React, { useEffect, useState } from "react";
import GoogleTilesContainer from "./GoogleTilesContainer";
import ImagesDisplay from "./ImagesDisplay";
import { Chip, Divider } from "@nextui-org/react";
import Store from "@/components/icons/Store";
import Phone from "@/components/icons/Phone";

export default function DisplayStore({ id }: { id: string }) {
  const [business, setBusiness] = useState<Approvals | boolean | undefined>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/getapproval/${id}`, {
        cache: "force-cache",
      });
      const business = (await res.json()) as Approvals;
      setBusiness(business);
    })();
  }, []);

  if (typeof business === "undefined") {
    return <p>Loading...</p>;
  }

  if (typeof business === "boolean") {
    return (
      <div>
        <p>Aucun magasin à afficher.</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="pb-6">
        <div className="space-y-0">
          <div className="p-6 overflow-hidden">
            <div className="flex flex-row overflow-hidden gap-4 items-center">
              <h1 className="text-nowrap">Vue du magasin</h1>
              <Divider />
            </div>
          </div>
          <div className="flex sm:flex-col-reverse flex-col-reverse items-center sm:items-start gap-4 justify-center sm:justify-around">
            <div className="flex flex-row overflow-auto overflow-x-auto gap-3 px-2 py-1 scrollbar-container scale-90 xs:scale-100">
              <GoogleTilesContainer business={business} />
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-0 px-4 rounded-xl">
              <p className="text-opacity-90 text-sm">
                <Chip
                  variant="flat"
                  color="primary"
                  size="md"
                  className="-px-2 mr-2"
                >
                  <Store className="inline-block text-lg" />
                </Chip>
                {business.bName}
              </p>
              <p className="text-opacity-90 italic text-sm">
                <Chip
                  variant="flat"
                  color="primary"
                  size="md"
                  className="-px-2 mr-2"
                >
                  <Phone className="inline-block text-lg" />
                </Chip>
                +216 {business.bPhone}
              </p>
            </div>
          </div>
          <div className="p-6 overflow-hidden">
            <div className="flex flex-row overflow-hidden gap-4 items-center">
              <h1 className="text-nowrap">Images du magasin</h1>
              <Divider />
            </div>
          </div>
          <div className="flex flex-row gap-4 px-4 py-2 flex-wrap justify-center">
            <ImagesDisplay business={business} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

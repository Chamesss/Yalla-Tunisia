import React, { useEffect, useState } from "react";
import { TableDisplay } from "../TableActionsComponents/constants";
import { Spinner } from "@nextui-org/react";

const CategoryName = "Guides";
type Product = ProductGuides;

export default function Sports() {
  const [listings, setListings] = useState<Product[]>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/getalllistings/${CategoryName}`, {
        cache: "force-cache",
      });
      const result = (await res.json()) as Product[];
      const activeListing = result.filter(
        (u) => u.status === true && u.disabled === false
      );
      const pendingListing = result.filter(
        (u) => u.status === false && u.disabled === false
      );
      const disabledListing = result.filter((u) => u.disabled === true);
      const combinedListings = [
        ...activeListing,
        ...pendingListing,
        ...disabledListing,
      ];
      setListings(combinedListings);
    })();
  }, [success]);

  return (
    <React.Fragment>
      {listings ? (
        <TableDisplay
          listings={listings}
          setSuccess={setSuccess}
          CategoryName={CategoryName}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </React.Fragment>
  );
}

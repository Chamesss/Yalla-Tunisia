import getBusinessName from "@/lib/ListingActions/getBusinessName";

import React from "react";
import GoogleTilesContainer from "./GoogleTilesContainer";
import ImagesDisplay from "./ImagesDisplay";

export default async function DisplayStore({ id }: { id: string }) {
  const business = (await getBusinessName(id)) as Approvals | boolean;

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
        <div>
          <p>{business.bName}</p>
          <div className="flex flex-row overflow-x-auto scrollbar-container gap-2">
            <ImagesDisplay business={business} />
          </div>
          <div className="flex flex-row overflow-auto overflow-x-auto gap-2 mt-10 scrollbar-container">
            <GoogleTilesContainer business={business} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

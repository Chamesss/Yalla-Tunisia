import React from "react";
import Approve from "./Approve";
import DeleteItem from "./DeleteItem";
import DisableItem from "./DisableItem";
import MoreInfo from "./MoreInfo";

type Props = {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  listing: ProductHandMade | ProductSports | ProductGuides;
  CategoryName: string;
};

export default function ActionsCell({
  setSuccess,
  listing,
  CategoryName,
}: Props) {
  return (
    <div className="relative flex items-center gap-2 justify-between">
      <div className="flex flex-row items-center gap-3">
        <DisableItem
          setSuccess={setSuccess}
          listing={listing}
          CategoryName={CategoryName}
        />
        <DeleteItem
          setSuccess={setSuccess}
          listing={listing}
          CategoryName={CategoryName}
        />
        <MoreInfo CategoryName={CategoryName} listing={listing} />
      </div>
      <Approve
        setSuccess={setSuccess}
        listing={listing}
        CategoryName={CategoryName}
      />
    </div>
  );
}

import { ApproveItemAdmin } from "@/lib/adminActions/ApproveItem";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

type Props = {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  listing: ProductHandMade | ProductSports | ProductGuides;
  CategoryName: string;
};

export default function Approve({ setSuccess, listing, CategoryName }: Props) {
  const [loading, setLoading] = useState(false);

  const handleApproveItems = async () => {
    setLoading(true);
    try {
      const result = await ApproveItemAdmin(listing.id, CategoryName);
      result && setSuccess((prev) => !prev);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip color="primary" content="Approval">
      <span className="text-lg text-danger-500 cursor-pointer active:opacity-50">
        <Button
          isDisabled={listing.status || listing.disabled}
          color="primary"
          onClick={handleApproveItems}
        >
          {loading ? (
            <Spinner color="warning" />
          ) : (
            <>{listing.status ? "Approved" : "Approve"}</>
          )}
        </Button>
      </span>
    </Tooltip>
  );
}

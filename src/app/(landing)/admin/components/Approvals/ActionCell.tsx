import IconEye from "@/components/icons/EyeOpened";
import { ApproveItemAdmin } from "@/lib/adminActions/ApproveItem";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";

type Props = {
  item: Approvals;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ActionCell({ item, setReload }: Props) {
  const HandleSubmit = async () => {
    try {
      await ApproveItemAdmin(item.userId);
      setReload((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <Tooltip className="text-default-600" content="View more">
        <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
          <IconEye />
        </span>
      </Tooltip>
      <span className="text-lg text-success-500 cursor-pointer active:opacity-50">
        <Button onClick={HandleSubmit}>Approve</Button>
      </span>
    </div>
  );
}

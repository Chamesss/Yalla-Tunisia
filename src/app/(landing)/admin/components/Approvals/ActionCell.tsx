import IconEye from "@/components/icons/EyeOpened";
import { ApproveApprovals } from "@/lib/adminActions/ApproveApproval";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import React from "react";
import ApproveModal from "./ApproveModal";

type Props = {
  item: Approvals;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ActionCell({ item, setReload }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const HandleSubmit = async () => {
    try {
      await ApproveApprovals(item.userId);
      setReload((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <Tooltip className="text-default-600" content="View more">
        <span
          className="text-lg text-default-500 cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <IconEye />
        </span>
      </Tooltip>
      <span className="text-lg text-success-500 cursor-pointer active:opacity-50">
        <Button color="primary" onClick={HandleSubmit}>
          Approve
        </Button>
      </span>
      <ApproveModal item={item} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

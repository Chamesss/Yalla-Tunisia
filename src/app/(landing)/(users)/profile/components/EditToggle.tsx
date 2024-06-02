import Setting from "@/components/icons/Setting";
import React from "react";
import EditProfileModal from "./modals/EditProfileModal";
import { useDisclosure } from "@nextui-org/react";

export default function EditToggle({
  current,
  id,
}: {
  current: string;
  id: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div
        onClick={onOpen}
        className="p-1.5 flex items-center justify-center sm:p-4 border border-default-300 rounded-full cursor-pointer h-fit w-fit hover:opacity-75"
      >
        <Setting />
      </div>
      <EditProfileModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        current={current}
        id={id}
      />
    </>
  );
}

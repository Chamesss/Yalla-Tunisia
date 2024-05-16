"use client";
import { useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import LoginModal from "./LoginModal";
import { usePathname } from "next/navigation";

export default function ModalWindow({ isOpen, onClose, onOpen }: any) {
  const pathname = usePathname();

  // useEffect(() => {
  //   onClose();
  // }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="self-center h-auto transition-all duration-300"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">
          <p>Login</p>
        </ModalHeader>
        <ModalBody className="flex items-center py-10 h-auto transition-all duration-300">
          <LoginModal />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

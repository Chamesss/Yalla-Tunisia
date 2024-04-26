"use client";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import LoginModal from "./LoginModal";

export default function ModalWindow({ isOpen, onOpenChange }: any) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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

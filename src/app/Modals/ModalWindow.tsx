import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function ModalWindow({ isOpen, onOpenChange }: any) {
  const [register, setRegister] = useState(false);
  useEffect(() => {
    setRegister(false);
  }, [onOpenChange]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="self-center h-auto transition-all duration-300"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">
          {register ? <p>Register</p> : <p>Login</p>}
        </ModalHeader>
        <ModalBody className="flex items-center py-10 h-auto transition-all duration-300">
          {register ? (
            <RegisterModal setRegister={setRegister} />
          ) : (
            <LoginModal setRegister={setRegister} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

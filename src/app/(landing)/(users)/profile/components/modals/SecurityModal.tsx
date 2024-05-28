import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import EditButton from "../EditButton";

export default function SecurityModal({ user }: { user: userType }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        className="w-full justify-between flex flex-row items-center"
        onClick={onOpen}
      >
        <h1 className="text-xl font-bold tracking-wide">Security</h1>
        <EditButton />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Security
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  <Input value={user.email} />
                  <Input label={"new password"} />
                </div>
                {error && (
                  <small className="text-danger-500">
                    Something went wrong.
                  </small>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">
                  {loading ? <Spinner color="warning" /> : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

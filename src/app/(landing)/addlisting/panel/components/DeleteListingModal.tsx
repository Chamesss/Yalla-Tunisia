import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

export default function DeleteListingModal({
  isOpen,
  onOpen,
  onOpenChange,
}: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmation de suppression
              </ModalHeader>
              <ModalBody>
                <p>Êtes-vous sûr de vouloir supprimer cet offer ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Annuler
                </Button>
                <Button color="primary" onClick={onClose}>
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

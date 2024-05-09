import TrashBin from "@/components/icons/TrashBin";
import { deleteItemById } from "@/lib/adminActions/deleteItemById";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";

type Props = {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  listing: ProductHandMade;
  CategoryName: string;
};

export default function DeleteItem({
  setSuccess,
  listing,
  CategoryName,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleDeleteListing = async () => {
    setLoading(true);
    try {
      const result = await deleteItemById(listing.id, CategoryName);
      result && setSuccess((prev) => !prev);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <>
      <Tooltip color="danger" content="Delete Offer">
        <span
          className="text-lg text-danger-500 cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <TrashBin />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Warning.
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this offer?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleDeleteListing}>
                  {loading ? <Spinner color="warning" /> : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

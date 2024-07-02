import Ban from "@/components/icons/Ban";
import UnBan from "@/components/icons/UnBan";
import { banItem } from "@/lib/adminActions/banItem";
import { unbanItem } from "@/lib/adminActions/unbanItem";
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
import { useState } from "react";

type Props = {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  listing: ProductHandMade | ProductSports | ProductGuides;
  CategoryName: string;
};

export default function DisableItem({
  setSuccess,
  listing,
  CategoryName,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const handlePress = async () => {
    setLoading(true);
    try {
      if (action === "ban") {
        const result = await banItem(listing.id, CategoryName);
        result && setSuccess((prev) => !prev);
      } else if (action === "unban") {
        const result = await unbanItem(listing.id, CategoryName);
        result && setSuccess((prev) => !prev);
      }
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
      {listing.disabled === true ? (
        <Tooltip className="text-white" color="success" content="Unban Offer">
          <span
            className="text-lg text-success-500 cursor-pointer active:opacity-50"
            onClick={() => {
              setAction("unban");
              onOpen();
            }}
          >
            <UnBan />
          </span>
        </Tooltip>
      ) : (
        <Tooltip color="danger" content="Ban Offer">
          <span
            className="text-lg text-danger-500 cursor-pointer active:opacity-50"
            onClick={() => {
              setAction("ban");
              onOpen();
            }}
          >
            <Ban />
          </span>
        </Tooltip>
      )}
      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Avertissement.
              </ModalHeader>
              <ModalBody>
                <p>
                  Êtes-vous sûr de vouloir{" "}
                  {action === "ban" ? "bannir" : "débannir"} cet offre ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Annuler
                </Button>
                <Button color="primary" onClick={handlePress}>
                  {loading ? <Spinner color="warning" /> : "Soumettre"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import IconEye from "@/components/icons/EyeOpened";
import { getUserById } from "@/lib/UserActions/getUser";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

type Props = {
  listing: ProductHandMade | ProductSports | ProductGuides;
};

export default function MoreInfo({ listing }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<userType>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isOpen) {
      (async () => {
        const user = (await getUserById(listing.userId)) as userType;
        setUser(user);
        setLoading(false);
      })();
    }
  }, [onOpenChange]);
  return (
    <>
      <Tooltip color="default" content="More info">
        <span
          onClick={onOpen}
          className="text-lg cursor-pointer active:opacity-50 opacity-75"
        >
          <IconEye />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {user && (
                  <div className="flex flex-col gap-4 items-start">
                    <h1 className="italic opacity-75">Owner</h1>
                    <User
                      avatarProps={{ radius: "lg", src: user.picture }}
                      description={user.email}
                      name={user.username}
                    >
                      {user.email}
                    </User>
                  </div>
                )}
                {loading && (
                  <div className="min-w-20 min-h-20 flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

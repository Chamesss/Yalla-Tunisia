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
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  listing: ProductHandMade;
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
                <h1 className="italic opacity-75">Owner</h1>
                {user && (
                  <div className="flex flex-col gap-4 items-start">
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
                <h1 className="italic opacity-75">Item details</h1>
                <div>
                  <div className="flex flex-row overflow-x-auto">
                    {listing.imageUrls.map((image, i) => (
                      <Image
                        key={i}
                        src={image}
                        width={128}
                        height={128}
                        alt={`${listing.title}-picture-${i}`}
                      />
                    ))}
                  </div>
                  <div className="w-full flex flex-row justify-between">
                    <h1>{listing.title}</h1>
                    <span>{listing.price} DT</span>
                  </div>
                  <small>{listing.description}</small>
                  <br />
                  <small>
                    {listing.materialUsed
                      ? listing.materialUsed
                      : "No materials specified"}
                  </small>
                  <br />
                  <small>{listing.qte}</small>
                  <div>
                    <h1>Colors</h1>
                    {listing.colors.map((c) => (
                      <div
                        style={{ backgroundColor: c }}
                        className={`w-8 h-8 rounded-full bg-[${c}] `}
                      />
                    ))}
                  </div>
                  <div className="gap-2 flex flex-row">
                    <h1>Sizes</h1>
                    {listing.sizes.map((s) => (
                      <>
                        {s && (
                          <span className="py-1 px-3 bg-primary-500 text-white rounded-2xl italic">
                            {s}
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                  {listing.dimensions[0] && listing.dimensions[1] ? (
                    <div>
                      <span>
                        {listing.dimensions[0]} * {listing.dimensions[1]}
                      </span>
                    </div>
                  ) : (
                    <span>No dimensions available</span>
                  )}
                </div>
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

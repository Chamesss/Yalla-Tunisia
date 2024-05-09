import IconEye from "@/components/icons/EyeOpened";
import { getUserById } from "@/lib/UserActions/getUser";
import {
  Button,
  Card,
  CardBody,
  Divider,
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[90vh] overflow-y-auto scrollbar-container py-2"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                More Info
              </ModalHeader>
              <ModalBody>
                <h1 className="italic opacity-75">Owner</h1>
                {user && (
                  <Card>
                    <CardBody>
                      <div className="flex flex-col gap-4 items-start">
                        <User
                          avatarProps={{ radius: "lg", src: user.picture }}
                          description={user.email}
                          name={user.username}
                        >
                          {user.email}
                        </User>
                      </div>
                    </CardBody>
                  </Card>
                )}
                {loading && (
                  <div className="min-w-20 min-h-20 flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
                <h1 className="italic opacity-75">Item details</h1>
                <Card>
                  <CardBody>
                    <div className="flex flex-col gap-1 p-2">
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
                      <Divider className="my-2" />
                      <div className="w-full flex flex-row justify-between">
                        <h1>{listing.title}</h1>
                        <span className="text-success-600">
                          {listing.price} DT
                        </span>
                      </div>
                      <small className="italic">{listing.description}</small>
                      <Divider className="my-2" />
                      <div className="flex flex-col gap-2">
                        <p className="italic">
                          Materials used:{" "}
                          <small>
                            {listing.materialUsed
                              ? listing.materialUsed
                              : "No materials specified"}
                          </small>
                        </p>
                        <p className="italic">Qte: {listing.qte}</p>
                        <div className="flex flex-row gap-3 items-center">
                          <h1 className="italic">Colors: </h1>
                          {listing.colors.map((c) => (
                            <div
                              style={{ backgroundColor: c }}
                              className={`w-8 h-8 rounded-full bg-[${c}] `}
                            />
                          ))}
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <h1 className="italic">Sizes: </h1>
                          {listing.sizes.map((s) => (
                            <>
                              {s && (
                                <small className="py-1 px-3 bg-primary-500 text-white rounded-2xl italic">
                                  {s}
                                </small>
                              )}
                            </>
                          ))}
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                          <h1 className="italic">Dimensions: </h1>
                          {listing.dimensions[0] && listing.dimensions[1] ? (
                            <small>
                              {listing.dimensions[0]} * {listing.dimensions[1]}
                            </small>
                          ) : (
                            <small>No dimensions available</small>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

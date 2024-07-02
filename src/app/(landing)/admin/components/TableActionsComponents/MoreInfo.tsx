import IconEye from "@/components/icons/EyeOpened";
import { categories } from "@/constants/categories";
import { FilterCategory } from "@/helpers/SelectCategoryName";
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
import { config } from "@/helpers/SelectCategoryName";
import HandmadeCard from "./HandmadeCard";
import SportsCard from "./SportsCard";
import GuideCard from "./GuideCard";

type Props = {
  CategoryName: string;
  listing: ProductHandMade | ProductSports | ProductGuides;
};

export default function MoreInfo({ CategoryName, listing }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<userType>();
  const [loading, setLoading] = useState(true);

  function displayItem() {
    switch (CategoryName) {
      case undefined: {
        return <p>Quelque chose s'est mal passé</p>;
      }
      case "Handmades": {
        return <HandmadeCard listing={listing as ProductHandMade} />;
      }
      case "Sports": {
        return <SportsCard listing={listing as ProductSports} />;
      }
      case "Guides": {
        return <GuideCard listing={listing as ProductGuides} />;
      }
      default: {
        return void 0;
      }
    }
  }

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
                {displayItem()}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

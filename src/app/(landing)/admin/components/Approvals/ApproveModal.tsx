import TilesDisplay from "@/components/utils/TilesDisplay";
import Title from "@/components/utils/Title";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  Input,
} from "@nextui-org/react";
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import React from "react";

type Props = {
  item: Approvals;
  isOpen: boolean;
  onOpenChange: () => void;
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function ApproveModal({ item, isOpen, onOpenChange }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey as string,
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Provider Request
            </ModalHeader>
            <ModalBody className="pb-4">
              <div className="max-h-[85vh] overflow-y-auto overflow-auto scrollbar-container px-1">
                <Title>Info</Title>
                <div className="flex flex-row gap-3 items-center">
                  <Input
                    label="Nom de business"
                    isDisabled={true}
                    value={item.bName}
                    size="sm"
                  />
                  <Input
                    label="Télephone de business"
                    isDisabled={true}
                    value={item.bPhone}
                    size="sm"
                  />
                </div>
                <Input
                  label="Type de business"
                  isDisabled={true}
                  value={item.businessType}
                  size="sm"
                  className="my-3"
                />
                <Title>Photos de business</Title>
                <div className="flex flex-row overflow-x-auto gap-2 overflow-auto scrollbar-container w-full">
                  {item.imagesUrl.map((image, i) => (
                    <Image
                      key={i}
                      src={image}
                      width={640}
                      height={640}
                      alt={`${image}-${i}`}
                      className="flex h-[10rem] w-auto object-contain"
                    />
                  ))}
                </div>
                <Title>Map Tiles</Title>
                {!isLoaded ? (
                  <div className="w-full flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="flex flex-row items-center overflow-x-auto gap-2 overflow-auto scrollbar-container w-full">
                    {item.tiles.map((p, i) => (
                      <React.Fragment key={i}>
                        <TilesDisplay p={p} />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

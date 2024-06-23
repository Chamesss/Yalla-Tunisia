import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { cities } from "@/cities";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  itemId: string;
  price: number;
};

export default function CheckOutModal({
  isOpen,
  onOpen,
  onOpenChange,
  itemId,
  price,
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>();

  async function handleCheckOut() {
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 3000);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Pay Check</ModalHeader>
            {loading ? (
              <ModalBody className="min-h-[30rem] flex items-center justify-center">
                <Spinner size="lg" className="mb-10" />
              </ModalBody>
            ) : (
              <>
                {success === true ? (
                  <ModalBody className="min-h-[30rem] flex items-center justify-center">
                    <p>Success !!!</p>
                  </ModalBody>
                ) : (
                  <>
                    {success === false ? (
                      <ModalBody className="min-h-[30rem] flex items-center justify-center">
                        <p>Nope !!!</p>
                      </ModalBody>
                    ) : (
                      <>
                        <ModalBody className="mb-4">
                          <p className="w-full text-center mb-2">
                            Personal Info
                          </p>
                          <div className="flex flex-row gap-2">
                            <Input placeholder="firstname" />
                            <Input placeholder="lastname" />
                          </div>
                          <Autocomplete
                            defaultItems={cities}
                            placeholder="City name.."
                            size="md"
                            value={selectedLocation}
                            name="locationId"
                            onSelectionChange={(key) => {
                              if (key) {
                                setSelectedLocation(
                                  key.toString() || undefined
                                );
                              } else {
                                setSelectedLocation(undefined);
                              }
                            }}
                          >
                            {(city) => (
                              <AutocompleteItem key={city.id}>
                                {city.city}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                          <div className="flex flex-row gap-2">
                            <Input placeholder="city" />
                            <Input placeholder="zip-code" />
                          </div>
                          <Input placeholder="email" />
                          <Input placeholder="phone" />
                          <Divider className="my-4" />
                          <p className="w-full text-center mb-2">Card Info</p>
                          <div className="flex flex-col text-start">
                            <small>
                              Amount to pay:{" "}
                              <span className="font-semibold text-[#309980]">
                                {price} Dt
                              </span>
                            </small>
                            <small>
                              Offer Id:{" "}
                              <span className="font-semibold">{itemId}</span>
                            </small>
                          </div>
                          <Input placeholder="card number" />
                          <div className="flex flex-row gap-2">
                            <Input placeholder="00/00" />
                            <Input placeholder="cvv" />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button color="primary" onPress={handleCheckOut}>
                            Action
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

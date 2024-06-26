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
import Success from "@/components/icons/Success";
import getUserFromCookies from "@/lib/getUserFromCookies";
import createTransactionSport from "@/lib/checkoutActions/create-transaction-sport";
import IconCancelCircled from "@/components/icons/cancel-circle";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  price: number;
  item: { data: Product; ref: string };
  duration: string;
  totalGroup: number;
  selectedDate: string;
};

type Result = {
  success: boolean;
  id?: string;
  message?: string;
};

export default function CheckOutModalSport({
  isOpen,
  onOpen,
  onOpenChange,
  price,
  item,
  duration,
  totalGroup,
  selectedDate,
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>();
  const [transactionId, setTransactionId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCheckOut = async () => {
    setLoading(true);
    const user = await getUserFromCookies();
    if (user) {
      try {
        const result: Result = await createTransactionSport(
          item.data.id,
          item.data.userId,
          user.userId as string,
          price,
          duration,
          totalGroup,
          selectedDate
        );
        if (result.success === true) {
          setSuccess(true);
          setTransactionId(result.id || "");
        } else {
          setMessage(result.message || "");
          setSuccess(false);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setSuccess(false);
      }
    } else {
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Pay Check (Sport)
            </ModalHeader>
            {loading ? (
              <ModalBody className="min-h-[30rem] flex items-center justify-center">
                <Spinner size="lg" className="mb-10" />
              </ModalBody>
            ) : (
              <>
                {success === true ? (
                  <ModalBody className="min-h-[30rem] flex items-center justify-center">
                    <Success className="text-green-500 text-[6rem]" />
                    <p className="text-green-500 text-[1.5rem] font-semibold">
                      Success
                    </p>
                    <p>
                      Transaction id: <b>{transactionId}</b>
                    </p>
                    <div className="w-fit border border-default-300 rounded-lg p-4 space-y-1">
                      <p>
                        Offer: <b>{item.data.title}</b>
                      </p>
                      <p className="flex flex-row items-center gap-1">
                        Date: <b>{selectedDate.toString()}</b>
                      </p>
                      <p>
                        Duration: <b>{duration} hour(s)</b>
                      </p>
                      <p>
                        Group number: <b>{totalGroup}</b>
                      </p>
                    </div>
                  </ModalBody>
                ) : (
                  <>
                    {success === false ? (
                      <ModalBody className="min-h-[30rem] flex items-center justify-center">
                        <IconCancelCircled className="text-danger-500 text-[6rem]" />
                        <p className="text-danger-500 text-[1.5rem] font-semibold">
                          Failed
                        </p>
                        <p>{message}</p>
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
                          <Input placeholder="address" />
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
                              <span className="font-semibold">
                                {item.data.id}
                              </span>
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

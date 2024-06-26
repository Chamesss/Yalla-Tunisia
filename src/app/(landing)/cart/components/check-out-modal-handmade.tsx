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
import createTransactionHandmade from "@/lib/checkoutActions/create-transaction-handmade";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  price: number;
  item: { data: Product; ref: string };
  color: string;
  size: string;
  qte: number;
};

type Result = {
  success: boolean;
  id?: string;
};

export default function CheckOutModalHandmade({
  isOpen,
  onOpen,
  onOpenChange,
  price,
  item,
  color,
  size,
  qte,
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>();
  const [transactionId, setTransactionId] = useState<string>("");

  const handleCheckOut = async () => {
    setLoading(true);
    const user = await getUserFromCookies();
    if (user) {
      try {
        const result: Result = await createTransactionHandmade(
          item.data.id,
          item.data.userId,
          user.userId as string,
          price,
          color,
          size,
          qte
        );
        console.log(result);
        if (result.success === true) {
          setSuccess(true);
          setTransactionId(result.id || "");
        } else {
          setSuccess(false);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setSuccess(false);
      }
    } else {
      console.log("no user");
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
              Pay Check (Handmade)
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
                    <div>
                      <p>
                        Offer: <b>{item.data.title}</b>
                      </p>
                      <p>
                        Color:{" "}
                        {(() => {
                          if (color === "n/a") return color;
                          return "";
                        })()}{" "}
                        <span
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </p>
                      <p>
                        Size: <b>{size}</b>
                      </p>
                    </div>
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
                          <Button color="primary" onClick={handleCheckOut}>
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

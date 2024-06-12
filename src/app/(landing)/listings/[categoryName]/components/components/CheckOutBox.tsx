"use client";
import React, { useEffect, useState } from "react";
import { Divider, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, cartState } from "@/redux/slices/cartSlice";
import ModalWindow from "@/app/Modals/ModalWindow";
import { userState } from "@/redux/slices/userSlice";

type Props = {
  productId: string;
  categoryName: string;
};

export default function CheckOutBox({ productId, categoryName }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [added, setAdded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const user = useSelector(userState);
  const cart = useSelector(cartState);

  console.log("cart state === ", cart);

  useEffect(() => {
    const index = cart.products.findIndex((c) => c.productId === productId);
    if (index > -1) {
      setAdded(true);
    }
  }, [cart]);

  const addToCart = async () => {
    if (!user.isLogged) {
      console.log("not logged in");
      onOpen();
      return;
    } else {
      dispatch(addProductToCart({ productId, categoryName }));
    }
  };

  return (
    <div className="border border-solid w-full border-black border-opacity-10 rounded-lg p-4">
      {/* <div className="flex flex-row items-center">
        <p className="flex-1 text-tiny xs:text-medium">Deliver to</p>
        <Autocomplete
          defaultItems={cities}
          placeholder="Location.."
          size="sm"
          className="w-[60%]"
        >
          {(city) => (
            <AutocompleteItem key={city.value}>{city.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Divider className="my-4" /> */}
      <small className="opacity-80">Estimated time between 24h/48h</small>
      <Divider className="my-4" />
      <div className="flex justify-center">
        <Button
          isDisabled={added}
          onClick={addToCart}
          className="text-md bg-[#48b9ff] text-white dark:bg-[#3d9cd7] px-5 py-2 rounded-full hover:bg-[#41a6e5] dark:hover:bg-[#3688bc]"
        >
          {added ? "Added" : "Add to cart"}
        </Button>
      </div>
      <ModalWindow isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
}

"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import GoogleMapsApiSection from "./GoogleMapsApiSection";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import IconArrowRight from "@/components/icons/RightArrow";
import { useFormState } from "react-dom";
// import { submitServiceCheck } from "@/lib/actions/submitServiceCheck";

const initialState = {
  response: {
    success: false,
    message: "",
    error: 0,
  },
};

export function submitServiceCheck(prevState: any, formData: FormData) {
  const bPhone = formData.get("bnumber");
  const locationChecked = formData.get("addlocation");
  // if (locationChecked === "true") {
  //   const;
  // }
  return {
    response: {
      success: false,
      message: "",
      error: 0,
    },
  };
}

export default function FormService() {
  const [addLocation, setAddLocation] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [formState, formAction] = useFormState(
    submitServiceCheck,
    initialState
  );

  useEffect(() => {}, [initialState]);

  return (
    <div className="p-4 flex items-center justify-center">
      <div className="rounded-xl w-fit flex items-center justify-center flex-col max-w-[45rem]">
        <div className="px-4 py-6 w-full bg-blue-500 rounded-tl-xl rounded-tr-xl">
          <h1 className="text-lg font-semibold text-white text-center">
            Become a Local Artisan: Share Your Craft with the World!
          </h1>
        </div>
        <form
          action={formAction}
          className="w-full p-4 border border-opacity-50 border-t-0 rounded-bl-xl rounded-br-xl"
        >
          <small className="italic opacity-75">
            Welcome to our community of local artisans! We&apos;re thrilled
            you&apos;re interested in showcasing your unique creations with
            tourists and fellow travelers. To get started, please fill out the
            form below with the required details.
          </small>
          <Divider className="my-4" />
          <small className="italic opacity-75">
            <IconArrowRight className="inline-block text-blue-500 mr-2" />
            If your store is already listed on Google Maps, simply check the
            checkbox below this dialogue, then search and select it from the
            dropdown menu.
          </small>
          <br />
          <small className="italic opacity-75">
            <IconArrowRight className="inline-block text-blue-500 mr-2" />
            If your store isn&apos;t listed on Google Maps, then simply enter
            your store&apos;s name.
          </small>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4 w-full px-6 py-4">
            <Input
              name="b-phone"
              variant="underlined"
              labelPlacement="inside"
              label={"Business phone number"}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">+216</span>
                </div>
              }
            />
            <Checkbox
              className="mt-2"
              onChange={(e) => setAddLocation(e.target.checked)}
              value={addLocation ? "true" : "false"}
              name="addlocation"
            >
              <small>Locate my store on Google Maps</small>
            </Checkbox>
            {addLocation && <GoogleMapsApiSection />}
            {!addLocation && <Input placeholder="Store name" />}
          </div>
          <Divider className="my-4" />
          <div className="px-6">
            <Checkbox
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-2"
            >
              <small>I agree to the terms of usage.</small>
            </Checkbox>
          </div>
          <div className="w-full flex flex-row justify-between p-2 mt-10">
            <Button className="bg-danger-500 text-white">Cancel</Button>
            <Button isDisabled={!agreed} className="bg-primary-500 text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

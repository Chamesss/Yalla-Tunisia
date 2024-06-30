"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import GoogleMapsApiSection from "./GoogleMapsApiSection";
import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import IconArrowRight from "@/components/icons/RightArrow";
import { useFormState } from "react-dom";
import { submitProfileCheck } from "@/lib/actions/submitServiceCheck";
import { cities } from "@/cities";
import { Turret_Road } from "next/font/google";

const initialState = {
  response: {
    success: false,
    message: "",
    error: 0,
  },
};

export default function FormService() {
  const [addLocation, setAddLocation] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>();
  const [lat, setLat] = useState<any>();
  const [lng, setLng] = useState<any>();
  const [coords, setCoords] = useState<null | string[]>();
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState(false);

  const [formState, formAction] = useFormState(
    submitServiceCheck,
    initialState
  );

  useEffect(() => {
    if (selectedService === "Guide") {
      setAddLocation(false);
    }
  }, [selectedService]);

  useEffect(() => {
    setCoords(null);
    setLng(null);
    setLat(null);
    setSelectedTiles([]);
    setSelectedImages([]);
  }, [addLocation]);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  async function submitServiceCheck(prevState: any, formData: FormData) {
    const businessType = formData.get("businessType");
    const bPhone = formData.get("bPhone");
    const bName = formData.get("bName");
    if (!businessType) {
      return {
        response: {
          success: false,
          message: "select business type",
          error: 1,
        },
      };
    }
    if (!selectedLocation) {
      return {
        response: {
          success: false,
          message: "select city",
          error: 1,
        },
      };
    }
    if (!bPhone) {
      return {
        response: {
          success: false,
          message: "enter your business phone number",
          error: 2,
        },
      };
    }
    if (!bName) {
      return {
        response: {
          success: false,
          message: "enter your business name",
          error: 3,
        },
      };
    }
    if (addLocation) {
      if (!lat || !lng) {
        return {
          response: {
            success: false,
            message: "please select a location",
            error: 4,
          },
        };
      }
    }

    const data = {
      businessType,
      selectedLocation,
      bPhone,
      bName,
      lat: lat,
      lng: lng,
      imagesUrl: selectedImages,
      tiles: selectedTiles,
    };

    const result = await submitProfileCheck(data);

    if (result) {
      return {
        response: {
          success: true,
          message: "Success !!",
          error: 0,
        },
      };
    } else {
      return {
        response: {
          success: false,
          message: "internal server error",
          error: 7,
        },
      };
    }
  }

  useEffect(() => {
    if (
      formState.response &&
      formState.response.error === 0 &&
      formState.response.success
    ) {
      window.location.reload();
    }
  }, [formState.response]);

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
          <div className="px-6">
            <RadioGroup
              onChange={(e) => setSelectedService(e.target.value)}
              className="text-sm"
              label="Select your business type*"
              name="businessType"
            >
              <Radio size="sm" className="text-sm" value="Handmade">
                Handmade Business
              </Radio>
              <Radio size="sm" className="text-sm" value="Sports">
                Sports & Entertainment Business
              </Radio>
              <Radio size="sm" className="text-sm" value="Guide">
                Guide Service
              </Radio>
            </RadioGroup>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4 w-full px-6 py-4">
            <Autocomplete
              label={"City"}
              labelPlacement="outside"
              defaultItems={cities}
              placeholder="City name.."
              size="md"
              className="px-4"
              value={selectedLocation}
              name="locationId"
              onSelectionChange={(key) => {
                if (key) {
                  setSelectedLocation(key.toString() || undefined);
                } else {
                  setSelectedLocation(undefined);
                }
              }}
            >
              {(city) => (
                <AutocompleteItem key={city.id}>{city.city}</AutocompleteItem>
              )}
            </Autocomplete>
            <Input
              name="bPhone"
              variant="underlined"
              labelPlacement="inside"
              label={"Business phone number"}
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">+216</span>
                </div>
              }
            />
            <Input
              variant="underlined"
              labelPlacement="inside"
              label={"Business name"}
              placeholder="enter business name"
              name="bName"
            />
            <Checkbox
              className="mt-2"
              isDisabled={selectedService === "Guide"}
              onChange={(e) => setAddLocation(e.target.checked)}
              name="addlocation"
              isSelected={addLocation}
            >
              <small>Locate my store on Google Maps</small>
            </Checkbox>
            {addLocation && (
              <GoogleMapsApiSection
                lat={lat}
                lng={lng}
                setLat={setLat}
                setLng={setLng}
                coords={coords}
                setCoords={setCoords}
                selectedTiles={selectedTiles}
                setSelectedTiles={setSelectedTiles}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            )}
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
          {formState.response.error !== 0 &&
            formState.response.success === false && (
              <small className="italic text-danger-500 px-6">
                {formState.response.message}
              </small>
            )}
          <div className="w-full flex flex-row justify-between p-2 mt-10">
            <Button className="bg-danger-500 text-white">Cancel</Button>
            <Button
              isDisabled={!agreed}
              type="submit"
              className="bg-primary-500 text-white"
            >
              {formState.response.error === 0 &&
              formState.response.success === true
                ? "Success"
                : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
          message: "Sélectionnez le type de business",
          error: 1,
        },
      };
    }
    if (!selectedLocation) {
      return {
        response: {
          success: false,
          message: "Sélectionnez la ville",
          error: 1,
        },
      };
    }
    if (!bPhone) {
      return {
        response: {
          success: false,
          message: "Veuillez entrer votre numéro de téléphone professionnel.",
          error: 2,
        },
      };
    }
    if (!bName) {
      return {
        response: {
          success: false,
          message: "Veuillez entrer votre nom de business ou magasin",
          error: 3,
        },
      };
    }
    if (addLocation) {
      if (!lat || !lng) {
        return {
          response: {
            success: false,
            message: "Veuillez sélectionner un emplacement.",
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
            Devenez un artisan local : Partagez votre savoir-faire avec le
            monde!
          </h1>
        </div>
        <form
          action={formAction}
          className="w-full p-4 border border-opacity-50 border-t-0 rounded-bl-xl rounded-br-xl"
        >
          <small className="italic opacity-75">
            Bienvenue dans notre communauté d&apos;artisans locaux ! Nous sommes
            ravis que vous souhaitiez présenter vos créations uniques aux
            touristes et aux autres voyageurs. Pour commencer, veuillez remplir
            le formulaire ci-dessous avec les détails requis.
          </small>
          <Divider className="my-4" />
          <small className="italic opacity-75">
            <IconArrowRight className="inline-block text-blue-500 mr-2" />
            Si votre magasin est déjà répertorié sur Google Maps, cochez
            simplement la case ci-dessous, puis recherchez et sélectionnez-le
            dans le menu déroulant.
          </small>
          <br />
          <small className="italic opacity-75">
            <IconArrowRight className="inline-block text-blue-500 mr-2" />
            Si votre magasin n&apos;est pas répertorié sur Google Maps, entrez
            simplement le nom de votre magasin.
          </small>
          <Divider className="my-4" />
          <div className="px-6">
            <RadioGroup
              onChange={(e) => setSelectedService(e.target.value)}
              className="text-sm"
              label="Sélectionnez le type de votre business*"
              name="businessType"
            >
              <Radio size="sm" className="text-sm" value="Handmade">
                Fait à main
              </Radio>
              <Radio size="sm" className="text-sm" value="Sports">
                Sports et Loisir
              </Radio>
              <Radio size="sm" className="text-sm" value="Guide">
                Guide
              </Radio>
            </RadioGroup>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4 w-full px-6 py-4">
            <Autocomplete
              label={"Ville"}
              labelPlacement="outside"
              defaultItems={cities}
              placeholder="Nom de la ville..."
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
              label={"Numéro de téléphone professionnel"}
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
              label={"Nom de business"}
              placeholder="Entrer votre nom de business ou magasin"
              name="bName"
            />
            <Checkbox
              className="mt-2"
              isDisabled={selectedService === "Guide"}
              onChange={(e) => setAddLocation(e.target.checked)}
              name="addlocation"
              isSelected={addLocation}
            >
              <small>Localiser mon magasin sur Google Maps</small>
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
              <small>J'accepte les conditions d'utilisation.</small>
            </Checkbox>
          </div>
          {formState.response.error !== 0 &&
            formState.response.success === false && (
              <small className="italic text-danger-500 px-6">
                {formState.response.message}
              </small>
            )}
          <div className="w-full flex flex-row justify-between p-2 mt-10">
            <Button className="bg-danger-500 text-white">Annuler</Button>
            <Button
              isDisabled={!agreed}
              type="submit"
              className="bg-primary-500 text-white"
            >
              {formState.response.error === 0 &&
              formState.response.success === true
                ? "Success"
                : "Soumettre"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

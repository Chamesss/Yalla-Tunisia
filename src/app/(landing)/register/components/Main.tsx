"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { cities } from "@/cities";
import {
  Button,
  Input,
  ScrollShadow,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { addUser } from "@/app/Modals/ActionRegister";
import LeftSection from "./LeftSection";
import IconEyeInvisible from "@/components/icons/EyeClosed";
import IconEye from "@/components/icons/EyeOpened";
import UserIcon from "@/components/icons/UserIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import KeyPasswordIcon from "@/components/icons/KeyPasswordIcon";
import Location from "@/components/icons/Location";
import LocationPicker from "./LocationPicker";
// import LocationPicker from "./LocationPicker";

export default function Main() {
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [formState, formAction] = useFormState(addUser, null);
  const [isVisible, setIsVisible] = useState(false);
  const [cityName, setCityName] = useState<string | null>(null);
  const [cityLat, setCityLat] = useState<string | null>(null);
  const [cityLng, setCityLng] = useState<string | null>(null);
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);

  //handle autocomplete
  useEffect(() => {
    const filterOptions = cities
      .filter((option) =>
        option.city.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .map((option) => option.city);
    setFilteredOptions(filterOptions);
  }, [searchTerm, cities]);

  //handleLocationTyping
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
    setSearch(event.target.value);
  };

  //handleLocationSelection
  const handleOptionSelect = (option: React.SetStateAction<string>) => {
    setSearchTerm(option);
    setSearch("");
  };

  //handlePhotoSelection
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCitySelection = (key: React.Key) => {
    const [city] = cities.filter((c) => c.id === (key as string));
    if (city) {
      setActiveAreaId(city.id);
      setCityName(city.city);
      setCityLat(city.lat);
      setCityLng(city.lng);
    } else {
      setActiveAreaId(null);
      setCityName(null);
      setCityLat(null);
      setCityLng(null);
    }
  };

  return (
    <div className="flex p-4 justify-evenly items-center">
      <div className="w-fit">
        <LeftSection />
      </div>
      <ScrollShadow className="scrollbar-container w-[30%]  max-h-[80vh]">
        <form
          className="flex flex-col justify-center items-center gap-2 w-full"
          autoComplete="off"
          action={formAction}
        >
          <div className="flex items-center justify-center flex-col w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photoInput"
              name="picture"
            />
            <label htmlFor="photoInput" className="cursor-pointer">
              <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {selectedPhoto ? (
                  <img
                    src={selectedPhoto}
                    alt="Selected Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-12 w-12 mx-auto text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </div>
            </label>
            <p className="mt-4 text-gray-600">Click to select a photo</p>
          </div>
          <Input
            className="w-[100%]"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            variant="underlined"
            label="Firstname"
            required
            autoComplete=""
            aria-autocomplete="both"
            aria-haspopup="false"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
            name="firstname"
            size="sm"
            startContent={
              <UserIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
          />
          <Input
            className="max-w-sm"
            variant="underlined"
            label="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            autoComplete="off"
            type="text"
            name="lastname"
            size="sm"
            startContent={
              <UserIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
          />
          <Input
            className="w-full"
            variant="underlined"
            placeholder="Exemple@mail.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
            autoComplete="off"
            type="email"
            size="sm"
            startContent={
              <EmailIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
          />
          <Input
            label="Password"
            value={password}
            variant="underlined"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <IconEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IconEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-sm"
            startContent={
              <KeyPasswordIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
          />
          <Input
            label="Confirm password"
            value={confirmPassword}
            variant="underlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <IconEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IconEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-sm"
            startContent={
              <KeyPasswordIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
          />
          <Autocomplete
            onSelectionChange={(key: React.Key) => handleCitySelection(key)}
            label="Enter you city"
            className="w-full"
            variant="underlined"
            selectedKey={activeAreaId}
            size="sm"
            startContent={
              <Location className="text-lg text-default-400 pointer-events-none mr-1" />
            }
          >
            {cities.map((c) => (
              <AutocompleteItem key={c.id} value={c.city}>
                {c.city}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <LocationPicker
            setCityName={setCityName}
            setCityLat={setCityLat}
            setCityLng={setCityLng}
            setActiveAreaId={setActiveAreaId}
            activeAreaId={activeAreaId}
          />
          <Button
            className="w-[95%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
            size="lg"
            type="submit"
          >
            {formState === null ? (
              "Register"
            ) : formState?.success ? (
              <span>user Created !</span>
            ) : (
              <span>user creation failed...</span>
            )}
          </Button>
          <p className="text-[#41a6e5] cursor-pointer hover:underline">
            Login instead?
          </p>
        </form>
      </ScrollShadow>
    </div>
  );
}

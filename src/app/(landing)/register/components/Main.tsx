"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { cities } from "@/cities";
import { Button, Input } from "@nextui-org/react";
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

  return (
    <div className="flex p-8 justify-evenly items-center">
      <div className="w-fit">
        <LeftSection />
      </div>
      <div className="w-[25%]">
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
          <LocationPicker />

          {/* <div className="relative w-full flex justify-center mb-10">
            <Input
              variant="underlined"
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full"
              label="Location"
              name="location"
              size="sm"
              startContent={
                <Location className="text-lg text-default-400 pointer-events-none mr-1" />
              }
            />
            {search && (
              <ul className="absolute z-10 top-full w-[90%] left-0 right-0 mx-auto bg-white border border-gray-300 rounded-md shadow-md mt-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <li
                      key={option}
                      className="hover:bg-gray-100 dark:hover:bg-gray-300 dark:text-black px-3 py-2 cursor-pointer "
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="dark:text-black px-3 py-2">
                    No results found
                  </li>
                )}
              </ul>
            )}
          </div> */}
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
      </div>
    </div>
  );
}

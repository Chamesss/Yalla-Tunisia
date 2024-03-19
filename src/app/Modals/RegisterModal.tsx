"use client";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { cities } from "@/cities";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { addUser } from "./ActionRegister";

interface LoginModalProps {
  setRegister: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterModal({ setRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [formState, formAction] = useFormState(addUser, null);

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
      console.log(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center gap-4"
        autoComplete="off"
        action={formAction}
      >
        <div className="flex items-center justify-center flex-col">
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
        <div className="flex flex-row gap-4 w-full justify-center">
          <Input
            className="w-[100%]"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            variant={"bordered"}
            label="Firstname"
            required
            autoComplete=""
            aria-autocomplete="both"
            aria-haspopup="false"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
            name="firstname"
          />
          <Input
            className="max-w-sm"
            variant={"bordered"}
            label="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            autoComplete="off"
            type="text"
            name="lastname"
          />
        </div>
        <Input
          className="w-full"
          variant={"bordered"}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          required
          autoComplete="off"
          type="email"
        />

        <div className="relative w-full flex justify-center mb-10">
          <Input
            variant={"bordered"}
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full"
            label="Location"
            name="location"
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
                <li className="dark:text-black px-3 py-2">No results found</li>
              )}
            </ul>
          )}
        </div>
        <Button
          className="mt-1 w-[95%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
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
        <p
          className="text-[#41a6e5] cursor-pointer hover:underline"
          onClick={() => setRegister(false)}
        >
          Login instead?
        </p>
      </form>
    </div>
  );
}

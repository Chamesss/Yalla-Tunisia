"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { cities } from "@/cities";
import { db, auth } from "../../../firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";

interface LoginModalProps {
  setRegister: Dispatch<SetStateAction<boolean>>; // Type the prop
}

export default function RegisterModal({ setRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState(""); // For location selection
  const [otherCustomizations, setOtherCustomizations] = useState({}); // For other user details
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [search, setSearch] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //   setIsLoading(true);
    //   setError(null); // Clear previous errors when a new request starts
    console.log("aaaa");
    console.log(event);
    try {
      const formData = new FormData(event.currentTarget);
      console.log(formData);
      return;
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      // setError(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    const filterOptions = cities
      .filter((option) =>
        option.city.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .map((option) => option.city); // Extracting city names
    setFilteredOptions(filterOptions);
  }, [searchTerm, cities]);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
    setSearch(event.target.value);
  };

  const handleOptionSelect = (option: React.SetStateAction<string>) => {
    setSearchTerm(option);
    setSelectedOption(option);
    setSearch("");
  };

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
        onSubmit={onSubmit}
      >
        <div className="flex items-center justify-center flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photoInput"
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
            className="w-[100%] bg-white/10 rounded-xl"
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
            className="max-w-sm bg-white/10 rounded-xl"
            variant={"bordered"}
            label="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            autoComplete="off"
            type="text"
          />
        </div>
        <Input
          className="w-full bg-white/10 rounded-xl"
          variant={"bordered"}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          type="text"
          name="email"
        />

        <div className="relative w-full flex justify-center mb-10">
          <Input
            variant={"bordered"}
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full bg-white/10 rounded-xl"
            label="Location"
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
        <button
          className="mt-1 w-[95%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
          size="lg"
          type="submit"
        >
          Register
        </button>
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

//   const handleSubmit = async (event: { preventDefault: () => void }) => {
//     event.preventDefault();

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // Add custom user data to Firestore (optional)
//       const userRef = doc(collection(db, "users"), userCredential.user.uid);
//       await setDoc(userRef, {
//         email,
//         city,
//         ...otherCustomizations, // Add other fields as needed
//       });

//       console.log("User created successfully!", userCredential.user);
//       // Handle successful registration (e.g., redirect to login page)
//     } catch (error) {
//       console.error("Registration failed:", error);
//       // Handle registration errors (e.g., display error message to user)
//     }
//   };

"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { cities } from "@/cities";
import {
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Spinner,
  Divider,
} from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import addUser from "@/lib/actions/createUser";
import LeftSection from "./LeftSection";
import UserIcon from "@/components/icons/UserIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import Location from "@/components/icons/Location";
import LocationPicker from "./LocationPicker";
import PasswordHandle from "./PasswordHandle";

const initialState = {
  response: {
    success: false,
    message: "",
    error: 0,
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Main() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [formState, formAction] = useFormState(addUser, initialState);
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<boolean | null>(null);
  const [fromError, setFromError] = useState<boolean | string | null>(null);

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
    city ? setActiveAreaId(city.id) : setActiveAreaId(null);
  };

  const submitForm = (formData: FormData) => {
    setFromError(null);
    !usernameError &&
    !emailError &&
    !passwordError &&
    passwordMatch &&
    activeAreaId
      ? formAction(formData)
      : setFromError(true);
  };

  useEffect(() => {
    setFromError(null);
  }, [username, email, password, confirmPassword, activeAreaId]);

  useEffect(() => {
    formState.response.error === 5 && setFromError(true);
  }, [formState]);

  return (
    <div className="flex px-8 py-4 justify-evenly items-center">
      <div className="w-[70%] h-full hidden lg:block">
        <LeftSection />
      </div>
      <div className="scrollbar-container overflow-y-scroll w-fit lg:w-[30%] border border-opacity-50 rounded-xl p-6 max-h-[80vh]">
        <form
          className="flex flex-col justify-center gap-4 w-full"
          action={(formData) => submitForm(formData)}
          autoComplete="off"
        >
          <h1 className="mb-2 text-xl font-bold">Sign Up</h1>
          <input
            className="absolute hidden"
            name="activeAreaId"
            value={activeAreaId || ""}
          />
          {/* <div className="flex items-center justify-center flex-col w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photoInput"
              name="picture"
            />
            <label htmlFor="photoInput" className="cursor-pointer">
              <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-2">
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
          </div> */}
          <Input
            className="w-[100%]"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() =>
              username.length > 0 &&
              username.length < 3 &&
              setUsernameError(true)
            }
            onFocus={() => setUsernameError(null)}
            variant="underlined"
            label="Username"
            required
            autoComplete=""
            aria-autocomplete="both"
            aria-haspopup="false"
            autoCorrect="off"
            spellCheck="false"
            autoCapitalize="off"
            name="username"
            size="md"
            startContent={
              <UserIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
            description={
              usernameError && (
                <small className="text-danger-500">
                  enter a valid username
                </small>
              )
            }
          />
          <Input
            className="w-full"
            variant="underlined"
            onBlur={() =>
              email.length > 0 && !emailRegex.test(email) && setEmailError(true)
            }
            onFocus={() => setEmailError(null)}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
            autoComplete="off"
            type="email"
            size="md"
            startContent={
              <EmailIcon className="text-lg text-default-400 pointer-events-none mr-1" />
            }
            description={
              emailError && (
                <small className="text-danger-500">enter a valid email</small>
              )
            }
          />
          <PasswordHandle
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            setPasswordError={setPasswordError}
            setPasswordMatch={setPasswordMatch}
            passwordMatch={passwordMatch}
            passwordError={passwordError}
          />
          <Autocomplete
            onSelectionChange={(key: React.Key) => handleCitySelection(key)}
            label="Enter you city (or select from the map)"
            className="w-full"
            variant="underlined"
            selectedKey={activeAreaId}
            size="md"
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
            setActiveAreaId={setActiveAreaId}
            activeAreaId={activeAreaId}
          />
          <Button
            className="w-[100%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
            size="lg"
            type="submit"
          >
            Register
          </Button>
          {fromError && (
            <>
              {formState.response.error === 5 ? (
                <small className="text-danger-500">
                  {formState.response.message as string}
                </small>
              ) : (
                <small className="text-danger-500">check your info</small>
              )}
            </>
          )}
          <p className="text-[#41a6e5] text-center mt-4 py-2 cursor-pointer hover:underline">
            Login instead?
          </p>
        </form>
      </div>
    </div>
  );
}

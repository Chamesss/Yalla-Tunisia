"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { cities } from "@/cities";
import {
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import addUser from "@/lib/actions/createUser";
import UserIcon from "@/components/icons/UserIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import Location from "@/components/icons/Location";
import LocationPicker from "./LocationPicker";
import PasswordHandle from "./PasswordHandle";
import { useDispatch } from "@/redux/store";
import { loginUser } from "@/lib/actions/userLogin";
import EntireScreenLoading from "@/components/utils/EntireScreenLoading";
import { addUserSession } from "@/redux/slices/userSlice";
import ModalWindow from "@/app/Modals/ModalWindow";

const initialState = {
  response: {
    success: false,
    message: "",
    error: 0,
  },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MainRegister() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, formAction] = useFormState(addUser, initialState);
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<boolean | null>(null);
  const [fromError, setFromError] = useState<boolean | string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleCitySelection = (key: React.Key | null) => {
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
      ? (setRegisterLoading(true), formAction(formData))
      : setFromError(true);
  };

  useEffect(() => {
    setFromError(null);
  }, [username, email, password, confirmPassword, activeAreaId]);

  useEffect(() => {
    setRegisterLoading(false);
    formState.response.error === 5 && setFromError(true);
    if (formState.response.error === 0 && formState.response.success === true) {
      setLoading(true);
      (async () => {
        const result = await loginUser(email, password);
        result &&
          dispatch(
            addUserSession({
              user: result.user,
              isLogged: true,
              userId: result.userId,
            })
          );
        result && setLoading(false);
        window.location.replace("/");
      })();
    }
  }, [formState]);

  return (
    <div className="flex px-4 xs:px-8 py-4 justify-evenly items-center">
      {loading && <EntireScreenLoading />}
      {/* <div className="w-[70%] h-full hidden lg:block">
        <LeftSection />
      </div> */}
      <div className="max-w-[50rem] w-full flex justify-center">
        <form
          className="flex flex-col justify-center items-center gap-4 w-full"
          action={(formData) => submitForm(formData)}
          autoComplete="off"
        >
          <h1 className="mb-4 mt-4 text-2xl font-bold text-center text-[#3688bc]">
            SIGN UP
          </h1>
          <input
            className="absolute hidden"
            name="activeAreaId"
            value={activeAreaId || ""}
          />

          <div className="flex md:flex-row flex-col gap-10 w-fit md:w-full !justify-center !items-start">
            <div className="flex flex-col gap-10 w-full md:w-fit">
              <div className="flex flex-1 flex-col space-y-4 rounded-xl shadow !h-fit px-6 xs:px-8 sm:px-12 py-10 relative overflow-hidden">
                <h1 className="text-start text-lg font-semibold ml-1">
                  Account Info
                </h1>
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
                    email.length > 0 &&
                    !emailRegex.test(email) &&
                    setEmailError(true)
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
                      <small className="text-danger-500">
                        enter a valid email
                      </small>
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
              </div>
              <div className="hidden md:block">
                <Button
                  className="w-[100%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
                  size="lg"
                  type="submit"
                >
                  {registerLoading ? <Spinner color="warning" /> : "Register"}
                </Button>
                {fromError && (
                  <div className="w-full py-1 flex items-center">
                    <small className="capitalize text-danger-500 w-full text-center mt-1">
                      {formState.response.error === 5 ? (
                        <>{formState.response.message as string}</>
                      ) : (
                        "check your info"
                      )}
                    </small>
                  </div>
                )}
                <p
                  onClick={onOpen}
                  className="text-[#41a6e5] text-center mt-4 py-2 cursor-pointer hover:underline"
                >
                  Login instead?
                </p>
              </div>
            </div>
            <div className="flex relative overflow-hidden flex-1 flex-col space-y-4 rounded-xl shadow h-fit px-6 xs:px-8 sm:px-12 py-10">
              <h1 className="text-start text-lg font-semibold ml-1">
                Location
              </h1>
              <Autocomplete
                onSelectionChange={(key: React.Key | null) =>
                  handleCitySelection(key)
                }
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
              <div className="p-4 !-mt-4">
                <LocationPicker
                  setActiveAreaId={setActiveAreaId}
                  activeAreaId={activeAreaId}
                />
              </div>
            </div>
            <div className="block md:hidden w-full">
              <Button
                className="w-[100%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
                size="lg"
                type="submit"
              >
                {registerLoading ? <Spinner color="warning" /> : "Register"}
              </Button>
              {fromError && (
                <div className="w-full py-1 flex items-center">
                  <small className="capitalize text-danger-500 w-full text-center mt-1">
                    {formState.response.error === 5 ? (
                      <>{formState.response.message as string}</>
                    ) : (
                      "check your info"
                    )}
                  </small>
                </div>
              )}
              <p
                onClick={onOpen}
                className="text-[#41a6e5] text-center mt-4 py-2 cursor-pointer hover:underline"
              >
                Login instead?
              </p>
            </div>
          </div>
        </form>
      </div>
      <ModalWindow isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
}

//  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

//handlePhotoSelection
// const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = reader.result as string;
//       setSelectedPhoto(result);
//     };
//     reader.readAsDataURL(file);
//   }
// };

{
  /* <div className="flex items-center justify-center flex-col w-full">
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
          </div> */
}

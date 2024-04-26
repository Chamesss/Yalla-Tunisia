import IconEyeInvisible from "@/components/icons/EyeClosed";
import IconEye from "@/components/icons/EyeOpened";
import KeyPasswordIcon from "@/components/icons/KeyPasswordIcon";
import { Input } from "@nextui-org/react";
import { useState, Dispatch, SetStateAction } from "react";

type Props = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  setPasswordError: Dispatch<SetStateAction<boolean>>;
  setPasswordMatch: Dispatch<SetStateAction<boolean | null>>;
  passwordMatch: boolean | null;
  passwordError: boolean;
};

export default function PasswordHandle({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setPasswordError,
  setPasswordMatch,
  passwordMatch,
  passwordError,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirmPasswordBlur = () => {
    if (password !== "" && confirmPassword !== "") {
      setPasswordMatch(password === confirmPassword);
    }
  };

  const checkPasswordIntegrity = () => {
    if (password.length === 0) return;
    if (password.length < 8) {
      setPasswordError(true);
    }
  };

  return (
    <>
      <Input
        autoComplete="new-password"
        label="Password"
        value={password}
        variant="underlined"
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setPasswordError(false)}
        onBlur={checkPasswordIntegrity}
        size="md"
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
        description={
          passwordError && (
            <small className="text-danger-500">
              password my be greater then 8
            </small>
          )
        }
      />
      <Input
        label="Confirm password"
        value={confirmPassword}
        variant="underlined"
        onChange={(e) => setConfirmPassword(e.target.value)}
        name="confirmPassword"
        onFocus={() => setPasswordMatch(null)}
        onBlur={handleConfirmPasswordBlur}
        size="md"
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
        description={
          passwordMatch === false && (
            <small className="text-danger-500">passwords does not match</small>
          )
        }
      />
    </>
  );
}

"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
} from "@nextui-org/react";
import IconEyeInvisible from "@/components/icons/EyeClosed";
import IconEye from "@/components/icons/EyeOpened";
import Link from "next/link";

interface LoginModalProps {
  setRegister: Dispatch<SetStateAction<boolean>>; // Type the prop
}

export default function LoginModal({ setRegister }: LoginModalProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <Input
        type="email"
        value={email}
        className="max-w-sm"
        variant={"bordered"}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        value={password}
        variant="bordered"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
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
      />
      <div className="w-[95%] justify-between flex flex-row items-center">
        <div>
          <Checkbox defaultSelected>Remember me</Checkbox>
        </div>
        <div>
          <Link href={"#"} className="text-[#41a6e5]">
            Forgot password?
          </Link>
        </div>
      </div>
      <Button
        className="mt-1 w-[95%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
        size="lg"
      >
        Login
      </Button>
      <p className="mt-2">
        Dont have an account?{" "}
        <span
          className="text-[#41a6e5] cursor-pointer hover:underline"
          onClick={() => setRegister(true)}
        >
          Register.
        </span>
      </p>
    </>
  );
}

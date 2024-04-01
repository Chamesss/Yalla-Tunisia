"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Input, Checkbox } from "@nextui-org/react";
import IconEyeInvisible from "@/components/icons/EyeClosed";
import IconEye from "@/components/icons/EyeOpened";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Login } from "./ActionRegister";
import { useDispatch } from "@/redux/store";

interface LoginModalProps {
  setRegister: Dispatch<SetStateAction<boolean>>; // Type the prop
}

export default function LoginModal({ setRegister }: LoginModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, formAction] = useFormState(handleLogin, null);
  const dispatch = useDispatch();

  async function handleLogin(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const res = await Login({ email, password, dispatch });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      action={formAction}
      className="w-full flex flex-col gap-4 items-center"
    >
      <Input
        type="email"
        value={email}
        className="max-w-sm"
        variant={"bordered"}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <Input
        label="Password"
        value={password}
        variant="bordered"
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
        type="submit"
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
    </form>
  );
}

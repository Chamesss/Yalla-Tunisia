"use client";
import { useState } from "react";
import { Button, Input, Checkbox, Spinner } from "@nextui-org/react";
import IconEyeInvisible from "@/components/icons/EyeClosed";
import IconEye from "@/components/icons/EyeOpened";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { loginUser } from "@/lib/actions/userLogin";
import { useDispatch } from "@/redux/store";
import { addUserSession } from "@/redux/slices/userSlice";

export default function LoginModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, formAction] = useFormState(handleLogin, null);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState<boolean | undefined>();
  const [error, setError] = useState<any>();

  function Submit() {
    const status = useFormStatus();
    return (
      <Button
        className="mt-1 w-[95%] bg-[#41a6e5] text-white dark:hover:bg-[#3688bc]"
        size="lg"
        type="submit"
        isDisabled={success}
      >
        {success ? (
          "Redirecting..."
        ) : (
          <>{status.pending ? <Spinner color="white" /> : "Login"}</>
        )}
      </Button>
    );
  }

  async function handleLogin(prevState: any, formData: FormData) {
    setError(undefined);
    setSuccess(undefined);
    const address = formData.get("email") as string;
    const email = String(address).trim().toLowerCase();
    const password = formData.get("password") as string;
    try {
      const result = await loginUser(email, password);
      if (result.success === true) {
        setSuccess(true);
        dispatch(
          addUserSession({
            user: result.user,
            isLogged: true,
            userId: result.userId,
          })
        );
        window.location.reload();
      } else {
        if (result.error === "Firebase: Error (auth/invalid-credential).") {
          setError("Invalid credentials.");
        } else if (result.error?.includes("(auth/too-many-requests)")) {
          setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
        }
      }
    } catch (e) {
      setError(e);
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
      {error && <small className="text-danger-500">{error}</small>}
      <Submit />
      <p className="mt-2">
        Dont have an account?{" "}
        <Link
          href={"/register"}
          className="text-[#41a6e5] cursor-pointer hover:underline"
        >
          Register.
        </Link>
      </p>
    </form>
  );
}

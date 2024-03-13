import React from "react";
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

export default function LoginModal({ isOpen, onOpenChange }: any) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="self-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Login
          </ModalHeader>
          <ModalBody className="flex items-center py-10">
            <Input
              type="email"
              className="max-w-sm"
              variant={"bordered"}
              label="Email"
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
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
              <Link className="text-[#41a6e5]" href="#">
                Register.
              </Link>
            </p>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}

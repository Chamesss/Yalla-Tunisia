import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  useDisclosure,
  Input,
  Tooltip,
  Divider,
} from "@nextui-org/react";
import EditButton from "../EditButton";
import { handleChangePassword } from "@/lib/UserActions/editProfile/ChangePassword";
import { useFormState } from "react-dom";

const initialState = {
  response: {
    success: false,
    message: "",
    error: 0,
  },
};

export default function SecurityModal({ user }: { user: userType }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState(user.email);
  const [formState, formAction] = useFormState(
    handleChangePassword,
    initialState
  );

  useEffect(() => {
    isOpen === false && setError("");
  }, [isOpen]);

  useEffect(() => {
    if (formState.response.error !== 0) {
      setError(formState.response.message);
    } else if (
      formState.response.error === 0 &&
      formState.response.success === true
    ) {
      setError("");
      onOpen();
    }
  }, [formState]);

  const validateData = (payload: FormData) => {
    const email = payload.get("email") as string;
    const password = payload.get("new-password") as string;
    const confirmPassword = payload.get("confirm-new-password") as string;
    if (!password || !confirmPassword || !email) {
      setError("Please fill the form correctly");
      return;
    }
    if (password.length < 7) {
      setError("Password length must be greater then 8 chars");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords must be identical");
      return;
    }
    formAction(payload);
  };

  return (
    <>
      <div
        className="w-full justify-between flex flex-row items-center"
        onClick={onOpen}
      >
        <h1 className="text-xl font-bold tracking-wide">Sécurité</h1>
        <Tooltip content="Edit" color="primary">
          <div>
            <EditButton />
          </div>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form action={(formData) => validateData(formData)}>
              <ModalHeader className="flex flex-col gap-1">
                Sécurité
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  <Input
                    required
                    type="email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Divider className="my-4" />
                  <Input
                    required
                    type="password"
                    name="new-password"
                    label={"Nouveau mot de passe"}
                  />
                  <Input
                    required
                    type="password"
                    name="confirm-new-password"
                    label={"Confirmer le nouveau mot de passe"}
                  />
                </div>
                {error.length > 0 && (
                  <small className="text-danger-500">{error}</small>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary">
                  {loading ? <Spinner color="warning" /> : "Enregistrer"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import { banUser } from "@/lib/adminActions/banUser";
import { deleteUserById } from "@/lib/adminActions/deleteUserById";
import { unBanUser } from "@/lib/adminActions/unBanUser";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  User,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Props = {
  user: userType | undefined;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  action: string | undefined;
};

export default function DeleteUserModal({
  user,
  isOpen,
  onOpen,
  onClose,
  success,
  setSuccess,
  action,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const handleDeleteUser = async () => {
    try {
      if (user && user.id) {
        const result = await deleteUserById(user.id);
        if (result) {
          setSuccess(true);
        }
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async () => {
    try {
      if (user && user.id) {
        const result = await banUser(user.id);
        if (result) {
          setSuccess(true);
        }
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUnBanUser = async () => {
    try {
      if (user && user.id) {
        const result = await unBanUser(user.id);
        if (result) {
          setSuccess(true);
        }
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    success &&
      setTimeout(() => {
        onClose();
      }, 3000);
  }, [success]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "delete" && "Delete"}
                {action === "ban" && "Ban"}
                {action === "unban" && "Unban"}
                confirmation
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to {action === "delete" && "delete"}
                  {action === "ban" && "ban"}
                  {action === "unban" && "unban"} this profile?
                </p>
                <Divider className="my-2" />
                {user && (
                  <User
                    avatarProps={{ radius: "lg", src: user.picture }}
                    description={user.email}
                    name={user.username}
                    className="w-full justify-start px-4"
                  >
                    {user.email}
                  </User>
                )}
                <Divider className="my-2" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setLoading(true);
                    if (action === "delete") {
                      handleDeleteUser();
                    } else if (action === "ban") {
                      handleBanUser();
                    } else if (action === "unban") {
                      handleUnBanUser();
                    }
                  }}
                >
                  {loading && <Spinner color="warning" />}
                  {success && "Success"}
                  {error && "Error"}
                  {!loading && !success && !error && "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

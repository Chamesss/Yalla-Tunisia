import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { updateUserPicture } from "@/lib/UserActions/editProfile/ChangeProfilePicture";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  current: string;
  id: string;
};

export default function ChangePictureModal({
  isOpen,
  onOpen,
  onOpenChange,
  current,
  id,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(current);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen === false) {
      setSelectedImage(current);
    }
  }, [isOpen]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (imageFile) {
        const result = await updateUserPicture(id, imageFile);
        if (result) {
          onOpen();
        } else {
          setError(true);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Change Profile Picture
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-4">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span>No Image Selected</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex items-center justify-center cursor-pointer bg-default-100 p-2 rounded-xl"
                />
              </div>
              {error && (
                <small className="text-danger-500">Something went wrong.</small>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isDisabled={selectedImage === current || selectedImage === null}
                color="primary"
                onPress={handleSave}
              >
                {loading ? <Spinner color="warning" /> : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

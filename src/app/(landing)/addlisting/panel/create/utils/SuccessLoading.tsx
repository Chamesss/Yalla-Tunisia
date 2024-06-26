import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FormStatus } from "react-dom";
import { useRouter } from "next/navigation";

type Props = {
  formState: creationFromStatus;
};

export default function SuccessLoading({ formState }: Props) {
  const [success, setSuccess] = useState<boolean>(formState.response.success);
  const router = useRouter();

  useEffect(() => {
    setSuccess(formState.response.success);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    formState.response.success &&
      setTimeout(() => {
        router.replace("/addlisting/panel");
      }, 3800);
  }, [formState]);

  return (
    <div
      className={`fixed w-screen top-0 left-0 z-[9999] h-screen bg-black/60 ${
        success ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ${
        success ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="flex w-full h-full px-8 py-8 items-center justify-center">
        <div className="w-[50%] flex items-center justify-center flex-row h-[20%] z-20 bg-white shadow-lg rounded-lg px-4 py-2 gap-4">
          {formState.response.success ? (
            <p className="text-lg font-semibold">Succès ✔️</p>
          ) : (
            <>
              <p className="text-lg font-semibold">Traitement En Cours...</p>
              <Spinner size="lg" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

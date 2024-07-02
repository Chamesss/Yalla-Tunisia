import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <p className="text-xl">Quelque chose s'est mal passé.</p>
      <Button color="primary" onClick={() => router.back()}>
        Retour
      </Button>
    </div>
  );
}

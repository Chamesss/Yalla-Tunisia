import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-white shadow-md rounded-lg px-8 py-12 max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-500">
          Forbidden 403
        </h1>
        <p className="text-gray-700 text-lg mt-4 text-center">
          You don't have permission to access this page.
        </p>
        <div className="flex justify-center mt-8">
          <Link href={"/"}>
            <Button className="bg-blue-500 text-white text-md font-medium">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

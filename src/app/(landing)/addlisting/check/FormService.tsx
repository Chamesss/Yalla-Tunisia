import { Button, Input } from "@nextui-org/react";
import GoogleMapsApiSection from "./GoogleMapsApiSection";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";

export default function FormService() {
  const [addLocation, setAddLocation] = useState<boolean>(false);
  return (
    <div className="p-4 flex items-center justify-center">
      <div className="p-4 border border-opacity-50 rounded-xl w-fit flex items-center justify-center flex-col gap-4">
        <h1 className="text-lg font-semibold">
          By submitting this form, you can begin showcasing your valuable
          services to our community.
        </h1>
        <div className="flex flex-col gap-4">
          <Input variant="underlined" placeholder="Store name" />
          <Checkbox onChange={(e) => setAddLocation(e.target.checked)}>
            Locate my store
          </Checkbox>
          {addLocation && <GoogleMapsApiSection />}
        </div>
        <div className="w-full flex flex-row justify-evenly p-2">
          <Button className="bg-danger-500 text-white">Cancel</Button>
          <Button className="bg-primary-500 text-white">Submit</Button>
        </div>
      </div>
    </div>
  );
}

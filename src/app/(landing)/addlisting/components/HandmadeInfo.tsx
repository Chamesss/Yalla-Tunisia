import { Input, Textarea } from "@nextui-org/react";
import AddImages from "./AddImages";
import { useState } from "react";

export default function HandmadeInfo() {
  const [sizesSelected, setSizesSelected] = useState<string[]>([]);
  const size = {
    xs: "xs",
    sm: "s",
    md: "m",
    lg: "l",
    xl: "xl",
    xxl: "xxl",
  };

  const handleSelectSize = (key: string) => {
    setSizesSelected((prevSizes) => {
      const index = prevSizes.indexOf(key);
      if (index !== -1) {
        return prevSizes.filter((size) => size !== key);
      } else {
        return [...prevSizes, key];
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full items-stretch gap-4">
        <h1 className="text-xl font-semibold">General info</h1>
        <div className="px-2 gap-4 flex flex-col">
          <Input isRequired size="sm" label="Title" />
          <div className="flex flex-row gap-4">
            <Input
              isRequired
              type="number"
              label="Price"
              size="sm"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
            />
            <Input
              isRequired
              type="number"
              label="Qte"
              size="sm"
              className="w-[50%]"
            />
          </div>
          <Textarea
            label="Description"
            placeholder="Enter your description"
            description="Enter a concise description of your project."
          />
          <Input isRequired size="sm" label="Materials used" />
        </div>
        <h1 className="text-xl font-semibold">Size selection</h1>
        <div className="px-2">
          <div className="flex flex-row gap-8">
            {Object.keys(size).map((key) => {
              // @ts-ignore
              const value = size[key];
              return (
                <div
                  key={key}
                  onClick={() => handleSelectSize(key)}
                  className={`border border-solid w-10 h-10 rounded-sm flex items-center justify-center cursor-pointer transition-all duration-75 hover:text-gray-200 ${
                    sizesSelected.includes(key)
                      ? "bg-[#48b9ff] dark:bg-white text-white dark:text-black"
                      : ""
                  }`}
                >
                  {value}
                </div>
              );
            })}
          </div>
          <span className="text-xs">Sizes are practical for clothes.</span>
          <div className="flex flex-row gap-2 items-center mt-4">
            <Input type="number" className="w-[10%]" label="height" size="sm" />
            <Input type="number" className="w-[10%]" label="Width" size="sm" />
            <span className="text-xs">(cm)</span>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Pictures</h1>
        <div className="px-2">
          <AddImages />
        </div>
      </div>
    </div>
  );
}

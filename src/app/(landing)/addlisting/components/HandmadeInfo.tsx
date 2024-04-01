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
        <Input isRequired size="sm" label="Title" />
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
        <Textarea
          label="Description"
          placeholder="Enter your description"
          description="Enter a concise description of your project."
        />
        <h1 className="text-xl font-semibold">Size selection</h1>
        <div className="flex flex-row gap-8 px-4">
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
        <AddImages />
      </div>
    </div>
  );
}

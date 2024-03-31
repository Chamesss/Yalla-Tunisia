import { Input, Textarea } from "@nextui-org/react";
import AddImages from "./AddImages";

export default function HandmadeInfo() {
  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const size = {
    xs: "xs",
    sm: "s",
    md: "m",
    lg: "l",
    xl: "xl",
    xxl: "xxl",
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full items-stretch gap-4">
        <Input isRequired size="sm" label="Title" />
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
            console.log("value === ", value);
            return (
              <div
                key={key}
                className="border border-solid w-10 h-10 rounded-sm flex items-center justify-center cursor-pointer transition-all duration-75 hover:text-gray-200"
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

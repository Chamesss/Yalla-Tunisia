import {
  Divider,
  Input,
  Textarea,
  Button,
  CheckboxGroup,
} from "@nextui-org/react";
import AddImages from "./AddImages";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import IconCancel from "@/components/icons/IconCancel";
import { createHandmadeListing } from "@/lib/createHandmadeListing";
import { useFormState } from "react-dom";
import { CustomCheckbox } from "./utils/CustomCheckBoxUnselected";

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
  const [color, setColor] = useState("#aabbcc");
  const [colors, setColors] = useState<string[]>([]);
  const [formState, formAction] = useFormState(createHandmadeListing, null);
  const [groupSelected, setGroupSelected] = useState([]);

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

  const deleteColor = (color: string) => {
    setColors((prev) => {
      const tmp = prev.filter((c) => c !== color);
      return tmp;
    });
  };

  return (
    <form
      action={formAction}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="flex flex-col w-full items-stretch gap-4">
        <h1 className="text-xl font-semibold">General info</h1>
        <div className="px-2 gap-4 flex flex-col">
          <Input id="title" name="title" isRequired size="sm" label="Title" />
          <div className="flex flex-row gap-4">
            <Input
              isRequired
              type="number"
              label="Price"
              id="price"
              name="price"
              size="sm"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
            />
            <Input
              isRequired
              name="qte"
              id="qte"
              type="number"
              label="Qte"
              size="sm"
              className="w-[50%]"
            />
          </div>
          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Enter your description"
            description="Enter a concise description of your project."
          />
          <Input isRequired size="sm" label="Materials used" />
        </div>
        <h1 className="text-xl font-semibold">Size selection</h1>
        <div className="px-2">
          <div className="flex flex-row gap-8">
            <CheckboxGroup
              className="gap-1"
              label="Select sizes"
              orientation="horizontal"
            >
              <CustomCheckbox name="size-xs" value="xs">
                xs
              </CustomCheckbox>
              <CustomCheckbox name="size-sm" value="sm">
                sm
              </CustomCheckbox>
              <CustomCheckbox name="size-md" value="md">
                md
              </CustomCheckbox>
              <CustomCheckbox name="size-lg" value="lg">
                lg
              </CustomCheckbox>
              <CustomCheckbox name="size-xl" value="xl">
                xl
              </CustomCheckbox>
              <CustomCheckbox name="size-xxl" value="xxl">
                xxl
              </CustomCheckbox>
            </CheckboxGroup>
          </div>
          <small className="text-xs italic">
            Sizes are practical for clothes.
          </small>
          <div className="flex flex-row gap-2 items-center mt-4">
            <Input type="number" className="w-[10%]" label="height" size="sm" />
            <Input type="number" className="w-[10%]" label="Width" size="sm" />
            <span className="text-xs">(cm)</span>
          </div>
        </div>
        <Divider className="my-4" />
        <h1 className="text-xl font-semibold">Colors selection</h1>
        <div className="flex flex-row gap-4 w-fit m-auto">
          <div className="flex flex-col items-center gap-4">
            <HexColorPicker color={color} onChange={setColor} />
            <Button
              onClick={() =>
                setColors((prev) => {
                  if (prev.includes(color) || prev.length > 5) return prev;
                  return [...prev, color];
                })
              }
            >
              Add Color
            </Button>
          </div>
          <div className="grid grid-cols-2 grid-rows-3 flex-wrap w-auto h-fit gap-2">
            {colors.map((c) => (
              <div
                key={c}
                style={{ backgroundColor: c }}
                className="w-10 h-10 rounded-full relative"
              >
                <div className="absolute right-0">
                  <IconCancel
                    className="text-white bg-black/50 rounded-full cursor-pointer hover:opacity-50"
                    onClick={() => deleteColor(c)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider className="my-4" />
        <h1 className="text-xl font-semibold">Pictures</h1>
        <div className="px-2">
          <AddImages />
        </div>
      </div>
      <Divider className="my-4" />
      <div className="px-10 mt-4 py-2 gap-4 flex w-full justify-between">
        <Button color="danger">Cancel</Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}

import { CheckboxGroup, Divider, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import HandleImages from "../HandleImages";
import { HexColorPicker } from "react-colorful";
import { CustomCheckbox } from "../../../create/utils/CustomCheckBoxUnselected";
import IconCancel from "@/components/icons/IconCancel";

export default function MainHandMade({ data }: { data: ProductHandMade }) {
  const [previewImages, setPreviewImages] = useState(data.imageUrls);
  const [color, setColor] = useState("#aabbcc");
  const [colors, setColors] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-2 border border-opacity-50 rounded-xl px-4 py-6">
      <h1>General Info</h1>
      <Input value={data.title} placeholder="title" />
      <Input value={data.price} placeholder="price" />
      <Input value={data.qte} placeholder="Qte" />
      <Textarea value={data.description} placeholder="Description" />
      <Input value={data.materialUsed} placeholder="materials used" />
      <Divider className="my-2" />
      <h1>Pictures</h1>
      <HandleImages
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />
      <Divider className="my-2" />
      <p>sizes</p>
      <div className="px-2">
        <div className="flex flex-row gap-8">
          <CheckboxGroup
            className="gap-1"
            label="Select sizes"
            orientation="horizontal"
            defaultValue={data.sizes}
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
        <div className="flex flex-row gap-2 mt-4">
          <Input value={data.dimensions[0]} placeholder="height" />
          <Input value={data.dimensions[1]} placeholder="width" />
          <small>(cm)</small>
        </div>
        <Divider className="my-2" />
        <h1>Colors section</h1>
        <div className="flex flex-row">
          <HexColorPicker color={color} onChange={setColor} />
          <div className="grid grid-cols-2 grid-rows-3 flex-wrap w-auto h-fit gap-2">
            {data.colors.map((c) => (
              <div
                key={c}
                style={{ backgroundColor: c }}
                className="w-10 h-10 rounded-full relative"
              >
                <div className="absolute right-0">
                  <IconCancel
                    className="text-white bg-black/50 rounded-full cursor-pointer hover:opacity-50"
                    onClick={() =>
                      setColors((prev) => {
                        const tmp = prev.filter((c) => c !== color);
                        return tmp;
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

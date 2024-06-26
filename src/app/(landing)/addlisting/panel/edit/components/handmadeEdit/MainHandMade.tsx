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
      <h1 className="my-2 text-lg font-semibold">Informations générales</h1>
      <Input label="Titre" value={data.title} placeholder="Titre" />
      <div className="flex flex-row items-center justify-center gap-3">
        <Input label="Prix" value={data.price} placeholder="price" />
        <Input label="Quantité" value={data.qte} placeholder="Quantité" />
      </div>
      <Textarea
        label="Description"
        value={data.description}
        placeholder="Description"
      />
      <Input
        label="Matériaux utilisés"
        value={data.materialsUsed}
        placeholder="Matériaux utilisés"
      />
      <Divider className="my-2" />
      <h1 className="my-2 text-lg font-semibold">Photos</h1>
      <HandleImages
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />
      <Divider className="my-2" />
      <h1 className="my-2 text-lg font-semibold">Tailles</h1>
      <div className="px-2">
        <div className="flex flex-row gap-8">
          <CheckboxGroup
            className="gap-1"
            label="Sélectionnez les tailles"
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
          <Input value={data.dimensions[0]} placeholder="hauteur" />
          <Input value={data.dimensions[1]} placeholder="largeur" />
          <small>(cm)</small>
        </div>
        <Divider className="my-2" />
        <h1 className="my-2 text-lg font-semibold">Section des couleurs</h1>
        <div className="flex flex-row items-center justify-center gap-2">
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

import {
  Divider,
  Input,
  Textarea,
  Button,
  CheckboxGroup,
} from "@nextui-org/react";
import AddImages from "./AddImages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import IconCancel from "@/components/icons/IconCancel";
import { createHandmadeListing } from "@/lib/actions/createHandmadeListing";
import { useFormState, useFormStatus } from "react-dom";
import { CustomCheckbox } from "./utils/CustomCheckBoxUnselected";
import SuccessLoading from "./utils/SuccessLoading";

type Props = {
  formState: {
    response: {
      success: boolean;
      error: number;
      message: string;
    };
  };
  userId: string;
  categoryId: string | null;
  subCategoryId: string | null;
  location: string;
  setSubCategoryError: Dispatch<SetStateAction<boolean>>;
  setLocationError: Dispatch<SetStateAction<boolean>>;
  setCategoryError: Dispatch<SetStateAction<boolean>>;
};

function HandmadeForm({
  formState,
  userId,
  categoryId,
  subCategoryId,
  location,
  setSubCategoryError,
  setLocationError,
  setCategoryError,
}: Props) {
  const [color, setColor] = useState("#aabbcc");
  const [colors, setColors] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [qte, setQte] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [materialsUsed, setMaterialsUser] = useState<string>("");
  const [formError, setFormError] = useState<number>(0);
  const data = useFormStatus();

  useEffect(() => {
    // console.log("form status ===", data);
  }, [data]);

  useEffect(() => {
    formState.response?.error && setFormError(formState.response.error);
    console.log("formState.response?.error === ", formState.response?.error);
    if (formState.response?.error !== 0) {
      if (formState.response?.error === 11) {
        setCategoryError(true);
      }
      if (formState.response?.error === 12) {
        setSubCategoryError(true);
      }
      if (formState.response?.error === 13) {
        setLocationError(true);
      }
      const element = document.getElementById("GeneralSection");
      element?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [formState]);

  useEffect(() => {
    setFormError(0);
  }, [title, price, qte, description, materialsUsed]);

  return (
    <>
      <div className="flex flex-col w-full items-stretch gap-4">
        <h1 className="text-xl font-semibold">
          General info<small className="text-danger-500">*</small>
        </h1>
        <div id="GeneralSection" className="px-2 gap-4 flex flex-col">
          {/* outer values begin */}
          <input name="userId" value={userId} className="absolute hidden" />
          {categoryId && (
            <input
              name="categoryId"
              value={categoryId}
              className="absolute hidden"
            />
          )}
          {subCategoryId && (
            <input
              name="subCategoryId"
              value={subCategoryId}
              className="absolute hidden"
            />
          )}
          <input name="location" value={location} className="absolute hidden" />
          {/* outer values end */}
          <Input
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            size="sm"
            label={
              <span className="text-sm">
                Title<small className="text-danger-500">*</small>
              </span>
            }
            description={
              (formError === 1 || title.length > 35) && (
                <small className=" text-danger-500">
                  {formState?.response?.message}
                </small>
              )
            }
          />
          <div className="flex flex-row gap-4">
            <Input
              type="number"
              label={
                <span className="text-sm">
                  Price<small className="text-danger-500">*</small>
                </span>
              }
              id="price"
              name="price"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              size="sm"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
              description={
                formError === 2 && (
                  <small className="text-danger-500">
                    {formState?.response?.message}
                  </small>
                )
              }
            />
            <Input
              name="qte"
              id="qte"
              type="number"
              label={
                <span className="text-sm">
                  Qte<small className="text-danger-500">*</small>
                </span>
              }
              size="sm"
              className="w-[50%]"
              onChange={(e) => setQte(parseInt(e.target.value))}
              description={
                formError === 3 && (
                  <small className=" text-danger-500">
                    {formState?.response?.message}
                  </small>
                )
              }
            />
          </div>
          <Textarea
            id="description"
            name="description"
            label={
              <span className="text-sm">
                Description<small className="text-danger-500">*</small>
              </span>
            }
            placeholder="Enter your description"
            onChange={(e) => setDescription(e.target.value)}
            description={
              (description.length > 255 || formError === 4) && (
                <small className=" text-danger-500">
                  {formState?.response?.message}
                </small>
              )
            }
          />
          <Input
            id="materialsUser"
            name="materialsUsed"
            size="sm"
            label={
              <span className="text-sm">
                Materials used<small className="text-danger-500">*</small>
              </span>
            }
            onChange={(e) => setMaterialsUser(e.target.value)}
            description={
              (materialsUsed.length > 40 || formError === 5) && (
                <small className=" text-danger-500">
                  {formState?.response?.message}
                </small>
              )
            }
          />
        </div>
        <Divider className="my-4" />
        <h1 className="text-xl font-semibold">
          Pictures<small className="text-danger-500">*</small>
        </h1>
        <div className="px-2">
          <AddImages />
        </div>
        <Divider className="my-4" />
        <h1 className="text-xl font-semibold">
          Size selection
          <small className="italic text-sm font-medium opacity-50">
            {" "}
            (optional)
          </small>
        </h1>
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
            <Input
              type="number"
              id="height"
              name="height"
              className="w-[10%]"
              label="height"
              size="sm"
            />
            <Input
              type="number"
              id="Width"
              name="Width"
              className="w-[10%]"
              label="Width"
              size="sm"
            />
            <span className="text-xs">(cm)</span>
          </div>
        </div>
        <Divider className="my-4" />
        <h1 className="text-xl font-semibold">
          Colors selection
          <small className="italic text-sm font-medium opacity-50">
            {" "}
            (optional)
          </small>
        </h1>
        <div className="flex flex-row gap-4 w-fit m-auto">
          <div className="flex flex-col items-center gap-4">
            <input
              className="absolute hidden"
              value={colors}
              name="colors"
              multiple
            />
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
      <Divider className="my-4" />
      <div className="px-10 mt-4 py-2 gap-4 flex w-full justify-between">
        <Button color="danger">Cancel</Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
      <SuccessLoading formState={formState} />
    </>
  );
}

type MainProps = {
  userId: string;
  categoryId: string | null;
  subCategoryId: string | null;
  location: string;
  setLocationError: Dispatch<SetStateAction<boolean>>;
  setCategoryError: Dispatch<SetStateAction<boolean>>;
  setSubCategoryError: Dispatch<SetStateAction<boolean>>;
};

export default function HandmadeInfo({
  userId,
  categoryId,
  subCategoryId,
  location,
  setLocationError,
  setCategoryError,
  setSubCategoryError,
}: MainProps) {
  const initialState = {
    response: {
      success: false,
      message: "",
      error: 0,
    },
  };

  const [formState, formAction] = useFormState(
    createHandmadeListing,
    initialState
  );

  return (
    <form
      action={formAction}
      className="w-full flex flex-col items-center justify-center"
    >
      <HandmadeForm
        formState={formState}
        userId={userId}
        categoryId={categoryId}
        subCategoryId={subCategoryId}
        location={location}
        setLocationError={setLocationError}
        setCategoryError={setCategoryError}
        setSubCategoryError={setSubCategoryError}
      />
    </form>
  );
}

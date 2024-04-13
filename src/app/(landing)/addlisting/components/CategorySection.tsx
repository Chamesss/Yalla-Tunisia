import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface data {
  categories: CategoryType[];
  setCategoryIdSelected: Dispatch<SetStateAction<string | null>>;
  categoryIdSelected: string | null;
  setSubCategoryId: Dispatch<SetStateAction<string | null>>;
  subCategoryId: string | null;
  categoryError: boolean;
  subCategoryError: boolean;
}

export default function CategorySection({
  categories,
  setCategoryIdSelected,
  categoryIdSelected,
  setSubCategoryId,
  subCategoryId,
  categoryError,
  subCategoryError,
}: data) {
  const subCategoryRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [oldHeight, setOldHeight] = useState<null | number>(null);

  useEffect(() => {
    setSubCategoryId(null);
    Number(categoryIdSelected) === 3 || categoryIdSelected === null
      ? selectRef.current &&
        (oldHeight === null && setOldHeight(selectRef.current.scrollHeight),
        (selectRef.current.style.height = `${0}px`))
      : selectRef.current &&
        (selectRef.current.style.height = `${
          oldHeight || selectRef.current.scrollHeight
        }px`);
  }, [categoryIdSelected]);

  return (
    <div ref={subCategoryRef} className="flex flex-col gap-4  transition-all">
      <h1 className="text-xl font-semibold">Choose a category</h1>
      <div>
        <Select
          size="sm"
          isRequired
          label="Select Categories"
          onChange={(e) => setCategoryIdSelected(e.target.value)}
          description={
            categoryError && (
              <p className="text-danger-500">Enter valid category</p>
            )
          }
        >
          {categories.map((d, i) => (
            <SelectItem key={d.id} value={d.name}>
              {d.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div
        ref={selectRef}
        className={`flex h-fit transition-all ${
          categoryIdSelected === null || Number(categoryIdSelected) === 3
            ? "overflow-hidden"
            : "overflow-visible"
        }`}
      >
        <Select
          selectionMode="single"
          className="relative"
          id="subCategoryTag"
          size="sm"
          isRequired
          onChange={(e) => setSubCategoryId(e.target.value)}
          label="Select Subcategory"
          isDisabled={Number(categoryIdSelected) === 3}
          description={
            subCategoryError && (
              <p
                ref={errorRef}
                id="categoryErrorDescription"
                className="absolute -bottom-[0.6rem] left-3 text-danger-500"
              >
                Enter valid subcategory
              </p>
            )
          }
        >
          {categoryIdSelected !== null ? (
            categories[Number(categoryIdSelected) - 1].subcategories.map(
              (d, i) => (
                <SelectItem key={d.id} value={d.name}>
                  {d.name}
                </SelectItem>
              )
            )
          ) : (
            <SelectItem key={0} value={0}>
              {0}
            </SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
}

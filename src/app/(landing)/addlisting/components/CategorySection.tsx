import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface data {
  categories: CategoryType[];
  setCategoryIdSelected: Dispatch<SetStateAction<string | null>>;
  categoryIdSelected: string | null;
  setSubCategoryId: Dispatch<SetStateAction<string | null>>;
  categoryError: boolean;
  subCategoryError: boolean;
}

export default function CategorySection({
  categories,
  setCategoryIdSelected,
  categoryIdSelected,
  setSubCategoryId,
  categoryError,
  subCategoryError,
}: data) {
  const subCategoryRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [oldHeight, setOldHeight] = useState<null | number>(null);

  const ChooseCategory = (i: string) => {
    setCategoryIdSelected((prev) => {
      if (prev === i) return null;
      return i;
    });
  };

  const ChooseSubCategory = (i: string) => {
    setSubCategoryId((prev) => {
      if (prev === i) return null;
      return i;
    });
  };

  useEffect(() => {
    Number(categoryIdSelected) === 3 || categoryIdSelected === null
      ? selectRef.current &&
        (oldHeight === null && setOldHeight(selectRef.current.offsetHeight),
        (selectRef.current.style.height = `${0}px`))
      : selectRef.current &&
        (selectRef.current.style.height = `${selectRef.current.scrollHeight}px`);
  }, [categoryIdSelected]);

  return (
    <div ref={subCategoryRef} className="flex flex-col gap-4  transition-all">
      <h1 className="text-xl font-semibold">Choose a category</h1>
      <div>
        <Select
          size="sm"
          isRequired
          label="Select Categories"
          description={
            categoryError && (
              <p className="text-danger-500">Enter valid category</p>
            )
          }
        >
          {categories.map((d, i) => (
            <SelectItem
              key={d.name}
              onClick={() => ChooseCategory(d.id)}
              value={d.name}
            >
              {d.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div
        ref={selectRef}
        className="flex h-fit transition-all overflow-hidden"
      >
        <Select
          selectionMode="single"
          id="subCategoryTag"
          size="sm"
          isRequired
          label="Select Subcategory"
          isDisabled={Number(categoryIdSelected) === 3}
          description={
            subCategoryError && (
              <p className="text-danger-500">Enter valid subcategory</p>
            )
          }
        >
          {categoryIdSelected !== null ? (
            categories[Number(categoryIdSelected) - 1].subcategories.map(
              (d, i) => (
                <SelectItem
                  key={d.id}
                  value={d.name}
                  onClick={() => ChooseSubCategory(d.id)}
                >
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

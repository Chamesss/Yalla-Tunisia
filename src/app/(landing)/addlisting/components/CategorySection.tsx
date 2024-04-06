import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";

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
    console.log("subCategoryError === ", subCategoryError);
  }, [subCategoryError]);

  return (
    <div className="flex flex-col gap-4">
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
      <div>
        {Number(categoryIdSelected) !== 2 && (
          <Select
            size="sm"
            isRequired
            label="Select Subcategory"
            isDisabled={
              categoryIdSelected === null || Number(categoryIdSelected) === 2
            }
            description={
              subCategoryError && (
                <p className="text-danger-500">Enter valid subcategory</p>
              )
            }
          >
            {categoryIdSelected !== null ? (
              categories[Number(categoryIdSelected)].subcategories.map((d) => (
                <SelectItem
                  key={d.id}
                  value={d.name}
                  onClick={() => ChooseSubCategory(d.id)}
                >
                  {d.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem key={0} value={0}>
                {0}
              </SelectItem>
            )}
          </Select>
        )}
      </div>
    </div>
  );
}

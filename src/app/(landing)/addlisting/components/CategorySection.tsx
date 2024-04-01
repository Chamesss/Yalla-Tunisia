import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface data {
  categories: CategoryType[];
  loading: boolean;
  setCategoryIdSelected: Dispatch<SetStateAction<number | null>>;
  categoryIdSelected: number | null;
}

export default function CategorySection({
  categories,
  loading,
  setCategoryIdSelected,
  categoryIdSelected,
}: data) {
  const ChooseCategory = (i: number) => {
    setCategoryIdSelected((prev) => {
      if (prev === i) return null;
      return i;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Choose a category</h1>
      <div>
        <Select size="sm" isRequired label="Select Categories">
          {categories.map((d, i) => (
            <SelectItem
              key={d.name}
              onClick={() => ChooseCategory(i)}
              value={d.name}
            >
              {d.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        {categoryIdSelected !== 2 && (
          <Select
            size="sm"
            isRequired
            label="Select Subcategory"
            isDisabled={categoryIdSelected === null || categoryIdSelected === 2}
          >
            {categoryIdSelected !== null ? (
              categories[categoryIdSelected].subcategories.map((d) => (
                <SelectItem key={d.id} value={d.name}>
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

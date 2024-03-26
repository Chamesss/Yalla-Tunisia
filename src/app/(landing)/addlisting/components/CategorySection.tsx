import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface data {
  categories: CategoryType[];
  loading: boolean;
  setCategoryNameSelected: Dispatch<SetStateAction<string>>;
  setCategoryIdSelected: Dispatch<SetStateAction<number | null>>;
  categoryIdSelected: number | null;
}

export default function CategorySection({
  categories,
  loading,
  setCategoryNameSelected,
  setCategoryIdSelected,
  categoryIdSelected,
}: data) {
  const ChooseCategory = (name: string, i: number) => {
    setCategoryIdSelected(i);
    setCategoryNameSelected(name);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className=" text-xl font-semibold">Choose a category:</h1>
      <div>
        <Select
          size="sm"
          isRequired
          label="Select Categories"
          className="max-w-xs"
        >
          {categories.map((d, i) => (
            <SelectItem
              key={d.name}
              onClick={() => ChooseCategory(d.name, i)}
              value={d.name}
            >
              {d.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Select
          size="sm"
          isRequired
          label="Select Subcategory"
          className="max-w-xs"
          isDisabled={categoryIdSelected === null}
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
      </div>
    </div>
  );
}

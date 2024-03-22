import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface data {
  categories: CategoryType[];
  loading: boolean;
  setCategorySelected: Dispatch<SetStateAction<Set<never>>>;
  categorySelected: Set<never>;
}

export default function CategorySelection({
  categories,
  loading,
  setCategorySelected,
}: data) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        size="sm"
        isRequired
        label="Select Categories"
        className="max-w-xs"
        onSelectionChange={(e) => setCategorySelected(e)}
      >
        {categories.map((d) => (
          <SelectItem key={d.name} value={d.name}>
            {d.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

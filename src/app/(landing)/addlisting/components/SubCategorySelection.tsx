import { Select, SelectItem } from "@nextui-org/react";

interface data {
  // categories: CategoryType[];
  loading: boolean;
}

export default function SubCategorySelection({
  // categories,
  loading,
}: data) {
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      {/* <Select
        size="sm"
        isRequired
        label="Select Categories"
        className="max-w-xs"
        isDisabled
      >
        {categories.map((d) => (
          <SelectItem key={d.name} value={d.name}>
            {d.name}
          </SelectItem>
        ))}
      </Select> */}
    </div>
  );
}

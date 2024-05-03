import { Input } from "@nextui-org/react";
import { categories } from "@/constants/categories";

interface data {
  categoryIdSelected: string | undefined;
  subCategoryId: string | undefined;
}

export default function CategorySection({
  categoryIdSelected,
  subCategoryId,
}: data) {
  const category = categories.find((c) => c.id === categoryIdSelected);
  //@ts-ignore
  const subcategory = category.subcategories.find(
    (s) => subCategoryId === s.id
  );
  const name = subcategory?.name;

  return (
    <div className="flex flex-col gap-4  transition-all">
      <h1 className="text-xl font-semibold">Category</h1>
      <div>
        <Input value={category?.name} isDisabled />
      </div>
      {name && <Input isDisabled value={name} />}
    </div>
  );
}

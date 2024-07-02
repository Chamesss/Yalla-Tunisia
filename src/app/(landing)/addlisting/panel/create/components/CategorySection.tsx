import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface data {
  categories: CategoryType[];
  setCategoryIdSelected: Dispatch<SetStateAction<string | null>>;
  categoryIdSelected: string | null;
  setSubCategoryId: Dispatch<SetStateAction<string | null>>;
  subCategoryId: string | null;
  categoryError: boolean;
  subCategoryError: boolean;
  selectedOption: number;
  setSelectedOption: Dispatch<SetStateAction<number>>;
}

export default function CategorySection({
  categories,
  setCategoryIdSelected,
  categoryIdSelected,
  setSubCategoryId,
  subCategoryId,
  categoryError,
  subCategoryError,
  selectedOption,
  setSelectedOption,
}: data) {
  const subCategoryRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const handleCategorySelection = (e: any) => {
    setCategoryIdSelected(() =>
      e.target.value.length === 0 ? null : e.target.value
    );
  };

  useEffect(() => {
    (() => {
      const index = categories.findIndex((c) => c.id === categoryIdSelected);
      setSelectedOption(index);
      index === 2 || (index === -1 && setSubCategoryId(null));
    })();
  }, [categoryIdSelected]);

  return (
    <div ref={subCategoryRef} className="flex flex-col gap-4  transition-all">
      <h1 className="text-xl font-semibold">Choisissez une catégorie</h1>
      <div>
        <Select
          size="sm"
          isRequired
          label="Choisissez une catégorie"
          onChange={(e) => handleCategorySelection(e)}
          description={
            categoryError && (
              <p className="text-danger-500">Entrez une catégorie valide</p>
            )
          }
        >
          {categories.map((d) => (
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
        <ErrorBoundary fallback={<p>Quelque chose s'est mal passé</p>}>
          <Select
            selectionMode="single"
            className="relative"
            id="subCategoryTag"
            size="sm"
            isRequired
            onChange={(e) =>
              setSubCategoryId(() =>
                e.target.value.length === 0 ? null : e.target.value
              )
            }
            label="Choisissez une étiquette"
            isDisabled={selectedOption === 2 || selectedOption === -1}
            description={
              subCategoryError && (
                <p
                  ref={errorRef}
                  id="categoryErrorDescription"
                  className="absolute -bottom-[0.6rem] left-3 text-danger-500"
                >
                  Entrez une étiquette valide
                </p>
              )
            }
          >
            {selectedOption !== -1 ? (
              categories[selectedOption].subcategories.map((d) => (
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
        </ErrorBoundary>
      </div>
    </div>
  );
}

import { cities } from "@/cities";
import { CategoryWName, categories } from "@/constants/categories";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import IconArrowRight from "../icons/RightArrow";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedSubcategory: string;
  setSelectedSubcategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedLocationId: string;
  setSelectedLocationId: Dispatch<SetStateAction<string>>;
};

export type selectedSub = {
  id: string;
  name: string;
};

export default function FilterModal({
  isOpen,
  onClose,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedCategory,
  setSelectedCategory,
  selectedLocationId,
  setSelectedLocationId,
}: Props) {
  const [subcategoriesFiltered, setSubcategoryFiltered] = useState<
    selectedSub[]
  >([]);

  useEffect(() => {
    if (selectedCategory === "") {
      setSelectedSubcategory("");
      let allSubs: any = [];
      categories.forEach((c) => {
        c.subcategories.forEach((sub) =>
          allSubs.push({ id: sub.id, name: sub.name })
        );
      });
      setSubcategoryFiltered(allSubs);
    } else {
      let allSubs: any = [];
      const index = categories.findIndex((c) => c.id === selectedCategory);
      categories[index].subcategories.forEach((sub) =>
        allSubs.push({ id: sub.id, name: sub.name })
      );
      if (selectedCategory === "66207ab5b27e1a42a69a6517") {
        const value = {
          id: categories[2].subcategories[0].id,
          name: categories[2].subcategories[0].name,
        };
        setSubcategoryFiltered([value]);
        setSelectedSubcategory("66207abd90b31d11aa680131");
      } else {
        setSubcategoryFiltered(allSubs);
        setSelectedSubcategory("");
      }
    }
  }, [selectedCategory]);

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
            <ModalBody>
              <div className="space-y-3">
                <p>Category</p>
                <div className="flex flex-row flex-wrap gap-2 px-4">
                  {CategoryWName.map((c, i) => (
                    <button
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === c.id ? "" : c.id
                        )
                      }
                      key={`${c.name}-${i}`}
                      className={`px-2 py-1 transition-all border-2 text-bl border-sky-600 text-sky-600 rounded-lg ${
                        selectedCategory === c.id && "!text-white bg-sky-600"
                      }`}
                    >
                      <small>{c.name}</small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p>SubCategories</p>
                <div className="flex flex-row flex-wrap gap-2 px-4">
                  {subcategoriesFiltered.map((c, index) => (
                    <button
                      onClick={() =>
                        setSelectedSubcategory(
                          selectedSubcategory === c.id ? "" : c.id
                        )
                      }
                      key={`${c.name}-${index}`}
                      className={`px-2 py-1 transition-all border-2 text-bl border-sky-600 text-sky-600 rounded-lg ${
                        selectedSubcategory === c.id && "!text-white bg-sky-600"
                      }`}
                    >
                      <small>{c.name}</small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p>Location</p>
                <Autocomplete
                  defaultItems={cities}
                  placeholder="Location.."
                  size="md"
                  className="px-4"
                  onSelectionChange={(key) =>
                    setSelectedLocationId(key.toString())
                  }
                >
                  {(city) => (
                    <AutocompleteItem key={city.id}>
                      {city.city}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="space-y-3">
                <p>Price</p>
                <div className="flex flex-row items-center gap-4 px-10">
                  <Input size="sm" label="min" />
                  <IconArrowRight className="text-4xl" />
                  <Input size="sm" label="max" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={onClose}>
                Close
              </Button>

              <Button color="primary" onClick={onClose}>
                Action
              </Button>
              {/* </Link> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

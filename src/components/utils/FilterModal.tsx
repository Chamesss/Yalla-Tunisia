import { CategoryWName, categories } from "@/constants/categories";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type selectedSub = {
  id: string;
  name: string;
};

export default function FilterModal({ isOpen, onClose }: Props) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategoriesFiltered, setSubcategoryFiltered] = useState<
    selectedSub[]
  >([]);

  useEffect(() => {
    if (selectedCategory === "") {
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
      setSubcategoryFiltered(allSubs);
      setSelectedSubcategory("");
    }
  }, [selectedCategory]);

  return (
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Filter</ModalHeader>
            <ModalBody>
              <p>Category</p>
              <p>selected category = {selectedCategory}</p>
              <div className="flex flex-row flex-wrap gap-2">
                {CategoryWName.map((c, i) => (
                  <button
                    onClick={() =>
                      setSelectedCategory(selectedCategory === c.id ? "" : c.id)
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
              <div>
                <p>SubCategories</p>
                <p>selected sub category = {selectedSubcategory}</p>
                <div className="flex flex-row flex-wrap gap-2">
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import CategorySelection from "./components/CategorySelection";
import SubCategorySelection from "./components/SubCategorySelection";
import useFetchCategories from "@/hooks/useFetchCategories";

export default function page() {
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  const [isInfoSelected, setIsInfoSelected] = useState(false);
  const { categories, loading } = useFetchCategories();
  const [categorySelected, setCategorySelected] = useState(new Set([]));

  return (
    <div className="px-10 py-4">
      <Breadcrumbs>
        <BreadcrumbItem>Section Selection</BreadcrumbItem>
        {isSectionSelected && <BreadcrumbItem>Listing Info</BreadcrumbItem>}
        {isInfoSelected && isSectionSelected && (
          <BreadcrumbItem>Finishing</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Divider className="my-4" />
      <div>
        <div>
          <p>Select Category</p>
          <CategorySelection
            categories={categories}
            loading={loading}
            setCategorySelected={setCategorySelected}
            categorySelected={categorySelected}
          />
          <p>Select Subcategory </p>
          <SubCategorySelection categories={categories} loading={loading} />
        </div>
      </div>
    </div>
  );
}

// useEffect(() => {
//   setIsInfoSelected((prev) => {
//     return isSectionSelected ? !prev : false;
//   });
//   console.log("info deactivated");
// }, [isSectionSelected, isInfoSelected]);

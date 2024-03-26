"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
} from "@nextui-org/react";
import useFetchCategories from "@/hooks/useFetchCategories";
import { useState } from "react";
import CategorySection from "./CategorySection";

export default function MainCreateListing() {
  const [isSectionSelected, setIsSectionSelected] = useState(false);
  const [isInfoSelected, setIsInfoSelected] = useState(false);
  const { categories, loading } = useFetchCategories();
  const [categoryNameSelected, setCategoryNameSelected] = useState("");
  const [categoryIdSelected, setCategoryIdSelected] = useState<number | null>(
    null
  );
  return (
    <div>
      {" "}
      <Breadcrumbs>
        <BreadcrumbItem>Section Selection</BreadcrumbItem>
        {isSectionSelected && <BreadcrumbItem>Listing Info</BreadcrumbItem>}
        {isInfoSelected && isSectionSelected && (
          <BreadcrumbItem>Finishing</BreadcrumbItem>
        )}
      </Breadcrumbs>
      <Divider className="my-4" />
      <CategorySection
        categories={categories}
        loading={loading}
        setCategoryNameSelected={setCategoryNameSelected}
        setCategoryIdSelected={setCategoryIdSelected}
        categoryIdSelected={categoryIdSelected}
      />
    </div>
  );
}

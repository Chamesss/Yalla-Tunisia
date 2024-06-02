"use client";

import {
  CategoriesIds,
  SubcategoryIds,
  categories,
} from "@/constants/categories";
import { useSearchParams } from "next/navigation";

export default function MainComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat") || "";
  const keyword = searchParams.get("keyword") || "";
  const subCategory = searchParams.get("sub") || "";

  if (SubcategoryIds.includes(subCategory)) {
    if (keyword.length > 0) {
      //fetch products by subcategory and keyword
      return <p>subcategory and keyword presented</p>;
    } else {
      //fetch products by subcategory
      return <p>subcategory presented</p>;
    }
  } else {
    if (CategoriesIds.includes(category)) {
      if (keyword.length > 0) {
        //fetch products by category and keyword
        return <p>category and keyword presented</p>;
      } else {
        //fetch products by category
        return <p>category presented</p>;
      }
    } else {
      if (keyword.length > 0) {
        //fetch products by keyword
        return <p>only keyword presented</p>;
      } else {
        //fetch Random
        return <p>Random fetch</p>;
      }
    }
  }

  if (CategoriesIds.includes(category)) {
    if (keyword.length > 0) {
      if (SubcategoryIds.includes(subCategory)) {
        //fetch products by category, keyword and subcategory
        return <p>products, keyword and subcategory available</p>;
      } else {
        // fetch products by category, keyword
        return <p>category, keyword presented.</p>;
      }
    } else {
      if (SubcategoryIds.includes(subCategory)) {
        //fetch products by category and subcategory
        return <p>products and subcategory available</p>;
      } else {
        // fetch products by category
        return <p>category presented.</p>;
      }
    }
  } else {
    if (keyword.length > 0) {
      //fetch products by keyword
    } else {
      //fetch random products
    }
    return <p>Nothing here</p>;
  }

  return (
    <div>
      <p>categoryId === {category}</p>
      <p>keyword === {keyword}</p>
      <p>subcategoryId === {subCategory}</p>
    </div>
  );
}

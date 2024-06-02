"use client";

import { useSearchParams } from "next/navigation";

const defaultSections = ["handmades", "guides", "sports&entertainment"];
const defaultSub = ["Accessories & Jewelry", "Decorations"];

export default function MainComponent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("flag") || "";
  const keyword = searchParams.get("keyword") || "";
  const subCategory = searchParams.get("sub") || "";
  if (defaultSections.includes(search)) {
    if (keyword.length > 0) {
      //if (subCategory.length > 0)
      //fetch products by category and keyword
    } else {
      //fetch products by category
    }
  } else {
    if (keyword.length > 0) {
      //fetch products by keyword
    } else {
      //fetch random products
    }
  }

  return (
    <div>
      <p>searchParams === {search}</p>
      <p>keyword === {keyword}</p>
    </div>
  );
}

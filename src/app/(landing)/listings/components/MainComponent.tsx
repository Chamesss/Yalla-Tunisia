"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const defaultSections = ["handmades", "guides", "sports&entertainment"];

function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("flag") || "";

  return (
    <div>
      <p>searchParams === {search}</p>
    </div>
  );
}

export default function MainComponent() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}

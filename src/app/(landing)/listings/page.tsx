"use client";
import { useSearchParams } from "next/navigation";

const defaultSections = ["handmades", "guides", "sports&entertainment"];

export default function page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("section") as string;
  const valid = defaultSections.includes(search);
  return (
    <div>
      <p>search validity {valid}</p>
      <p>search param === {search}</p>
    </div>
  );
}

"use client";
import { Chip } from "@nextui-org/react";
import React from "react";

export default function LanguagesDisplay({ data }: { data: ProductGuides }) {
  const displayedLanguages =
    data.languages.length > 3
      ? data.languages.slice(0, 3).concat("...")
      : data.languages;

  return (
    <div className="flex flex-row gap-1 mt-1">
      {displayedLanguages.map((l, i) => (
        <Chip key={i} variant="flat" radius="md" size="sm">
          <small>{l}</small>
        </Chip>
      ))}
    </div>
  );
}

"use client";
import { Chip } from "@nextui-org/react";
import React from "react";

export default function LanguagesDisplay({ data }: { data: ProductGuides }) {
  const displayedLanguages =
    data.languages.length > 3 ? data.languages.slice(0, 3) : data.languages;

  const displayedLanguagesSmall =
    data.languages.length > 2 ? data.languages.slice(0, 2) : data.languages;

  return (
    <div className="mt-1">
      <div className="flex flex-row flex-nowrap gap-1">
        {displayedLanguages.map((l, i) => (
          <Chip
            key={i}
            variant="flat"
            color="primary"
            radius="md"
            className={`scale-[${100 - i * 20}]`}
            size="sm"
          >
            <p key={i}>{l.slice(0, 2)}</p>
          </Chip>
        ))}
      </div>
    </div>
  );
}

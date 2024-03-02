import React from "react";
import { ThemeSwitcher } from "@/components/ToggleDarkMode";

export default function page() {
  return (
    <div className="mt-10 text-center">
      <p>header = transparent</p>
      <p>slider + search</p>
      <p>into</p>
      <p>fait a main</p>
      <p>sport & loisir</p>
      <p>guide touristique</p>
      <ThemeSwitcher />
    </div>
  );
}

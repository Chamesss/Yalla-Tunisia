import React, { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return <h1 className="text-lg font-semibold my-2">{children}</h1>;
}

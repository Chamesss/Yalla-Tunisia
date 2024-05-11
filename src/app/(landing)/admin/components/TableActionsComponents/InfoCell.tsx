import React from "react";

export default function InfoCell({ title }: { title: string }) {
  return (
    <p className="text-bold text-sm capitalize text-default-400">{title}</p>
  );
}

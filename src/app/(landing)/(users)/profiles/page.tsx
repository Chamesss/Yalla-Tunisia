import React from "react";

export default function Profiles({ params }: { params: { id: string } }) {
  return <div>Profiles id === {params.id}</div>;
}

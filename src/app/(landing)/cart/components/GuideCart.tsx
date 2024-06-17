import React from "react";

export default function GuideCart({
  item,
}: {
  item: { data: ProductGuides; ref: string };
}) {
  return (
    <tr className="hidden sm:table-row">
      <td className="w-1/2">{item.data.title}</td>
      <td className="w-1/6">{item.data.description}</td>
      <td className="w-1/6">{item.data.price}</td>
      <td className="w-1/6">Action</td>
    </tr>
  );
}

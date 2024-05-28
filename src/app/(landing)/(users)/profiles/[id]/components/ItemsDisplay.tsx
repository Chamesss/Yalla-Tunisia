import CardItem from "@/components/utils/CardItem";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import React from "react";

export default async function ItemsDisplay({ id }: { id: string }) {
  const products = (await getListingsByUserId(id)) as AllProductsResult;
  const length =
    products.Handmades.length + products.Guides.length + products.Sports.length;

  if (length === 0) {
    return (
      <div className="w-full px-2 py-2">
        <p className="my-4">No offers to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 px-2 py-2">
      <ProductCategory title="Handmades" products={products.Handmades} />
      <ProductCategory title="Sports" products={products.Sports} />
      <ProductCategory title="Guides" products={products.Guides} />
    </div>
  );
}

function ProductCategory({
  title,
  products,
}: {
  title: string;
  products: ProductSports[] | ProductGuides[] | ProductHandMade[];
}) {
  return (
    <div className="space-y-4 bg-default-100 px-4 py-6 rounded-lg drop-shadow-sm shadow-sm">
      <h1 className="text-lg font-semibold opacity-75">{title}</h1>
      {products.length === 0 ? (
        <p className="my-4">No offers to display.</p>
      ) : (
        <div className="grid grid-cols-3 gap-10 w-fit">
          {products.map((p, i) => (
            <React.Fragment key={i}>
              <CardItem data={p} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

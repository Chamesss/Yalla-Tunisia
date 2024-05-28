"use client";
import CardItem from "@/components/utils/CardItem";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import React, { useEffect, useState } from "react";

export default function ItemsDisplay({ id }: { id: string }) {
  const [products, setProducts] = useState<AllProductsResult | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const products = (await getListingsByUserId(id)) as AllProductsResult;
      setProducts(products);
      setLength(
        products.Handmades.length +
          products.Guides.length +
          products.Sports.length
      );
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-10 w-fit">
        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>
            <CardSkeleton />
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (length === 0) {
    return (
      <div className="w-full px-2 py-2">
        <p className="my-4">No offers to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 px-2 py-2">
      {products && (
        <>
          <ProductCategory title="Handmades" products={products.Handmades} />
          <ProductCategory title="Sports" products={products.Sports} />
          <ProductCategory title="Guides" products={products.Guides} />
        </>
      )}
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

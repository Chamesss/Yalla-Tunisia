"use client";
import { CustomCheckbox } from "@/app/(landing)/addlisting/panel/create/utils/CustomCheckBoxUnselected";
import CardItem from "@/components/utils/CardItem";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { CheckboxGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function ItemsDisplay({ id }: { id: string }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [productsGlobal, setProductsGlobal] = useState<AllProductsResult>();
  const [groupSelected, setGroupSelected] = React.useState<string[]>([
    "Handmades",
    "Sports",
    "Guides",
  ]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/listings/getlistingbyuserid/", {
        headers: {
          userId: id,
        },
        cache: "force-cache",
      });
      const products = (await res.json()) as AllProductsResult;
      const allProducts = [
        ...products.Handmades,
        ...products.Sports,
        ...products.Guides,
      ];

      console.log("all products === ", allProducts);
      setProducts(allProducts);
      setProductsGlobal(products);
      setLength(
        products.Handmades.length +
          products.Guides.length +
          products.Sports.length
      );
      setLoading(false);
    })();
  }, []);

  const handleFilter = (e: string[]) => {
    setProducts(null);
    setGroupSelected(e);
    const filteredProducts: Product[] = [];
    if (productsGlobal) {
      for (const category of e) {
        if (category.toLocaleLowerCase() === "handmades") {
          for (const item of productsGlobal.Handmades) {
            filteredProducts.push(item);
          }
        }

        if (category.toLocaleLowerCase() === "sports") {
          for (const item of productsGlobal.Sports) {
            filteredProducts.push(item);
          }
        }

        if (category.toLocaleLowerCase() === "guides") {
          for (const item of productsGlobal.Guides) {
            filteredProducts.push(item);
          }
        }
      }
    }
    setProducts(filteredProducts);
  };

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
    <div className="w-full space-y-6 lg:px-2 py-3 lg:py-8">
      <CheckboxGroup
        className="gap-1 mb-6 flex flex-wrap lg:mt-2 text-tiny"
        orientation="horizontal"
        value={groupSelected}
        onChange={(e) => handleFilter(e)}
      >
        <CustomCheckbox value="Handmades">
          <p className="text-tiny sm:text-sm md:text-medium">Handmades</p>
        </CustomCheckbox>
        <CustomCheckbox value="Sports">
          <p className="text-tiny sm:text-sm md:text-medium">
            Sports & Entertainment
          </p>
        </CustomCheckbox>
        <CustomCheckbox value="Guides">
          <p className="text-tiny sm:text-sm md:text-medium">Guides</p>
        </CustomCheckbox>
      </CheckboxGroup>
      <div className="flex flex-row flex-wrap gap-2 lg:gap-4">
        {products &&
          products.map((p, i) => (
            <React.Fragment key={i}>
              <CardItem data={p} />
            </React.Fragment>
          ))}
        {/* <ProductCategory title="Handmades" products={products.Handmades} />
          <ProductCategory title="Sports" products={products.Sports} />
          <ProductCategory title="Guides" products={products.Guides} /> */}
      </div>
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
    <div className="space-y-4 px-4 py-6">
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

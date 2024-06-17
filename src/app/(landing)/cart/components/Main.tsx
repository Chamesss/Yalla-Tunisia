"use client";
import { cartState } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import HandmadesCart from "./HandmadesCart";
import SportsCart from "./SportsCart";
import GuideCart from "./GuideCart";
import React from "react";

type data = {
  data: Product;
  ref: string;
}[];

export default function Main() {
  const cart = useSelector(cartState);
  const [productsData, setProductsData] = useState<data | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      if (cart.products.length > 0) {
        const productPromises = cart.products.map((p) =>
          fetch(`/api/listings/getsinglelisting`, {
            headers: {
              id: p.productId,
              ref: p.categoryName,
            },
          }).then(async (response) => {
            const data = (await response.json()) as
              | ProductGuides
              | ProductHandMade
              | ProductSports;
            return {
              data: data,
              ref: p.categoryName,
            };
          })
        );
        const products = await Promise.all(productPromises);
        setProductsData(products);
        setLoading(false);
      } else {
        setProductsData(undefined);
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [cart.products]);

  return (
    <>
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {productsData === undefined ? (
            <div className="flex flex-1 items-center justify-center">
              No products found
            </div>
          ) : (
            <div className="flex flex-1 flex-col mt-4 max-w-[100rem] space-y-4 items-center justify-start w-full px-6">
              <h1 className="text-xl font-bold">
                Your Cart ({cart.products.length} items)
              </h1>
              <Card className="w-full flex flex-1">
                <CardBody className="w-full flex flex-1">
                  <div>
                    <table className="w-full">
                      <thead>
                        <tr className="hidden sm:table-row">
                          <th className="w-1/2">Offers</th>
                          <th className="w-1/6">Specs</th>
                          <th className="w-1/6">Price</th>
                          <th className="w-1/6">Action</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-4 w-full">
                        {productsData.map((item) => (
                          <React.Fragment key={item.data.id}>
                            {item.ref.toLowerCase() === "handmades" && (
                              //@ts-ignore
                              <HandmadesCart item={item} />
                            )}
                            {item.ref.toLowerCase() === "sports" && (
                              //@ts-ignore
                              <SportsCart item={item} />
                            )}
                            {item.ref.toLowerCase() === "guides" && (
                              //@ts-ignore
                              <GuideCart item={item} />
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
}

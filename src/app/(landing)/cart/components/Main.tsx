"use client";
import { cartState } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";

type data = {
  data: ProductGuides | ProductHandMade | ProductSports;
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
                    <Table aria-label="Example static collection table">
                      <TableHeader>
                        <TableColumn>Offer</TableColumn>
                        <TableColumn>Specs</TableColumn>
                        <TableColumn>Qte</TableColumn>
                        <TableColumn>Action</TableColumn>
                      </TableHeader>
                      <TableBody items={productsData}>
                        {(item) => (
                          <TableRow key={item.data.id}>
                            <TableCell>
                              <div>
                                <Image
                                  src={item.data.imageUrls[0]}
                                  width={640}
                                  height={640}
                                  alt={`picture-${item.data.title}`}
                                  className="w-28 h-28 rounded-sm object-contain"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <p>{"specs"}</p>
                            </TableCell>
                            <TableCell>
                              <p>{"item.data"}</p>
                            </TableCell>
                            <TableCell>
                              <p>Action</p>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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

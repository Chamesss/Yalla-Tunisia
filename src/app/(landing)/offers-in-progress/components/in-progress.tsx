"use client";
import getInProgress from "@/lib/checkoutActions/get-in-progress";
import getUserFromCookies from "@/lib/getUserFromCookies";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import HandmadesCart from "../../cart/components/HandmadesCart";
import SportsCart from "../../cart/components/SportsCart";
import GuideCart from "../../cart/components/GuideCart";
import HandmadesColumn from "./handmades-column";

type Result = {
  products: any;
  transactions: any;
};

export default function InProgress() {
  const [inProgress, setInProgress] = useState<Product[]>();
  const [disabled, setDisabled] = useState<Product[]>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserFromCookies();
        if (user) {
          const res: Result = await getInProgress(user.userId as string);
          const products: Product[] = res.products;
          const transactions = res.transactions;
          setTransactions(transactions);
          const inProgress = products.filter(
            (doc) => doc.sold === true && doc.disabled === false
          );
          const disabled = products.filter(
            (doc) => doc.sold === true && doc.disabled === true
          );
          setDisabled(disabled);
          setInProgress(inProgress);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 py-8 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <thead>
        <tr className="hidden lg:table-row">
          <th className="w-1/3 pb-4">Offers</th>
          <th className="w-1/2 pb-4">Specs</th>
          <th className="w-1/6 pb-4">Price</th>
          <th className="w-1/6 pb-4">Action</th>
        </tr>
      </thead>
      <tbody className="w-full flex flex-1 flex-col lg:table-row-group">
        {inProgress &&
          inProgress.map((item, i) => (
            <React.Fragment key={item.id}>
              {transactions &&
                renderHandmadesColumn(
                  item as ProductHandMade,
                  transactions as TransactionHandmade[]
                )}
              {/* {item.categoryId === "66207a58baeaaee2d5e6d417" && (
                <SportsCart item={item} />
              )}
              {item.categoryId === "66207ab5b27e1a42a69a6517" && (
                <GuideCart item={item} />
              )} */}
              {/* <Divider
                className={`lg:hidden ${
                  i === productsData.length - 1 && "hidden"
                }`}
              /> */}
            </React.Fragment>
          ))}
      </tbody>
    </div>
  );
}

const renderHandmadesColumn = (
  item: ProductHandMade,
  transactions: TransactionHandmade[]
) => {
  if (item.categoryId.toLowerCase() === "66207a2aeaae61ad28ef0b19") {
    if (transactions) {
      const TransactionHandmade: any = transactions.find(
        (trs) => trs.offerId === item.id
      );
      return (
        <HandmadesColumn
          item={item as ProductHandMade}
          transaction={TransactionHandmade as TransactionHandmade}
        />
      );
    } else return null;
  } else return null;
};

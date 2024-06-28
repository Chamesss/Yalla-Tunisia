"use client";
import getInProgress from "@/lib/checkoutActions/get-in-progress";
import getUserFromCookies from "@/lib/getUserFromCookies";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import HandmadesCart from "../../cart/components/HandmadesCart";
import SportsCart from "../../cart/components/SportsCart";
import GuideCart from "../../cart/components/GuideCart";
import HandmadesColumn from "./handmades-column";
import SportsColumn from "./sports-column";
import GuidesColumn from "./guides-column";

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
      <tbody className="w-full flex flex-1 flex-col lg:table-row-group">
        {inProgress &&
          inProgress.map((item, i) => (
            <React.Fragment key={item.id}>
              {transactions &&
                renderColumn(
                  item as ProductHandMade,
                  transactions as TransactionHandmade[]
                )}
            </React.Fragment>
          ))}
      </tbody>
    </div>
  );
}

type Transaction = TransactionHandmade | TransactionGuide | TransactionSport;

const renderColumn = (item: Product, transactions: Transaction[]) => {
  const Transaction: any = transactions.find((trs) => trs.offerId === item.id);
  if (item.categoryId === "66207a2aeaae61ad28ef0b19") {
    return (
      <HandmadesColumn
        item={item as ProductHandMade}
        transaction={Transaction as TransactionHandmade}
      />
    );
  } else if (item.categoryId === "66207a58baeaaee2d5e6d417") {
    return (
      <SportsColumn
        item={item as ProductSports}
        transaction={Transaction as TransactionSport}
      />
    );
  } else if (item.categoryId === "66207a58baeaaee2d5e6d417") {
    <GuidesColumn
      item={item as ProductGuides}
      transaction={Transaction as TransactionGuide}
    />;
  }
};

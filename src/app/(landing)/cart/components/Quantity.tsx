import React, { Dispatch, SetStateAction, useState } from "react";

type Prop = {
  data: ProductHandMade;
  ref: string;
};

export default function Quantity({
  item,
  setQte,
  qte,
}: {
  item: Prop;
  setQte: React.Dispatch<React.SetStateAction<number>>;
  qte: number;
}) {
  return (
    <>
      {item.ref.toLowerCase() === "handmades" && (
        <div className="flex flex-col">
          <div className="w-fit flex flex-col items-center relative">
            <small className="absolute -top-[100%]">Quantity</small>
            <div className="flex flex-row items-center">
              <button
                disabled={qte === 1}
                onClick={() => setQte((prev) => prev - 1)}
                className={`mx-2 px-1 active:opacity-60 border text-medium h-fit w-fit ${
                  qte === 1 && "opacity-40"
                }`}
              >
                -
              </button>
              <p className="text-medium font-semibold mx-2">{qte}</p>
              <button
                disabled={qte >= Number(item.data.qte)}
                onClick={() => setQte((prev) => prev + 1)}
                className={`mx-2 px-1 active:opacity-60 border text-medium h-fit w-fit ${
                  qte === Number(item.data.qte) && "opacity-60"
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

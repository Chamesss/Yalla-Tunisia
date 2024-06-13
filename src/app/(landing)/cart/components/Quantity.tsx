import React, { Dispatch, SetStateAction, useState } from "react";

type Prop = {
  data: Product;
  ref: string;
};

export default function Quantity({ item }: { item: Prop }) {
  const [qte, setQte] = useState(1);
  return (
    <>
      {item.ref.toLowerCase() === "handmades" && (
        <div className="flex flex-col">
          <div className="w-fit flex flex-col items-center space-y-2">
            <p>Quantity</p>
            <div className="flex flex-row items-center">
              <button
                disabled={qte === 0}
                onClick={() => setQte((prev) => prev - 1)}
                className={`mx-2 px-1 active:opacity-60 border text-medium h-fit w-fit ${
                  qte === 0 && "opacity-60"
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

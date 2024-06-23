import React from "react";

export default function GrpSize({
  setTotalGroup,
  totalGroup,
}: {
  setTotalGroup: React.Dispatch<React.SetStateAction<number>>;
  totalGroup: number;
}) {
  return (
    <>
      <div className="flex flex-col mb-5">
        <div className="w-fit flex flex-col items-center relative">
          <small className="mb-2">Group Size</small>
          <div className="flex flex-row items-center">
            <button
              disabled={totalGroup <= 1}
              onClick={() => setTotalGroup((prev) => prev - 1)}
              className={`mx-2 px-1 active:opacity-60 border text-medium h-fit w-fit ${
                totalGroup === 1 && "opacity-40"
              }`}
            >
              -
            </button>
            <p className="text-medium font-semibold mx-2">{totalGroup}</p>
            <button
              disabled={totalGroup >= 4}
              onClick={() => setTotalGroup((prev) => prev + 1)}
              className={`mx-2 px-1 active:opacity-60 border text-medium h-fit w-fit ${
                totalGroup === 4 && "opacity-60"
              }`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

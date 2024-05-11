import { Timestamp } from "firebase/firestore";
import React from "react";

export default function CreationDateCell({ date }: { date: unknown }) {
  let formattedDate;
  if (date instanceof Timestamp) {
    formattedDate = date.toDate().toLocaleString();
  } else {
    formattedDate = "Date unavailable";
  }
  return (
    <div className="flex flex-col">
      <p className="text-bold text-sm capitalize text-default-400">
        {formattedDate}
      </p>
    </div>
  );
}

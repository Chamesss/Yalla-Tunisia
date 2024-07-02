import { ExtractDate } from "@/helpers/ExtractDateTimestamp";
import { Timestamp } from "firebase/firestore";
import React from "react";

export default function CreationDateCell({ date }: { date: unknown }) {
  let formattedDate;
  formattedDate = ExtractDate(date as Timestamp);
  return (
    <div className="flex flex-col">
      <p className="text-bold text-sm capitalize text-default-400">
        {formattedDate}
      </p>
    </div>
  );
}

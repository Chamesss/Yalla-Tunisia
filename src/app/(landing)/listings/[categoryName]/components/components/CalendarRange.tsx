"use client";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  listing: ProductGuides | ProductSports;
};

export default function CalendarRange({ listing }: Props) {
  const days = listing.timing;

  const convertTimestampToDate = (timestamp: any) => {
    const convertedDate = timestamp as Timestamp;
    const date = new Date(convertedDate.seconds * 1000); // Convert seconds to milliseconds

    return date;
  };

  if (typeof days === "object") {
    const formattedDays = days?.map(convertTimestampToDate);
    return (
      <DayPicker
        numberOfMonths={1}
        disabled
        mode="multiple"
        min={1}
        selected={formattedDays}
      />
    );
  }

  return (
    <div>
      <p>{days}</p>
    </div>
  );
}

import { Dispatch, LegacyRef, SetStateAction, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  clockRef: LegacyRef<HTMLDivElement> | undefined;
  days: Date[] | undefined;
  setDays: Dispatch<SetStateAction<Date[] | undefined>>;
};

export default function DaysPicker({ clockRef, days, setDays }: Props) {
  return (
    <div ref={clockRef} className="flex flex-col items-center h-fit w-full ">
      <p>Sélectionnez vos jours d'événement</p>
      {days && (
        <input
          name="days"
          multiple
          value={days.map((date) => date.toISOString())}
          className="absolute hidden"
        />
      )}
      <DayPicker
        numberOfMonths={2}
        mode="multiple"
        min={1}
        selected={days}
        onSelect={setDays}
      />
      {days && days.length > 0 && (
        <p className="h-auto">
          {days.length} {days.length === 1 ? "day" : "days"} sélectionné(s)
        </p>
      )}
    </div>
  );
}

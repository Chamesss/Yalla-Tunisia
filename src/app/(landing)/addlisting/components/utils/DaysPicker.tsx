import { Dispatch, LegacyRef, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";

type Props = {
  clockRef: LegacyRef<HTMLDivElement> | undefined;
  days: Date[] | undefined;
  setDays: Dispatch<SetStateAction<Date[] | undefined>>;
};

export default function DaysPicker({ clockRef, days, setDays }: Props) {
  return (
    <div ref={clockRef} className="flex flex-col items-center h-fit w-full ">
      <p>Select your event days</p>
      <DayPicker
        numberOfMonths={2}
        mode="multiple"
        min={1}
        selected={days}
        onSelect={setDays}
      />
      {days && days.length > 0 && (
        <p className="h-auto">
          {days.length} {days.length === 1 ? "day" : "days"} selected
        </p>
      )}
    </div>
  );
}

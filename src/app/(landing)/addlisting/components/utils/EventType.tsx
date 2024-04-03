import { Radio, RadioGroup } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setScheduled: Dispatch<SetStateAction<boolean>>;
  scheduled: boolean;
};

export default function EventType({ setScheduled, scheduled }: Props) {
  return (
    <div className="flex flex-row">
      <h1 className="font-semibold">Event type:</h1>
      <RadioGroup
        className="ml-4"
        orientation="horizontal"
        defaultValue="ScheduledEvent"
      >
        <Radio
          onChange={() => {
            setScheduled(false);
          }}
          value="OngoingEvent"
        >
          Ongoing Event.
        </Radio>
        <Radio
          onChange={() => {
            setScheduled(true);
          }}
          defaultChecked
          checked={scheduled}
          value="ScheduledEvent"
        >
          Scheduled Event.
        </Radio>
      </RadioGroup>
    </div>
  );
}

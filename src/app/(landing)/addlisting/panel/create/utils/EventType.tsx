import { Radio, RadioGroup } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setScheduled: Dispatch<SetStateAction<boolean>>;
  scheduled: boolean;
};

export default function EventType({ setScheduled, scheduled }: Props) {
  return (
    <div className="flex flex-row">
      <h1 className="font-semibold">Type d'événement :</h1>
      <RadioGroup
        name="eventType"
        value={scheduled ? "ScheduledEvent" : "OngoingEvent"}
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
          Événement en cours.
        </Radio>
        <Radio
          onChange={() => {
            setScheduled(true);
          }}
          defaultChecked
          checked={scheduled}
          value="ScheduledEvent"
        >
          Événement programmé.
        </Radio>
      </RadioGroup>
    </div>
  );
}

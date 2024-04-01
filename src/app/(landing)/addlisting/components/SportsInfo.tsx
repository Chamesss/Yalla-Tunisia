import { useState } from "react";
import { Textarea, Input, Divider, RadioGroup, Radio } from "@nextui-org/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function SportsInfo() {
  const [allTime, setAllTime] = useState(false);
  const [allTimeNoWknd, setAllTimeNoWknd] = useState(false);
  const [allTimeWWknd, setAllTimeWWknd] = useState(false);
  const [scheduled, setScheduled] = useState(true);
  const [ongoing, setOngoing] = useState(false);
  const [selected, setSelected] = useState<Date>();
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>();

  const footer =
    days && days.length > 0 ? (
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick one or more days.</p>
    );

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full items-stretch gap-4">
        <h1 className="text-xl font-semibold">General info</h1>
        <div className="px-2 gap-4 flex flex-col">
          <Input isRequired size="sm" label="Title" />
          <div className="flex flex-row gap-4">
            <Input
              isRequired
              type="number"
              label="Price"
              size="sm"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
            />
            <Input
              isRequired
              type="number"
              label="Max group size"
              size="sm"
              className="w-[50%]"
            />
          </div>
          <Textarea
            label="Description"
            placeholder="Enter your description"
            description="Enter a concise description of your project."
          />
          <Input isRequired size="sm" label="Duration" />
          <Divider className="my-4" />
          <div className="flex flex-row">
            <h1 className="font-semibold">Event type:</h1>
            <RadioGroup
              className="ml-4"
              orientation="horizontal"
              defaultValue="ScheduledEvent"
            >
              <Radio
                onChange={() => {
                  setOngoing(true);
                  setScheduled(false);
                }}
                value="OngoingEvent"
              >
                Ongoing Event.
              </Radio>
              <Radio
                onChange={() => {
                  setOngoing(false);
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
          <Divider className="my-4" />
          <div className="flex flex-row items-center justify-between w-full">
            {scheduled && (
              <div className="flex justify-evenly items-center w-full">
                <DayPicker
                  numberOfMonths={2}
                  mode="multiple"
                  min={1}
                  selected={days}
                  onSelect={setDays}
                />
              </div>
            )}
            <div className="flex-1">
              {ongoing && (
                <RadioGroup label="Select your favorite city">
                  <Radio value="buenos-aires">Buenos Aires</Radio>
                  <Radio value="sydney">Sydney</Radio>
                  <Radio value="san-francisco">San Francisco</Radio>
                  <Radio value="london">London</Radio>
                  <Radio value="tokyo">Tokyo</Radio>
                </RadioGroup>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

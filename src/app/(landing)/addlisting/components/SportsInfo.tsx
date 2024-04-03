import { useState, useRef, useEffect } from "react";
import {
  Textarea,
  Input,
  Divider,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import AddImages from "./AddImages";
import RadioGrpTime from "./utils/RadioGrpTime";
import DaysPicker from "./utils/DaysPicker";
import Restrictions from "./utils/Restrictions";

export default function SportsInfo() {
  const [allTime, setAllTime] = useState(false);
  const [allTimeNoWknd, setAllTimeNoWknd] = useState(false);
  const [allTimeWWknd, setAllTimeWWknd] = useState(false);
  const [scheduled, setScheduled] = useState(true);
  const [selected, setSelected] = useState<Date>();
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);
  const radioRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputs, setInputs] = useState([""]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = scheduled
        ? `${clockRef.current?.scrollHeight}px`
        : `${radioRef.current?.scrollHeight}px`;
    }
  }, [scheduled, days]);

  useEffect(() => {
    setAllTime(false);
    setAllTimeNoWknd(false);
    setAllTimeWWknd(false);
  }, [scheduled]);

  useEffect(() => {
    if (resRef.current) {
      resRef.current.style.height = `${resRef.current?.scrollHeight}px`;
    }
  }, []);

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
          <Divider className="my-4" />
          <div
            ref={contentRef}
            className="flex flex-row h-fit transition-all items-center justify-between w-full overflow-hidden"
          >
            {scheduled ? (
              <DaysPicker clockRef={clockRef} days={days} setDays={setDays} />
            ) : (
              <RadioGrpTime radioRef={radioRef} />
            )}
          </div>
          <Divider className="my-4" />
          <AddImages />
          <Divider className="my-4" />
          <Restrictions
            inputRef={inputRef}
            setInputs={setInputs}
            inputs={inputs}
            resRef={resRef}
          />
        </div>
      </div>
    </div>
  );
}

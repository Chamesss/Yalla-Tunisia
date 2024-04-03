import { useState, useRef, useEffect } from "react";
import {
  Textarea,
  Input,
  Divider,
  RadioGroup,
  Radio,
  Button,
  CheckboxGroup,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import AddImages from "./AddImages";
import { CustomCheckbox } from "./CustomCheckBox";
import { spokenLanguages as SPOKENLANGUAGES } from "./Languages";

export default function GuideInfo() {
  const [allTime, setAllTime] = useState(false);
  const [allTimeNoWknd, setAllTimeNoWknd] = useState(false);
  const [allTimeWWknd, setAllTimeWWknd] = useState(false);

  const [spokenLanguages, setSpokenLanguages] = useState(SPOKENLANGUAGES);

  const [selectedPaymentMethod, setSelectedPayementMethod] = useState("tour");
  const [languages, setLanguages] = useState<string[]>([]);

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

  useEffect(() => {
    const remainingLanguages = SPOKENLANGUAGES.filter(
      (lang) => !languages.includes(lang)
    );
    setSpokenLanguages(remainingLanguages);
  }, [languages]);

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
    if (resRef.current) {
      resRef.current.style.height = `${
        parseInt(resRef.current.style.height) +
        // @ts-ignore
        inputRef.current?.scrollHeight +
        55
      }px`;
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    if (resRef.current) {
      resRef.current.style.height = `${
        parseInt(resRef.current.style.height) -
        // @ts-ignore
        (inputRef.current?.scrollHeight + 55)
      }px`;
    }
  };

  const handlePaymentTypeChange = (value: string) => {
    setSelectedPayementMethod(value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full items-stretch gap-4">
        <h1 className="text-xl font-semibold">General info</h1>
        <div className="px-2 gap-4 flex flex-col">
          <Input isRequired size="sm" label="Title" />
          <Textarea
            label="Description"
            placeholder="Enter your description"
            description="Enter a concise description of your project."
          />
          <Input isRequired size="sm" label="Duration" />

          <Divider className="my-4" />
          {/* Language Selector */}

          <div className="flex flex-col gap-4">
            <CheckboxGroup
              className="gap-1"
              label="Languages Selected"
              orientation="horizontal"
            >
              <>
                {languages.length > 0 ? (
                  <>
                    {languages.map((l) => (
                      <CustomCheckbox
                        onClick={() =>
                          setLanguages((prev) => {
                            const tmp = prev.filter((lan) => lan !== l);
                            return tmp;
                          })
                        }
                        key={l}
                      >
                        {l}
                      </CustomCheckbox>
                    ))}
                  </>
                ) : (
                  <div>
                    <p>No languages selected</p>
                  </div>
                )}
              </>
            </CheckboxGroup>
            <Autocomplete
              label="Select your spoken languages"
              className="max-w-xs"
            >
              {spokenLanguages.map((l) => (
                <AutocompleteItem
                  onClick={() => setLanguages((prev) => [...prev, l])}
                  key={l}
                  value={l}
                >
                  {l}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>

          <Divider className="my-4" />
          <div className="flex flex-row">
            <h1 className="font-semibold">Payment:</h1>
            <RadioGroup
              className="ml-4"
              onValueChange={(value) => handlePaymentTypeChange(value)}
              orientation="horizontal"
              defaultValue="tour"
            >
              <Radio value="hourly">Payment per hour</Radio>
              <Radio value="tour">Payment per entire tour</Radio>
            </RadioGroup>
          </div>
          {selectedPaymentMethod === "hourly" && (
            <Input
              isRequired
              type="number"
              label="Price per hour"
              size="sm"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
            />
          )}
          {selectedPaymentMethod === "tour" && (
            <Input
              isRequired
              type="number"
              label="Price per entire tour"
              size="sm"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
            />
          )}
          <Divider className="my-4" />
          <div className="flex flex-row">
            <h1 className="font-semibold">Transportation:</h1>
            <RadioGroup
              className="ml-4"
              orientation="horizontal"
              defaultValue="NoTransportation"
            >
              <Radio
                // onChange={() => {
                //   setScheduled(false);
                // }}
                value="Transportation"
              >
                Included.
              </Radio>
              <Radio
                // onChange={() => {
                //   setScheduled(true);
                // }}
                // defaultChecked
                // checked={scheduled}
                value="NoTransportation"
              >
                Not included.
              </Radio>
            </RadioGroup>
          </div>
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
              <div
                ref={clockRef}
                className="flex flex-col items-center h-fit w-full "
              >
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
            ) : (
              <RadioGroup ref={radioRef} label="Program Timing">
                <Radio value="Available-all-time">Available all time</Radio>
                <Radio value="Available all weekends (sat, sun)">
                  Available all weekends (sat, sun)
                </Radio>
                <Radio value="Available all time except weekend (sat, sun)">
                  Available all time except weekend (sat, sun)
                </Radio>
              </RadioGroup>
            )}
          </div>
          <Divider className="my-4" />
          <AddImages />
          <Divider className="my-4" />
          <div
            ref={resRef}
            className="flex flex-col gap-4 h-fit transition-all"
          >
            <h1 className="text-xl font-semibold">Restrictions</h1>
            {inputs.map((input, index) => (
              <div key={index} className="flex gap-4">
                <Input
                  ref={inputRef}
                  label={`Restriction ${index + 1}`}
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  size="sm"
                />
                {index > 0 && ( // Render remove button for additional inputs
                  <button
                    type="button"
                    onClick={() => handleRemoveInput(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-full hover:opacity-80 transition-all"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <Button
              onClick={handleAddInput}
              className=" bg-primary-500 text-white w-fit m-auto"
            >
              + Add Restriction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

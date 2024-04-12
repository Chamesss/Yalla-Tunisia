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
  Spinner,
} from "@nextui-org/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import AddImages from "./AddImages";
import { CustomCheckbox } from "./CustomCheckBox";
import { spokenLanguages as SPOKENLANGUAGES } from "./Languages";
import RadioGrpTime from "./utils/RadioGrpTime";
import DaysPicker from "./utils/DaysPicker";
import Restrictions from "./utils/Restrictions";
import EventType from "./utils/EventType";
import { MainPropsForm, PropsForm } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { createGuideListing } from "@/lib/actions/createGuideListing";
import SuccessLoading from "./utils/SuccessLoading";
import SubmitSection from "./utils/SubmitSection";
import OuterValues from "./utils/OuterValues";

function GuideInfoFrom({
  formState,
  userId,
  categoryId,
  subCategoryId,
  location,
  setSubCategoryError,
  setLocationError,
  setCategoryError,
}: PropsForm) {
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
  const data = useFormStatus();

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

  const deleteSelectedLanguages = (language: string) => {
    setLanguages((prev) => {
      const tmp = prev.filter((lan) => lan !== language);
      return tmp;
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full items-stretch gap-4">
        <h1 className="text-xl font-semibold">General info</h1>
        <OuterValues
          userId={userId}
          categoryId={categoryId}
          subCategoryId={subCategoryId}
          location={location}
        />
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
                        onClick={() => deleteSelectedLanguages(l)}
                        key={l}
                      >
                        {l}
                      </CustomCheckbox>
                    ))}
                  </>
                ) : (
                  <div>
                    <small className="italic">No languages selected</small>
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
              onValueChange={(value) => setSelectedPayementMethod(value)}
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
          <EventType setScheduled={setScheduled} scheduled={scheduled} />
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
          <SubmitSection data={data} formState={formState} />
        </div>
      </div>
    </div>
  );
}

export default function GuideInfo({
  userId,
  categoryId,
  subCategoryId,
  location,
  setLocationError,
  setCategoryError,
  setSubCategoryError,
}: MainPropsForm) {
  const initialState = {
    response: {
      success: false,
      message: "",
      error: 0,
    },
  };

  const [formState, formAction] = useFormState(
    createGuideListing,
    initialState
  );

  return (
    <form
      action={formAction}
      className="w-full flex flex-col items-center justify-center"
    >
      <GuideInfoFrom
        formState={formState}
        userId={userId}
        categoryId={categoryId}
        subCategoryId={subCategoryId}
        location={location}
        setLocationError={setLocationError}
        setCategoryError={setCategoryError}
        setSubCategoryError={setSubCategoryError}
      />
    </form>
  );
}

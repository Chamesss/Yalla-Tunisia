import { useState, useRef, useEffect } from "react";
import { Textarea, Input, Divider } from "@nextui-org/react";
import AddImages from "./AddImages";
import RadioGrpTime from "./utils/RadioGrpTime";
import DaysPicker from "./utils/DaysPicker";
import Restrictions from "./utils/Restrictions";
import EventType from "./utils/EventType";
import { MainPropsForm, PropsForm } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { createSportListing } from "@/lib/actions/createSportListing";
import SubmitSection from "./utils/SubmitSection";
import OuterValues from "./utils/OuterValues";

function SportsInfoFrom({
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
  const [scheduled, setScheduled] = useState(true);
  const [days, setDays] = useState<Date[] | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);
  const radioRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState<number>(0);
  const [inputs, setInputs] = useState([""]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const data = useFormStatus();

  useEffect(() => {
    setFormError(0);
  }, [title, price, description]);

  useEffect(() => {
    formState.response?.error && setFormError(formState.response.error);
    console.log("formState.response?.error === ", formState.response?.error);
    if (formState.response?.error !== 0) {
      if (formState.response?.error === 11) {
        setCategoryError(true);
      }
      if (formState.response?.error === 12) {
        setSubCategoryError(true);
      }
      if (formState.response?.error === 13) {
        setLocationError(true);
      }
      const element = document.getElementById("GeneralSection");
      element?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [formState]);

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
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col w-full items-stretch gap-4">
          <OuterValues
            userId={userId}
            categoryId={categoryId}
            subCategoryId={subCategoryId}
            location={location}
          />
          <h1 className="text-xl font-semibold">General info</h1>
          <div className="px-2 gap-4 flex flex-col">
            <Input
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              size="sm"
              label={
                <span className="text-sm">
                  Title<small className="text-danger-500">*</small>
                </span>
              }
              description={
                (formError === 1 || title.length > 35) && (
                  <small className=" text-danger-500">
                    {formState?.response?.message}
                  </small>
                )
              }
            />
            <div className="flex flex-row gap-4">
              <Input
                type="number"
                label={
                  <span className="text-sm">
                    Price (per person)
                    <small className="text-danger-500">*</small>
                  </span>
                }
                id="price"
                name="price"
                onChange={(e) => setPrice(parseInt(e.target.value))}
                size="sm"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">DT</span>
                  </div>
                }
                description={
                  formError === 2 && (
                    <small className="text-danger-500">
                      {formState?.response?.message}
                    </small>
                  )
                }
              />
              <Input
                type="number"
                label="Max group size"
                size="sm"
                className="w-[50%]"
                defaultValue="1"
                name="grpSize"
              />
            </div>
            <Textarea
              id="description"
              name="description"
              label={
                <span className="text-sm">
                  Description<small className="text-danger-500">*</small>
                </span>
              }
              placeholder="Enter your description"
              onChange={(e) => setDescription(e.target.value)}
              description={
                (description.length > 255 || formError === 4) && (
                  <small className=" text-danger-500">
                    {formState?.response?.message}
                  </small>
                )
              }
            />
            <Input
              name="duration"
              size="sm"
              type="number"
              label="Duration (hours)"
              defaultValue="1"
            />
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
          </div>
        </div>
      </div>
      <SubmitSection data={data} formState={formState} />
    </>
  );
}

export default function SportsInfo({
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
    createSportListing,
    initialState
  );

  return (
    <form
      action={formAction}
      className="w-full flex flex-col items-center justify-center"
    >
      <SportsInfoFrom
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

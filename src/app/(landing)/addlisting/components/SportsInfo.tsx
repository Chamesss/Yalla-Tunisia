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
import FormStateError from "./utils/FormStateError";
import { getErrorStateSports } from "@/constants/errorMapping";

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
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const data = useFormStatus();
  const [grpSize, setGrpSize] = useState("1");
  const [duration, setDuration] = useState("1");

  useEffect(() => {
    setFormError(0);
  }, [title, price, description, grpSize]);

  useEffect(() => {
    formState.response?.error && setFormError(formState.response.error);
    if (formState.response?.error !== 0) {
      const mapping = getErrorStateSports(
        setCategoryError,
        setSubCategoryError,
        setLocationError,
        formState.response?.error
      );
      if (mapping) {
        if (mapping.errorStateSetter) {
          mapping.errorStateSetter(true);
        }
        const element = document.getElementById(mapping.sectionId);
        element?.scrollIntoView(mapping.scrollOptions);
      }
    }
  }, [formState]);

  useEffect(() => {
    setFormError(0);
    if (contentRef.current) {
      contentRef.current.style.height = scheduled
        ? `${clockRef.current?.scrollHeight}px`
        : `${radioRef.current?.scrollHeight}px`;
    }
  }, [scheduled, days]);

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
          <div id="GeneralSection" className="px-2 gap-4 flex flex-col">
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
                formError === 1 && <FormStateError formState={formState} />
              }
            />
            <div className="flex flex-row gap-4">
              <Input
                type="number"
                className="relative"
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
                  formError === 2 && <FormStateError formState={formState} />
                }
              />
              <Input
                type="number"
                label="Max group size"
                size="sm"
                className="w-[50%] relative"
                defaultValue="1"
                name="grpSize"
                onChange={(e) => setGrpSize(e.target.value)}
                value={grpSize}
                description={
                  formError === 3 && <FormStateError formState={formState} />
                }
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
                formError === 4 && <FormStateError formState={formState} />
              }
            />
            <Input
              name="duration"
              size="sm"
              type="number"
              label={
                <span className="text-sm">
                  Duration (hours)<small className="text-danger-500">*</small>
                </span>
              }
              defaultValue="1"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              description={
                formError === 5 && <FormStateError formState={formState} />
              }
            />
          </div>
          <div className="px-2 gap-4 flex flex-col">
            <Divider className="my-4" />
            <EventType setScheduled={setScheduled} scheduled={scheduled} />
            <Divider className="my-4" />
            <div
              id="timingSection"
              ref={contentRef}
              className="flex flex-row h-fit transition-all items-center justify-between w-full overflow-hidden"
            >
              {scheduled ? (
                <DaysPicker clockRef={clockRef} days={days} setDays={setDays} />
              ) : (
                <RadioGrpTime radioRef={radioRef} />
              )}
            </div>
            {(formError === 6 || formError === 7) && (
              <small className="text-danger-500">
                {formState.response.message}
              </small>
            )}
            <Divider className="my-4" />
            <AddImages
              formState={formState}
              formError={formError}
              setPreviewImages={setPreviewImages}
              previewImages={previewImages}
            />
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

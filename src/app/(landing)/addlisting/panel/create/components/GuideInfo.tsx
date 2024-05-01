import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  Textarea,
  Input,
  Divider,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import "react-day-picker/dist/style.css";
import AddImages from "./AddImages";
import { CustomCheckbox } from "./CustomCheckBox";
import { spokenLanguages } from "./Languages";
import RadioGrpTime from "../utils/RadioGrpTime";
import DaysPicker from "../utils/DaysPicker";
import Restrictions from "../utils/Restrictions";
import EventType from "../utils/EventType";
import { MainPropsForm, PropsForm } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { createGuideListing } from "@/lib/actions/createGuideListing";
import SubmitSection from "../utils/SubmitSection";
import OuterValues from "../utils/OuterValues";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "@/constants/fallbackRender";
import FormStateError from "../utils/FormStateError";
import { getErrorStateGuide } from "@/constants/errorMapping";

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
  const [selectedPaymentMethod, setSelectedPayementMethod] = useState("tour");
  const [languages, setLanguages] = useState<string[]>([]);
  const [scheduled, setScheduled] = useState(true);
  const [days, setDays] = useState<Date[] | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);
  const radioRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputs, setInputs] = useState([""]);
  const [formError, setFormError] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [transportation, setTransportation] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const data = useFormStatus();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = scheduled
        ? `${clockRef.current?.scrollHeight}px`
        : `${radioRef.current?.scrollHeight}px`;
    }
  }, [scheduled, days]);

  useEffect(() => {
    setFormError(0);
  }, [title, price, description, selectedPaymentMethod, scheduled]);

  useEffect(() => {
    formState.response?.error && setFormError(formState.response.error);
    if (formState.response?.error !== 0) {
      const mapping = getErrorStateGuide(
        setCategoryError,
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

  useLayoutEffect(() => {
    if (resRef.current) {
      resRef.current.style.height = `${resRef.current?.scrollHeight}px`;
    }
  }, []);

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
          <div className="gap-4 flex flex-col" id="GeneralSection">
            <Input
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
            <div className="flex flex-row">
              <h1 className="font-semibold">Payment:</h1>
              <RadioGroup
                className="ml-4"
                onValueChange={(value) => setSelectedPayementMethod(value)}
                orientation="horizontal"
                defaultValue="tour"
                name="paymentMethod"
                value={selectedPaymentMethod}
              >
                <Radio value="hourly">Payment per hour</Radio>
                <Radio value="tour">Payment per entire tour</Radio>
              </RadioGroup>
            </div>
            <Input
              type="number"
              label={`Price per ${
                selectedPaymentMethod === "hourly" ? "hour" : "tour"
              }`}
              size="sm"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              name="price"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">DT</span>
                </div>
              }
              description={
                formError === 2 && <FormStateError formState={formState} />
              }
            />
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold flex flex-row gap-1 items-center">
              Languages:
              <CheckboxGroup className="gap-1" orientation="horizontal">
                {languages.length > 0 ? (
                  <>
                    {languages.map((l, i: number) => (
                      <CustomCheckbox
                        onClick={() => deleteSelectedLanguages(l)}
                        key={l}
                      >
                        {l}
                        <input
                          name={`language-${i}`}
                          value={l}
                          className="hidden absolute"
                        />
                      </CustomCheckbox>
                    ))}
                  </>
                ) : (
                  <small className="italic font-normal">
                    No languages selected
                  </small>
                )}
              </CheckboxGroup>
            </h1>
            <ErrorBoundary fallbackRender={fallbackRender}>
              <Autocomplete
                id="LanguageSelector"
                defaultItems={spokenLanguages}
                label="Select your spoken languages"
                className="max-w-xs"
                onSelectionChange={(e) =>
                  typeof e === "string" &&
                  setLanguages((prev) => [...prev, e as string])
                }
                disabledKeys={languages}
                description={
                  formError === 5 && <FormStateError formState={formState} />
                }
              >
                {spokenLanguages.map((l) => (
                  <AutocompleteItem key={l} value={l}>
                    {l}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </ErrorBoundary>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-row">
            <h1 className="font-semibold">Transportation:</h1>
            <RadioGroup
              className="ml-4"
              orientation="horizontal"
              defaultValue="NoTransportation"
              name="transportation"
              value={transportation ? "Transportation" : "NoTransportation"}
            >
              <Radio
                onChange={() => {
                  setTransportation(true);
                }}
                value="Transportation"
              >
                Included.
              </Radio>
              <Radio
                onChange={() => {
                  setTransportation(false);
                }}
                checked={!transportation}
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
          <SubmitSection data={data} formState={formState} />
        </div>
      </div>
      <input
        name="language-length"
        className="absolute hidden"
        value={languages.length}
      />
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

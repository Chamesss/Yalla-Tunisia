import { Radio, RadioGroup } from "@nextui-org/react";
import { ReactRef } from "@nextui-org/react-utils";

type Props = {
  radioRef: ReactRef<HTMLDivElement | null> | undefined;
};

export default function RadioGrpTime({ radioRef }: Props) {
  return (
    <RadioGroup ref={radioRef} name="timing" label="Program Timing">
      <Radio value="Available-all-time">Disponible en tout temps</Radio>
      <Radio value="Available all weekends (sat, sun)">
        Disponible tous les week-ends (sam., dim.)
      </Radio>
      <Radio value="Available all time except weekend (sat, sun)">
        Disponible en tout temps sauf le week-end (sam., dim.)
      </Radio>
    </RadioGroup>
  );
}

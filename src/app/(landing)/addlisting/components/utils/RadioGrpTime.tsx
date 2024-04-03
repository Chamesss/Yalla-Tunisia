import { Radio, RadioGroup } from "@nextui-org/react";
import { ReactRef } from "@nextui-org/react-utils";

type Props = {
  radioRef: ReactRef<HTMLDivElement | null> | undefined;
};

export default function RadioGrpTime({ radioRef }: Props) {
  return (
    <RadioGroup ref={radioRef} label="Program Timing">
      <Radio value="Available-all-time">Available all time</Radio>
      <Radio value="Available all weekends (sat, sun)">
        Available all weekends (sat, sun)
      </Radio>
      <Radio value="Available all time except weekend (sat, sun)">
        Available all time except weekend (sat, sun)
      </Radio>
    </RadioGroup>
  );
}

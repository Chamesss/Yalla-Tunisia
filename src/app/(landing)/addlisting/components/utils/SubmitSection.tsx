import { Divider, Button, Spinner } from "@nextui-org/react";
import { FormStatus } from "react-dom";
import SuccessLoading from "./SuccessLoading";

type Props = {
  data: FormStatus;
  formState: {
    response: {
      success: boolean;
      error: number;
      message: string;
    };
  };
};

export default function SubmitSection({ data, formState }: Props) {
  return (
    <>
      <Divider className="my-4" />
      <div className="px-10 mt-4 py-2 gap-4 flex w-full justify-between">
        <Button color="danger">Cancel</Button>
        <Button disabled={data.pending} type="submit" color="primary">
          {data.pending ? <Spinner /> : "Submit"}
        </Button>
      </div>
      <SuccessLoading formState={formState} />
    </>
  );
}

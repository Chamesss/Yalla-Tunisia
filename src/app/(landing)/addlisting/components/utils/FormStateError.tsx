type Props = {
  formState: {
    response: {
      success: boolean;
      error: number;
      message: string;
    };
  };
};

export default function FormStateError({ formState }: Props) {
  return (
    <small className="absolute -bottom-2 left-3 text-danger-500">
      {formState?.response?.message}
    </small>
  );
}

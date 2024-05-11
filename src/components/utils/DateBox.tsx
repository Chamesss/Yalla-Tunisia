type Props = {
  date: {
    day: string;
    month: string;
    year: string;
  };
};

export default function DateBox({ date }: Props) {
  return (
    <div className="flex flex-col items-center justify-center border border-opacity-50 w-fit px-2 py-1 rounded-lg shadow-sm">
      <small className="flex flex-row">
        {date.day} {date.month}
      </small>
      <small>{date.year}</small>
    </div>
  );
}

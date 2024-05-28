import Tick from "@/components/icons/Tick";

export default function SaveButton() {
  return (
    <div className="rounded-full bg-white p-1 border-2 border-solid cursor-pointer border-success-500 hover:bg-gray-50">
      <Tick width={20} height={20} className="text-success-500" />
    </div>
  );
}

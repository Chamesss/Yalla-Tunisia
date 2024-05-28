import IconCancel from "@/components/icons/IconCancel";

export default function CloseButton() {
  return (
    <div className="rounded-full bg-white p-1 border-2 border-solid cursor-pointer border-danger-500 hover:bg-gray-50">
      <IconCancel width={20} height={20} fill="rgb(243,18,96)" />
    </div>
  );
}

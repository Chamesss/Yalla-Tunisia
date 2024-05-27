import EditIcon from "@/components/icons/EditIcon";

export default function EditButton() {
  return (
    <div className="rounded-full bg-white p-1 border-2 border-solid cursor-pointer border-blue-500 hover:bg-gray-50">
      <EditIcon width={20} height={20} fill="rgb(59,130,246)" />
    </div>
  );
}

import { getItem } from "@/lib/getSingleItem";
import Image from "next/image";

export default async function page({ params }: { params: { id: string } }) {
  const res = await getItem(params.id);
  const data: ItemType = res[0];
  return (
    <div className="flex flex-row p-4">
      <div className="bg-green-200">
        <Image
          src={data.pictures}
          alt="Listing picture"
          width={500}
          height={500}
        />
      </div>
      <div className="p-2 bg-red-200">
        <p className="text-xl font-semibold tracking-wide">{data.title}</p>
        <small className="italic opacity-50">{data.category[0].name}</small>
        <br />
        <small className="italic opacity-50">{data.subcategory[0]?.name}</small>
        <p className="font-medium">Views: {data.views}</p>
      </div>
    </div>
  );
}

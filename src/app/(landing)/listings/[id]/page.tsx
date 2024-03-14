import { getItem } from "@/lib/getSingleItem";
import Image from "next/image";
import CarouselImages from "./components/CarousselImages";

export default async function page({ params }: { params: { id: string } }) {
  const res = await getItem(params.id);
  const data: ItemType = res[0];
  const pictureArray = Array(5).fill(data.pictures);
  return (
    <div className="flex flex-row p-4 mb-20">
      <div className="flex flex-row">
        <div>
          <CarouselImages data={pictureArray} />
        </div>
        <div className="p-2 bg-red-200">
          <p className="text-xl font-semibold tracking-wide">{data.title}</p>
          <small className="italic opacity-50">{data.category[0].name}</small>
          <br />
          <small className="italic opacity-50">
            {data.subcategory[0]?.name}
          </small>
          <p className="font-medium">Views: {data.views}</p>
        </div>
      </div>
      <div className="bg-blue-200 fixed border rounded-lg">
        <p>
          TND<text>{data.price}</text>
        </p>
      </div>
    </div>
  );
}

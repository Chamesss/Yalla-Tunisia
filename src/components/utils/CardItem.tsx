import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import Category from "./../icons/Category";
import Location from "./../icons/Location";

export default function CardItem({ data }: any) {
  const truncatedTitle =
    data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title;

  return (
    <div className="p-4">
      <Card className="py-0 w-fit shadow-[0_0px_12px_-5px_rgba(0,0,0,0.1)] hover:scale-[103%] cursor-pointer rounded-sm">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={data.picture}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p className="text-sm mb-2 uppercase font-bold">{truncatedTitle}</p>
          <small className="text-default-500 flex items-center gap-1">
            <Location />
            Location, Static
          </small>
          <small className="text-default-500 flex items-center gap-1">
            <Category />
            Category, Static
          </small>
          <div className="flex justify-end items-center p-0 mt-2">
            <p className="font-semibold text-[#309980] text-lg">
              {data.price} DT
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

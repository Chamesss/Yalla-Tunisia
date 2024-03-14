import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import Category from "./../icons/Category";
import Location from "./../icons/Location";
import Link from "next/link";

export default function CardItem({ data }: any) {
  const truncatedTitle =
    data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title;

  return (
    <div className="p-1 md:p-4 flex items-center justify-center">
      <Card className="py-0 min-w-32 md:w-48 lg:w-56 shadow-[0_0px_12px_-5px_rgba(0,0,0,0.1)] hover:scale-[103%] cursor-pointer rounded-xl">
        <Link href={`/listings/${data.id}`}>
          <CardHeader className="p-0 overflow-hidden rounded-sm bg-white items-center justify-center">
            <Image
              alt="Card background"
              className="object-cover rounded-none w-full bg-blue-200"
              src={data.pictures}
            />
          </CardHeader>
          <CardBody className="overflow-hidden py-2 px-2">
            <Divider className="my-1" />
            <p className="text-sm mb-2 uppercase font-bold inline-block break-all min-h-10 lg:min-h-0">
              {truncatedTitle}
            </p>
            <div className="flex flex-col justify-self-end">
              <small className="text-default-500 flex items-center gap-1">
                <Location />
                Location, Static
              </small>
              <small className="text-default-500 flex items-center gap-1">
                <Category />
                {data.subcategory
                  ? `${data.subcategory[0].name}`
                  : `${data.category[0].name}`}
              </small>
              <div className="flex justify-end items-center p-0 mt-2">
                <p className="font-semibold text-[#309980] text-lg">
                  {data.price} DT
                </p>
              </div>
            </div>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
}

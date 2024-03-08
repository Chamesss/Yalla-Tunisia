import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function CardItem({ data }: any) {
  return (
    <div className="p-4">
      <Card className="py-4 w-fit shadow-[0_0px_15px_-5px_rgba(0,0,0,0.3)] hover:scale-105 cursor-pointer">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={data.picture}
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  );
}

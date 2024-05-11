import { Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";

export default function HandmadeCard({
  listing,
}: {
  listing: ProductHandMade;
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row overflow-x-auto gap-2 scrollbar-container">
            {listing.imageUrls.map((image, i) => (
              <Image
                key={i}
                src={image}
                width={128}
                height={128}
                alt={`${listing.title}-picture-${i}`}
              />
            ))}
          </div>
          <Divider className="my-2" />
          <div className="w-full flex flex-row justify-between">
            <h1>{listing.title}</h1>
            <span className="text-success-600">{listing.price} DT</span>
          </div>
          <small className="italic">{listing.description}</small>
          <Divider className="my-2" />
          <div className="flex flex-col gap-2">
            <p className="italic">
              Materials used:{" "}
              <small>
                {listing.materialUsed
                  ? listing.materialUsed
                  : "No materials specified"}
              </small>
            </p>
            <p className="italic">Qte: {listing.qte}</p>
            <div className="flex flex-row gap-3 items-center">
              <h1 className="italic">Colors: </h1>
              {listing.colors.map((c) => (
                <div
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-full bg-[${c}] `}
                />
              ))}
            </div>
            <div className="flex flex-row gap-3 items-center">
              <h1 className="italic">Sizes: </h1>
              {listing.sizes.map((s) => (
                <>
                  {s && (
                    <small className="py-1 px-3 bg-primary-500 text-white rounded-2xl italic">
                      {s}
                    </small>
                  )}
                </>
              ))}
            </div>
            <div className="flex flex-row gap-3 items-center">
              <h1 className="italic">Dimensions: </h1>
              {listing.dimensions[0] && listing.dimensions[1] ? (
                <small>
                  {listing.dimensions[0]} * {listing.dimensions[1]}
                </small>
              ) : (
                <small>No dimensions available</small>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

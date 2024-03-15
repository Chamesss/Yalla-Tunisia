import React from "react";
import CarouselImages from "./CarousselImages";
import { getUser } from "@/lib/getUser";
import SelectionMenu from "./components/SelectionMenu";
import { Chip, Divider, User } from "@nextui-org/react";

type Props = {
  data: ItemType;
};

export default async function HandmadePage({ data }: Props) {
  const pictureArray = Array(5).fill(data.pictures);
  const res = await getUser(data.userId.toString());
  const user: userType = res[0];

  return (
    <div className="flex flex-row p-4 mb-20 ">
      <div className="flex flex-row w-[60%]">
        <div>
          <CarouselImages data={pictureArray} />
        </div>
        <div className="p-2 w-full">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-semibold tracking-wide flex flex-row text-[#fd384f]">
              <p className="text-3xl">{data.price}&nbsp;</p>
              TND
            </span>
            <SelectionMenu />
          </div>

          <p className="text-2xl font-semibold tracking-wide">{data.title}</p>
          <div className="mt-2 flex gap-2">
            <Chip className="italic text-opacity-75" size="sm">
              {data.category[0].name}
            </Chip>
            <Chip className="italic text-opacity-75" size="sm">
              {data.subcategory[0]?.name}
            </Chip>
          </div>
          <Divider className="my-4" />
          <div>
            <p className="text-lg font-semibold">Description:</p>
            <p className="mt-2">{data.description}</p>
          </div>
          <Divider className="my-4" />
          <User
            className="hover:underline cursor-pointer mt-2"
            name={user.first_name + " " + user.last_name}
            avatarProps={{
              src: user.picture,
            }}
          />
        </div>
        {/* <p className="font-medium">Views: {data.views}</p> */}
      </div>
    </div>
  );
}

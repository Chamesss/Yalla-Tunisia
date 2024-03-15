import React from "react";
import CarouselImages from "./CarousselImages";
import { getUser } from "@/lib/getUser";
import SelectionMenu from "./components/SelectionMenu";

type Props = {
  data: ItemType;
};

export default async function HandmadePage({ data }: Props) {
  const pictureArray = Array(5).fill(data.pictures);
  const res = await getUser(data.userId.toString());
  const user: userType = res[0];

  return (
    <div className="flex flex-row p-4 mb-20 ">
      <div className="flex flex-row w-full">
        <div>
          <CarouselImages data={pictureArray} />
        </div>
        <div className="p-2 w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold tracking-wide flex flex-row text-[#fd384f]">
              <p className="text-3xl">{data.price}&nbsp;</p>
              TND
            </p>
            <SelectionMenu />
          </div>

          <p className="text-xl font-semibold tracking-wide">{data.title}</p>
          <div>
            {/* <User
              className="hover:underline cursor-pointer mt-2"
              name={user.first_name + " " + user.last_name}
              avatarProps={{
                src: user.picture,
              }}
            /> */}
          </div>
          <small className="italic opacity-50">{data.category[0].name}</small>
          <br />
          <small className="italic opacity-50">
            {data.subcategory[0]?.name}
          </small>
          <p className="font-medium">Views: {data.views}</p>
        </div>
      </div>
    </div>
  );
}

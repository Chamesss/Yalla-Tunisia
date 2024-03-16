import React from "react";
import CarouselImages from "./CarousselImages";
import { getUser } from "@/lib/getUser";
import SelectionMenu from "./components/SelectionMenu";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Tooltip,
  User,
} from "@nextui-org/react";
import Location from "@/components/icons/Location";
import MapSection from "./components/MapSection";
import CheckOutBox from "./components/CheckOutBox";

type Props = {
  data: ItemType;
};

export default async function HandmadePage({ data }: Props) {
  const pictureArray = Array(5).fill(data.pictures);
  const res = await getUser(data.userId.toString());
  const user: userType = res[0];

  return (
    <div className="flex flex-col py-4 mb-20 px-8 ">
      <div className="flex flex-row gap-6 relative">
        <div className="bg-gray-500 rounded-xl">
          <CarouselImages data={pictureArray} />
        </div>
        <div className="p-2 w-full overflow-y-auto">
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
          <div className="flex relative flex-row gap-2 items-center hover:underline cursor-pointer mt-2">
            <div className="relative w-14 h-14">
              <img
                className="relative bg-gray-200 rounded-full"
                src={user.picture}
              />
              {/* {user.trusted && ( */}
              <Tooltip content="Trusted">
                <div className="w-4 h-4 absolute rounded-full bg-[#48b9ff] outline outline-white dark:outline-[#212933] right-0 bottom-0 z-10" />
              </Tooltip>
              {/* )} */}
            </div>
            <div>
              <span>{user.first_name + " " + user.last_name}</span>
              <p className="flex flex-row gap-1 text-sm items-center opacity-50">
                <Location /> {user.city[0].name}
              </p>
            </div>
          </div>
          <blockquote className="relative p-2 rounded-lg mt-4">
            <p className="text-gray-600 italic text-sm">
              <span className="absolute top-0 left-0 text-xl text-gray-400">
                “
              </span>
              {user.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Reiciendis pariatur explicabo vitae incidunt nam
              distinctio iure, inventore, totam tempora nobis quis magnam!
              Aliquam reprehenderit.
              <span className="absolute bottom-0 right-0 text-xl text-gray-400">
                ”
              </span>
            </p>
          </blockquote>
          <p className="w-full text-sm font-medium text-center mt-4 flex flex-row items-center justify-center gap-2 cursor-pointer hover:underline">
            Check on map
            <svg
              className={"h-fit w-fit transform center transition-all"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              width={20}
            >
              <path
                className="translate-y-[3px]"
                fillRule="evenodd"
                d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </div>

        <div className="w-[75%] p-4">
          <CheckOutBox />
        </div>
        {/* <p className="font-medium">Views: {data.views}</p> */}
      </div>
      <div className="mt-28 w-full">
        <MapSection lat={user.lat} lng={user.lng} />
      </div>
    </div>
  );
}

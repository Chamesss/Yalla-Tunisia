"use client";

import { Button, Divider, User } from "@nextui-org/react";
import ReactStars from "react-stars";

const MockData = [
  {
    name: "Jane Doe",
    avatarProps: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 3.5,
    role: "Seller",
  },
  {
    name: "Diana Collins",
    avatarProps: "https://i.pravatar.cc/150?u=a04258114e290267012",
    rating: 4,
    role: "Traveler",
  },
  {
    name: "Alex Wayne",
    avatarProps: "https://i.pravatar.cc/150?u=a04258114e2902670j9",
    rating: 4.5,
    role: "Traveler",
  },
];

const Array = [1, 2, 3];

export default function Reviews() {
  return (
    <div className="overflow-visible px-4">
      <h1 className="text-xl font-bold tracking-wide text-start my-4">
        Reviews
      </h1>
      <div className="flex md:flex-row flex-col items-center justify-center">
        <div className="flex flex-col text-start">
          <p className="mb-2 font-medium">Total reviews</p>
          <p className="text-3xl font-bold">13</p>
          <small className="opacity-60">Average reviews on this year</small>
        </div>
        <Divider className="md:my-5 my-4 !h-[0.5px] opacity-80 md:hidden flex" />
        <Divider
          orientation="vertical"
          className="h-[85px] mx-10 w-[1px] md:flex hidden"
        />
        <div className="flex flex-col text-start">
          <p className="mb-2 font-medium">Average rating</p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-3xl font-bold">4.0</p>
            <ReactStars
              count={5}
              size={24}
              color2={"#48b9ff"}
              edit={false}
              value={4}
            />
          </div>
          <small className="opacity-60">Average rating</small>
        </div>
      </div>
      <Divider className="my-5 !h-[0.5px] opacity-80" />
      <div className="flex h-auto lg:h-[300px] lg:flex-row flex-col p-2 justify-between gap-8">
        {Array.map((_, i) => (
          <div
            className={`dark:bg-black transition-all duration-200 ease-soft-spring hover:scale-105 bg-white h-fit hover:-translate-y-2 shadow-[0_0px_60px_-30px_rgba(0,0,0,0.3)] p-2 rounded-lg ${
              i !== 1 ? " place-self-end" : "place-self-start"
            }`}
          >
            <div className="flex flex-col p-2">
              <div className="flex items-start justify-between">
                <User
                  className="text-4xl"
                  name={MockData[i].name}
                  description={MockData[i].role}
                  avatarProps={{
                    src: MockData[i].avatarProps,
                  }}
                />
                <div className="flex flex-row items-center gap-4">
                  <ReactStars
                    count={5}
                    size={24}
                    color2={"#48b9ff"}
                    edit={false}
                    value={MockData[i].rating}
                  />
                  <small>2023-01-12</small>
                </div>
              </div>
              <div className="w-full">
                <p className="text-start p-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  ducimus voluptate? Eaque, fugiat aliquam accusamus excepturi
                  eligendi a ipsa delectus nisi, odit porro, aut dolores
                  molestiae doloribus error deleniti ea.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-4 text-white bg-black/50">Explore Reviews</Button>
    </div>
  );
}

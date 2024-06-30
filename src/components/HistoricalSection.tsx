"use client";
import { motion, Variants } from "framer-motion";
import IconArrowRight from "./icons/RightArrow";
import Link from "next/link";

interface Props {
  image: string;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function Card({ image }: Props) {
  return (
    <motion.div
      className="xl:h-[35rem] lg:h-[28rem] sm:h-[400px] h-[250px] overflow-hidden items-center justify-center relative -mt-28 flex transition-bottom xl:w-[400px] sm:w-[300px] w-[170px] p-6 self-center place-self-center justify-self-center "
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        className="xl:w-[14rem] sm:w-[10rem] md:w-[14rem] w-[7rem] lg:h-[24rem] sm:h-[18rem] md:h-[20rem] h-[10rem] flex items-center justify-center bg-white dark:bg-[#212933] rounded-[20px] card-animated"
        variants={cardVariants}
      >
        <img
          src={image}
          alt={image}
          className=" object-cover h-full rounded-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

const data = [
  {
    image: "/assets/bebbhar.jpg",
  },
  {
    image: "/assets/port.jpg",
  },
  {
    image: "/assets/madina.jpg",
  },
];

import Colosseum from "./icons/Colosseum";

export default function HistoricalSection() {
  return (
    <div className="relative overflow-visible w-full h-fit flex gap-4 xl:flex-row flex-col-reverse md:justify-center items-center lg:justify-between lg:mt-10">
      <div className="absolute overflow-hidden w-full h-full lg:top-[-5%] md:top-[30%] lg:w-[60%] top-10 md:right-[10%] md:w-[80%] opacity-[0.075]">
        <Colosseum />
      </div>
      {/* <h1 className="text-xl font-semibold text-center w-full absolute -top-16 lg:hidden">
        Historical Section
      </h1> */}
      <div className="w-full lg:flex-1 justify-center md:flex md:items-center flex-col mt-16">
        <h1 className="text-xl font-semibold text-left hidden lg:flex">
          Historical Section.
        </h1>
        <p className="text-start text-lg mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi
          repellat, quod doloremque odit enim inventore temporibus omnis
          expedita voluptates blanditiis architecto laudantium rerum nisi minima
          ut placeat assumenda! Placeat.
        </p>
      </div>
      <div className="relative flex flex-row w-[100%] lg:w-[750px] justify-center items-center transform translate-y-16 xl:translate-y-8">
        <div className="transition-all duration-200 z-[39] hover:z-40 hover:scale-110 relative h-full">
          <Card image={data[0].image} />
        </div>
        <div className="transition-all duration-200 absolute z-30 left-0 hover:z-40 hover:scale-110">
          <Card image={data[1].image} />
        </div>
        <div className="transition-all duration-200 absolute z-20 right-0 hover:z-40 hover:scale-110">
          <Card image={data[2].image} />
        </div>
      </div>
    </div>
  );
}

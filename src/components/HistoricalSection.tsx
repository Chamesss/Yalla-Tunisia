"use client";
import { motion, Variants } from "framer-motion";
import HeroButton from "./utils/Hero/HeroButton";
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
      className="lg:h-[600px] md:h-[400px] h-[250px] overflow-hidden items-center justify-center relative -mt-28 flex transition-bottom lg:w-[400px] md:w-[300px] w-[170px] p-6 "
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        className="lg:w-[300px] md:w-[200px] w-[130px] lg:h-[430px] md:h-[320px]  h-[180px] flex items-center justify-center bg-white dark:bg-[#212933] rounded-[20px] card-animated"
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
    <>
      <div className="relative w-full h-fit flex gap-4 md:flex-row flex-col-reverse justify-between md:mt-10 mt-20">
        <div className="absolute w-[100%] top-[50%] md:top-[-5%] md:w-[60%] opacity-[0.075]">
          <Colosseum />
        </div>
        <h1 className="text-xl font-semibold text-center w-full absolute -top-16 md:hidden">
          Historical Section
        </h1>
        <div className="w-full md:max-w-[40%] justify-center flex-col mt-16">
          <h1 className="text-xl font-semibold text-left hidden md:flex">
            Historical Section.
          </h1>
          <p className="text-start text-lg mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi
            repellat, quod doloremque odit enim inventore temporibus omnis
            expedita voluptates blanditiis architecto laudantium rerum nisi
            minima ut placeat assumenda! Placeat.
          </p>
          <Link
            href={"#"}
            className="flex w-fit mt-10 items-center gap-4 rounded-lg bottom-[40%] bg-black/50 text-sm text-white md:text-lg p-2 md:p-4 left-[10%] transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
          >
            {"Click here"}
            <IconArrowRight height={20} width={20} />
          </Link>
        </div>
        <div className="relative self-center flex flex-row md:w-[700px] w-fit translate-y-14">
          <div className="transition-all duration-200 md:z-20 z-[39] hover:z-40 hover:scale-110">
            <Card image={data[0].image} />
          </div>
          <div className="transition-all duration-200 absolute z-30 md:left-[150px] left-[100px] hover:z-40 hover:scale-110">
            <Card image={data[1].image} />
          </div>
          <div className="transition-all duration-200 absolute z-20 md:left-[300px] left-[-100px] hover:z-40 hover:scale-110">
            <Card image={data[2].image} />
          </div>
        </div>
      </div>
    </>
  );
}

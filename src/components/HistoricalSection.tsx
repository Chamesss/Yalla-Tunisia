"use client";
import { motion, Variants } from "framer-motion";

interface Props {
  image: string;
  hueA: number;
  hueB: number;
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

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

function Card({ image, hueA, hueB }: Props) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="md:h-[600px] h-[300px] overflow-hidden items-center justify-center relative pt-5 -mt-28 flex transition-bottom md:w-[400px] w-[200px] p-4 "
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        className=" md:w-[300px] w-[150px] md:h-[430px] h-[215px] flex items-center justify-center bg-white dark:bg-[#212933] rounded-[20px] card-animated p-[2px]"
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
    hueA: 180,
    hueB: 210,
  },
  {
    image: "/assets/port.jpg",
    hueA: 180,
    hueB: 210,
  },
  {
    image: "/assets/madina.jpg",
    hueA: 180,
    hueB: 210,
  },
];

export default function HistoricalSection() {
  return (
    <>
      <div className="relative w-full h-fit flex md:px-24 gap-4 px-12 md:flex-row flex-col-reverse justify-between md:mt-10 mt-20">
        <h1 className="text-2xl text-left -top-16 md:top-12 absolute">
          Historical Section.
        </h1>
        <div className="w-full md:max-w-[40%] flex justify-center flex-col mt-16">
          <p className="text-start text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi
            repellat, quod doloremque odit enim inventore temporibus omnis
            expedita voluptates blanditiis architecto laudantium rerum nisi
            minima ut placeat assumenda! Placeat.
          </p>
          <button className="mt-12 w-fit">Click here</button>
        </div>
        <div className="relative self-center flex flex-row md:w-[700px] w-fit translate-y-14">
          <div className="transition-all duration-200 md:z-20 z-[39] hover:z-40 hover:scale-110">
            <Card
              image={data[0].image}
              hueA={data[0].hueA}
              hueB={data[0].hueB}
            />
          </div>
          <div className="transition-all duration-200 absolute z-30 md:left-[150px] left-[100px] hover:z-40 hover:scale-110">
            <Card
              image={data[1].image}
              hueA={data[1].hueA}
              hueB={data[1].hueB}
            />
          </div>
          <div className="transition-all duration-200 absolute z-20 md:left-[300px] left-[-100px] hover:z-40 hover:scale-110">
            <Card
              image={data[2].image}
              hueA={data[2].hueA}
              hueB={data[2].hueB}
            />
          </div>
        </div>
      </div>
    </>
  );
}

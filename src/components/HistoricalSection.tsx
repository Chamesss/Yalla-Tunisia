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
      className="h-[600px] overflow-hidden items-center justify-center relative pt-5 -mt-28 flex transition-bottom w-[400px] p-4 "
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        className=" w-[300px] h-[430px] flex items-center justify-center bg-white dark:bg-[#212933] rounded-[20px] card-animated p-[2px]"
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
    <div className="w-full h-fit gap-10 flex flex-row justify-center mt-28">
      <div className="max-w-[40%] items-center justify-center">
        <h1 className="mb-20 text-2xl">Historical Section.</h1>
        <p className="text-start text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi
          repellat, quod doloremque odit enim inventore temporibus omnis
          expedita voluptates blanditiis architecto laudantium rerum nisi minima
          ut placeat assumenda! Placeat.
        </p>
        <button className="mt-12">Click here</button>
      </div>
      <div className="relative flex flex-row w-[700px]">
        <div className="transition-all duration-200 z-20 left-[300px] hover:z-40 hover:scale-110">
          <Card image={data[0].image} hueA={data[0].hueA} hueB={data[0].hueB} />
        </div>
        <div className="transition-all duration-200 absolute z-30 left-[150px] hover:z-40 hover:scale-110">
          <Card image={data[1].image} hueA={data[1].hueA} hueB={data[1].hueB} />
        </div>
        <div className="transition-all duration-200 absolute z-20 left-[300px] hover:z-40 hover:scale-110">
          <Card image={data[2].image} hueA={data[2].hueA} hueB={data[2].hueB} />
        </div>
      </div>
    </div>
  );
}

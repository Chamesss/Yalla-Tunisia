"use client";
import { motion, Variants } from "framer-motion";

interface Props {
  emoji: string;
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

function Card({ emoji, hueA, hueB }: Props) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className=" overflow-hidden items-center justify-center relative pt-5 -mt-28 flex"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div
        className="absolute bottom-0 left-[50%] right-0 top-0 -translate-x-[32%] splash"
        style={{ background }}
      />
      <motion.div
        className=" w-[300px] h-[430px] flex items-center justify-center bg-white rounded-[20px] relative card-animated"
        variants={cardVariants}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}

const data = {
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsam maxime ex ullam culpa harum dolor. Magnam aspernatur, adipisci maxime accusantium aut quos nemo dolorem voluptate dolorum odit natus consequuntur!",
  hueA: 205,
  hueB: 245,
};

export default function HistoricalSection() {
  return (
    <div className="w-full place-content-center">
      <Card emoji={data.text} hueA={data.hueA} hueB={data.hueB} />
    </div>
  );
}

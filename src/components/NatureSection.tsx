import Link from "next/link";
import IconArrowRight from "./icons/RightArrow";
import Palm from "./icons/Palm";
import { useTheme } from "next-themes";

export default function NatureSection() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:mt-10 mt-20 relative">
      <h1 className="text-xl font-semibold text-center w-full absolute -top-16 lg:top-0 lg:hidden">
        Nature Section
      </h1>
      <div className="relative w-full flex px-8 lg:px-0">
        <img
          src="./assets/sahara.jpg"
          alt="sahara"
          className="lg:w-[600px] md:w-[400px] w-[250px] lg:h-[500px] md:h-[300px] h-[180px] object-contain"
        />
        <div className="">
          <img
            src="./assets/mountain.jpg"
            alt="mountain"
            className="lg:w-[600px] md:w-[400px] w-[250px] lg:h-[500px] absolute top:10 lg:top-20 lg:left-30 right-0 lg:right-[-20%] md:h-[300px] h-[180px] object-contain z-0"
          />
        </div>
      </div>
      <div className="lg:w-[90%] w-full overflow-hidden relative md:mt-0 lg:bg-[#f5f5f5] dark:lg:bg-[#293749] lg:p-16 z-10 flex flex-col items-center">
        <div className="absolute bottom-0 w-full lg:flex hidden">
          <Palm width={"full"} opacity={0.05} />
        </div>
        <h1 className="text-xl font-semibold lg:flex hidden">Nature Section</h1>
        <p className="mt-10 text-lg text-start lg:text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          dignissimos, reprehenderit minus quibusdam totam quaerat voluptate
          possimus cumque tempore ut doloribus architecto porro ullam soluta,
          dolores omnis corporis accusantium earum.
        </p>
        <Link
          href={"#"}
          className="flex w-fit mt-10 self-start md:self-auto lg:self-auto items-center gap-4 rounded-lg bottom-[40%] bg-black/50 text-sm text-white md:text-lg p-2 md:p-4 left-[10%] transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
        >
          {"Click here"}
          <IconArrowRight height={20} width={20} />
        </Link>
      </div>
    </div>
  );
}

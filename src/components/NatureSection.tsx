import Link from "next/link";
import IconArrowRight from "./icons/RightArrow";

export default function NatureSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:mt-10 mt-20 relative ">
      <h1 className="text-xl font-semibold text-center w-full absolute -top-16 md:hidden">
        Nature Section
      </h1>
      <div className="relative w-full flex justify-center">
        <img
          src="./assets/sahara.jpg"
          alt="sahara"
          className="md:w-[600px] w-[250px] md:h-[500px] h-[180px] object-contain -translate-x-10"
        />
        <div>
          <img
            src="./assets/mountain.jpg"
            alt="mountain"
            className="md:w-[600px] w-[250px] md:h-[500px] h-[180px] object-contain absolute top-20 md:left-44 left-20 z-0"
          />
        </div>
      </div>
      <div className="md:w-[90%] w-full md:mt-0 mt-10 md:bg-[#f5f5f5] dark:bg-[#293749] md:p-16 z-10 flex flex-col items-center">
        <h1 className="text-xl font-semibold md:flex hidden">Nature Section</h1>
        <p className="mt-10 text-lg md:text-center text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          dignissimos, reprehenderit minus quibusdam totam quaerat voluptate
          possimus cumque tempore ut doloribus architecto porro ullam soluta,
          dolores omnis corporis accusantium earum.
        </p>
        <Link
          href={"#"}
          className="flex w-fit mt-10 items-center gap-4 rounded-lg bottom-[40%] bg-black/50 text-sm text-white md:text-lg p-2 md:p-4 left-[10%] transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
        >
          {"Click here"}
          <IconArrowRight height={20} width={20} />
        </Link>
      </div>
    </div>
  );
}

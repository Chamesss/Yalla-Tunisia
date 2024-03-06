import Link from "next/link";
import IconArrowRight from "./icons/RightArrow";

export default function NatureSection() {
  return (
    <div className="flex flex-row justify-between items-center mt-10 relative">
      <div className="relative">
        <img
          src="./assets/sahara.jpg"
          alt="sahara"
          className="w-[600px] h-[500px] object-contain"
        />
        <div>
          <img
            src="./assets/mountain.jpg"
            alt="mountain"
            className="w-[600px] h-[500px] object-contain absolute top-20 left-44 z-0"
          />
        </div>
      </div>
      <div className="w-[50%] bg-[#ececec] dark:bg-[#293749] p-16 z-10 flex flex-col items-center">
        <h1 className="text-xl">Nature Section</h1>
        <p className="mt-10 text-lg">
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

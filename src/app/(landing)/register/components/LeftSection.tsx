import Image from "next/image";

export default function LeftSection() {
  return (
    <div className="w-full flex justify-center items-center flex-1 flex-col gap-8">
      <div>
        <h1 className="text-center text-xl font-semibold">
          Register Title here !
        </h1>
      </div>
      <div className="relative overflow-visible w-[600px] h-[450px]">
        <img
          src="/register/memories.png"
          className="w-full object-contain h-fit"
        />
      </div>
    </div>
  );
}

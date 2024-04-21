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
        <div className="absolute flex flex-row top-0 left-0 right-0 m-auto w-fit gap-2 z-20 items-center justify-center">
          <img
            src="/register/bebbhar.jpg"
            className="w-auto h-[150px] object-contain outline outline-white outline-8 rounded-xl"
          />
          <img
            src="/register/colosseum.jpg"
            className="w-[200px] h-fit object-contain outline outline-white outline-8 rounded-xl"
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-row w-fit h-fit gap-2 z-10 items-center justify-center">
          <img
            src="/register/sidibs2.jpg"
            className="w-[200px] object-contain h-fit outline outline-white outline-8 rounded-xl"
          />
          <img
            src="/register/zagouen.jpg"
            className="w-[150px] object-contain h-fit outline outline-white outline-8 rounded-xl"
          />
          <img
            src="/register/djerbabeach.jpg"
            className="w-[200px] object-contain h-fit outline outline-white outline-8 rounded-xl"
          />
        </div>
        <div className="absolute flex flex-row bottom-10 left-0 right-0 m-auto w-full gap-2 justify-around items-center">
          <img
            src="/register/sahara.jpg"
            className="w-[200px] object-contain h-fit outline outline-white outline-8 rounded-xl"
          />
          <img
            src="/register/sidibs.jpeg"
            className="w-[200px] object-contain h-auto outline outline-white outline-8 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

import Location from "@/components/icons/Location";
import Image from "next/image";
import EditIcon from "@/components/icons/EditIcon";
import { cities } from "@/cities";

type Props = {
  user: userSlice;
  username: string;
};

export default function User({ user, username }: Props) {
  const location = cities.find((c) => c.id === user.user!.activeAreaId);
  console.log(user);
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative">
        <Image
          className="rounded-full overflow-hidden object-cover w-[5rem] h-[5rem]"
          src={user.user!.picture as string}
          alt={`${user.user!.username + " profile picture"}`}
          width={380}
          height={380}
        />
        <div className="absolute right-0 bottom-0 rounded-full bg-white p-1 border-2 border-solid cursor-pointer border-blue-500 hover:bg-gray-50">
          <EditIcon width={20} height={20} fill="rgb(59,130,246)" />
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">{username}</h1>
        <div className="flex flex-row items-center gap-2 opacity-60">
          <Location />
          <h1>
            {location && location.city && location.city.length > 0
              ? location.city
              : "Tunis"}
          </h1>
        </div>
      </div>
    </div>
  );
}

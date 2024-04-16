import Location from "@/components/icons/Location";
import Image from "next/image";

type Props = {
  user: userInfoType;
  fullName: string;
};

export default function User({ user, fullName }: Props) {
  return (
    <div>
      <div>
        <Image
          className="rounded-full overflow-hidden object-cover w-[5rem] h-[5rem]"
          src={user.user.picture}
          alt={`${user.user.firstname + " profile picture"}`}
          width={380}
          height={380}
        />
      </div>
      <div>
        <h1>{fullName}</h1>
      </div>
    </div>
  );
}

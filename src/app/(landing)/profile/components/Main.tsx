"use client";
import { userState } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import User from "./User";
import { Button, Divider } from "@nextui-org/react";
import EditButton from "./EditButton";
import Forbidden from "@/components/Forbidden";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/UserActions/getUser";

export default function Main() {
  const { userId }: userSlice = useSelector(userState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userType>();

  if (userId === null) {
    return <Forbidden />;
  }

  if (user === undefined && error) {
    return <div></div>;
  }

  useEffect(() => {
    (async () => {
      const userData: userType | undefined = (await getUserById(
        userId
      )) as userType;
      if (userData === undefined) {
        setError(true);
        setLoading(false);
      } else {
        setUser(userData);
        setLoading(false);
      }
    })();
  }, []);

  const username =
    user.username.toUpperCase().slice(0, 1) + user.username.slice(1);

  return (
    <div className="border rounded-2xl w-full">
      <div className="flex flex-row justify-between items-center p-8">
        <User user={user} username={username} />
        <Button className="rounded-full bg-blue-500 text-white font-medium text-md">
          Profile Settings
        </Button>
      </div>
      <Divider />
      <div className="flex flex-row">
        <div className="flex-1 p-8 border-r-1 border-opacity-30">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-4 w-fit">
              <h1 className="text-[1.25rem] font-medium">Description</h1>
              <EditButton />
            </div>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              fuga aperiam mollitia veniam unde dolorem aut nulla doloribus in
              excepturi? Reprehenderit ratione pariatur rerum iste, cumque
              doloribus molestiae non expedita.
            </p>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="flex-grow-[2] p-8">userItems</div>
      </div>
    </div>
  );
}

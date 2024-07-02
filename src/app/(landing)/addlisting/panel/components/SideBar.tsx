import Bell from "@/components/icons/Bell";
import Help from "@/components/icons/Help";
import IconHome from "@/components/icons/Home";
import { getUserById } from "@/lib/UserActions/getUser";
import { getUserCookies } from "@/lib/UserActions/getUserCookies";
import { Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  component: string;
  setComponent: Dispatch<SetStateAction<string>>;
};

export default function SideBar({ component, setComponent }: Props) {
  const [balance, setBalance] = useState<number>();
  const [errorBalance, setErrorBalance] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const userSession = await getUserCookies();
        if (userSession) {
          const userData = JSON.parse(userSession.value) as userSlice;
          if (userData.userId) {
            const user = (await getUserById(userData.userId)) as userType;
            setBalance(Number(user.balance));
            setLoading(false);
          } else {
            throw new Error("No user session found in cookies");
          }
        } else {
          throw new Error("No user session found in cookies");
        }
      } catch (e) {
        setErrorBalance(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg text-center text-white font-semibold">
        Panneau de Business
      </p>
      {/* <div className="flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full flex items-center justify-center p-4 shadow-sm rounded-xl bg-gray-50">
            <small className="text-black">
              Balance: <span className="text-lg font-semibold">{balance}</span>{" "}
              DT
            </small>
          </div>
        )}
      </div> */}
      <div
        className={`flex flex-row items-center gap-2 hover:text-white cursor-pointer ${
          component === "dashboard" && "text-white"
        }`}
        onClick={() => setComponent("dashboard")}
      >
        <IconHome />
        <p>Dashboard</p>
      </div>
      <div
        className={`flex flex-row items-center gap-2 hover:text-white cursor-pointer ${
          component === "notification" && "text-white"
        }`}
        onClick={() => setComponent("notification")}
      >
        <Bell />
        <p>Notifications</p>
      </div>

      <div
        className={`flex flex-row items-center gap-2 hover:text-white cursor-pointer ${
          component === "help" && "text-white"
        }`}
      >
        <Help />
        <p>Centre d'aide</p>
      </div>
    </div>
  );
}

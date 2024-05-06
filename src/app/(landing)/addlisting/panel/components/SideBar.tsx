import Bell from "@/components/icons/Bell";
import Help from "@/components/icons/Help";
import IconHome from "@/components/icons/Home";
import { Dispatch, SetStateAction } from "react";

type Props = {
  component: string;
  setComponent: Dispatch<SetStateAction<string>>;
};

export default function SideBar({ component, setComponent }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg text-center text-white font-semibold mb-4">
        Business panel
      </p>
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
        <p>Help center</p>
      </div>
    </div>
  );
}

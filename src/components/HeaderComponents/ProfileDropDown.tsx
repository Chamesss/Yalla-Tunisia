import { useDispatch } from "@/redux/store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { logOutSession } from "@/redux/slices/userSlice";

type Props = {
  user: userType;
};

export default function ProfileDropDown({ user }: Props) {
  const dispatch = useDispatch();
  const LogOutAction = () => {
    dispatch(logOutSession());
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <img className="w-10 h-10 rounded-full" src={user?.picture} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem
            onClick={LogOutAction}
            className="text-danger"
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

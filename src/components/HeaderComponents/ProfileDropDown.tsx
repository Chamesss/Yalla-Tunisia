import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import useLogout from "@/hooks/useLogout";

type Props = {
  user: userType;
};

export default function ProfileDropDown({ user }: Props) {
  const logout = useLogout();
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <img className="w-10 h-10 rounded-full" src={user?.picture} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem onClick={logout} className="text-danger" color="danger">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

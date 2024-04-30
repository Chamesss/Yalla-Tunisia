import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import useLogout from "@/hooks/useLogout";
import Image from "next/image";

type Props = {
  user: userInfoType;
};

export default function ProfileDropDown({ user }: Props) {
  const logout = useLogout();
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            src={user.user.picture}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="logout"
            onClick={logout}
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

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  User,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import TrashBin from "@/components/icons/TrashBin";
import { cities } from "@/cities";
import { Timestamp } from "firebase/firestore";
import DeleteUserModal from "../TableActionsComponents/DeleteUserModal";
import Ban from "@/components/icons/Ban";
import UnBan from "@/components/icons/UnBan";

const columns = [
  { name: "Info", uid: "Info" },
  { name: "Creation Date", uid: "Creation Date" },
  { name: "Seller", uid: "Seller" },
  { name: "Location", uid: "Location" },
  { name: "Status", uid: "Status" },
  { name: "Banned", uid: "Banned" },
  { name: "Actions", uid: "Actions" },
];

export default function Users() {
  const [users, setUsers] = useState<userType[]>();
  const [userToDelete, setUserToDelete] = useState<userType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState<boolean>(false);
  const [action, setAction] = useState<string>();
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/getallusers/`);
      const result = (await res.json()) as userType[];
      const activeUsers = result.filter(
        (u) => u.status === true && u.banned === false
      );
      const pendingUsers = result.filter(
        (u) => u.status === false && u.banned === false
      );
      const disabledUsers = result.filter(
        (u) => u.status === false && u.banned === true
      );
      const combinedUsers = [...pendingUsers, ...activeUsers, ...disabledUsers];
      setUsers(combinedUsers);
    })();
  }, [success]);
  const renderCell = React.useCallback(
    (user: userType, columnKey: string | number) => {
      switch (columnKey) {
        case "Info":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.picture }}
              description={user.email}
              name={user.username}
            >
              {user.email}
            </User>
          );
        case "Creation Date":
          let formattedDate;
          if (user.created_at instanceof Timestamp) {
            formattedDate = user.created_at.toDate().toLocaleString();
          } else {
            formattedDate = "Date unavailable";
          }
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {formattedDate}
              </p>
            </div>
          );
        case "Seller":
          return (
            <div className="flex flex-col">
              <Chip
                className="capitalize"
                color={user.seller === true ? "primary" : "default"}
                size="sm"
                variant="flat"
              >
                {user.seller === true ? "Yes" : "No"}
              </Chip>
            </div>
          );
        case "Location":
          const city = cities.find((c) => c.id === user.activeAreaId);
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {city?.city}
              </p>
            </div>
          );
        case "Status":
          return (
            <Chip
              className="capitalize"
              color={user.status === true ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {user.status === true ? "Active" : "Inactive"}
            </Chip>
          );
        case "Banned":
          return (
            <Chip
              className="capitalize"
              color={user.banned === true ? "danger" : "default"}
              size="sm"
              variant="flat"
            >
              {user.banned === true ? "Banned" : "Active"}
            </Chip>
          );
        case "Actions":
          return (
            <div className="relative flex items-center gap-2">
              {user.banned === true ? (
                <Tooltip
                  className="text-white"
                  color="success"
                  content="Unban user"
                >
                  <span
                    className="text-lg text-success-500 cursor-pointer active:opacity-50"
                    onClick={() => {
                      setAction("unban");
                      onOpen();
                      setUserToDelete(user);
                    }}
                  >
                    <UnBan />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip color="danger" content="Ban user">
                  <span
                    className="text-lg text-danger-500 cursor-pointer active:opacity-50"
                    onClick={() => {
                      setAction("ban");
                      onOpen();
                      setUserToDelete(user);
                    }}
                  >
                    <Ban />
                  </span>
                </Tooltip>
              )}

              <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger-500 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setAction("delete");
                    onOpen();
                    setUserToDelete(user);
                  }}
                >
                  <TrashBin />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return void 0;
      }
    },
    []
  );

  return (
    <>
      {users ? (
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow key={user.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(user, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <DeleteUserModal
        user={userToDelete}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        success={success}
        setSuccess={setSuccess}
        action={action}
      />
    </>
  );
}

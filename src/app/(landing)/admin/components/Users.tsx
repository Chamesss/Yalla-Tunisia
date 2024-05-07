import { getAllUsers } from "@/lib/adminActions/getAllUsers";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
  Tooltip,
  User,
} from "@nextui-org/react";
import EditIcon from "@/components/icons/EditIcon";
import IconEye from "@/components/icons/EyeOpened";
import TrashBin from "@/components/icons/TrashBin";
import { cities } from "@/cities";
import { Timestamp } from "firebase/firestore";

const columns = [
  { name: "Info", uid: "Info" },
  { name: "Creation Date", uid: "Creation Date" },
  { name: "Seller", uid: "Seller" },
  { name: "Location", uid: "Location" },
  { name: "Status", uid: "Status" },
  { name: "Actions", uid: "Actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Users() {
  const [totalUsers, setTotalUsers] = useState<number>();
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [activeUsers, setActiveUsers] = useState<userType[]>();
  const [pendingUsers, setPendingUsers] = useState<userType[]>();
  const [disabledUsers, setDisabledUsers] = useState<userType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<userType[]>();
  useEffect(() => {
    (async () => {
      const result = (await getAllUsers()) as userType[];
      setUsers(result);
      const { active, pending, disabled } = CountData(result);
      const activeUsers = result.filter(
        (u) => u.status === true && u.banned === false
      );
      const pendingUsers = result.filter(
        (u) => u.status === false && u.banned === false
      );
      const disabledUsers = result.filter(
        (u) => u.status === false && u.banned === true
      );
      setActiveUsers(activeUsers);
      setPendingUsers(pendingUsers);
      setDisabledUsers(disabledUsers);
      setTotalUsers(result.length);
      setActive(active);
      setPending(pending);
      setDisabled(disabled);
      setLoading(false);
    })();
  }, []);
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
        case "Actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IconEye />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
      {users && (
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
      )}
    </>
  );
}

function CountData(data: userType[]) {
  let active = 0;
  let pending = 0;
  let disabled = 0;
  for (const i in data) {
    if (data[i].status === true && data[i].banned === false) active++;
    if (data[i].status === false && data[i].banned === false) pending++;
    if (data[i].banned === true) disabled++;
  }
  return { active, pending, disabled };
}

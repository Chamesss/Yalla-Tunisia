import { getAllUsers } from "@/lib/adminActions/getAllUsers";
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
} from "@nextui-org/react";
import EditIcon from "@/components/icons/EditIcon";
import IconEye from "@/components/icons/EyeOpened";
import TrashBin from "@/components/icons/TrashBin";
import { cities } from "@/cities";
import { Timestamp } from "firebase/firestore";
import DeleteUserModal from "./DeleteUserModal";
import { CountDataPrduct } from "@/helpers/CountData";
import Ban from "@/components/icons/Ban";
import Success from "@/components/icons/Success";
import UnBan from "@/components/icons/UnBan";
import { getHandMadesAdmin } from "@/lib/adminActions/getAllListings";
import { getUserById } from "@/lib/UserActions/getUser";

const columns = [
  { name: "Info", uid: "Info" },
  { name: "Creation Date", uid: "Creation Date" },
  { name: "Seller", uid: "Seller" },
  { name: "Location", uid: "Location" },
  { name: "Status", uid: "Status" },
  { name: "Banned", uid: "Banned" },
  { name: "Actions", uid: "Actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Handmades() {
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [listings, setListings] = useState<ProductHandMade[]>();
  const [userToDelete, setUserToDelete] = useState<userType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState<boolean>(false);
  const [action, setAction] = useState<string>();
  useEffect(() => {
    (async () => {
      const result = (await getHandMadesAdmin()) as ProductHandMade[];
      const { active, pending, disabled } = CountDataPrduct(result);
      const activeListing = result.filter(
        (u) => u.status === true && u.disabled === false
      );
      const pendingListing = result.filter(
        (u) => u.status === false && u.disabled === false
      );
      const disabledListing = result.filter(
        (u) => u.status === false && u.disabled === true
      );
      const combinedListings = [
        ...activeListing,
        ...pendingListing,
        ...disabledListing,
      ];
      setListings(combinedListings);
      setActive(active);
      setPending(pending);
      setDisabled(disabled);
      setLoading(false);
    })();
  }, [success]);
  const renderCell = (listing: ProductHandMade, columnKey: string | number) => {
    // const user = (await getUserById(listing.userId)) as userType;
    switch (columnKey) {
      //   case "Info":
      //     return (
      //       <User
      //         avatarProps={{ radius: "lg", src: user.picture }}
      //         description={user.email}
      //         name={user.username}
      //       >
      //         {user.email}
      //       </User>
      //     );
      case "Creation Date":
        let formattedDate;
        if (listing.created_at instanceof Timestamp) {
          formattedDate = listing.created_at.toDate().toLocaleString();
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
      //   case "Location":
      //     const city = cities.find((c) => c.id === listing.activeAreaId);
      //     return (
      //       <div className="flex flex-col">
      //         <p className="text-bold text-sm capitalize text-default-400">
      //           {city?.city}
      //         </p>
      //       </div>
      //     );
      case "Status":
        return (
          <Chip
            className="capitalize"
            color={listing.status === true ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {listing.status === true ? "Active" : "Inactive"}
          </Chip>
        );
      case "Banned":
        return (
          <Chip
            className="capitalize"
            color={listing.disabled === true ? "danger" : "default"}
            size="sm"
            variant="flat"
          >
            {listing.disabled === true ? "Banned" : "Active"}
          </Chip>
        );
      //   case "Actions":
      //     return (
      //       <div className="relative flex items-center gap-2">
      //         {user.banned === true ? (
      //           <Tooltip
      //             className="text-white"
      //             color="success"
      //             content="Unban user"
      //           >
      //             <span
      //               className="text-lg text-success-500 cursor-pointer active:opacity-50"
      //               onClick={() => {
      //                 setAction("unban");
      //                 onOpen();
      //                 setUserToDelete(user);
      //               }}
      //             >
      //               <UnBan />
      //             </span>
      //           </Tooltip>
      //         ) : (
      //           <Tooltip color="danger" content="Ban user">
      //             <span
      //               className="text-lg text-danger-500 cursor-pointer active:opacity-50"
      //               onClick={() => {
      //                 setAction("ban");
      //                 onOpen();
      //                 setUserToDelete(user);
      //               }}
      //             >
      //               <Ban />
      //             </span>
      //           </Tooltip>
      //         )}

      //         <Tooltip color="danger" content="Delete user">
      //           <span
      //             className="text-lg text-danger-500 cursor-pointer active:opacity-50"
      //             onClick={() => {
      //               setAction("delete");
      //               onOpen();
      //               setUserToDelete(user);
      //             }}
      //           >
      //             <TrashBin />
      //           </span>
      //         </Tooltip>
      //       </div>
      //     );
      default:
        return void 0;
    }
  };

  return (
    <>
      {listings && (
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
          <TableBody items={listings}>
            {(listing) => (
              <TableRow key={listing.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(listing, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
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

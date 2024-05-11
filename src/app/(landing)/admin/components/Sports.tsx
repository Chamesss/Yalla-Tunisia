import { getAllUsers } from "@/lib/adminActions/getAllUsers";
import React, { Suspense, useEffect, useState } from "react";
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
  Skeleton,
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
import {
  getHandMadesAdmin,
  getSportsAdmin,
} from "@/lib/adminActions/getAllListings";
import { getUserById } from "@/lib/UserActions/getUser";
import MoreInfo from "./TableActionsComponents/MoreInfo";
import DeleteItem from "./TableActionsComponents/DeleteItem";
import DisableItem from "./TableActionsComponents/DisableItem";
import Approve from "./TableActionsComponents/Approve";
import { handleCity } from "@/helpers/getLocationNan";

const columns = [
  { name: "Info", uid: "Info" },
  { name: "Creation Date", uid: "Creation Date" },
  { name: "Location", uid: "Location" },
  { name: "Status", uid: "Status" },
  { name: "Banned", uid: "Banned" },
  { name: "Actions", uid: "Actions" },
];

export default function Sports() {
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [listings, setListings] = useState<ProductSports[]>();
  const [userToDelete, setUserToDelete] = useState<ProductSports>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState<boolean>(false);
  const [action, setAction] = useState<string>();

  useEffect(() => {
    (async () => {
      const result = (await getSportsAdmin()) as ProductSports[];
      const { active, pending, disabled } = CountDataPrduct(result);
      const activeListing = result.filter(
        (u) => u.status === true && u.disabled === false
      );
      const pendingListing = result.filter(
        (u) => u.status === false && u.disabled === false
      );
      const disabledListing = result.filter((u) => u.disabled === true);
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

  //Table cells
  const renderCell = (listing: ProductSports, columnKey: string | number) => {
    switch (columnKey) {
      case "Info":
        return (
          <p className="text-bold text-sm capitalize text-default-400">
            {listing.title}
          </p>
        );
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
      case "Location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              <Suspense
                fallback={
                  <Skeleton className="rounded-xl opacity-75">
                    <p>Loading</p>
                  </Skeleton>
                }
              >
                {handleCity(listing)}
              </Suspense>
            </p>
          </div>
        );
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
            color={listing.disabled === true ? "danger" : "success"}
            size="sm"
            variant="flat"
          >
            {listing.disabled === true ? "Banned" : "No"}
          </Chip>
        );
      case "Actions":
        return (
          <div className="relative flex items-center gap-2 justify-between">
            <div className="flex flex-row items-center gap-3">
              <DisableItem
                setSuccess={setSuccess}
                listing={listing}
                CategoryName="Sports"
              />
              <DeleteItem
                setSuccess={setSuccess}
                listing={listing}
                CategoryName="Sports"
              />
              <MoreInfo CategoryName="Sports" listing={listing} />
            </div>
            <Approve
              setSuccess={setSuccess}
              listing={listing}
              CategoryName="Sports"
            />
          </div>
        );
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
    </>
  );
}
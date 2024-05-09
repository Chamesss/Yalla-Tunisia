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
import { getHandMadesAdmin } from "@/lib/adminActions/getAllListings";
import { getUserById } from "@/lib/UserActions/getUser";
import MoreInfo from "./TableActionsComponents/MoreInfo";
import DeleteItem from "./TableActionsComponents/DeleteItem";
import DisableItem from "./TableActionsComponents/DisableItem";
import Approve from "./TableActionsComponents/Approve";

const columns = [
  { name: "Info", uid: "Info" },
  { name: "Creation Date", uid: "Creation Date" },
  { name: "Location", uid: "Location" },
  { name: "Status", uid: "Status" },
  { name: "Banned", uid: "Banned" },
  { name: "Actions", uid: "Actions" },
];

export default function Handmades() {
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [listings, setListings] = useState<ProductHandMade[]>();
  const [userToDelete, setUserToDelete] = useState<ProductHandMade>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState<boolean>(false);
  const [action, setAction] = useState<string>();

  const handleCity = async (listing: ProductHandMade) => {
    if (listing.location === "nan") {
      const user = (await getUserById(listing.userId)) as userType;
      const city = cities.find((c) => c.id === user.activeAreaId);
      if (city?.city) {
        return city.city;
      }
      return "Date unavailable";
    } else {
      return listing.location;
    }
  };

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

  //Table cells
  const renderCell = (listing: ProductHandMade, columnKey: string | number) => {
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
          <div className="relative flex items-center gap-2">
            <DisableItem listing={listing} />
            <DeleteItem />
            <MoreInfo listing={listing} />
            <Approve />
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

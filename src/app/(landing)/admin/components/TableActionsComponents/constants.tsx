import React from "react";
import ActionsCell from "./ActionsCell";
import BannedCell from "./BannedCell";
import CreationDateCell from "./CreationDateCell";
import InfoCell from "./InfoCell";
import LocationCell from "./LocationCell";
import StatusCell from "./StatusCell";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export const columns = [
  { name: "Info", uid: "Info" },
  { name: "Creation Date", uid: "Creation Date" },
  { name: "Location", uid: "Location" },
  { name: "Status", uid: "Status" },
  { name: "Banned", uid: "Banned" },
  { name: "Actions", uid: "Actions" },
];

export const renderCell = (
  listing: ProductSports | ProductGuides | ProductHandMade,
  columnKey: string | number,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  CategoryName: string
) => {
  switch (columnKey) {
    case "Info":
      return <InfoCell title={listing.title} />;
    case "Creation Date":
      return <CreationDateCell date={listing.created_at} />;
    case "Location":
      return <LocationCell listing={listing} />;
    case "Status":
      return <StatusCell status={listing.status} />;
    case "Banned":
      return <BannedCell disabled={listing.disabled} />;
    case "Actions":
      return (
        <ActionsCell
          setSuccess={setSuccess}
          listing={listing}
          CategoryName={CategoryName}
        />
      );
    default:
      return void 0;
  }
};

type ProductListing = ProductGuides[] | ProductHandMade[] | ProductSports[];

type Props = {
  listings: ProductListing;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  CategoryName: string;
};

export function TableDisplay({ listings, setSuccess, CategoryName }: Props) {
  return (
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
      {/* @ts-ignore */}
      <TableBody items={listings}>
        {(listing) => (
          <TableRow key={listing.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(listing, columnKey, setSuccess, CategoryName)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

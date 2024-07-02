import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import ActionCell from "./ActionCell";
import StatusCell from "../TableActionsComponents/StatusCell";

export default function Approvals() {
  const [approvals, setApprovals] = useState<Approvals[]>();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/getapprovals", {
        next: { revalidate: 30 },
      });
      const data = (await res.json()) as Approvals[];
      setApprovals(data);
    })();
  }, [reload]);
  return (
    <React.Fragment>
      {approvals ? (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nom de business</TableColumn>
            <TableColumn>Télephone de business</TableColumn>
            <TableColumn>Type de business</TableColumn>
            <TableColumn>Statut</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {approvals.length > 0 ? (
              approvals?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="text-bold text-sm capitalize text-default-400">
                    {item.bName}
                  </TableCell>
                  <TableCell className="text-bold text-sm capitalize text-default-400">
                    {item.bPhone}
                  </TableCell>
                  <TableCell className="text-bold text-sm capitalize text-default-400">
                    {item.businessType}
                  </TableCell>
                  <TableCell className="text-bold text-sm capitalize text-default-400">
                    <StatusCell status={item.status} />
                  </TableCell>
                  <TableCell className="text-bold text-sm capitalize text-default-400">
                    <ActionCell item={item} setReload={setReload} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="1">
                <TableCell className="text-bold text-sm capitalize text-default-400">
                  Pas de données
                </TableCell>
                <TableCell className="text-bold text-sm capitalize text-default-400">
                  Pas de données
                </TableCell>
                <TableCell className="text-bold text-sm capitalize text-default-400">
                  Pas de données
                </TableCell>
                <TableCell className="text-bold text-sm capitalize text-default-400">
                  Pas de données
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </React.Fragment>
  );
}

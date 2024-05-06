"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Users from "./Users";
import Listings from "./Listings";
import Approvals from "./Approvals";

const config = ["Users", "Listings", "Approvals"];

export default function Main() {
  return (
    <div className="flex flex-1 p-4 w-full flex-col">
      <Tabs aria-label="Options" className="w-full">
        {config.map((c: string, i: number) => (
          <Tab key={i} className="!w-full bg-red-500 flex-1" title={c}>
            <div className="bg-blue-500 flex-auto">
              {c === "Users" && <Users />}
              {c === "Listings" && <Listings />}
              {c === "Approvals" && <Approvals />}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

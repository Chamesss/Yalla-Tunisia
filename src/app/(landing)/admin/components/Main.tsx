"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Users from "./Users";
import Listings from "./Listings";
import Approvals from "./Approvals";

const config = ["Users", "Listings", "Approvals"];

export default function Main() {
  return (
    <div className="flex flex-1 p-4 w-full flex-col">
      <Tabs aria-label="Options">
        {config.map((c: string, i: number) => (
          <Tab key={i} className="flex-auto flex" title={c}>
            <Card className="w-full">
              <CardBody className="flex-1">
                {c === "Users" && <Users />}
                {c === "Listings" && <Listings />}
                {c === "Approvals" && <Approvals />}
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

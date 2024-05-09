"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Users from "./Users";
import Approvals from "./Approvals";
import Reclamations from "./Reclamations";
import Withdrawal from "./Withdrawal";
import Handmades from "./Handmades";
import Sports from "./Sports";
import Guides from "./Guides";

const config = {
  Users: Users,
  Handmades: Handmades,
  "Sports & Entertainment": Sports,
  Guides: Guides,
  Approvals: Approvals,
  Reclamations: Reclamations,
  Withdrawal: Withdrawal,
};

export default function Main() {
  return (
    <div className="flex flex-1 p-4 w-full flex-col">
      <Tabs aria-label="Options">
        {Object.entries(config).map(([key, Component]) => (
          <Tab key={key} className="flex-auto flex" title={key}>
            <Card className="w-full">
              <CardBody className="flex-1 max-h-[80vh] overflow-y-auto">
                <Component />
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React from "react";
import ItemsDisplay from "./ItemsDisplay";
import DisplayStore from "./DisplayStore";

export default function TabsSection({ id }: { id: string }) {
  return (
    <Tabs
      destroyInactiveTabPanel={false}
      aria-label="Options"
      variant="underlined"
    >
      <Tab key="Offers" title="Offres">
        <Card className="shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)] border border-opacity-10">
          <CardBody className="px-2 xs:px-1">
            <ItemsDisplay id={id} />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="Store" title="Magasin">
        <Card className="shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)] border border-opacity-10 ">
          <CardBody>
            <DisplayStore id={id} />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

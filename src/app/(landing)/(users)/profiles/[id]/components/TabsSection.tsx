"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React from "react";
import ItemsDisplay from "./ItemsDisplay";
import DisplayStore from "./DisplayStore";

export default function TabsSection({ id }: { id: string }) {
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab destroyInactiveTabPanel={false} key="Offers" title="Offers">
        <Card className="shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)] border border-opacity-10">
          <CardBody className="px-2 xs:px-1">
            <ItemsDisplay id={id} />
          </CardBody>
        </Card>
      </Tab>
      <Tab destroyInactiveTabPanel={false} key="Store" title="Store">
        <Card className="shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)] border border-opacity-10 ">
          <CardBody>
            <DisplayStore id={id} />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

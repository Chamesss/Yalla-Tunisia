"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React from "react";
import ItemsDisplay from "./ItemsDisplay";
import DisplayStore from "./DisplayStore";

export default function TabsSection({ id }: { id: string }) {
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="Offers" title="Offers">
        <Card>
          <CardBody>
            <ItemsDisplay id={id} />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="Store" title="Store">
        <Card>
          <CardBody>
            <DisplayStore id={id} />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

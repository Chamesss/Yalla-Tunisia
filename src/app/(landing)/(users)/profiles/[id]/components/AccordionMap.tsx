"use client";
import { Accordion, AccordionItem, CardBody, Card } from "@nextui-org/react";
import React, { useState } from "react";
import GeoCart from "./GeoCart";

export default function AccordionMap({ user }: { user: userType }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card className="overflow-visible border border-opacity-10 shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)]">
      <CardBody className="py-0">
        <Accordion
          onSelectionChange={(keys) => {
            //@ts-ignore
            keys.size === 0 ? setOpen(false) : setOpen(true);
          }}
        >
          <AccordionItem key="1" aria-label="Location" title="Location">
            <div
              className={`flex justify-center w-full ${
                open == false && "!hidden"
              }`}
            >
              <div className="px-2 lg:px-8 w-[18rem]">
                <GeoCart activeAreaId={user.activeAreaId} />
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}

"use client";
import React from "react";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import Phone from "@/components/icons/Phone";
import { getLocationUserCompute } from "@/helpers/getLocationUserCompute";
import Location from "@/components/icons/Location";

export default function AccordionProfile({
  user,
  date,
}: {
  user: userType;
  date: string;
}) {
  return (
    <Card className="overflow-visible border border-opacity-10 shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)]">
      <CardBody className="py-0">
        <Accordion>
          <AccordionItem key="x3" aria-label="Info" title="Info">
            <div className="px-4 w-full space-y-2 flex flex-col items-start pb-6">
              <p className="flex flex-row gap-1 font-semibold !py-0 -ml-[0.075rem] text-sm text-default-500 items-center">
                <Location className="mb-[0.125rem] text-sm" />{" "}
                {getLocationUserCompute(user.activeAreaId)?.city}
              </p>
              <p className="flex flex-row gap-1 font-semibold text-sm text-default-500 items-center">
                <Phone className="mb-[0.125rem] text-sm" />{" "}
                <span className="text-sm">
                  +216 <span className="italic">{user.tel}</span>
                </span>
              </p>
              <p className="font-semibold ml-[0.075rem] text-sm text-default-500">
                Rejoint à {date}
              </p>
            </div>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}

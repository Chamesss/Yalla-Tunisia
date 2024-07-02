"use client";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import EditButton from "./EditButton";
import React, { Suspense, useState } from "react";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { ExtractDate } from "@/helpers/ExtractDateTimestamp";
import { getLocationUserCompute } from "@/helpers/getLocationUserCompute";
import DisplayStore from "../../profiles/[id]/components/DisplayStore";
import GeoCart from "../../profiles/[id]/components/GeoCart";
import ItemsDisplay from "../../profiles/[id]/components/ItemsDisplay";
import DropDownProfiles from "./DropDownProfiles";
import Image from "next/image";
import Location from "@/components/icons/Location";
import ChangePictureModal from "./modals/ChangePictureModal";
import SecurityModal from "./modals/SecurityModal";
import CloseButton from "./CloseButton";
import SaveButton from "./SaveButton";
import Phone from "@/components/icons/Phone";
import AccordionProfile from "../../profiles/[id]/components/Accordion";
import AccordionMap from "../../profiles/[id]/components/AccordionMap";
import TabsSection from "../../profiles/[id]/components/TabsSection";
import EditToggle from "./EditToggle";

export default function Main({ user }: { user: userType }) {
  const [editInfo, setEditInfo] = useState<boolean>(false);
  const date = ExtractDate(user.created_at);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="max-w-[100rem] flex justify-center flex-col flex-1 w-full px-2 xs:px-4 sm:px-6 md:px-10 lg:px-15 py-16">
        <div className="flex w-full justify-center">
          <div className="lg:w-[90%] w-[100%] relative">
            <Card className="overflow-visible border border-opacity-10 shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)]">
              <CardBody className="sm:min-h-[6rem] lg:min-h-[8rem] relative !outline-none !border-none">
                <div className="ml-[6.85rem] sm:ml-[9rem] lg:ml-[16rem]">
                  <h1 className="text-xl lg:text-3xl tracking-wide capitalize opacity-95 flex flex-col w-fit gap-1 lg:gap-2 items-start">
                    <span>{user.username}.</span>
                    <Chip variant="flat" color="primary" className="text-tiny">
                      {user.seller ? "Vendeur" : "Visiteur"}
                    </Chip>
                  </h1>
                </div>
                <div className="absolute gap-4 top-5 right-3 sm:right-5 ">
                  <div className="flex flex-row gap-1 sm:gap-4">
                    <EditToggle current={user.picture} id={user.id as string} />
                    <DropDownProfiles />
                  </div>
                </div>
              </CardBody>
            </Card>
            <div className="absolute -top-6 lg:-top-12 left-0.5 sm:left-10 lg:left-20 -z-10">
              <Card className="rounded-full border border-opacity-10 shadow-[0_0px_40px_-5px_rgba(0,0,0,0.25)]">
                <CardBody className="block w-[7rem] h-[7rem] lg:h-[10rem] lg:w-[10rem] rounded-full " />
              </Card>
            </div>
            <div className="absolute -top-6 lg:-top-12 left-0.5 sm:left-10 lg:left-20 w-[7rem] h-[7rem] lg:h-[10rem] lg:w-[10rem] rounded-full bg-white z-10">
              <div className="relative p-1">
                <Image
                  width={1024}
                  height={1024}
                  src={user.picture}
                  alt="profile-picture"
                  className="h-full w-full rounded-full drop-shadow-sm"
                  priority={true}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center mt-4 lg:mt-10">
          <div className="flex w-[100%] lg:w-[90%] justify-center lg:justify-between flex-col lg:flex-row gap-4 mg:gap-10">
            <div className="flex flex-col items-start w-full lg:w-fit gap-4 overflow-visible px-0">
              <div className="w-full relative !outline-none !border-none block lg:hidden">
                <AccordionProfile user={user} date={date} />
              </div>
              <div className="hidden lg:flex flex-col w-full px-4 pb-4 space-y-4">
                <div className="flex flex-row items-center w-full justify-start gap-4 overflow-hidden">
                  <h1 className="text-medium">Info</h1>
                  <Divider />
                </div>
                <div className="px-4 w-full space-y-2 flex flex-col items-start">
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
              </div>
              <div className="w-full relative !outline-none !border-none lg:hidden">
                <AccordionMap user={user} />
              </div>
              <div className="hidden lg:flex flex-col w-full p-4 space-y-4">
                <div className="flex flex-row items-center w-full justify-start gap-4 overflow-hidden">
                  <h1 className="text-medium">Emplacement</h1>
                  <Divider />
                </div>
                <div className="flex justify-center w-full">
                  <div className="px-2 lg:px-8 w-[18rem]">
                    <GeoCart activeAreaId={user.activeAreaId} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-start space-y-3">
              <Card className="shadow-[0px_0px_30px_-15px_rgba(0,0,0,0.2)] border border-opacity-10">
                <CardBody className="px-4 py-4 space-y-4">
                  <h1 className="text-medium">Description</h1>
                  <blockquote className="italic text-default-600">
                    ❝ {user.description} ❞
                  </blockquote>
                </CardBody>
              </Card>
              <div className="w-full">
                <TabsSection id={user.id as string} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="flex flex-1 justify-center">
//   <div className="max-w-[100rem] flex flex-1 w-full px-2 xs:px-4 sm:px-6 md:px-10 lg:px-20 py-16">
//     <div className="border border-opacity-75 rounded-xl w-full flex flex-1 flex-col">
//       <div className="p-5 md:p-8 flex flex-row justify-between">
//         <div className="flex flex-row gap-4">
//           <div className="relative">
//             <Image
//               width={1024}
//               height={1024}
//               src={user.picture}
//               alt="profile-picture"
//               className="md:w-20 md:h-20 h-16 w-16 rounded-full drop-shadow-sm"
//               priority={true}
//               quality={100}
//             />
//             <div className="absolute top-0 right-0" onClick={onOpen}>
//               <EditButton />
//             </div>
//           </div>
//           <div>
//             <p className="capitalize text-xl md:text-2xl font-semibold">
//               {user.username}.
//             </p>
//             <p className="flex flex-row gap-1 text-medium md:text-lg text-default-500 items-center">
//               <Location className="mb-[0.125rem] text-sm" />{" "}
//               {getLocationUserCompute(user.activeAreaId)?.city}
//             </p>
//             <Chip variant="flat" color="primary">
//               {user.seller ? "Seller" : "Visitor"}
//             </Chip>
//           </div>
//         </div>
//         <DropDownProfiles />
//       </div>
//       <Divider />
//       <div className="w-full flex flex-col md:flex-row flex-1">
//         <div className="w-[100%] md:w-[30%] flex p-5 md:p-8 flex-col space-y-3">
//           <div className="w-full justify-between flex flex-row items-center">
//             <h1 className="text-xl font-bold tracking-wide">Info</h1>
//             {editInfo === false ? (
//               <Tooltip content="Edit" color="primary">
//                 <div onClick={() => setEditInfo((prev) => !prev)}>
//                   <EditButton />
//                 </div>
//               </Tooltip>
//             ) : (
//               <div className="flex flex-row gap-2">
//                 <Tooltip content="Cancel" color="danger">
//                   <div onClick={() => setEditInfo(false)}>
//                     <CloseButton />
//                   </div>
//                 </Tooltip>
//                 <Tooltip
//                   content="Save"
//                   color="success"
//                   className="text-white"
//                 >
//                   <div>
//                     <SaveButton />
//                   </div>
//                 </Tooltip>
//               </div>
//             )}
//           </div>
//           <div className="px-3 py-2 rounded-lg space-y-1">
//             {editInfo === false ? (
//               <>
//                 <p className="text-sm">
//                   Phone:{" "}
//                   <span className="font-semibold text-lg text-default-500 ml-2">
//                     {user.tel}
//                   </span>
//                 </p>
//                 <p className="text-sm">
//                   Joined at{" "}
//                   <span className="font-semibold text-lg text-default-500 ml-2">
//                     {date}
//                   </span>
//                 </p>
//               </>
//             ) : (
//               <Input
//                 label="Edit phone"
//                 labelPlacement="inside"
//                 startContent={
//                   <small className="text-default-500">+216</small>
//                 }
//               />
//             )}
//           </div>
//           <SecurityModal user={user} />
//           <div className="w-full justify-between flex flex-row items-center">
//             <h1 className="text-xl font-bold tracking-wide">Location</h1>
//             <EditButton />
//           </div>
//           <div className="flex justify-center">
//             <div className="px-2 lg:px-8 w-[18rem] xs:w-[21rem] md:[18rem] !-z-10">
//               <GeoCart activeAreaId={user.activeAreaId} />
//             </div>
//           </div>
//         </div>
//         <Divider
//           orientation="vertical"
//           className="w-[0.05rem] hidden md:block"
//         />
//         <div className="flex flex-1 flex-col">
//           <div className="flex flex-col p-5 md:p-8 space-y-3">
//             <div className="w-full justify-between flex flex-row items-center">
//               <h1 className="text-xl font-bold tracking-wide">
//                 Description
//               </h1>
//               <EditButton />
//             </div>
//             <blockquote className="italic text-default-600">
//               ❝ {user.description} ❞
//             </blockquote>
//           </div>
//           <Divider />
//           {user.seller && (
//             <React.Fragment>
//               <div className="flex flex-col p-5 md:p-8 space-y-3">
//                 <div className="w-full justify-between flex flex-row items-center">
//                   <h1 className="text-xl font-bold tracking-wide">Store</h1>
//                   <EditButton />
//                 </div>
//                 <div>
//                   <DisplayStore id={user.id as string} />
//                 </div>
//               </div>
//               <Divider />
//             </React.Fragment>
//           )}
//           <div className="space-y-3 p-5 md:p-8">
//             <div className="w-full justify-between flex flex-row items-center">
//               <h1 className="text-xl font-bold tracking-wide">Offers</h1>
//               <Button variant="flat" color="primary">
//                 Go to panel
//               </Button>
//             </div>
//             <div className="w-full flex item-center justify-center">
//               <ItemsDisplay id={user.id as string} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <ChangePictureModal
//     isOpen={isOpen}
//     onOpen={onOpen}
//     onOpenChange={onOpenChange}
//     current={user.picture}
//     id={user.id as string}
//   />
// </div>

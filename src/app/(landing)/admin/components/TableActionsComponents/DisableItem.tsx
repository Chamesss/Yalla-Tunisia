import Ban from "@/components/icons/Ban";
import UnBan from "@/components/icons/UnBan";
import { Tooltip } from "@nextui-org/react";

type Props = {
  listing: ProductHandMade | ProductSports | ProductGuides;
};

export default function DisableItem({ listing }: Props) {
  return (
    <>
      {listing.disabled === true ? (
        <Tooltip className="text-white" color="success" content="Unban user">
          <span
            className="text-lg text-success-500 cursor-pointer active:opacity-50"
            // onClick={() => {
            //   setAction("unban");
            //   onOpen();
            //   setUserToDelete(listing);
            // }}
          >
            <UnBan />
          </span>
        </Tooltip>
      ) : (
        <Tooltip color="danger" content="Ban user">
          <span
            className="text-lg text-danger-500 cursor-pointer active:opacity-50"
            // onClick={() => {
            //   setAction("ban");
            //   onOpen();
            //   setUserToDelete(listing);
            // }}
          >
            <Ban />
          </span>
        </Tooltip>
      )}
    </>
  );
}

"use client";
import IconArrowRight from "@/components/icons/RightArrow";
import { Button, Divider, Spinner, User } from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import SimilarOffers from "./SimilarOffers";
import Link from "next/link";

export default function UserAndProducts({
  userId,
  section,
}: {
  userId: string;
  section: string;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userType>();
  const [approval, setApproval] = useState<Approvals>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const resUser = await fetch(`/api/users/getuser/${userId}`, {
          cache: "no-cache",
        });
        const resApproval = await fetch(`/api/getapproval/${userId}`, {
          cache: "no-cache",
        });
        const user = (await resUser.json()) as userType;
        const approval = (await resApproval.json()) as Approvals;
        setUser(user);
        setApproval(approval);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="w-full h-[10rem] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          {user ? (
            <div className="w-full flex flex-col items-center justify-center border border-default-300 rounded-xl">
              <div className="max-w-[50rem] flex-col items-start w-full space-y-5 py-6 px-4 drop-shadow-md rounded-xl flex xs:flex-row justify-between xs:items-center">
                <Link href={`/profiles/${user?.id}`}>
                  <User
                    name={user?.username}
                    avatarProps={{
                      src: user?.picture,
                    }}
                    description={
                      <span className="capitalize">{approval?.bName}</span>
                    }
                  />
                </Link>
                <Link href={`/profiles/${user.id}`}>
                  <Button color="primary">
                    Visit business page <IconArrowRight />
                  </Button>
                </Link>
              </div>
              <Divider className="my-4 w-[90%]" />
              <div
                ref={containerRef}
                className="w-full flex flex-col space-y-3 items-center justify-center overflow-hidden"
              >
                <h1 className="text-lg font-semibold">Similar Offers</h1>
                <SimilarOffers section={section} />
              </div>
            </div>
          ) : (
            <div className="w-full h-[10rem] flex items-center justify-center">
              <p>Something went wrong, try reloading the page.</p>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

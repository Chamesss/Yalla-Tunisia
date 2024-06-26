"use client";
import getInProgress from "@/lib/checkoutActions/get-in-progress";
import getUserFromCookies from "@/lib/getUserFromCookies";
import React, { useEffect } from "react";

export default function InProgress() {
  useEffect(() => {
    (async () => {
      try {
        const user = await getUserFromCookies();
        if (user) {
          const res = await getInProgress(user.userId as string);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return <div>in-progress</div>;
}

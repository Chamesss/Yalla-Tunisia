"use client";
import getUserFromCookies from "@/lib/getUserFromCookies";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import FormService from "./components/FormService";
import PendingForm from "./components/PendingForm";

export default function Redirect() {
  const [loading, setLoading] = useState(true);
  const [approvals, setApprovals] = useState<number>();
  useEffect(() => {
    (async () => {
      const user = await getUserFromCookies();
      if (user) {
        const response = await fetch(`/api/getapproval/${user.userId}`);
        const approval = await response.json();
        setApprovals(approval.length);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex items-center justify-center mt-4">
          {approvals === 0 ? <FormService /> : <PendingForm />}
        </div>
      )}
    </React.Fragment>
  );
}
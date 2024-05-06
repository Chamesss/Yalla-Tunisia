import { getAllUsers } from "@/lib/adminActions/getAllUsers";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [totalUsers, setTotalUsers] = useState<number>();
  const [active, setActive] = useState<number>();
  const [pending, setPending] = useState<number>();
  const [disabled, setDisabled] = useState<number>();
  const [activeUsers, setActiveUsers] = useState<userType[]>();
  const [pendingUsers, setPendingUsers] = useState<userType[]>();
  const [disabledUsers, setDisabledUsers] = useState<userType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const result = (await getAllUsers()) as userType[];
      const { active, pending, disabled } = CountData(result);
      const activeUsers = result.filter(
        (u) => u.status === true && u.banned === false
      );
      const pendingUsers = result.filter(
        (u) => u.status === false && u.banned === false
      );
      const disabledUsers = result.filter(
        (u) => u.status === false && u.banned === true
      );
      setActiveUsers(activeUsers);
      setPendingUsers(pendingUsers);
      setDisabledUsers(disabledUsers);
      setTotalUsers(result.length);
      setActive(active);
      setPending(pending);
      setDisabled(disabled);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between">
            <p>Active:{active}</p>
            <p>Pending:{pending}</p>
            <p>Disabled:{disabled}</p>
          </div>
          <div>{activeUsers && <div></div>}</div>
        </div>
      )}
    </div>
  );
}

function CountData(data: userType[]) {
  let active = 0;
  let pending = 0;
  let disabled = 0;
  for (const i in data) {
    if (data[i].status === true && data[i].banned === false) active++;
    if (data[i].status === false && data[i].banned === false) pending++;
    if (data[i].banned === true) disabled++;
  }
  return { active, pending, disabled };
}

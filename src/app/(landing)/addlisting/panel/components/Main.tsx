"use client";
import { useSelector } from "react-redux";
import { userState } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { getListingsByUserId } from "@/lib/ListingActions/getListingsByUserId";
import { DocumentData } from "firebase/firestore";

export default function Main() {
  const user: userInfoType = useSelector(userState);
  const userId = user.userId;
  const [Loading, setLoading] = useState(true);
  const [handmades, setHandmades] = useState<DocumentData[] | null>(null);
  const [sports, setSports] = useState<DocumentData[] | null>(null);
  const [guides, setGuides] = useState<DocumentData[] | null>(null);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    (async () => {
      const result = await getListingsByUserId(userId);
      const { Handmades, Sports, Guides } = result;
      Handmades.length > 0 && setHandmades(Handmades);
      Sports.length > 0 && setSports(Sports);
      Guides.length > 0 && setGuides(Guides);
      const total = Handmades.length + Sports.length + Guides.length;
      setTotal(total);
      setLoading(false);
    })();
  }, []);

  if (Loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex-1">
      {handmades === null || handmades.length === 0 ? (
        <p>no items to display</p>
      ) : (
        <div>
          {handmades.map((object, i) => (
            <div>
              <p>{object.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

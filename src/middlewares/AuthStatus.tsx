import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { addUserSession, logOutSession } from "@/redux/slices/userSlice";

export default function FirebaseAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Dispatch action to add user session
        //dispatch(addUserSession(firebaseUser));
        //setUser(firebaseUser);
      } else {
        // Dispatch action to logout user session
        dispatch(logOutSession());
        //setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth]);

  return <div>{children} </div>;
}

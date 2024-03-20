import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase.config";
import { addUserSession, logOutSession } from "@/redux/slices/userSlice";

export default function FirebaseAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Dispatch action to add user session
        //dispatch(addUserSession(firebaseUser));
        //setUser(firebaseUser);
        console.log("firebase user === ", firebaseUser);
      } else {
        // Dispatch action to logout user session
        dispatch(logOutSession());
        setUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return <div>{children} </div>;
}

import { useDispatch } from "@/redux/store";
import { userState } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import LoginModal from "@/app/Modals/LoginModal";

const useUserState = () => {
  const { isLogged } = useSelector(userState);
  return isLogged ? " " : <LoginModal />;
};

export default useUserState;

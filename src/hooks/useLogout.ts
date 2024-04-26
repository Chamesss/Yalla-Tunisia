import { useDispatch } from "@/redux/store";
import { logOutSession } from '@/redux/slices/userSlice';

const useLogout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOutSession());
        window.location.reload();
    };

    return logout;
};

export default useLogout;
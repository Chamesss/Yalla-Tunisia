import { useDispatch } from "@/redux/store";
import { logOutSession } from '@/redux/slices/userSlice';
import { removeSessionCookies } from "@/lib/actions/userLogout";

const useLogout = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        await removeSessionCookies()
        dispatch(logOutSession());
        window.location.reload();
    };

    return logout;
};

export default useLogout;
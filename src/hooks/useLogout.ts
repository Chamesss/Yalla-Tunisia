import { useDispatch } from "@/redux/store";
import { logOutSession } from '@/redux/slices/userSlice';
import { removeSessionCookies } from "@/lib/actions/userLogout";
import { cleanFavoritesState } from "@/redux/slices/favoritesSlice";

const useLogout = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        await removeSessionCookies()
        dispatch(cleanFavoritesState())
        dispatch(logOutSession());
        window.location.reload();
    };

    return logout;
};

export default useLogout;
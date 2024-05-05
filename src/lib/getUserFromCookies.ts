"use server"
import { cookies } from "next/headers";

export default async function getUserFromCookies() {
    const cookieStore = cookies();
    const user = cookieStore.get("userData");
    if (user) {
        const userData = JSON.parse(user.value) as userSlice;
        return userData
    } else return null
}
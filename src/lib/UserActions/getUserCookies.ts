"use server"
import { cookies } from "next/headers";
export async function getUserCookies() {
    const cookiesStore = cookies();
    const userSession = cookiesStore.get("userData");
    if (userSession) {
        return userSession
    } else {
        return false
    }
}
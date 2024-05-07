"use server"
import { cookies } from "next/headers";

export async function removeSessionCookies() {
    const cookieStore = cookies();
    cookieStore.delete("userData")
}
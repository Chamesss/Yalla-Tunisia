"use server"
import { cookies } from "next/headers";

export default async function revalidateUserdata(user: userType, userId: string) {
    const cookieStore = cookies();
    cookieStore.set({
        name: "userData",
        value: JSON.stringify({
            isLogged: true,
            user: user,
            userId: userId,
        }),
        path: "/",
        maxAge: 86400,
        sameSite: "strict",
    });
}
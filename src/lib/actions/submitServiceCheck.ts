"use server"
import { cookies } from "next/headers"
export async function submitProfileCheck(data: any) {
    const cookieStore = cookies()
    const user = cookieStore.get("userData")
    if (user) {
        const userData = JSON.parse(user.value) as userSlice;
        const userId = userData.userId
        const submitData = {
            userId: userId,
            ...data
        }
        console.log(submitData)
        return true
    }
    return false
}
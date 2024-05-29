"use server";
import { initAdmin } from "@/firebase-admin";
import getUserFromCookies from "@/lib/getUserFromCookies";


interface UserUpdates {
    email?: string;
    password?: string;
}

export const handleChangePassword = async (prevState: any, formData: FormData) => {
    const admin = await initAdmin()
    const email = formData.get("email") as string;
    const newPassword = formData.get("new-password") as string;

    const user = await getUserFromCookies();
    if (!user || !user.userId) {
        return {
            response: {
                success: false,
                message: "User not found.",
                error: 2,
            },
        };
    }

    try {
        const userId = user.userId;

        const userRecord = await admin.auth().getUser(userId)

        let updates: UserUpdates = {};
        if (userRecord.email !== email) {
            updates.email = email;
            console.log('Email changed!');
        } else {
            console.log('Email has not changed.');
        }

        if (newPassword) {
            updates.password = newPassword;
            console.log('Password updated!');
        }

        if (Object.keys(updates).length > 0) {
            await admin.auth().updateUser(userId, updates);
        }

        return {
            response: {
                success: true,
                message: "Email and password updated successfully.",
                error: 0,
            },
        };
    } catch (error) {
        console.error("Error updating email or password:", error);

        return {
            response: {
                success: false,
                message: "Error updating email or password: ",
                error: 4,
            },
        };
    }
};
import { db, storage } from "@/firebase"; // Import storage for bucket access
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage"; // Import storage functions
import { NextRequest, NextResponse } from "next/server";

// Existing GET function... (unchanged)

export async function updateUserPicture(userId: string, newPicture: File) {
    try {
        // 1. Get user document reference
        const userRef = doc(db, "users", userId);

        // 2. Download URL of the old picture (optional but recommended)
        const oldPictureRef = ref(storage, `user-pictures/${userId}`); // Construct reference based on your structure
        const oldPictureUrl = await getDownloadURL(oldPictureRef).catch((error) => {
            if (error.code === "storage/object-not-found") {
                console.log("No old picture found for user:", userId);
            }
        });
        const newPictureRef = ref(storage, `user-pictures/${userId}`); // Same reference as download
        await uploadBytes(newPictureRef, newPicture); // Upload the new image data

        // 4. (Optional) Delete the old picture if download was successful
        if (oldPictureUrl) {
            await deleteObject(oldPictureRef);
        }

        // 5. Update user document with the new picture URL
        const pictureUrl = await getDownloadURL(newPictureRef); // Get URL of the uploaded image
        await updateDoc(userRef, { picture: pictureUrl });
        return true

        console.log("User picture updated successfully!");
    } catch (error) {
        console.error("Error updating user picture:", error);
        throw error; // Re-throw for potential handling in the calling code
    }
}
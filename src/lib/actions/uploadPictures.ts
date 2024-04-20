import { FirebaseApp } from "firebase/app";
import { FirebaseStorage, StorageReference, UploadMetadata, UploadResult } from "firebase/storage";

export async function uploadImages(productImages: FormDataEntryValue[], userId: string, getStorage: { (app?: FirebaseApp | undefined, bucketUrl?: string | undefined): FirebaseStorage; (arg0: FirebaseApp): any; }, uploadBytes: { (ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata | undefined): Promise<UploadResult>; (arg0: any, arg1: File): any; }, getDownloadURL: { (ref: StorageReference): Promise<string>; (arg0: any): any; }, app: FirebaseApp, storageRef: { (storage: FirebaseStorage, url?: string | undefined): StorageReference; (storageOrRef: FirebaseStorage | StorageReference, path?: string | undefined): StorageReference; (arg0: any, arg1: string): any; }) {
    let imageUrls = []
    const storage = getStorage(app);
    for (const image of productImages) {
        const file = image as File;
        const filename = `${Date.now()}_${file.name}`;
        const ref = storageRef(storage, `images/${userId}/${filename}`);
        try {
            await uploadBytes(ref, file);
            const imageUrl = await getDownloadURL(ref);
            imageUrls.push(imageUrl);
        } catch (error) {
            return { response: { success: false, error: -1, message: 'Error uploading image' } };
        }
    }
    return imageUrls;
}
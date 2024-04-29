"use server"
import { getPlaiceholder } from "plaiceholder";

export async function getImages(images: any) {
    try {
        const processedImages = await Promise.all(
            images.map(async (image: any) => {
                const buffer = await fetch(image).then(async (res) =>
                    Buffer.from(await res.arrayBuffer())
                );
                const { base64 }: any = await getPlaiceholder(buffer);
                return { base64, url: image };
            })
        );

        return processedImages;
    } catch (error) {
        console.log("Error processing images:", error);
        throw error;
    }
};
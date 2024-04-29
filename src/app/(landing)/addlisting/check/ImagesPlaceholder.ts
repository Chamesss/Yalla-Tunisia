"use server"
import { getPlaiceholder } from "plaiceholder";

export async function getImages(images: string[]) {
    try {
        const processedImages = await Promise.all(
            images.map(async (image: string) => {
                const buffer = await fetch(image).then(async (res) =>
                    Buffer.from(await res.arrayBuffer())
                );
                const { base64 } = await getPlaiceholder(buffer);
                return { base64, url: image };
            })
        );

        return processedImages;
    } catch (error) {
        console.log("Error processing images:", error);
        throw error;
    }
};
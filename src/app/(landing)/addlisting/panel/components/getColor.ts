"use server"

import { getPlaiceholder } from "plaiceholder";

export async function getBgColor(url: string) {
    const buffer = await fetch(url).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
    );
    const { base64 } = await getPlaiceholder(buffer);
    return base64
}
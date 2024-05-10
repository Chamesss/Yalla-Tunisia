import { categories } from "@/constants/categories";

export const config = {
    "Hand-Made": "Handmades",
    "Sports & Entertainments": "Sports",
    Guide: "Guide",
};

export function FilterCategory(id: string): string | undefined {
    let selectedCategory: string
    const category = categories.find((c) => c.id === id)

    Object.entries(config).map(([key, value]) => {
        if (category?.name === key) {
            selectedCategory = value
            return selectedCategory
        }
    })
    return undefined
}
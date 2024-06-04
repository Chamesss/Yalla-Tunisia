import HandMadeIcon from "./categoriesIcons/HandMadeIcon"
import AccessoriesAndJewelry from "./categoriesIcons/handmadeIcons/AccessoriesAndJewelry"
import Decoration from "./categoriesIcons/handmadeIcons/Decoration"
import Activities from "./categoriesIcons/handmadeIcons/Activities"

import SportsAndEntertainment from "./categoriesIcons/SportsAndEntertainment"
import Bicycles from "./categoriesIcons/sportsIcons/Bicycles"
import AirBorne from "./categoriesIcons/sportsIcons/Airborne"
import Boat from "./categoriesIcons/sportsIcons/Boat"
import Diving from "./categoriesIcons/sportsIcons/Diving"
import Kitesurf from "./categoriesIcons/sportsIcons/Kitesurf"
import Quad from "./categoriesIcons/sportsIcons/Quad"
import NauticalBase from "./categoriesIcons/sportsIcons/NauticalBase"

import Guide from "./categoriesIcons/Guide"
import GuideIcon from "./categoriesIcons/guide/GuideIcon"



export const categories = [
    {
        id: "66207a2aeaae61ad28ef0b19",
        name: "Hand-Made",
        Icon: HandMadeIcon,
        subcategories: [
            {
                id: "66207a3c814a7dfe395f98fd",
                name: "Accessories & Jewelry",
                Icon: AccessoriesAndJewelry
            },
            {
                id: "66207a46e07b9b595a189c49",
                name: "Decorations",
                Icon: Decoration
            },
            {
                id: "66207a4ebea5db3927c25c26",
                name: "Activities",
                Icon: Activities
            }
        ]
    },
    {
        id: "66207a58baeaaee2d5e6d417",
        name: "Sports & Entertainments",
        Icon: SportsAndEntertainment,
        subcategories: [
            {
                id: "66207a65f129bf107bddf067",
                name: "Bicycles & Electric scooters",
                Icon: Bicycles
            },
            {
                id: "66207a6efb5a60b6391b76ca",
                name: "Quad",
                Icon: Quad
            },
            {
                id: "66207a7690c97cf8267d4768",
                name: "Airborne",
                Icon: AirBorne
            },
            {
                id: "66207a7ead63be32426c43dc",
                name: "Boat Cruise",
                Icon: Boat
            },
            {
                id: "66207a855bb009447014b9ac",
                name: "Diving",
                Icon: Diving
            },
            {
                id: "66207a8d50a522430f6074b6",
                name: "Nautical Base",
                Icon: NauticalBase
            },
            {
                id: "66207aac44cc047a47abbf30",
                name: "Kitesurf",
                Icon: Kitesurf
            }
        ]
    },
    {
        id: "66207ab5b27e1a42a69a6517",
        name: "Guide",
        Icon: Guide,
        subcategories: [
            {
                id: "66207abd90b31d11aa680131",
                name: "Pick the nearest guide",
                Icon: GuideIcon
            }
        ]
    }
]

export const CategoriesIds = ["66207a2aeaae61ad28ef0b19", "66207a58baeaaee2d5e6d417", "66207ab5b27e1a42a69a6517"]
export const SubcategoryIds = ["66207a3c814a7dfe395f98fd", "66207a46e07b9b595a189c49", "66207a4ebea5db3927c25c26", "66207a65f129bf107bddf067", "66207a6efb5a60b6391b76ca", "66207a7690c97cf8267d4768", "66207a7ead63be32426c43dc", "66207a855bb009447014b9ac", "66207a8d50a522430f6074b6", "66207aac44cc047a47abbf30", "66207abd90b31d11aa680131"]

export const CategoryWName = [{
    id: "66207a2aeaae61ad28ef0b19",
    name: "Handmades",
}, {
    id: "66207a58baeaaee2d5e6d417",
    name: "Sports & Entertainment"
}, {
    id: "66207ab5b27e1a42a69a6517",
    name: "Guides"
}]

export const CategoryWNameDoc = [{
    id: "66207a2aeaae61ad28ef0b19",
    name: "Handmades",
}, {
    id: "66207a58baeaaee2d5e6d417",
    name: "Sports"
}, {
    id: "66207ab5b27e1a42a69a6517",
    name: "Guides"
}]


type Product = ProductGuides | ProductHandMade | ProductSports

export const isProductHandmades = (data: Product): data is ProductHandMade => {
    return (data as ProductHandMade).categoryId === "66207a2aeaae61ad28ef0b19";
};

export const isProductSports = (data: Product): data is ProductSports => {
    return (data as ProductGuides).categoryId === "66207a58baeaaee2d5e6d417";
};

export const isProductGuides = (data: Product): data is ProductGuides => {
    return (data as ProductGuides).categoryId === "66207ab5b27e1a42a69a6517";
};
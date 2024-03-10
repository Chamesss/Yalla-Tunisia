export interface SubCategoryType {
    id: string;
    name: string;
    picture: string;
}
export interface CategoryType {
    id: string;
    name: string;
    picture: string;
    subcategories: SubCategoryType[];
}
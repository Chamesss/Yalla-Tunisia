import { Dispatch, SetStateAction } from "react";

export interface MainPropsForm {
    userId: string;
    categoryId: string | null;
    subCategoryId: string | null;
    location: string | null;
    setLocationError: Dispatch<SetStateAction<boolean>>;
    setCategoryError: Dispatch<SetStateAction<boolean>>;
    setSubCategoryError: Dispatch<SetStateAction<boolean>>;
}

export interface PropsForm extends MainPropsForm {
    formState: {
        response: {
            success: boolean;
            error: number;
            message: string;
        };
    };
}
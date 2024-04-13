import { Dispatch, SetStateAction } from 'react';

interface ErrorMapping {
    errorStateSetter?: Dispatch<SetStateAction<boolean>>;
    sectionId: string;
    scrollOptions: ScrollIntoViewOptions;
}

export function getErrorStateHandmade(setCategoryError: Dispatch<SetStateAction<boolean>>, setSubCategoryError: Dispatch<SetStateAction<boolean>>, setLocationError: Dispatch<SetStateAction<boolean>>, errorCode: number) {
    const errorMappings: Record<number, ErrorMapping> = {
        11: { errorStateSetter: setCategoryError, sectionId: "categorySection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        12: { errorStateSetter: setSubCategoryError, sectionId: "categorySection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        13: { errorStateSetter: setLocationError, sectionId: "locationSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        1: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
    };
    const mapping = errorMappings[errorCode];
    return mapping;
}

export function getErrorStateSports(setCategoryError: Dispatch<SetStateAction<boolean>>, setSubCategoryError: Dispatch<SetStateAction<boolean>>, setLocationError: Dispatch<SetStateAction<boolean>>, errorCode: number) {
    const errorMappings: Record<number, ErrorMapping> = {
        11: { errorStateSetter: setCategoryError, sectionId: "categorySection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        12: { errorStateSetter: setSubCategoryError, sectionId: "categorySection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        13: { errorStateSetter: setLocationError, sectionId: "locationSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        1: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        2: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        3: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        4: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        5: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        6: { sectionId: "timingSection", scrollOptions: { behavior: "smooth", block: "center", inline: "nearest" } },
        7: { sectionId: "timingSection", scrollOptions: { behavior: "smooth", block: "center", inline: "nearest" } }
    };
    const mapping = errorMappings[errorCode];
    return mapping;
}

export function getErrorStateGuide(setCategoryError: Dispatch<SetStateAction<boolean>>, setLocationError: Dispatch<SetStateAction<boolean>>, errorCode: number) {
    const errorMappings: Record<number, ErrorMapping> = {
        11: { errorStateSetter: setCategoryError, sectionId: "categorySection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        13: { errorStateSetter: setLocationError, sectionId: "locationSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        1: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        2: { sectionId: "GeneralSection", scrollOptions: { behavior: "smooth", block: "end", inline: "nearest" } },
        6: { sectionId: "timingSection", scrollOptions: { behavior: "smooth", block: "center", inline: "nearest" } },
        7: { sectionId: "timingSection", scrollOptions: { behavior: "smooth", block: "center", inline: "nearest" } }
    };
    const mapping = errorMappings[errorCode];
    return mapping;
}
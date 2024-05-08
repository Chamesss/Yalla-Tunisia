export function CountData(data: userType[]) {
    let active = 0;
    let pending = 0;
    let disabled = 0;
    for (const i in data) {
        if (data[i].status === true && data[i].banned === false) active++;
        if (data[i].status === false && data[i].banned === false) pending++;
        if (data[i].banned === true) disabled++;
    }
    return { active, pending, disabled };
}

export function CountDataPrduct(data: ProductGuides[] | ProductHandMade[] | ProductSports[]) {
    let active = 0;
    let pending = 0;
    let disabled = 0;
    for (const i in data) {
        if (data[i].status === true && data[i].disabled === false) active++;
        if (data[i].status === false && data[i].disabled === false) pending++;
        if (data[i].disabled === true) disabled++;
    }
    return { active, pending, disabled };
}
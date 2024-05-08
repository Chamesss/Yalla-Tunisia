export default function CountData(data: userType[]) {
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
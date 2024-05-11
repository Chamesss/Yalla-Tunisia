import { Timestamp } from "firebase/firestore";

export function ExtractDayMonthYear(item: Date) {
    let day;
    let month;
    let year;
    if (item instanceof Timestamp) {
        day = item
            .toDate()
            .toLocaleDateString(undefined, { day: "numeric" });
        month = item
            .toDate()
            .toLocaleDateString(undefined, { month: "short" });
        year = item
            .toDate()
            .toLocaleDateString(undefined, { year: "numeric" });
    } else {
        return false
    }
    return { day, month, year }
}
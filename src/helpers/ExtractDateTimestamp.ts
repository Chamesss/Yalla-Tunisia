import { Timestamp } from "firebase/firestore";

export function ExtractDate(timestamp: Timestamp) {
    const milliseconds =
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

    const date = new Date(milliseconds);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };

    // Extract only the date in the specified format
    const readableDate = date.toLocaleDateString('en-US', options);
    return readableDate;
}

export function ExtractYearMonthDay(timestamp: Timestamp) {
    const milliseconds =
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

    const date = new Date(milliseconds);
    // Extract numeric values for day, month, and year
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // getUTCMonth() returns month index (0-11), so add 1
    const year = date.getUTCFullYear();

    return { day, month, year };
}

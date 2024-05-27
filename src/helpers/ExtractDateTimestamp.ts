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
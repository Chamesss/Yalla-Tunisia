import { DateValue } from "@nextui-org/react";
import { isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import {
    ExtractYearMonthDay,
} from "@/helpers/ExtractDateTimestamp";
import { Timestamp } from "firebase/firestore";


export function calculateIsDateUnavailable(
    itemEvent: string,
    itemTiming: string | Timestamp[]
): (date: DateValue) => boolean {
    let { locale } = useLocale();
    if (itemEvent.toLowerCase() === "ongoingevent") {
        if (typeof itemTiming === "string") {
            if (itemTiming.toLowerCase() === "available-all-time") {
                return () => false;
            } else if (
                itemTiming.toLowerCase() ===
                "available all time except weekend (sat, sun)"
            ) {
                return (date: DateValue) => isWeekend(date, locale);
            } else if (
                itemTiming.toLowerCase() === "available all weekends (sat, sun)"
            ) {
                return (date: DateValue) => !isWeekend(date, locale);
            }
        }
    } else if (itemEvent.toLowerCase() === "scheduledevent") {
        if (typeof itemTiming === "object") {
            return (date: DateValue) => {
                let result: boolean = true;
                for (let currentDate of itemTiming) {
                    const { day, month, year } = ExtractYearMonthDay(
                        currentDate as Timestamp
                    );
                    if (day === date.day && month === date.month && year === date.year)
                        result = false;
                }
                return result;
            };
        }
    }
    return () => true;
}
export type DateTimeStyle = "full" | "long" | "medium" | "short";

export const dateTimeToTimeFormatter = (
    dateTime: string | Date,
    locale: string,
    timeStyle: DateTimeStyle = "short",
    is12HourClock: boolean = false
): string => {
    const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;

    const timeFormatter = new Intl.DateTimeFormat(locale, {
        timeStyle: timeStyle,
        hour12: is12HourClock,
    });

    return timeFormatter.format(date);
};

export const dateTimeToDateFormatter = (
    dateTime: string | Date,
    locale: string,
    dateStyle: DateTimeStyle = "short"
): string => {
    const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;

    const options: Intl.DateTimeFormatOptions = {
        dateStyle: dateStyle,
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
};

export const dateTimeFormatter = (
    dateTime: string | Date,
    locale: string,
    dateStyle: DateTimeStyle = "short",
    timeStyle: DateTimeStyle = "short",
    is12HourClock: boolean = false
  ): string => {
    const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
  
    const formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: dateStyle,
      timeStyle: timeStyle,
      hour12: is12HourClock,
    });
  
    return formatter.format(date);
};

export const dateTimeToDayFormatter = (
    dateTime: string | Date,
    locale: string,
): string => {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;

    const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'long'
    });

    const dayOfWeek = formatter.format(date);
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
};
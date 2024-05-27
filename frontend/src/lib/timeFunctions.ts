import { format, toZonedTime } from "date-fns-tz";
import { getLocales, getCalendars } from "expo-localization";

export function convertUTCToLocalDate(utcString?: string): string {
  if (!utcString) {
    return "";
  }

  if (!utcString.includes("Z")) {
    return utcString;
  }

  // Create a Date object from the UTC string
  const date = new Date(utcString);

  // Define options for toLocaleDateString to format the output
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  // get the localization (eg 'en-us')
  const { languageTag } = getLocales()[0];

  // Convert to local date string with specified format
  const localDateStr = date.toLocaleDateString(languageTag, options);

  // Remove the period from the short month format if present
  return localDateStr.replace(".", "");
}

export function convertUTCToTimeAndDate(utcString?: string): string {
  if (!utcString) {
    return "";
  }

  if (!utcString.includes("Z")) {
    return utcString;
  }

  // Create a Date object from the UTC string
  const date = new Date(utcString);

  // Get user's time zone the first calendar entry
  const { calendar, timeZone, uses24hourClock, firstWeekday } =
    getCalendars()[0];

  const userTimeZone = timeZone ?? "UTC"; // Provide a default value of 'UTC' if timeZone is null, this should never happen

  // Convert UTC date to the user's local time zone
  const zonedDate = toZonedTime(date, timeZone!);

  // Define the format string to include the time and date
  const formatString = "MMM d, h:mm a";

  // Format the date to the user's local time zone
  const localDateStr = format(zonedDate, formatString, {
    timeZone: userTimeZone,
  });

  // Get the time zone abbreviation
  const timeZoneAbbreviation = getTimeZoneAbbreviation(zonedDate, userTimeZone);

  // Combine the local date string with the time zone abbreviation
  return `${localDateStr} ${timeZoneAbbreviation}`;
}

//  Get the local time zone offset in minutes and convert it to hours and minutes
function getFormattedOffset(date: Date): string {
  const offsetMinutes = date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMinutesRemainder = Math.abs(offsetMinutes) % 60;
  const offsetSign = offsetMinutes > 0 ? "-" : "+";

  // Format the offset as +/-HH:mm
  return `${offsetSign}${String(offsetHours).padStart(2, "0")}:${String(
    offsetMinutesRemainder,
  ).padStart(2, "0")}`;
}

// Get the time zone abbreviation (eg MDT, CDT, etc)
function getTimeZoneAbbreviation(date: Date, timeZone: string): string {
  const formattedDate = format(date, "zzz", { timeZone });
  return formattedDate;
}

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

  // Convert to local date string with specified format
  const localDateStr = date.toLocaleDateString("en-US", options);

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

  // Define options for toLocaleDateString to format the output
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    month: "short",
    day: "numeric",
  };

  // Convert to local date string with specified format
  const localDateStr = date.toLocaleDateString("en-US", options);

  // Remove the period from the short month format if present
  return localDateStr.replace(".", "");
}

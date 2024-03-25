/**
 * Calculates the time difference between a start time and a target time in a user-friendly format.
 * If the target time has already passed, an empty string is returned.
 *
 * @param {Date} startTime - The time from which the difference is calculated.
 * @param {Date} [targetTime=new Date()] - The target time to compare with (defaults to the current time).
 * @returns {string} A user-friendly string representing the time difference.
 *
 * @example
 * const eventStartTime = new Date('2024-03-22T10:00:00');
 * const eventEndTime = new Date('2024-03-23T23:00:00')
 * const timeUntilEvent = calculateTimeDifference(eventStartTime);
 * console.log(timeUntilEvent); // Output: 1 day and 13 hours
 *
 */
export function calculateTimeDifference(
  startTime: Date,
  targetTime?: Date,
): string {
  const now = new Date();
  const targetTimeMs = targetTime?.getTime() || now.getTime(); // Use target time or current time
  const timeDiffMs = startTime.getTime() - targetTimeMs;

  // Handle negative time difference (target time has already passed)
  if (timeDiffMs <= 0) {
    return "";
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiffMs % (1000 * 60)) / 1000);

  // Build user-friendly time string
  let timeString = "";
  if (days > 0) {
    timeString += `${days} day${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    if (timeString.length > 0) {
      timeString += " and ";
    }
    timeString += `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    if (timeString.length > 0) {
      timeString += " and ";
    }
    timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
  if (timeString.length === 0 && seconds > 0) {
    timeString = `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return timeString;
}

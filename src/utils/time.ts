/**
 * Calculates the time in milliseconds until the next meaningful update for relative time display
 */
export function getNextUpdateTime(date: Date): number {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) {
    // Update every second if within a minute
    return 1000;
  } else if (diffSeconds < 3600) {
    // Update when the minute changes
    const secondsToNextMinute = 60 - (diffSeconds % 60);
    return secondsToNextMinute * 1000;
  } else if (diffSeconds < 86400) {
    // Update when the hour changes
    const secondsToNextHour = 3600 - (diffSeconds % 3600);
    return secondsToNextHour * 1000;
  } else if (diffSeconds < 2592000) {
    // Update when the day changes
    const secondsToNextDay = 86400 - (diffSeconds % 86400);
    return secondsToNextDay * 1000;
  } else if (diffSeconds < 31536000) {
    // Update when the month changes
    const secondsToNextMonth = 2592000 - (diffSeconds % 2592000);
    return secondsToNextMonth * 1000;
  } else {
    // Update when the year changes
    const secondsToNextYear = 31536000 - (diffSeconds % 31536000);
    return secondsToNextYear * 1000;
  }
}

/**
 * Formats a date into a human-readable relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return "seconds ago";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(seconds / 31536000);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

export function convertMsToTime(ms?: number): string {
  if (!ms || ms <= 0) return "00:00";

  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);

  const displayHours = hours > 0 ? `${hours}:` : '';
  const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${displayHours}${displayMinutes}:${displaySeconds}`;
}

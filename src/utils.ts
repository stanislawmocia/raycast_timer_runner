import { TimeUnit, TimeInput } from "./types";

export function convertToMilliseconds(timeInput: TimeInput): number {
  const { value, unit } = timeInput;

  switch (unit) {
    case TimeUnit.SECONDS:
      return value * 1000;
    case TimeUnit.MINUTES:
      return value * 60 * 1000;
    case TimeUnit.HOURS:
      return value * 60 * 60 * 1000;
    default:
      return 0;
  }
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

export function formatTimeRemaining(triggerAt: number): string {
  const now = Date.now();
  const remaining = triggerAt - now;

  if (remaining <= 0) {
    return "Executing...";
  }

  return formatDuration(remaining);
}

export function generateTimerId(): string {
  return `timer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

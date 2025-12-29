import { LocalStorage } from "@raycast/api";
import { Timer } from "./types";

const TIMERS_KEY = "active_timers";

export async function getActiveTimers(): Promise<Timer[]> {
  const timersJson = await LocalStorage.getItem<string>(TIMERS_KEY);
  if (!timersJson) {
    return [];
  }

  try {
    return JSON.parse(timersJson);
  } catch (error) {
    console.error("Failed to parse timers:", error);
    return [];
  }
}

export async function saveTimer(timer: Timer): Promise<void> {
  const timers = await getActiveTimers();
  timers.push(timer);
  await LocalStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
}

export async function updateTimer(timerId: string, updates: Partial<Timer>): Promise<void> {
  const timers = await getActiveTimers();
  const index = timers.findIndex((t) => t.id === timerId);

  if (index !== -1) {
    timers[index] = { ...timers[index], ...updates };
    await LocalStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  }
}

export async function deleteTimer(timerId: string): Promise<void> {
  const timers = await getActiveTimers();
  const filtered = timers.filter((t) => t.id !== timerId);
  await LocalStorage.setItem(TIMERS_KEY, JSON.stringify(filtered));
}

export async function cleanupExpiredTimers(): Promise<void> {
  const timers = await getActiveTimers();
  const now = Date.now();
  const active = timers.filter((t) => t.triggerAt > now || t.isActive);
  await LocalStorage.setItem(TIMERS_KEY, JSON.stringify(active));
}

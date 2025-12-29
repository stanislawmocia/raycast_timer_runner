import { LocalStorage } from "@raycast/api";
import { getActiveTimers, saveTimer, updateTimer, deleteTimer, cleanupExpiredTimers } from "../storage";
import { Timer, ActionType } from "../types";
import { generateTimerId } from "../utils";

describe("Storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTimer: Timer = {
    id: generateTimerId(),
    name: "Test Timer",
    duration: 60000,
    action: {
      type: ActionType.APPLICATION,
      value: "Google Chrome",
      displayName: "Google Chrome",
    },
    createdAt: Date.now(),
    triggerAt: Date.now() + 60000,
    isActive: true,
  };

  describe("getActiveTimers", () => {
    test("returns empty array when no timers exist", async () => {
      (LocalStorage.getItem as jest.Mock).mockResolvedValue(undefined);
      const timers = await getActiveTimers();
      expect(timers).toEqual([]);
    });

    test("returns parsed timers when they exist", async () => {
      const timersJson = JSON.stringify([mockTimer]);
      (LocalStorage.getItem as jest.Mock).mockResolvedValue(timersJson);

      const timers = await getActiveTimers();
      expect(timers).toHaveLength(1);
      expect(timers[0].name).toBe("Test Timer");
    });

    test("returns empty array when JSON is invalid", async () => {
      (LocalStorage.getItem as jest.Mock).mockResolvedValue("invalid json");
      const timers = await getActiveTimers();
      expect(timers).toEqual([]);
    });
  });

  describe("saveTimer", () => {
    test("adds new timer to storage", async () => {
      (LocalStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      await saveTimer(mockTimer);

      expect(LocalStorage.setItem).toHaveBeenCalledWith(
        "active_timers",
        expect.stringContaining("Test Timer")
      );
    });
  });

  describe("updateTimer", () => {
    test("updates existing timer", async () => {
      (LocalStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockTimer]));

      await updateTimer(mockTimer.id, { name: "Updated Timer" });

      expect(LocalStorage.setItem).toHaveBeenCalled();
      const savedData = (LocalStorage.setItem as jest.Mock).mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      expect(parsedData[0].name).toBe("Updated Timer");
    });
  });

  describe("deleteTimer", () => {
    test("removes timer from storage", async () => {
      (LocalStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([mockTimer]));

      await deleteTimer(mockTimer.id);

      const savedData = (LocalStorage.setItem as jest.Mock).mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      expect(parsedData).toHaveLength(0);
    });
  });

  describe("cleanupExpiredTimers", () => {
    test("removes expired inactive timers", async () => {
      const expiredTimer: Timer = {
        ...mockTimer,
        triggerAt: Date.now() - 10000,
        isActive: false,
      };

      (LocalStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockTimer, expiredTimer])
      );

      await cleanupExpiredTimers();

      const savedData = (LocalStorage.setItem as jest.Mock).mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      expect(parsedData).toHaveLength(1);
      expect(parsedData[0].id).toBe(mockTimer.id);
    });
  });
});

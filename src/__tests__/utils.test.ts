import { convertToMilliseconds, formatDuration, formatTimeRemaining, generateTimerId } from "../utils";
import { TimeUnit } from "../types";

describe("Utils", () => {
  describe("convertToMilliseconds", () => {
    test("converts seconds to milliseconds", () => {
      expect(convertToMilliseconds({ value: 10, unit: TimeUnit.SECONDS })).toBe(10000);
      expect(convertToMilliseconds({ value: 1, unit: TimeUnit.SECONDS })).toBe(1000);
    });

    test("converts minutes to milliseconds", () => {
      expect(convertToMilliseconds({ value: 1, unit: TimeUnit.MINUTES })).toBe(60000);
      expect(convertToMilliseconds({ value: 5, unit: TimeUnit.MINUTES })).toBe(300000);
    });

    test("converts hours to milliseconds", () => {
      expect(convertToMilliseconds({ value: 1, unit: TimeUnit.HOURS })).toBe(3600000);
      expect(convertToMilliseconds({ value: 2, unit: TimeUnit.HOURS })).toBe(7200000);
    });
  });

  describe("formatDuration", () => {
    test("formats seconds", () => {
      expect(formatDuration(10000)).toBe("10s");
      expect(formatDuration(45000)).toBe("45s");
    });

    test("formats minutes and seconds", () => {
      expect(formatDuration(90000)).toBe("1m 30s");
      expect(formatDuration(125000)).toBe("2m 5s");
    });

    test("formats hours and minutes", () => {
      expect(formatDuration(3600000)).toBe("1h 0m");
      expect(formatDuration(5400000)).toBe("1h 30m");
      expect(formatDuration(7325000)).toBe("2h 2m");
    });
  });

  describe("formatTimeRemaining", () => {
    test("shows remaining time", () => {
      const futureTime = Date.now() + 10000;
      const result = formatTimeRemaining(futureTime);
      expect(result).toMatch(/\d+s/);
    });

    test("shows 'Executing...' when time has passed", () => {
      const pastTime = Date.now() - 1000;
      expect(formatTimeRemaining(pastTime)).toBe("Executing...");
    });
  });

  describe("generateTimerId", () => {
    test("generates unique timer IDs", () => {
      const id1 = generateTimerId();
      const id2 = generateTimerId();

      expect(id1).toMatch(/^timer_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^timer_\d+_[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });
  });
});

import { SYSTEM_COMMANDS, getAllInstalledApplications } from "../actions";
import { SystemCommand } from "../types";
import { getApplications } from "@raycast/api";

describe("Actions", () => {
  describe("getAllInstalledApplications", () => {
    test("returns list of installed applications", async () => {
      const apps = await getAllInstalledApplications();
      expect(apps).toBeDefined();
      expect(Array.isArray(apps)).toBe(true);
      expect(apps.length).toBeGreaterThan(0);
    });

    test("applications have required properties", async () => {
      const apps = await getAllInstalledApplications();
      apps.forEach((app) => {
        expect(app).toHaveProperty("name");
        expect(app).toHaveProperty("bundleId");
        expect(app).toHaveProperty("path");
      });
    });
  });

  describe("SYSTEM_COMMANDS", () => {
    test("contains all required system commands", () => {
      const commandIds = SYSTEM_COMMANDS.map((cmd) => cmd.id);

      expect(commandIds).toContain(SystemCommand.LOCK_SCREEN);
      expect(commandIds).toContain(SystemCommand.SLEEP);
      expect(commandIds).toContain(SystemCommand.SHUTDOWN);
      expect(commandIds).toContain(SystemCommand.RESTART);
      expect(commandIds).toContain(SystemCommand.LOG_OUT);
      expect(commandIds).toContain(SystemCommand.VOLUME_UP);
      expect(commandIds).toContain(SystemCommand.VOLUME_DOWN);
      expect(commandIds).toContain(SystemCommand.VOLUME_MUTE);
    });

    test("each command has required properties", () => {
      SYSTEM_COMMANDS.forEach((cmd) => {
        expect(cmd).toHaveProperty("id");
        expect(cmd).toHaveProperty("name");
        expect(cmd).toHaveProperty("icon");

        expect(typeof cmd.id).toBe("string");
        expect(typeof cmd.name).toBe("string");
        expect(typeof cmd.icon).toBe("string");

        expect(cmd.name.length).toBeGreaterThan(0);
        expect(cmd.icon.length).toBeGreaterThan(0);
      });
    });

    test("has multiple system commands including new ones", () => {
      expect(SYSTEM_COMMANDS.length).toBeGreaterThan(5);
    });

    test("commands are grouped by category", () => {
      const categories = SYSTEM_COMMANDS.map((cmd) => (cmd as any).category);
      expect(categories).toContain("Power");
      expect(categories).toContain("Audio");
      expect(categories).toContain("Display");
      expect(categories).toContain("System");
    });
  });
});

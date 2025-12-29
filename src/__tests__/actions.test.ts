import { COMMON_APPLICATIONS, SYSTEM_COMMANDS } from "../actions";
import { SystemCommand } from "../types";

describe("Actions", () => {
  describe("COMMON_APPLICATIONS", () => {
    test("contains popular applications", () => {
      expect(COMMON_APPLICATIONS).toContain("Google Chrome");
      expect(COMMON_APPLICATIONS).toContain("Safari");
      expect(COMMON_APPLICATIONS).toContain("Visual Studio Code");
      expect(COMMON_APPLICATIONS).toContain("Spotify");
    });

    test("has multiple applications", () => {
      expect(COMMON_APPLICATIONS.length).toBeGreaterThan(10);
    });

    test("all entries are strings", () => {
      COMMON_APPLICATIONS.forEach((app) => {
        expect(typeof app).toBe("string");
        expect(app.length).toBeGreaterThan(0);
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

    test("has exactly 5 system commands", () => {
      expect(SYSTEM_COMMANDS).toHaveLength(5);
    });
  });
});

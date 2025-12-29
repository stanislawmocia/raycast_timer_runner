import { open, closeMainWindow, showHUD } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import { TimerAction, ActionType, SystemCommand } from "./types";

const execAsync = promisify(exec);

export async function executeAction(action: TimerAction): Promise<void> {
  try {
    if (action.type === ActionType.APPLICATION) {
      await executeApplication(action.value);
    } else if (action.type === ActionType.SYSTEM_COMMAND) {
      await executeSystemCommand(action.value as SystemCommand);
    }
  } catch (error) {
    console.error("Failed to execute action:", error);
    throw error;
  }
}

async function executeApplication(appName: string): Promise<void> {
  await closeMainWindow();
  await open(`/Applications/${appName}.app`);
  await showHUD(`Opened ${appName}`);
}

async function executeSystemCommand(command: SystemCommand): Promise<void> {
  await closeMainWindow();

  switch (command) {
    case SystemCommand.SHUTDOWN:
      await execAsync("osascript -e 'tell app \"System Events\" to shut down'");
      await showHUD("Shutting down...");
      break;

    case SystemCommand.RESTART:
      await execAsync("osascript -e 'tell app \"System Events\" to restart'");
      await showHUD("Restarting...");
      break;

    case SystemCommand.SLEEP:
      await execAsync("pmset sleepnow");
      await showHUD("Going to sleep...");
      break;

    case SystemCommand.LOCK_SCREEN:
      await execAsync("/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend");
      await showHUD("Locking screen...");
      break;

    case SystemCommand.LOG_OUT:
      await execAsync("osascript -e 'tell app \"System Events\" to log out'");
      await showHUD("Logging out...");
      break;

    default:
      throw new Error(`Unknown system command: ${command}`);
  }
}

export const COMMON_APPLICATIONS = [
  "Google Chrome",
  "Safari",
  "Firefox",
  "Visual Studio Code",
  "Spotify",
  "Slack",
  "Discord",
  "Notion",
  "Terminal",
  "iTerm",
  "Calendar",
  "Mail",
  "Messages",
  "FaceTime",
  "Zoom",
  "Microsoft Teams",
  "Microsoft Word",
  "Microsoft Excel",
  "Microsoft PowerPoint",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Figma",
  "Sketch",
];

export const SYSTEM_COMMANDS = [
  {
    id: SystemCommand.LOCK_SCREEN,
    name: "Lock Screen",
    icon: "🔒",
  },
  {
    id: SystemCommand.SLEEP,
    name: "Sleep",
    icon: "😴",
  },
  {
    id: SystemCommand.SHUTDOWN,
    name: "Shutdown",
    icon: "🔴",
  },
  {
    id: SystemCommand.RESTART,
    name: "Restart",
    icon: "🔄",
  },
  {
    id: SystemCommand.LOG_OUT,
    name: "Log Out",
    icon: "🚪",
  },
];

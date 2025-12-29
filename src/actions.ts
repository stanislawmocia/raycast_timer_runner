import {
  open,
  closeMainWindow,
  showHUD,
  getApplications,
  Application,
  launchCommand,
  LaunchType,
} from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import { TimerAction, ActionType, SystemCommand } from "./types";

const execAsync = promisify(exec);

export async function executeAction(action: TimerAction): Promise<void> {
  try {
    if (action.type === ActionType.APPLICATION) {
      await executeApplication(action.bundleId || action.value);
    } else if (action.type === ActionType.SYSTEM_COMMAND) {
      await executeSystemCommand(action.value as SystemCommand);
    } else if (action.type === ActionType.RAYCAST_COMMAND) {
      await executeRaycastCommand(action.value, action.extensionName);
    }
  } catch (error) {
    console.error("Failed to execute action:", error);
    throw error;
  }
}

async function executeApplication(bundleIdOrPath: string): Promise<void> {
  await closeMainWindow();

  // If it's a bundle ID, find and open the app
  if (bundleIdOrPath.includes(".")) {
    const apps = await getApplications();
    const app = apps.find((a) => a.bundleId === bundleIdOrPath);
    if (app) {
      await open(app.path);
      await showHUD(`Opened ${app.name}`);
      return;
    }
  }

  // Fallback to path-based opening
  await open(bundleIdOrPath);
  await showHUD(`Opened application`);
}

async function executeRaycastCommand(commandName: string, extensionName?: string): Promise<void> {
  await closeMainWindow();

  await launchCommand({
    name: commandName,
    type: LaunchType.UserInitiated,
    extensionName: extensionName,
  });

  await showHUD(`Launched command: ${commandName}`);
}

// Get all installed applications dynamically
export async function getAllInstalledApplications(): Promise<Application[]> {
  try {
    return await getApplications();
  } catch (error) {
    console.error("Failed to get applications:", error);
    return [];
  }
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

    case SystemCommand.VOLUME_UP:
      await execAsync("osascript -e 'set volume output volume (output volume of (get volume settings) + 10)'");
      await showHUD("Volume Up");
      break;

    case SystemCommand.VOLUME_DOWN:
      await execAsync("osascript -e 'set volume output volume (output volume of (get volume settings) - 10)'");
      await showHUD("Volume Down");
      break;

    case SystemCommand.VOLUME_MUTE:
      await execAsync("osascript -e 'set volume output muted (not (output muted of (get volume settings)))'");
      await showHUD("Toggle Mute");
      break;

    case SystemCommand.BRIGHTNESS_UP:
      await execAsync("osascript -e 'tell application \"System Events\" to key code 144'");
      await showHUD("Brightness Up");
      break;

    case SystemCommand.BRIGHTNESS_DOWN:
      await execAsync("osascript -e 'tell application \"System Events\" to key code 145'");
      await showHUD("Brightness Down");
      break;

    case SystemCommand.EMPTY_TRASH:
      await execAsync("osascript -e 'tell application \"Finder\" to empty trash'");
      await showHUD("Emptying trash...");
      break;

    case SystemCommand.SHOW_DESKTOP:
      await execAsync("osascript -e 'tell application \"System Events\" to key code 103 using {command down}'");
      await showHUD("Show Desktop");
      break;

    default:
      throw new Error(`Unknown system command: ${command}`);
  }
}

export const SYSTEM_COMMANDS = [
  {
    id: SystemCommand.LOCK_SCREEN,
    name: "Lock Screen",
    icon: "🔒",
    category: "Power",
  },
  {
    id: SystemCommand.SLEEP,
    name: "Sleep",
    icon: "😴",
    category: "Power",
  },
  {
    id: SystemCommand.SHUTDOWN,
    name: "Shutdown",
    icon: "🔴",
    category: "Power",
  },
  {
    id: SystemCommand.RESTART,
    name: "Restart",
    icon: "🔄",
    category: "Power",
  },
  {
    id: SystemCommand.LOG_OUT,
    name: "Log Out",
    icon: "🚪",
    category: "Power",
  },
  {
    id: SystemCommand.VOLUME_UP,
    name: "Volume Up",
    icon: "🔊",
    category: "Audio",
  },
  {
    id: SystemCommand.VOLUME_DOWN,
    name: "Volume Down",
    icon: "🔉",
    category: "Audio",
  },
  {
    id: SystemCommand.VOLUME_MUTE,
    name: "Mute/Unmute",
    icon: "🔇",
    category: "Audio",
  },
  {
    id: SystemCommand.BRIGHTNESS_UP,
    name: "Brightness Up",
    icon: "☀️",
    category: "Display",
  },
  {
    id: SystemCommand.BRIGHTNESS_DOWN,
    name: "Brightness Down",
    icon: "🌙",
    category: "Display",
  },
  {
    id: SystemCommand.EMPTY_TRASH,
    name: "Empty Trash",
    icon: "🗑️",
    category: "System",
  },
  {
    id: SystemCommand.SHOW_DESKTOP,
    name: "Show Desktop",
    icon: "🖥️",
    category: "System",
  },
];

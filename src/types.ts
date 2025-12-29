export enum TimeUnit {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
}

export enum ActionType {
  APPLICATION = "application",
  SYSTEM_COMMAND = "system_command",
  RAYCAST_COMMAND = "raycast_command",
}

export enum SystemCommand {
  SHUTDOWN = "shutdown",
  RESTART = "restart",
  SLEEP = "sleep",
  LOCK_SCREEN = "lock_screen",
  LOG_OUT = "log_out",
  VOLUME_UP = "volume_up",
  VOLUME_DOWN = "volume_down",
  VOLUME_MUTE = "volume_mute",
  BRIGHTNESS_UP = "brightness_up",
  BRIGHTNESS_DOWN = "brightness_down",
  EMPTY_TRASH = "empty_trash",
  SHOW_DESKTOP = "show_desktop",
}

export interface TimerAction {
  type: ActionType;
  value: string; // Application name, SystemCommand, or Raycast command name
  displayName: string;
  extensionName?: string; // For Raycast commands
  bundleId?: string; // For applications
}

export interface Timer {
  id: string;
  name: string;
  duration: number; // in milliseconds
  action: TimerAction;
  createdAt: number;
  triggerAt: number;
  isActive: boolean;
}

export interface TimeInput {
  value: number;
  unit: TimeUnit;
}

export enum TimeUnit {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
}

export enum ActionType {
  APPLICATION = "application",
  SYSTEM_COMMAND = "system_command",
}

export enum SystemCommand {
  SHUTDOWN = "shutdown",
  RESTART = "restart",
  SLEEP = "sleep",
  LOCK_SCREEN = "lock_screen",
  LOG_OUT = "log_out",
}

export interface TimerAction {
  type: ActionType;
  value: string; // Application name or SystemCommand
  displayName: string;
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

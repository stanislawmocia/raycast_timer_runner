import React, { useState, useEffect } from "react";
import {
  Form,
  ActionPanel,
  Action,
  showToast,
  Toast,
  popToRoot,
  LaunchProps,
  Application,
} from "@raycast/api";
import { TimeUnit, ActionType, SystemCommand, Timer, TimerAction } from "./types";
import { convertToMilliseconds, generateTimerId, formatDuration } from "./utils";
import { saveTimer } from "./storage";
import { executeAction, getAllInstalledApplications, SYSTEM_COMMANDS } from "./actions";

interface FormValues {
  timeValue: string;
  timeUnit: TimeUnit;
  actionType: ActionType;
  application: string;
  systemCommand: SystemCommand;
  raycastCommand: string;
  timerName: string;
}

export default function SetTimer(props: LaunchProps) {
  const [timeValue, setTimeValue] = useState<string>("10");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.MINUTES);
  const [actionType, setActionType] = useState<ActionType>(ActionType.APPLICATION);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      setIsLoadingApps(true);
      const apps = await getAllInstalledApplications();
      // Sort apps alphabetically by name
      apps.sort((a, b) => a.name.localeCompare(b.name));
      setApplications(apps);
      setIsLoadingApps(false);
    }

    loadApplications();
  }, []);

  async function handleSubmit(values: FormValues) {
    const timeVal = parseFloat(values.timeValue);

    if (isNaN(timeVal) || timeVal <= 0) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Invalid time value",
        message: "Please enter a positive number",
      });
      return;
    }

    const durationMs = convertToMilliseconds({
      value: timeVal,
      unit: values.timeUnit,
    });

    let action: TimerAction;

    if (values.actionType === ActionType.APPLICATION) {
      const selectedApp = applications.find((app) => app.bundleId === values.application);
      action = {
        type: ActionType.APPLICATION,
        value: selectedApp?.name || values.application,
        displayName: selectedApp?.name || values.application,
        bundleId: values.application,
      };
    } else if (values.actionType === ActionType.SYSTEM_COMMAND) {
      const cmd = SYSTEM_COMMANDS.find((c) => c.id === values.systemCommand);
      action = {
        type: ActionType.SYSTEM_COMMAND,
        value: values.systemCommand,
        displayName: cmd?.name || values.systemCommand,
      };
    } else {
      // Raycast command
      action = {
        type: ActionType.RAYCAST_COMMAND,
        value: values.raycastCommand,
        displayName: values.raycastCommand,
      };
    }

    const timer: Timer = {
      id: generateTimerId(),
      name: values.timerName || `Timer - ${action.displayName}`,
      duration: durationMs,
      action,
      createdAt: Date.now(),
      triggerAt: Date.now() + durationMs,
      isActive: true,
    };

    await saveTimer(timer);

    await showToast({
      style: Toast.Style.Success,
      title: "Timer Set",
      message: `${timer.name} will trigger in ${formatDuration(durationMs)}`,
    });

    // Schedule the timer execution
    setTimeout(async () => {
      try {
        await executeAction(timer.action);
        await showToast({
          style: Toast.Style.Success,
          title: "Timer Completed",
          message: `Executed: ${timer.action.displayName}`,
        });
      } catch (error) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Timer Failed",
          message: `Failed to execute: ${timer.action.displayName}`,
        });
      }
    }, durationMs);

    await popToRoot();
  }

  // Group system commands by category
  const groupedCommands = SYSTEM_COMMANDS.reduce((acc, cmd) => {
    const category = (cmd as any).category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cmd);
    return acc;
  }, {} as Record<string, typeof SYSTEM_COMMANDS>);

  return (
    <Form
      isLoading={isLoadingApps}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Set Timer" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Set a timer to automatically run an application, system command, or Raycast command" />

      <Form.TextField
        id="timerName"
        title="Timer Name (Optional)"
        placeholder="My Timer"
      />

      <Form.Separator />

      <Form.TextField
        id="timeValue"
        title="Time Value"
        placeholder="10"
        value={timeValue}
        onChange={setTimeValue}
      />

      <Form.Dropdown
        id="timeUnit"
        title="Time Unit"
        value={timeUnit}
        onChange={(newValue) => setTimeUnit(newValue as TimeUnit)}
      >
        <Form.Dropdown.Item value={TimeUnit.SECONDS} title="Seconds" />
        <Form.Dropdown.Item value={TimeUnit.MINUTES} title="Minutes" />
        <Form.Dropdown.Item value={TimeUnit.HOURS} title="Hours" />
      </Form.Dropdown>

      <Form.Separator />

      <Form.Dropdown
        id="actionType"
        title="Action Type"
        value={actionType}
        onChange={(newValue) => setActionType(newValue as ActionType)}
      >
        <Form.Dropdown.Item value={ActionType.APPLICATION} title="📱 Open Application" />
        <Form.Dropdown.Item value={ActionType.SYSTEM_COMMAND} title="⚙️ System Command" />
        <Form.Dropdown.Item value={ActionType.RAYCAST_COMMAND} title="⚡ Raycast Command" />
      </Form.Dropdown>

      {actionType === ActionType.APPLICATION && (
        <Form.Dropdown
          id="application"
          title="Application"
          placeholder="Select an application"
          storeValue
        >
          {applications.map((app) => (
            <Form.Dropdown.Item
              key={app.bundleId}
              value={app.bundleId || app.path}
              title={app.name}
              icon={{ fileIcon: app.path }}
            />
          ))}
        </Form.Dropdown>
      )}

      {actionType === ActionType.SYSTEM_COMMAND && (
        <Form.Dropdown
          id="systemCommand"
          title="System Command"
          placeholder="Select a system command"
        >
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <Form.Dropdown.Section key={category} title={category}>
              {commands.map((cmd) => (
                <Form.Dropdown.Item
                  key={cmd.id}
                  value={cmd.id}
                  title={`${cmd.icon} ${cmd.name}`}
                />
              ))}
            </Form.Dropdown.Section>
          ))}
        </Form.Dropdown>
      )}

      {actionType === ActionType.RAYCAST_COMMAND && (
        <>
          <Form.TextField
            id="raycastCommand"
            title="Raycast Command Name"
            placeholder="e.g., toggle-system-appearance"
            info="Enter the name of a Raycast command to execute"
          />
          <Form.Description text="💡 Tip: You can find command names in Raycast Extensions preferences" />
        </>
      )}
    </Form>
  );
}

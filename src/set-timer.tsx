import React, { useState } from "react";
import {
  Form,
  ActionPanel,
  Action,
  showToast,
  Toast,
  popToRoot,
  LaunchProps,
} from "@raycast/api";
import { TimeUnit, ActionType, SystemCommand, Timer, TimerAction } from "./types";
import { convertToMilliseconds, generateTimerId, formatDuration } from "./utils";
import { saveTimer } from "./storage";
import { executeAction, COMMON_APPLICATIONS, SYSTEM_COMMANDS } from "./actions";

interface FormValues {
  timeValue: string;
  timeUnit: TimeUnit;
  actionType: ActionType;
  application: string;
  systemCommand: SystemCommand;
  timerName: string;
}

export default function SetTimer(props: LaunchProps) {
  const [timeValue, setTimeValue] = useState<string>("10");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.MINUTES);
  const [actionType, setActionType] = useState<ActionType>(ActionType.APPLICATION);

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

    const action: TimerAction = {
      type: values.actionType,
      value:
        values.actionType === ActionType.APPLICATION
          ? values.application
          : values.systemCommand,
      displayName:
        values.actionType === ActionType.APPLICATION
          ? values.application
          : SYSTEM_COMMANDS.find((cmd) => cmd.id === values.systemCommand)?.name || values.systemCommand,
    };

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

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Set Timer" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Set a timer to automatically run an application or system command" />

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
        <Form.Dropdown.Item value={ActionType.APPLICATION} title="Open Application" />
        <Form.Dropdown.Item value={ActionType.SYSTEM_COMMAND} title="System Command" />
      </Form.Dropdown>

      {actionType === ActionType.APPLICATION && (
        <Form.Dropdown
          id="application"
          title="Application"
          placeholder="Select an application"
        >
          {COMMON_APPLICATIONS.map((app) => (
            <Form.Dropdown.Item key={app} value={app} title={app} />
          ))}
        </Form.Dropdown>
      )}

      {actionType === ActionType.SYSTEM_COMMAND && (
        <Form.Dropdown
          id="systemCommand"
          title="System Command"
          placeholder="Select a system command"
        >
          {SYSTEM_COMMANDS.map((cmd) => (
            <Form.Dropdown.Item
              key={cmd.id}
              value={cmd.id}
              title={`${cmd.icon} ${cmd.name}`}
            />
          ))}
        </Form.Dropdown>
      )}
    </Form>
  );
}

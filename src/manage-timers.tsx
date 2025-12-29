import React, { useEffect, useState } from "react";
import {
  List,
  ActionPanel,
  Action,
  showToast,
  Toast,
  confirmAlert,
  Alert,
  Icon,
  Color,
} from "@raycast/api";
import { Timer } from "./types";
import { getActiveTimers, deleteTimer, cleanupExpiredTimers } from "./storage";
import { formatTimeRemaining, formatDuration } from "./utils";

export default function ManageTimers() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadTimers() {
    setIsLoading(true);
    await cleanupExpiredTimers();
    const activeTimers = await getActiveTimers();
    setTimers(activeTimers.filter((t) => t.isActive));
    setIsLoading(false);
  }

  useEffect(() => {
    loadTimers();

    // Refresh timers every second to update time remaining
    const interval = setInterval(() => {
      loadTimers();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleDeleteTimer(timer: Timer) {
    const confirmed = await confirmAlert({
      title: "Cancel Timer",
      message: `Are you sure you want to cancel "${timer.name}"?`,
      primaryAction: {
        title: "Cancel Timer",
        style: Alert.ActionStyle.Destructive,
      },
    });

    if (confirmed) {
      await deleteTimer(timer.id);
      await showToast({
        style: Toast.Style.Success,
        title: "Timer Cancelled",
        message: timer.name,
      });
      await loadTimers();
    }
  }

  async function handleRefresh() {
    await showToast({
      style: Toast.Style.Animated,
      title: "Refreshing timers...",
    });
    await loadTimers();
    await showToast({
      style: Toast.Style.Success,
      title: "Timers refreshed",
    });
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search timers...">
      {timers.length === 0 ? (
        <List.EmptyView
          icon={Icon.Clock}
          title="No Active Timers"
          description="Create a timer using the 'Set Timer' command"
        />
      ) : (
        timers.map((timer) => {
          const timeRemaining = formatTimeRemaining(timer.triggerAt);
          const isExpired = Date.now() >= timer.triggerAt;

          return (
            <List.Item
              key={timer.id}
              icon={{
                source: Icon.Clock,
                tintColor: isExpired ? Color.Red : Color.Green,
              }}
              title={timer.name}
              subtitle={timer.action.displayName}
              accessories={[
                {
                  text: timeRemaining,
                  icon: isExpired ? Icon.ExclamationMark : Icon.Clock,
                },
                {
                  text: `Total: ${formatDuration(timer.duration)}`,
                },
              ]}
              actions={
                <ActionPanel>
                  <Action
                    title="Cancel Timer"
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    onAction={() => handleDeleteTimer(timer)}
                  />
                  <Action
                    title="Refresh"
                    icon={Icon.ArrowClockwise}
                    onAction={handleRefresh}
                    shortcut={{ modifiers: ["cmd"], key: "r" }}
                  />
                </ActionPanel>
              }
            />
          );
        })
      )}
    </List>
  );
}

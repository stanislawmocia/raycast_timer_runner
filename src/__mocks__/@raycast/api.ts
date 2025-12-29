export const LocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

export const showToast = jest.fn();

export const Toast = {
  Style: {
    Success: "success",
    Failure: "failure",
    Animated: "animated",
  },
};

export const showHUD = jest.fn();
export const open = jest.fn();
export const closeMainWindow = jest.fn();
export const popToRoot = jest.fn();
export const confirmAlert = jest.fn();

export const Alert = {
  ActionStyle: {
    Default: "default",
    Destructive: "destructive",
  },
};

export const Icon = {
  Clock: "clock",
  Trash: "trash",
  ArrowClockwise: "arrow-clockwise",
  ExclamationMark: "exclamation-mark",
};

export const Color = {
  Red: "red",
  Green: "green",
};

export const Form = {
  TextField: jest.fn(),
  Dropdown: jest.fn(),
  Description: jest.fn(),
  Separator: jest.fn(),
};

export const List = {
  Item: jest.fn(),
  EmptyView: jest.fn(),
};

export const ActionPanel = jest.fn();

export const Action = {
  SubmitForm: jest.fn(),
};

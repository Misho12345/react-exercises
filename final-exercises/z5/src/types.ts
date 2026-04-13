import { Dispatch } from "react";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  nextId: number;
}

export type TaskAction =
  | { type: "ADD_TASK"; title: string; priority: TaskPriority }
  | { type: "MOVE_TASK"; id: number }
  | { type: "DELETE_TASK"; id: number };

export interface TaskContextValue {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

export interface FilterState {
  searchQuery: string;
  priorityFilter: TaskPriority | "all";
}

export interface FilterContextValue extends FilterState {
  setSearch: (query: string) => void;
  setPriority: (priority: TaskPriority | "all") => void;
}

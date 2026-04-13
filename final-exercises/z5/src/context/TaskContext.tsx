import { ReactNode, createContext, useContext, useReducer } from "react";
import { TaskAction, TaskContextValue, TaskState, TaskStatus } from "../types";

const TaskContext = createContext<TaskContextValue | null>(null);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        nextId: state.nextId + 1,
        tasks: [
          ...state.tasks,
            {
              id: state.nextId,
              title: action.title,
              priority: action.priority,
              status: "todo",
              createdAt: new Date().toLocaleString("bg-BG")
            }
          ]
      };
    case "MOVE_TASK": {
      const flow: Record<Exclude<TaskStatus, "done">, TaskStatus> = {
        todo: "in-progress",
        "in-progress": "done"
      };

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, status: task.status === "done" ? task.status : flow[task.status] }
            : task
        )
      };
    }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id)
      };
    default:
      return state;
  }
}

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [], nextId: 1 });

  return <TaskContext.Provider value={{ tasks: state.tasks, dispatch }}>{children}</TaskContext.Provider>;
}

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext трябва да е в TaskProvider");
  }

  return context;
}

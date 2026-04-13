import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types";

type TaskCardProps = {
  task: Task;
};

const priorityClassNames = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high"
} as const;

export default function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useTaskContext();

  return (
    <article className="task-card">
      <h4>{task.title}</h4>
      <p>
        <span className={`priority-badge ${priorityClassNames[task.priority]}`}>{task.priority}</span>
      </p>
      <p>{task.createdAt}</p>
      {task.status !== "done" ? (
        <button type="button" onClick={() => dispatch({ type: "MOVE_TASK", id: task.id })}>
          Напред
        </button>
      ) : null}
      <button type="button" className="delete-button" onClick={() => dispatch({ type: "DELETE_TASK", id: task.id })}>
        Изтрий
      </button>
    </article>
  );
}

import { useFilterContext } from "../context/FilterContext";
import { useTaskContext } from "../context/TaskContext";
import { TaskStatus } from "../types";
import TaskCard from "./TaskCard";

type KanbanColumnProps = {
  status: TaskStatus;
  label: string;
};

export default function KanbanColumn({ status, label }: KanbanColumnProps) {
  const { tasks } = useTaskContext();
  const { searchQuery, priorityFilter } = useFilterContext();

  const filtered = tasks
    .filter((task) => task.status === status)
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((task) => priorityFilter === "all" || task.priority === priorityFilter);

  return (
    <section className="kanban-column">
      <h3>
        {label} ({filtered.length})
      </h3>
      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}

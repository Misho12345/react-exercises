import { useTaskContext } from "../context/TaskContext";

export default function Dashboard() {
  const { tasks } = useTaskContext();

  const todo = tasks.filter((task) => task.status === "todo").length;
  const inProgress = tasks.filter((task) => task.status === "in-progress").length;
  const done = tasks.filter((task) => task.status === "done").length;
  const high = tasks.filter((task) => task.priority === "high").length;
  const percentDone = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <div className="dashboard">
      <span>За правене: {todo}</span>
      <span>В прогрес: {inProgress}</span>
      <span>Готово: {done}</span>
      <span>Висок приоритет: {high}</span>
      <span>Завършени: {percentDone}%</span>
    </div>
  );
}

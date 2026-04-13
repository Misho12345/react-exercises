import FilterBar from "./components/FilterBar";
import Dashboard from "./components/Dashboard";
import KanbanColumn from "./components/KanbanColumn";
import TaskForm from "./components/TaskForm";
import { FilterProvider } from "./context/FilterContext";
import { TaskProvider } from "./context/TaskContext";
import "./styles.css";

export default function App() {
  return (
    <TaskProvider>
      <FilterProvider>
        <div className="App">
          <h1>Kanban Board</h1>
          <Dashboard />
          <TaskForm />
          <FilterBar />
          <div className="board">
            <KanbanColumn status="todo" label="За правене" />
            <KanbanColumn status="in-progress" label="В прогрес" />
            <KanbanColumn status="done" label="Готово" />
          </div>
        </div>
      </FilterProvider>
    </TaskProvider>
  );
}

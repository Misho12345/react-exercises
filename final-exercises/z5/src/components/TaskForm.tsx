import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { TaskPriority } from "../types";

export default function TaskForm() {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>("low");

  function handleAdd(): void {
    if (!title.trim()) {
      return;
    }

    dispatch({ type: "ADD_TASK", title: title.trim(), priority });
    setTitle("");
    setPriority("low");
  }

  return (
    <div className="toolbar-row">
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Заглавие на задача" />
      <select value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button type="button" onClick={handleAdd}>
        Добави
      </button>
    </div>
  );
}

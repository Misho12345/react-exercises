import { useFilterContext } from "../context/FilterContext";
import { TaskPriority } from "../types";

export default function FilterBar() {
  const { searchQuery, priorityFilter, setSearch, setPriority } = useFilterContext();

  return (
    <div className="toolbar-row">
      <input value={searchQuery} onChange={(event) => setSearch(event.target.value)} placeholder="Търси задача..." />
      <select value={priorityFilter} onChange={(event) => setPriority(event.target.value as TaskPriority | "all")}>
        <option value="all">all</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>
  );
}

import { useClassroom } from "../context/ClassroomContext";

export default function FilterBar() {
  const { classFilter, sortBy, dispatch } = useClassroom();

  return (
    <div className="toolbar">
      <select
        value={classFilter}
        onChange={(event) => dispatch({ type: "SET_FILTER", classFilter: event.target.value as "all" | "11А" | "11Б" })}
      >
        <option value="all">Всички класове</option>
        <option value="11А">11А</option>
        <option value="11Б">11Б</option>
      </select>

      <select value={sortBy} onChange={(event) => dispatch({ type: "SET_SORT", sortBy: event.target.value as "asc" | "desc" })}>
        <option value="desc">Среден успех ↓</option>
        <option value="asc">Среден успех ↑</option>
      </select>
    </div>
  );
}

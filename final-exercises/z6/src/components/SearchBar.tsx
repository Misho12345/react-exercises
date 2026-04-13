import { useClassroom } from "../context/ClassroomContext";

export default function SearchBar() {
  const { search, dispatch } = useClassroom();

  return (
    <input
      value={search}
      onChange={(event) => dispatch({ type: "SET_SEARCH", search: event.target.value })}
      placeholder="Търси по име..."
    />
  );
}

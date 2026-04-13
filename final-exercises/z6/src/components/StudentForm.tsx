import { FormEvent, useState } from "react";
import { useClassroom } from "../context/ClassroomContext";

export default function StudentForm() {
  const { dispatch } = useClassroom();
  const [name, setName] = useState<string>("");
  const [className, setClassName] = useState<"11А" | "11Б">("11А");
  const [error, setError] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!name.trim()) {
      setError("Името е задължително");
      return;
    }

    setError("");
    dispatch({ type: "ADD_STUDENT", name: name.trim(), className });
    setName("");
    setClassName("11А");
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h3>Добави ученик</h3>
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Име" />
      <select value={className} onChange={(event) => setClassName(event.target.value as "11А" | "11Б")}>
        <option value="11А">11А</option>
        <option value="11Б">11Б</option>
      </select>
      <button type="submit">Добави</button>
      {error ? <p className="error">{error}</p> : null}
    </form>
  );
}

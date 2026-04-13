import { FormEvent, useEffect, useState } from "react";
import { useClassroom } from "../context/ClassroomContext";

export default function GradeForm() {
  const { students, dispatch } = useClassroom();
  const [studentId, setStudentId] = useState<number | "">(students[0] ? students[0].id : "");
  const [subject, setSubject] = useState<string>("Математика");
  const [grade, setGrade] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (students.length > 0 && !students.some((student) => student.id === Number(studentId))) {
      setStudentId(students[0].id);
    }
  }, [studentId, students]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!studentId || Number(grade) < 2 || Number(grade) > 6) {
      setError("Оценката трябва да е между 2 и 6");
      return;
    }

    setError("");
    dispatch({ type: "ADD_GRADE", studentId, subject, grade: Number(grade) });
    setGrade("");
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h3>Добави оценка</h3>
      <select value={studentId} onChange={(event) => setStudentId(Number(event.target.value))}>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>

      <select value={subject} onChange={(event) => setSubject(event.target.value)}>
        <option value="Математика">Математика</option>
        <option value="Информатика">Информатика</option>
        <option value="Физика">Физика</option>
        <option value="Химия">Химия</option>
        <option value="Биология">Биология</option>
        <option value="Английски">Английски</option>
        <option value="История">История</option>
        <option value="География">География</option>
      </select>

      <input type="number" min="2" max="6" value={grade} onChange={(event) => setGrade(event.target.value)} placeholder="Оценка" />

      <button type="submit">Добави оценка</button>
      {error ? <p className="error">{error}</p> : null}
    </form>
  );
}

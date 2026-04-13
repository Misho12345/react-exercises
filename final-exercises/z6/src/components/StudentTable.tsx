import { Fragment, ReactNode } from "react";
import { useClassroom } from "../context/ClassroomContext";
import { getStudentAverage } from "../utils/students";

export default function StudentTable() {
  const { students, classFilter, search, sortBy, dispatch } = useClassroom();

  function getGradeClass(grade: number): string {
    if (grade >= 5.5) {
      return "good";
    }

    if (grade <= 3) {
      return "bad";
    }

    return "";
  }

  function renderGrades(gradesBySubject: Record<string, number[]>): ReactNode {
    return Object.entries(gradesBySubject).map(([subject, grades], subjectIndex) => (
      <Fragment key={subject}>
        {subjectIndex > 0 ? " | " : null}
        <span>{subject}: </span>
        {grades.map((grade, gradeIndex) => (
          <Fragment key={subject + gradeIndex}>
            {gradeIndex > 0 ? ", " : null}
            <span className={getGradeClass(grade)}>{grade}</span>
          </Fragment>
        ))}
      </Fragment>
    ));
  }

  const filtered = students
    .filter((student) => classFilter === "all" || student.class === classFilter)
    .filter((student) => student.name.toLowerCase().includes(search.toLowerCase()))
    .map((student) => ({ ...student, average: getStudentAverage(student) }))
    .sort((a, b) => (sortBy === "desc" ? b.average - a.average : a.average - b.average));

  if (filtered.length === 0) {
    return <div className="card">Няма намерени ученици</div>;
  }

  return (
    <>
      <div className="table-wrap card">
        <table className="student-table">
          <thead>
            <tr>
              <th>Ученик</th>
              <th>Клас</th>
              <th>Оценки</th>
              <th>Среден успех</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{renderGrades(student.grades)}</td>
                <td className={student.average >= 5.5 ? "good" : student.average <= 3 ? "bad" : ""}>
                  {student.average.toFixed(2)}
                </td>
                <td>
                  <button type="button" onClick={() => dispatch({ type: "REMOVE_STUDENT", id: student.id })}>
                    Премахни
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="student-list">
        {filtered.map((student) => (
          <article className="student-card" key={student.id}>
            <h3>{student.name}</h3>
            <p>Клас: {student.class}</p>
            <p>Оценки: {renderGrades(student.grades)}</p>
            <p className={student.average >= 5.5 ? "good" : student.average <= 3 ? "bad" : ""}>
              Среден успех: {student.average.toFixed(2)}
            </p>
            <button type="button" onClick={() => dispatch({ type: "REMOVE_STUDENT", id: student.id })}>
              Премахни
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

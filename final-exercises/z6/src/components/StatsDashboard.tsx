import { useClassroom } from "../context/ClassroomContext";
import { getStudentAverage } from "../utils/students";

export default function StatsDashboard() {
  const { students, classFilter } = useClassroom();

  const filtered = classFilter === "all" ? students : students.filter((student) => student.class === classFilter);
  const withAverages = filtered.map((student) => ({ ...student, average: getStudentAverage(student) }));
  const classAverage =
    withAverages.length > 0
      ? withAverages.reduce((sum, student) => sum + student.average, 0) / withAverages.length
      : 0;
  const bestStudent = [...withAverages].sort((a, b) => b.average - a.average)[0];
  const honors = withAverages.filter((student) => student.average >= 5.5).length;

  const students11A = students.filter((student) => student.class === "11А");
  const students11B = students.filter((student) => student.class === "11Б");

  const avg11A =
    students11A.length > 0
      ? students11A.reduce((sum, student) => sum + getStudentAverage(student), 0) / students11A.length
      : 0;
  const avg11B =
    students11B.length > 0
      ? students11B.reduce((sum, student) => sum + getStudentAverage(student), 0) / students11B.length
      : 0;

  return (
    <div className="grid">
      <div className="card">
        <h3>Общ среден успех</h3>
        <p>{classAverage.toFixed(2)}</p>
      </div>
      <div className="card">
        <h3>Най-добър ученик</h3>
        <p>{bestStudent ? bestStudent.name + " (" + bestStudent.average.toFixed(2) + ")" : "-"}</p>
      </div>
      <div className="card">
        <h3>Брой отличници</h3>
        <p>{honors}</p>
      </div>
      <div className="card">
        <h3>11А vs 11Б</h3>
        <p>11А: {avg11A.toFixed(2)}</p>
        <p>11Б: {avg11B.toFixed(2)}</p>
      </div>
    </div>
  );
}

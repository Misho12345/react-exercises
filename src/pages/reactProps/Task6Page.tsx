import { useState, useMemo } from "react";
import Layout from "../../components/Layout";
import { Card } from '../../components/Card';

interface Student {
  id: number;
  name: string;
  grade: string;
  scores: number[];
}

interface AddStudentFormProps {
  onAdd: (name: string, grade: string) => void;
}

function AddStudentForm({ onAdd }: AddStudentFormProps) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && grade) {
      onAdd(name, grade);
      setName("");
      setGrade("");
    }
  };

  return (
    <Card padding="20px" style={{ borderRadius: "8px", borderWidth: "1px" }}>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "var(--text-primary)" }}>Add New Student</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{
            flex: "0 0 100px",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        />
        <button type="submit" style={{
          padding: "10px 20px",
          backgroundColor: "var(--accent)",
          color: "#fff",
          borderRadius: "6px",
          fontWeight: 600,
        }}>
          Add Student
        </button>
        </div>
      </form>
    </Card>
  );
}

interface StudentRowProps {
  student: Student;
  onGrade: (id: number, score: number) => void;
  onDelete: (id: number) => void;
}

function StudentRow({ student, onGrade, onDelete }: StudentRowProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newScore, setNewScore] = useState("");

  const average = student.scores.length > 0
    ? student.scores.reduce((a, b) => a + b, 0) / student.scores.length
    : 0;

  const handleAddScore = () => {
    const score = parseFloat(newScore);
    if (score >= 2 && score <= 6) {
      onGrade(student.id, score);
      setNewScore("");
      setIsAdding(false);
    }
  };

  return (
    <Card
      padding="16px"
      style={{
        borderRadius: "8px",
        borderWidth: "1px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: "16px", color: "var(--text-primary)" }}>
            {student.name}
          </div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Grade: {student.grade} | Average: {average.toFixed(2)}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              padding: "6px 12px",
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Add Grade
          </button>
          <button
            onClick={() => onDelete(student.id)}
            style={{
              padding: "6px 12px",
              backgroundColor: "var(--danger)",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {student.scores.length > 0 && (
        <div style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: isAdding ? "12px" : 0,
        }}>
          {student.scores.map((score, idx) => (
            <span key={idx} style={{
              padding: "4px 10px",
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-primary)",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
            }}>
              {score.toFixed(2)}
            </span>
          ))}
        </div>
      )}

      {isAdding && (
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <input
            type="number"
            min="2"
            max="6"
            step="0.01"
            placeholder="2.00 - 6.00"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={handleAddScore}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: 600,
            }}
          >
            Submit
          </button>
          <button
            onClick={() => setIsAdding(false)}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-primary)",
              borderRadius: "6px",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </Card>
  );
}

interface ClassStatsProps {
  students: Student[];
}

function ClassStats({ students }: ClassStatsProps) {
  const allScores = students.flatMap(s => s.scores);
  const totalStudents = students.length;
  const averageScore = allScores.length > 0
    ? allScores.reduce((a, b) => a + b, 0) / allScores.length
    : 0;
  const highestScore = allScores.length > 0 ? Math.max(...allScores) : 0;
  const lowestScore = allScores.length > 0 ? Math.min(...allScores) : 0;

  return (
    <Card padding="20px" style={{ borderRadius: "8px", borderWidth: "1px" }}>
      <h3 style={{ marginTop: 0, marginBottom: "16px", color: "var(--text-primary)" }}>Class Statistics</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Total Students</div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)" }}>{totalStudents}</div>
        </div>
        <div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Average Score</div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)" }}>
            {averageScore.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Highest Score</div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--success)" }}>
            {highestScore > 0 ? highestScore.toFixed(2) : "—"}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Lowest Score</div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--danger)" }}>
            {lowestScore > 0 ? lowestScore.toFixed(2) : "—"}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Task6Page() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Ivan Petrov", grade: "11A", scores: [5.5, 6.0, 5.75] },
    { id: 2, name: "Maria Ivanova", grade: "11B", scores: [5.0, 5.25, 5.5] },
  ]);
  
  const addStudent = (name: string, grade: string) => {
    setStudents([...students, { id: Date.now(), name, grade, scores: [] }]);
  };

  const addGrade = (id: number, score: number) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, scores: [...s.scores, score] } : s
    ));
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const sortedStudents = useMemo(() => [...students].sort((a, b) => {
    const avgA = a.scores.length > 0 ? a.scores.reduce((x, y) => x + y, 0) / a.scores.length : 0;
    const avgB = b.scores.length > 0 ? b.scores.reduce((x, y) => x + y, 0) / b.scores.length : 0;
    return avgB - avgA;
  }), [students]);

  return (
    <Layout title="Task 6: Classroom" showBackButton>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <AddStudentForm onAdd={addStudent} />

          <ClassStats students={students} />

          <div>
            <h3 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>
              Students (sorted by average score)
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sortedStudents.length === 0 ? (
              <Card
                padding="32px"
                style={{
                  textAlign: "center",
                  color: "var(--text-secondary)",
                  borderRadius: "8px",
                }}
              >
                No students yet. Add one above!
              </Card>
              ) : (
                sortedStudents.map(s => (
                  <StudentRow
                    key={s.id}
                    student={s}
                    onGrade={addGrade}
                    onDelete={deleteStudent}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

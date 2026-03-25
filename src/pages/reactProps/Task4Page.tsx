import { useState } from "react";
import Layout from "../../components/Layout";
import { Card } from '../../components/Card';

interface Student {
  id: number;
  name: string;
  grade: string;
  email: string;
  score: number;
  subjects: string[];
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute",
        left: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "20px",
        color: "var(--text-tertiary)",
      }}>
        
      </div>
      <input
        type="text"
        placeholder="Search by name, grade, or subject..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "16px 16px 16px 48px",
          fontSize: "16px",
          borderRadius: "12px",
          border: "2px solid var(--border)",
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-primary)",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-light)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "6px",
            backgroundColor: "var(--bg-tertiary)",
            borderRadius: "6px",
            color: "var(--text-secondary)",
            fontSize: "14px",
          }}
        >
          
        </button>
      )}
    </div>
  );
}

interface StudentItemProps {
  student: Student;
  highlight?: string;
}

function StudentItem({ student, highlight }: StudentItemProps) {
  const highlightText = (text: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} style={{
          backgroundColor: "var(--warning-light)",
          color: "var(--warning)",
          padding: "2px 4px",
          borderRadius: "4px",
          fontWeight: 700,
        }}>
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Card
      padding="20px"
      className="hoverable"
      style={{
        borderRadius: "12px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: "20px",
        flexShrink: 0,
      }}>
        {student.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: "18px", color: "var(--text-primary)", marginBottom: "4px" }}>
          {highlightText(student.name)}
        </div>
        <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
          {student.email}
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{
            padding: "4px 10px",
            backgroundColor: "var(--bg-tertiary)",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}>
            {highlightText(student.grade)}
          </span>
          {student.subjects.map((subject, i) => (
            <span key={i} style={{
              padding: "4px 10px",
              backgroundColor: "var(--accent-light)",
              color: "var(--accent)",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
            }}>
              {highlightText(subject)}
            </span>
          ))}
        </div>
      </div>
      <div style={{
        padding: "8px 16px",
        borderRadius: "10px",
        backgroundColor: student.score >= 5.5 ? "var(--success-light)" : student.score >= 4.5 ? "var(--warning-light)" : "var(--danger-light)",
        color: student.score >= 5.5 ? "var(--success)" : student.score >= 4.5 ? "var(--warning)" : "var(--danger)",
        fontWeight: 700,
        fontSize: "20px",
      }}>
        {student.score.toFixed(2)}
      </div>
    </Card>
  );
}

const students: Student[] = [
    { id: 1, name: "Ivan", grade: "12A", email: "ivan@gmail.com", score: 5.94, subjects: ["Math", "Physics"] },
    { id: 2, name: "Martin", grade: "12A", email: "marti@gmail.com", score: 5.87, subjects: ["Math", "Chemistry"] },
    { id: 3, name: "Viktoriq", grade: "11B", email: "mimi@gmail.com", score: 5.45, subjects: ["Biology", "Chemistry"] },
    { id: 4, name: "Qsen", grade: "11C", email: "kradlivi.kracheta@gmail.com", score: 4.89, subjects: ["History", "Literature"] },
    { id: 5, name: "Georgi", grade: "10A", email: "go6o@gmail.com", score: 5.67, subjects: ["Math", "Art"] },
    { id: 6, name: "Dancho", grade: "10B", email: "danchi@gmail.com", score: 5.23, subjects: ["Physics", "CS"] },
    { id: 7, name: "Spasimir", grade: "12B", email: "rimisaps@gmail.com", score: 5.91, subjects: ["Math", "Biology"] },
    { id: 8, name: "Margarincho", grade: "11A", email: "maslo@gmail.com", score: 4.56, subjects: ["Music", "Art"] },
    { id: 9, name: "Stefan", grade: "10C", email: "stefan@gmail.com", score: 5.78, subjects: ["Literature", "History"] },
    { id: 10, name: "Lazar", grade: "12C", email: "lazer@gmail.com", score: 5.34, subjects: ["CS", "Physics"] },
  ];

export default function Task4Page() {
  const [query, setQuery] = useState("");

  

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.grade.toLowerCase().includes(query.toLowerCase()) ||
    s.subjects.some(sub => sub.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Layout title="Task 4: Filterable Student List" showBackButton>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <SearchInput value={query} onChange={setQuery} />
        </div>

        {filtered.length === 0 ? (
          <Card
            padding="64px 32px"
            style={{
              textAlign: "center",
              borderRadius: "16px",
              borderStyle: "dashed",
              borderWidth: "2px",
              borderColor: "var(--border)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}></div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
              No students found
            </div>
            <div style={{ color: "var(--text-secondary)" }}>
              Try searching for a different name, grade, or subject
            </div>
          </Card>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filtered.map(s => <StudentItem key={s.id} student={s} highlight={query} />)}
            </div>

            <Card
              padding="20px"
              style={{
                marginTop: "32px",
                borderRadius: "12px",
                borderWidth: "1px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Showing {filtered.length} of {students.length} students
              </div>
              {query && (
                <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Filtered by: <strong style={{ color: "var(--accent)" }}>"{query}"</strong>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}

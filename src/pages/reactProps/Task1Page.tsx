import Layout from "../../components/Layout";
import { Card } from '../../components/Card';

interface StudentCardProps {
  name: string;
  grade: string;
  averageScore: number;
}

function StudentCard({ name, grade, averageScore }: StudentCardProps) {
  const initials = name.split(" ").map(n => n[0]).join("");

  return (
    <Card
      padding="24px"
      className="hoverable"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "26px",
          flexShrink: 0,
          boxShadow: "var(--shadow-lg)",
        }}>
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 700,
            fontSize: "22px",
            marginBottom: "6px",
            color: "var(--text-primary)",
          }}>
            {name}
          </div>
          <div style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}>
            <span style={{
              padding: "4px 10px",
              backgroundColor: "var(--bg-tertiary)",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "14px",
            }}>
              Grade: {grade}
            </span>
            <span style={{ fontWeight: 700, fontSize: "18px", color: "var(--accent)" }}>
              {averageScore.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Task1Page() {
  return (
    <Layout title="Task 1: Student Card" showBackButton>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "24px" }}>
          <StudentCard
            name="Ivan Petrov"
            grade="12A"
            averageScore={5.94}
          />
          <StudentCard
            name="Alexandur Shestakov"
            grade="12A"
            averageScore={2.87}
          />
          <StudentCard
            name="Maria Ivanova"
            grade="11B"
            averageScore={5.45}
          />
          <StudentCard
            name="Dancho Danchov"
            grade="11C"
            averageScore={6.00}
          />
          <StudentCard
            name="Georgi Dimitrov"
            grade="10A"
            averageScore={6.00}
          />
          <StudentCard
            name="Emil Slivov"
            grade="10B"
            averageScore={5.23}
          />
        </div>
      </div>
    </Layout>
  );
}

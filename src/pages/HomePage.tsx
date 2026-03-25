import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Accordion, AccordionItemData } from "../components/Accordion";

const reactPropsExercises = [
  { id: 1, title: "Student Card" },
  { id: 2, title: "Status Badge" },
  { id: 3, title: "Accordion" },
  { id: 4, title: "Filterable Student List" },
  { id: 5, title: "Tabs System" },
  { id: 6, title: "Classroom" },
  { id: 7, title: "Quiz Builder" },
];

const stateManagementExercises = [
  { id: 1, title: "Counter with useReducer" },
  { id: 2, title: "Theme Toggle" },
  { id: 3, title: "Notification System" },
  { id: 4, title: "Shopping Cart" },
  { id: 5, title: "Multi-Context Dashboard" },
  { id: 6, title: "Todo App with Zustand" },
  { id: 7, title: "Mini E-commerce" },
];

function TaskList({ tasks, prefix }: { tasks: typeof reactPropsExercises, prefix: string }) {
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {tasks.map((t) => (
        <Link
          key={t.id}
          to={`/${prefix}/${t.id}`}
          style={{
            textDecoration: "none",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "20px",
            padding: "24px",
            borderRadius: "16px",
            border: "2px solid var(--border)",
            backgroundColor: "var(--bg-secondary)",
            boxShadow: "var(--shadow-sm)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)`,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "24px",
            flexShrink: 0,
            boxShadow: "var(--shadow-md)",
          }}>
            {t.id}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontWeight: 700,
              fontSize: "20px",
              color: "var(--text-primary)",
              marginBottom: "0",
            }}>
              {t.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout title="React Exercises">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: 800,
            marginBottom: "16px",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            React Exercises
          </h1>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "18px",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Nothing more
          </p>
        </div>

        <Accordion allowMultiple defaultOpenIndexes={[]}>
          <AccordionItemData title="React Props">
            <TaskList tasks={reactPropsExercises} prefix="react-props" />
          </AccordionItemData>

          <AccordionItemData title="Exercises 2 (State Management)">
            <TaskList tasks={stateManagementExercises} prefix="state-management" />
          </AccordionItemData>
        </Accordion>
      </div>
    </Layout>
  );
}

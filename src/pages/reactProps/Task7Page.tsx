import { useState } from "react";
import Layout from "../../components/Layout";
import { Card } from '../../components/Card';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  options: QuizOption[];
}

interface QuizHeaderProps {
  title: string;
  onChange: (title: string) => void;
  isPreview: boolean;
}

function QuizHeader({ title, onChange, isPreview }: QuizHeaderProps) {
  if (isPreview) {
    return (
      <h2 style={{ marginTop: 0, marginBottom: "24px", color: "var(--text-primary)", fontSize: "28px" }}>
        {title}
      </h2>
    );
  }

  return (
    <input
      type="text"
      value={title}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 16px",
        fontSize: "24px",
        fontWeight: 600,
        borderRadius: "8px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        marginBottom: "24px",
      }}
    />
  );
}

interface QuestionEditorProps {
  question: Question;
  onUpdate: (id: number, updated: Question) => void;
  onDelete: (id: number) => void;
}

function QuestionEditor({ question, onUpdate, onDelete }: QuestionEditorProps) {
  const updateText = (text: string) => {
    onUpdate(question.id, { ...question, text });
  };

  const addOption = () => {
    if (question.options.length < 6) {
      onUpdate(question.id, {
        ...question,
        options: [...question.options, { text: "", isCorrect: false }],
      });
    }
  };

  const updateOption = (index: number, text: string, isCorrect: boolean) => {
    const newOptions = [...question.options];
    newOptions[index] = { text, isCorrect };
    onUpdate(question.id, { ...question, options: newOptions });
  };

  const deleteOption = (index: number) => {
    onUpdate(question.id, {
      ...question,
      options: question.options.filter((_, i) => i !== index),
    });
  };

  return (
    <Card padding="20px" style={{ borderRadius: "8px", borderWidth: "1px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Question text"
          value={question.text}
          onChange={(e) => updateText(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 12px",
            fontSize: "16px",
            fontWeight: 600,
            borderRadius: "6px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
            marginRight: "12px",
          }}
        />
        <button
          onClick={() => onDelete(question.id)}
          style={{
            padding: "10px 16px",
            backgroundColor: "var(--danger)",
            color: "#fff",
            borderRadius: "6px",
            fontWeight: 600,
          }}
        >
          Delete Question
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
        {question.options.map((option, index) => (
          <div key={index} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => updateOption(index, e.target.value, option.isCorrect)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-primary)",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}>
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => updateOption(index, option.text, e.target.checked)}
                style={{ width: "18px", height: "18px" }}
              />
              Correct
            </label>
            <button
              onClick={() => deleteOption(index)}
              style={{
                padding: "8px 12px",
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--danger)",
                borderRadius: "6px",
                fontSize: "14px",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--danger)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "var(--danger)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                e.currentTarget.style.color = "var(--danger)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {question.options.length < 6 && (
        <button
          onClick={addOption}
          style={{
            padding: "8px 16px",
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Add Option
        </button>
      )}
    </Card>
  );
}

interface QuestionPreviewProps {
  question: Question;
}

function QuestionPreview({ question }: QuestionPreviewProps) {
  return (
    <Card padding="20px" style={{ borderRadius: "8px", borderWidth: "1px" }}>
      <div style={{
        fontSize: "18px",
        fontWeight: 600,
        marginBottom: "16px",
        color: "var(--text-primary)",
      }}>
        {question.text || "Untitled Question"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {question.options.map((option, index) => (
          <label key={index} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            backgroundColor: "var(--bg-tertiary)",
            borderRadius: "6px",
            cursor: "pointer",
            color: "var(--text-primary)",
          }}>
            <input type="checkbox" readOnly checked={false} style={{ width: "18px", height: "18px" }} />
            {option.text || `Option ${index + 1}`}
          </label>
        ))}
      </div>
    </Card>
  );
}

interface QuizStatsProps {
  questions: Question[];
}

function QuizStats({ questions }: QuizStatsProps) {
  const totalQuestions = questions.length;
  const totalOptions = questions.reduce((sum, q) => sum + q.options.length, 0);
  const questionsWithoutCorrect = questions.filter(q =>
    q.options.every(o => !o.isCorrect)
  ).length;

  return (
    <Card
      padding="16px 20px"
      style={{
        borderRadius: "8px",
        borderWidth: "1px",
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Questions</div>
        <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>{totalQuestions}</div>
      </div>
      <div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Total Options</div>
        <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>{totalOptions}</div>
      </div>
      <div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Without Correct Answer</div>
        <div style={{ fontSize: "20px", fontWeight: 700, color: questionsWithoutCorrect > 0 ? "var(--danger)" : "var(--success)" }}>
          {questionsWithoutCorrect}
        </div>
      </div>
    </Card>
  );
}

export default function Task7Page() {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState("New Quiz");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is React?",
      options: [
        { text: "A JavaScript library", isCorrect: true },
        { text: "A programming language", isCorrect: false },
        { text: "A database", isCorrect: false },
      ],
    },
  ]);
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: "", options: [{ text: "", isCorrect: false }] },
    ]);
  };

  const updateQuestion = (id: number, updated: Question) => {
    setQuestions(questions.map(q => (q.id === id ? updated : q)));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <Layout title="Task 7: Quiz Builder" showBackButton>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <button
            onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
        </div>

        <QuizHeader title={title} onChange={setTitle} isPreview={mode === "preview"} />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          {questions.map(q =>
            mode === "edit" ? (
              <QuestionEditor
                key={q.id}
                question={q}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
              />
            ) : (
              <QuestionPreview key={q.id} question={q} />
            )
          )}
        </div>

        {mode === "edit" && (
          <button
            onClick={addQuestion}
            style={{
              padding: "12px 24px",
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "24px",
            }}
          >
            New Question
          </button>
        )}

        <QuizStats questions={questions} />
      </div>
    </Layout>
  );
}

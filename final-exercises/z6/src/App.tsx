import { useEffect, useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import FilterBar from "./components/FilterBar";
import GradeForm from "./components/GradeForm";
import SearchBar from "./components/SearchBar";
import StatsDashboard from "./components/StatsDashboard";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { ClassroomProvider } from "./context/ClassroomContext";
import "./styles.css";

function ClassroomApp() {
  return (
    <div className="container">
      <h1>Виртуална класна стая</h1>
      <DarkModeToggle />
      <SearchBar />
      <FilterBar />
      <StatsDashboard />
      <div className="form-grid">
        <StudentForm />
        <GradeForm />
      </div>
      <StudentTable />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2000);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return <p className="loading">Зарежда се...</p>;
  }

  return (
    <ClassroomProvider>
      <ClassroomApp />
    </ClassroomProvider>
  );
}

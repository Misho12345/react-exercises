import { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import CourseList from "./components/CourseList";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import StatsBar from "./components/StatsBar";
import courses from "./data/courses";
import { CourseCategory, CourseLevel, SortBy } from "./types";
import "./styles.css";

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<CourseCategory | "all">("all");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [sortBy, setSortBy] = useState<SortBy>("rating");

  const filtered = courses
    .filter((course) => course.title.toLowerCase().includes(search.toLowerCase()))
    .filter((course) => category === "all" || course.category === category)
    .filter((course) => level === "all" || course.level === level)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const avgRating = filtered.length > 0 ? filtered.reduce((sum, course) => sum + course.rating, 0) / filtered.length : 0;
  const totalStudents = filtered.reduce((sum, course) => sum + course.students, 0);

  function clearFilters(): void {
    setCategory("all");
    setLevel("all");
  }

  return (
    <div className="App">
      <h1>Каталог с курсове</h1>
      <SearchBar value={search} onChange={setSearch} />
      <FilterPanel
        category={category}
        level={level}
        onCategoryChange={setCategory}
        onLevelChange={setLevel}
        onClear={clearFilters}
      />
      <SortControls sortBy={sortBy} onSortChange={setSortBy} />
      <StatsBar>
        <span>Курсове: {filtered.length}</span>
        <span>Среден рейтинг: {avgRating.toFixed(1)}</span>
        <span>Общо студенти: {totalStudents}</span>
      </StatsBar>
      <CourseList courses={filtered} />
    </div>
  );
}

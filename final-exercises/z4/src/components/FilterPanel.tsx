import { CourseCategory, CourseLevel } from "../types";

type FilterPanelProps = {
  category: CourseCategory | "all";
  level: CourseLevel | "all";
  onCategoryChange: (value: CourseCategory | "all") => void;
  onLevelChange: (value: CourseLevel | "all") => void;
  onClear: () => void;
};

export default function FilterPanel({
  category,
  level,
  onCategoryChange,
  onLevelChange,
  onClear
}: FilterPanelProps) {
  return (
    <div className="panel-row">
      <select value={category} onChange={(event) => onCategoryChange(event.target.value as CourseCategory | "all")}>
        <option value="all">Всички категории</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="DevOps">DevOps</option>
      </select>

      <select value={level} onChange={(event) => onLevelChange(event.target.value as CourseLevel | "all")}>
        <option value="all">Всички нива</option>
        <option value="Начинаещ">Начинаещ</option>
        <option value="Среден">Среден</option>
        <option value="Напреднал">Напреднал</option>
      </select>

      <button type="button" onClick={onClear}>
        Изчисти филтрите
      </button>
    </div>
  );
}

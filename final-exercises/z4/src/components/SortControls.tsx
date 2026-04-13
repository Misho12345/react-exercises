import { SortBy } from "../types";

type SortControlsProps = {
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
};

export default function SortControls({ sortBy, onSortChange }: SortControlsProps) {
  return (
    <div className="panel-row">
      <button type="button" className={sortBy === "rating" ? "active-sort" : ""} onClick={() => onSortChange("rating")}>
        Сортирай по рейтинг
      </button>
      <button
        type="button"
        className={sortBy === "students" ? "active-sort" : ""}
        onClick={() => onSortChange("students")}
      >
        Сортирай по студенти
      </button>
    </div>
  );
}

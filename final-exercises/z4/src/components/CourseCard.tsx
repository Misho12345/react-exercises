import { Course } from "../types";

type CourseCardProps = {
  course: Course;
};

const levelClasses = {
  Начинаещ: "level-beginner",
  Среден: "level-intermediate",
  Напреднал: "level-advanced"
} as const;

export default function CourseCard({ course }: CourseCardProps) {
  const roundedRating = Math.round(course.rating);

  return (
    <article className="course-card">
      <h3>{course.title}</h3>
      <p>Категория: {course.category}</p>
      <span className={`level-badge ${levelClasses[course.level]}`}>{course.level}</span>
      {course.rating >= 4.5 && <span className="top-rated">Top Rated</span>}
      <p>
        Рейтинг: {roundedRating >= 1 && <span>★</span>}
        {roundedRating >= 2 && <span>★</span>}
        {roundedRating >= 3 && <span>★</span>}
        {roundedRating >= 4 && <span>★</span>}
        {roundedRating >= 5 && <span>★</span>}
      </p>
      <p>{course.students} студенти</p>
    </article>
  );
}

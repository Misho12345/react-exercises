import { Course } from "../types";
import CourseCard from "./CourseCard";

type CourseListProps = {
  courses: Course[];
};

export default function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return <p>Няма намерени курсове</p>;
  }

  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

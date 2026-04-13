export type CourseCategory = "Frontend" | "Backend" | "DevOps";
export type CourseLevel = "Начинаещ" | "Среден" | "Напреднал";
export type SortBy = "rating" | "students";

export interface Course {
  id: number;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  rating: number;
  students: number;
}

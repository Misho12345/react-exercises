import { Course } from "../types";

const courses: Course[] = [
  { id: 1, title: "React Основи", category: "Frontend", level: "Начинаещ", rating: 4.8, students: 1200 },
  { id: 2, title: "Node.js API", category: "Backend", level: "Среден", rating: 4.5, students: 800 },
  { id: 3, title: "Docker & K8s", category: "DevOps", level: "Напреднал", rating: 4.9, students: 450 },
  { id: 4, title: "HTML и CSS", category: "Frontend", level: "Начинаещ", rating: 4.3, students: 1500 },
  { id: 5, title: "Express Практика", category: "Backend", level: "Среден", rating: 4.4, students: 600 },
  { id: 6, title: "CI/CD Основи", category: "DevOps", level: "Среден", rating: 4.6, students: 500 },
  { id: 7, title: "Напреднал JavaScript", category: "Frontend", level: "Напреднал", rating: 4.7, students: 950 },
  { id: 8, title: "MongoDB Бази Данни", category: "Backend", level: "Начинаещ", rating: 4.2, students: 700 }
];

export default courses;

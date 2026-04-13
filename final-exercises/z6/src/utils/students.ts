import { Student } from "../types";

export function getStudentAverage(student: Student): number {
  const allGrades: number[] = [];

  for (const subject in student.grades) {
    const grades = student.grades[subject];

    for (let index = 0; index < grades.length; index += 1) {
      allGrades.push(grades[index]);
    }
  }

  if (allGrades.length === 0) {
    return 0;
  }

  return allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length;
}

import { ClassroomState } from "../types";

const defaultData: ClassroomState = {
  students: [
    { id: 1, name: "Иван Петров", class: "11А", grades: { Математика: [5, 6, 4], Информатика: [6, 5] } },
    { id: 2, name: "Мария Иванова", class: "11Б", grades: { Математика: [6, 6], Физика: [5, 4] } },
    { id: 3, name: "Георги Димитров", class: "11А", grades: { Информатика: [6, 6], Английски: [5, 5] } },
    { id: 4, name: "Елена Стоянова", class: "11Б", grades: { Биология: [5, 5, 6], Химия: [4, 5] } },
    { id: 5, name: "Петър Георгиев", class: "11А", grades: { Математика: [3, 4], Физика: [4, 4] } },
    { id: 6, name: "Никол Иванова", class: "11Б", grades: { Информатика: [6, 5, 6], Математика: [5, 5] } },
    { id: 7, name: "Рая Пенева", class: "11А", grades: { Английски: [6, 6], История: [5, 6] } },
    { id: 8, name: "Борислав Тодоров", class: "11Б", grades: { География: [4, 5], Биология: [3, 4] } },
    { id: 9, name: "Анна Василева", class: "11А", grades: { Математика: [6, 5], Информатика: [6, 6] } },
    { id: 10, name: "Кристиян Илиев", class: "11Б", grades: { Физика: [2, 3], Химия: [3, 3] } }
  ],
  classFilter: "all",
  search: "",
  sortBy: "desc"
};

export default defaultData;

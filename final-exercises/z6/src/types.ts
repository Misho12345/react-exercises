import { Dispatch } from "react";

export interface Student {
  id: number;
  name: string;
  class: "11А" | "11Б";
  grades: Record<string, number[]>;
}

export interface ClassroomState {
  students: Student[];
  classFilter: "all" | "11А" | "11Б";
  search: string;
  sortBy: "asc" | "desc";
}

export type ClassroomAction =
  | { type: "ADD_STUDENT"; name: string; className: "11А" | "11Б" }
  | { type: "ADD_GRADE"; studentId: number | string; subject: string; grade: number | string }
  | { type: "REMOVE_STUDENT"; id: number }
  | { type: "SET_FILTER"; classFilter: "all" | "11А" | "11Б" }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SET_SORT"; sortBy: "asc" | "desc" };

export interface ClassroomContextValue extends ClassroomState {
  dispatch: Dispatch<ClassroomAction>;
}

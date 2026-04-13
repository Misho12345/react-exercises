import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import defaultData from "../data/defaultData";
import { ClassroomAction, ClassroomContextValue, ClassroomState } from "../types";

const ClassroomContext = createContext<ClassroomContextValue | null>(null);

function normalizeClassName(value: string): "11А" | "11Б" {
  return value === "11B" || value === "11Б" ? "11Б" : "11А";
}

function normalizeState(state: any): ClassroomState {
  return {
    ...state,
    classFilter:
      state.classFilter === "11A" || state.classFilter === "11А"
        ? "11А"
        : state.classFilter === "11B" || state.classFilter === "11Б"
          ? "11Б"
          : "all",
    students: state.students.map((student: any) => ({
      ...student,
      class: normalizeClassName(student.class)
    }))
  };
}

function classroomReducer(state: ClassroomState, action: ClassroomAction): ClassroomState {
  switch (action.type) {
    case "ADD_STUDENT":
      return {
        ...state,
        students: [
          ...state.students,
          {
            id: Date.now(),
            name: action.name,
            class: action.className,
            grades: {}
          }
        ]
      };
    case "ADD_GRADE":
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === Number(action.studentId)
            ? {
                ...student,
                grades: {
                  ...student.grades,
                  [action.subject]: [...(student.grades[action.subject] || []), Number(action.grade)]
                }
              }
            : student
        )
      };
    case "REMOVE_STUDENT":
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.id)
      };
    case "SET_FILTER":
      return {
        ...state,
        classFilter: action.classFilter
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.search
      };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.sortBy
      };
    default:
      return state;
  }
}

type ClassroomProviderProps = {
  children: ReactNode;
};

export function ClassroomProvider({ children }: ClassroomProviderProps) {
  const saved = localStorage.getItem("classroom");
  const initialState: ClassroomState = saved ? normalizeState(JSON.parse(saved) as ClassroomState) : defaultData;
  const [state, dispatch] = useReducer(classroomReducer, initialState);

  useEffect(() => {
    localStorage.setItem("classroom", JSON.stringify(state));
  }, [state]);

  return <ClassroomContext.Provider value={{ ...state, dispatch }}>{children}</ClassroomContext.Provider>;
}

export function useClassroom(): ClassroomContextValue {
  const context = useContext(ClassroomContext);

  if (!context) {
    throw new Error("useClassroom must be inside Provider");
  }

  return context;
}

import { ReactNode, createContext, useContext, useState } from "react";
import { FilterContextValue, FilterState, TaskPriority } from "../types";

const FilterContext = createContext<FilterContextValue | null>(null);

type FilterProviderProps = {
  children: ReactNode;
};

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<FilterState>({ searchQuery: "", priorityFilter: "all" });

  function setSearch(query: string): void {
    setFilters((previous) => ({ ...previous, searchQuery: query }));
  }

  function setPriority(priority: TaskPriority | "all"): void {
    setFilters((previous) => ({ ...previous, priorityFilter: priority }));
  }

  return <FilterContext.Provider value={{ ...filters, setSearch, setPriority }}>{children}</FilterContext.Provider>;
}

export function useFilterContext(): FilterContextValue {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilterContext трябва да е в FilterProvider");
  }

  return context;
}

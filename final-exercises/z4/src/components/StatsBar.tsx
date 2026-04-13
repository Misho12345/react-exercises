import { ReactNode } from "react";

type StatsBarProps = {
  children: ReactNode;
};

export default function StatsBar({ children }: StatsBarProps) {
  return <div className="stats-bar">{children}</div>;
}

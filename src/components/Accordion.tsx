import { useState, Children, isValidElement } from "react";
import type { ReactNode } from "react";

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  icon?: string;
}

export function AccordionItem({ title, children, isOpen, onToggle, icon }: AccordionItemProps) {
  return (
    <div style={{
      border: "2px solid var(--border)",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "var(--bg-secondary)",
      transition: "all 0.3s ease",
      boxShadow: isOpen ? "var(--shadow-lg)" : "var(--shadow-sm)",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "20px 24px",
          backgroundColor: isOpen ? "var(--bg-tertiary)" : "transparent",
          color: "var(--text-primary)",
          textAlign: "left",
          fontSize: "18px",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: isOpen ? "2px solid var(--border)" : "none",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = "var(--bg-hover)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {icon && <span style={{ fontSize: "24px" }}>{icon}</span>}
          <span>{title}</span>
        </div>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          backgroundColor: isOpen ? "var(--accent)" : "var(--bg-tertiary)",
          color: isOpen ? "#fff" : "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 700,
          transition: "all 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          ↓
        </div>
      </button>
      <div style={{
        maxHeight: isOpen ? "2000px" : "0",
        overflow: "hidden",
        transition: "max-height 0.3s ease",
      }}>
        <div style={{
          padding: "24px",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          fontSize: "15px",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
}

export function Accordion({ children, allowMultiple = false, defaultOpenIndexes = [0] }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndexes);

  const items = Children.toArray(children);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {items.map((child, index) => {
        if (isValidElement<{title: string, icon?: string, children: ReactNode}>(child)) {
          return (
            <AccordionItem
              key={index}
              title={child.props.title}
              icon={child.props.icon}
              isOpen={openIndexes.includes(index)}
              onToggle={() => toggleItem(index)}
            >
              {child.props.children}
            </AccordionItem>
          );
        }
        return null;
      })}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AccordionItemData(_props: { title: string; icon?: string; children: ReactNode }) {
  return null;
}

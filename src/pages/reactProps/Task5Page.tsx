import { useState, Children, isValidElement } from "react";
import type { ReactNode } from "react";
import Layout from "../../components/Layout";
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

interface TabProps {
  label: string;
  icon?: string;
  children: ReactNode;
}

function Tab({ children }: TabProps) {
  return <>{children}</>;
}

interface TabsProps {
  children: ReactNode;
}

function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = Children.toArray(children);

  return (
    <div>
      <div style={{
        display: "flex",
        gap: "4px",
        borderBottom: "2px solid var(--border)",
        marginBottom: "32px",
        overflowX: "auto",
      }}>
        {tabs.map((tab, index) => {
          if (isValidElement<TabProps>(tab)) {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  padding: "14px 24px",
                  fontSize: "15px",
                  fontWeight: 700,
                  backgroundColor: isActive ? "var(--accent-light)" : "transparent",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  borderBottom: isActive ? "3px solid var(--accent)" : "none",
                  marginBottom: "-2px",
                  transition: "all 0.2s ease",
                  borderRadius: "8px 8px 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                {tab.props.icon && <span style={{ fontSize: "18px" }}>{tab.props.icon}</span>}
                {tab.props.label}
              </button>
            );
          }
          return null;
        })}
      </div>

      <Card
        padding="32px"
        style={{
          minHeight: "300px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {tabs[activeIndex] && isValidElement<TabProps>(tabs[activeIndex])
          ? (tabs[activeIndex] as React.ReactElement<TabProps>).props.children
          : null}
      </Card>
    </div>
  );
}

export default function Task5Page() {
  return (
    <Layout title="Task 5: Tabs System" showBackButton>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Tabs>
          <Tab label="Profile" icon="">
            <div style={{ color: "var(--text-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "24px", fontSize: "24px" }}>Student Profile</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                <div style={{ padding: "16px", backgroundColor: "var(--bg-tertiary)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Full Name</div>
                  <div style={{ fontSize: "18px", fontWeight: 700 }}>Ivan Petrov</div>
                </div>
                <div style={{ padding: "16px", backgroundColor: "var(--bg-tertiary)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Grade</div>
                  <div style={{ fontSize: "18px", fontWeight: 700 }}>12A</div>
                </div>
                <div style={{ padding: "16px", backgroundColor: "var(--bg-tertiary)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Student ID</div>
                  <div style={{ fontSize: "18px", fontWeight: 700 }}>#1234567890</div>
                </div>
                <div style={{ padding: "16px", backgroundColor: "var(--bg-tertiary)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Email</div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>ivan.petrov@gmail.com</div>
                </div>
                <div style={{ padding: "16px", backgroundColor: "var(--bg-tertiary)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Phone</div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>+359 012 345 6789</div>
                </div>
                <div style={{ padding: "16px", backgroundColor: "var(--bg-tertiary)", borderRadius: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>Enrollment Date</div>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>September 2020</div>
                </div>
              </div>
            </div>
          </Tab>

          <Tab label="Grades" icon="">
            <div style={{ color: "var(--text-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "24px", fontSize: "24px" }}>Academic Performance</h3>
              <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
                {[
                  { subject: "Mathematics", score: 5.94, trend: "↑" },
                  { subject: "Physics", score: 5.87, trend: "↑" },
                  { subject: "Computer Science", score: 6.00, trend: "→" },
                  { subject: "Chemistry", score: 5.56, trend: "↓" },
                  { subject: "Literature", score: 5.45, trend: "↑" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    backgroundColor: "var(--bg-tertiary)",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                  }}>
                    <span style={{ fontWeight: 600, fontSize: "16px" }}>{item.subject}</span>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{item.trend}</span>
                      <span style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        backgroundColor: item.score >= 5.5 ? "var(--success-light)" : "var(--warning-light)",
                        color: item.score >= 5.5 ? "var(--success)" : "var(--warning)",
                      }}>
                        {item.score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                padding: "20px",
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
                color: "#fff",
                borderRadius: "12px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 700,
                boxShadow: "var(--shadow-lg)",
              }}>
                Overall Average: 5.76
              </div>
            </div>
          </Tab>

          <Tab label="Schedule" icon="">
            <div style={{ color: "var(--text-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "24px", fontSize: "24px" }}>Weekly Schedule</h3>
              <div style={{ display: "grid", gap: "16px" }}>
                {[
                  { day: "Monday", classes: ["Math 08:00", "Physics 09:30", "CS 11:00"] },
                  { day: "Tuesday", classes: ["Chemistry 08:00", "Literature 10:00"] },
                  { day: "Wednesday", classes: ["Math 08:00", "Physics Lab 10:00"] },
                  { day: "Thursday", classes: ["CS 09:00", "Chemistry 11:00", "PE 14:00"] },
                  { day: "Friday", classes: ["Literature 08:00", "Math 10:00"] },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "16px 20px",
                    backgroundColor: "var(--bg-tertiary)",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                  }}>
                    <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "12px", color: "var(--accent)" }}>
                      {item.day}
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {item.classes.map((cls, j) => (
                        <span key={j} style={{
                          padding: "6px 12px",
                          backgroundColor: "var(--bg-secondary)",
                          borderRadius: "6px",
                          fontSize: "14px",
                          color: "var(--text-secondary)",
                        }}>
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>

          <Tab label="Settings" icon="">
            <div style={{ color: "var(--text-primary)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "24px", fontSize: "24px" }}>Account Settings</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Button variant="primary">
                  <span></span> Change Password
                </Button>
                <Button variant="secondary">
                  <span></span> Update Email
                </Button>
                <Button variant="secondary">
                  <span></span> Notification Preferences
                </Button>
                <Button variant="secondary">
                  <span></span> Privacy Settings
                </Button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
}

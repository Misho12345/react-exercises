import Layout from "../../components/Layout";
import { Card } from '../../components/Card';

interface StatusBadgeProps {
  status: "online" | "away" | "busy" | "offline";
  label?: string;
}

function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    online: { color: "var(--success)", text: "Online", emoji: "" },
    away: { color: "var(--warning)", text: "Away", emoji: "" },
    busy: { color: "var(--danger)", text: "Busy", emoji: "" },
    offline: { color: "var(--text-tertiary)", text: "Offline", emoji: "" },
  };

  const config = statusConfig[status];
  const displayText = label ? `${label} - ${config.text}` : config.text;

  return (
    <Card
      padding="10px 16px"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        borderRadius: "12px",
        borderColor: config.color,
        fontSize: "15px",
        fontWeight: 600,
        position: "relative",
      }}
    >
      <div style={{ position: "relative", display: "flex" }}>
        <div style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: config.color,
        }} />
      </div>
      <span style={{ color: "var(--text-primary)" }}>{displayText}</span>
    </Card>
  );
}

export default function Task2Page() {
  return (
    <Layout title="Task 2: Status Badge" showBackButton>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          <div>
            <h3 style={{ marginBottom: "20px", color: "var(--text-primary)", fontSize: "22px" }}>
              Basic Status Indicators:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
              <StatusBadge status="online" />
              <StatusBadge status="away" />
              <StatusBadge status="busy" />
              <StatusBadge status="offline" />
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: "20px", color: "var(--text-primary)", fontSize: "22px" }}>
              With User Labels:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
              <StatusBadge status="online" label="Ivan" />
              <StatusBadge status="away" label="Alex" />
              <StatusBadge status="busy" label="Maria" />
              <StatusBadge status="offline" label="James" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

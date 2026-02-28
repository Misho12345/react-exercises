import { useState } from 'react'
import ExerciseFrame from './ExerciseFrame'

type PresenceStatus = 'online' | 'away' | 'offline'

interface StatusBadgeProps {
  status: PresenceStatus
  label?: string
}

function StatusBadge({ status, label }: StatusBadgeProps) {
  const text = status === 'online' ? 'Online' : status === 'away' ? 'Away' : 'Offline'
  const dotClass =
    status === 'online' ? 'status-online' : status === 'away' ? 'status-away' : 'status-offline'

  return (
    <span className="status-badge">
      <span className={`status-dot ${dotClass}`} />
      {label ? `${label} - ${text}` : text}
    </span>
  )
}

function Exercise2Page({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<PresenceStatus>('online')
  const [label, setLabel] = useState('Sasho')

  return (
    <ExerciseFrame title="Exercise 2 - Status Indicator" onBack={onBack}>
      <div className="status-row">
        <StatusBadge status="online" />
        <StatusBadge status="away" />
        <StatusBadge status="offline" />
      </div>

      <div className="controls-inline">
        <select
          className="control-select"
          value={status}
          onChange={(event) => setStatus(event.target.value as PresenceStatus)}
        >
          <option value="online">Online</option>
          <option value="away">Away</option>
          <option value="offline">Offline</option>
        </select>

        <input
          className="control-input"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Name"
        />
      </div>

      <StatusBadge status={status} label={label.trim() ? label : undefined} />
    </ExerciseFrame>
  )
}

export default Exercise2Page

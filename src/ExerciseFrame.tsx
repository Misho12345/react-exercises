import type { ReactNode } from 'react'

interface ExerciseFrameProps {
  title: string
  onBack: () => void
  children: ReactNode
}

function ExerciseFrame({ title, onBack, children }: ExerciseFrameProps) {
  return (
    <section className="exercise-frame">
      <button type="button" className="ui-button ghost" onClick={onBack}>
        Back
      </button>
      <div className="frame-header">
        <h2 className="frame-title">{title}</h2>
      </div>
      <div className="exercise-body">{children}</div>
    </section>
  )
}

export default ExerciseFrame

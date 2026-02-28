import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import ExerciseFrame from './ExerciseFrame'
import { calculateAverage, createEntityId, formatScore } from './utils'

interface ClassroomStudent {
  id: string
  name: string
  grade: string
  scores: number[]
}

type SortMode = 'none' | 'avg-desc' | 'avg-asc'

function AddStudentForm({ onAdd }: { onAdd: (student: { name: string; grade: string }) => void }) {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('11A')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanGrade = grade.trim().toUpperCase()

    if (!cleanName || !cleanGrade) {
      return
    }

    onAdd({ name: cleanName, grade: cleanGrade })
    setName('')
    setGrade('11A')
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3 className="section-title">Add student</h3>
      <div className="form-grid">
        <input
          className="control-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <input
          className="control-input"
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
          placeholder="Class"
        />
        <button type="submit" className="ui-button">
          Add
        </button>
      </div>
    </form>
  )
}

interface GradeModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  onSubmit: (score: number) => void
  children: ReactNode
}

function GradeModal({ isOpen, title, onClose, onSubmit, children }: GradeModalProps) {
  const [scoreInput, setScoreInput] = useState('5.00')
  const [error, setError] = useState('')

  const handleClose = () => {
    setScoreInput('5.00')
    setError('')
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setScoreInput('5.00')
        setError('')
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const score = Number.parseFloat(scoreInput)
    if (Number.isNaN(score) || score < 2 || score > 6) {
      setError('Score must be between 2.00 and 6.00.')
      return
    }

    setScoreInput('5.00')
    setError('')
    onSubmit(score)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <h4 className="modal-title">{title}</h4>
        <div className="modal-content">{children}</div>
        <form onSubmit={handleSubmit}>
          <input
            className="control-input"
            type="number"
            min={2}
            max={6}
            step={0.01}
            value={scoreInput}
            onChange={(event) => {
              setScoreInput(event.target.value)
              setError('')
            }}
          />

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="ui-button secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="ui-button">
              Save score
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface StudentRowProps {
  student: ClassroomStudent
  onGrade: (studentId: string, grade: number) => void
  onDelete: (studentId: string) => void
}

function StudentRow({ student, onGrade, onDelete }: StudentRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const average = calculateAverage(student.scores)

  return (
    <article className="student-row">
      <div className="student-row-main">
        <h4 className="student-row-title">{student.name}</h4>
        <p className="student-row-subtitle">
          Class {student.grade} | Average: {student.scores.length ? formatScore(average) : 'No grades'}
        </p>

        <div className="score-list">
          {student.scores.length > 0 ? (
            student.scores.map((score, index) => (
              <span className="score-chip" key={`${student.id}-${index}`}>
                {formatScore(score)}
              </span>
            ))
          ) : (
            <span className="empty-state">No scores yet.</span>
          )}
        </div>
      </div>

      <div className="student-row-actions">
        <button type="button" className="ui-button" onClick={() => setIsModalOpen(true)}>
          Assign score
        </button>
        <button type="button" className="ui-button danger" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </div>

      <GradeModal
        isOpen={isModalOpen}
        title={`Assign score to ${student.name}`}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(score) => {
          onGrade(student.id, score)
          setIsModalOpen(false)
        }}
      >
        <p>Enter a score from 2.00 to 6.00.</p>
      </GradeModal>
    </article>
  )
}

function ClassStats({ students }: { students: ClassroomStudent[] }) {
  const allScores = students.flatMap((student) => student.scores)
  const classAverage = calculateAverage(allScores)
  const highest = allScores.length > 0 ? Math.max(...allScores) : 0
  const lowest = allScores.length > 0 ? Math.min(...allScores) : 0

  return (
    <section className="stats-grid">
      <article className="stat-card">
        <p className="stat-label">Students</p>
        <p className="stat-value">{students.length}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Class average</p>
        <p className="stat-value">{allScores.length > 0 ? formatScore(classAverage) : 'N/A'}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Highest score</p>
        <p className="stat-value">{allScores.length > 0 ? formatScore(highest) : 'N/A'}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Lowest score</p>
        <p className="stat-value">{allScores.length > 0 ? formatScore(lowest) : 'N/A'}</p>
      </article>
    </section>
  )
}

function Classroom() {
  const [students, setStudents] = useState<ClassroomStudent[]>([
    { id: createEntityId('student'), name: 'Kalin Georgiev', grade: '11A', scores: [5.25, 5.8] },
    { id: createEntityId('student'), name: 'Ralitsa Koleva', grade: '11B', scores: [4.9, 5.1, 5.4] },
  ])
  const [sortMode, setSortMode] = useState<SortMode>('none')

  const sortedStudents = useMemo(() => {
    const next = [...students]

    if (sortMode === 'none') {
      return next
    }

    return next.sort((a, b) => {
      const first = calculateAverage(a.scores)
      const second = calculateAverage(b.scores)
      return sortMode === 'avg-asc' ? first - second : second - first
    })
  }, [students, sortMode])

  const handleAddStudent = (student: { name: string; grade: string }) => {
    setStudents((current) => [
      ...current,
      {
        id: createEntityId('student'),
        name: student.name,
        grade: student.grade,
        scores: [],
      },
    ])
  }

  const handleGradeStudent = (studentId: string, score: number) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === studentId ? { ...student, scores: [...student.scores, score] } : student,
      ),
    )
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents((current) => current.filter((student) => student.id !== studentId))
  }

  return (
    <section className="classroom">
      <AddStudentForm onAdd={handleAddStudent} />

      <div className="classroom-top">
        <h3 className="section-title">Students</h3>
        <select
          className="sort-select"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
        >
          <option value="none">Sort: default</option>
          <option value="avg-desc">Sort: highest average</option>
          <option value="avg-asc">Sort: lowest average</option>
        </select>
      </div>

      <div className="student-rows">
        {sortedStudents.length === 0 ? (
          <p className="empty-state">No students yet.</p>
        ) : (
          sortedStudents.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onGrade={handleGradeStudent}
              onDelete={handleDeleteStudent}
            />
          ))
        )}
      </div>

      <ClassStats students={students} />
    </section>
  )
}

function Exercise6Page({ onBack }: { onBack: () => void }) {
  return (
    <ExerciseFrame title="Exercise 6 - Mini Classroom" onBack={onBack}>
      <Classroom />
    </ExerciseFrame>
  )
}

export default Exercise6Page

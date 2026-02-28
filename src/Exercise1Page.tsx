import ExerciseFrame from './ExerciseFrame'
import { formatScore } from './utils'

interface StudentCardProps {
  name: string
  grade: string
  averageScore: number
}

function StudentCard({ name, grade, averageScore }: StudentCardProps) {
  const initials = name
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="student-card">
      <div className="student-avatar">{initials}</div>
      <div className="student-main">
        <h3 className="student-name">{name}</h3>
        <p className="student-meta">
          Class: {grade} | Average grade: {formatScore(averageScore)}
        </p>
      </div>
    </article>
  )
}

const students: StudentCardProps[] = [
  { name: 'Ivaylo Petrov', grade: '11B', averageScore: 5.67 },
  { name: 'Mariya Ivanova', grade: '11A', averageScore: 5.92 },
]

function Exercise1Page({ onBack }: { onBack: () => void }) {
  return (
    <ExerciseFrame title="Exercise 1 - Student Card" onBack={onBack}>
      <div className="student-card-grid">
        {students.map((student) => (
          <StudentCard
            key={`${student.name}-${student.grade}`}
            name={student.name}
            grade={student.grade}
            averageScore={student.averageScore}
          />
        ))}
      </div>
    </ExerciseFrame>
  )
}

export default Exercise1Page

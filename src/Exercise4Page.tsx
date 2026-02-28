import { useState } from 'react'
import ExerciseFrame from './ExerciseFrame'

interface DirectoryStudent {
  id: number
  name: string
  grade: string
}

function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      className="search-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by name"
    />
  )
}

function StudentItem({ student }: { student: DirectoryStudent }) {
  return (
    <li className="student-item">
      <div className="student-item-main">
        <strong className="student-item-name">{student.name}</strong>
        <span className="student-item-grade">Class {student.grade}</span>
      </div>
    </li>
  )
}

function StudentList({ students }: { students: DirectoryStudent[] }) {
  return (
    <ul className="student-list">
      {students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </ul>
  )
}

function FilterableStudentList() {
  const [query, setQuery] = useState('')

  const students: DirectoryStudent[] = [
    { id: 1, name: 'Ivaylo Petrov', grade: '11A' },
    { id: 2, name: 'Mariya Ivanova', grade: '11B' },
    { id: 3, name: 'Georgi Dimitrov', grade: '10A' },
    { id: 4, name: 'Tsvetelina Stoyanova', grade: '12C' },
    { id: 5, name: 'Nikolay Todorov', grade: '9B' },
  ]

  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="filter-layout">
      <SearchInput value={query} onChange={setQuery} />
      <p className="result-count">Matches: {filtered.length}</p>
      {filtered.length === 0 ? (
        <p className="no-results">No students found</p>
      ) : (
        <StudentList students={filtered} />
      )}
    </div>
  )
}

function Exercise4Page({ onBack }: { onBack: () => void }) {
  return (
    <ExerciseFrame title="Exercise 4 - Filterable Student List" onBack={onBack}>
      <FilterableStudentList />
    </ExerciseFrame>
  )
}

export default Exercise4Page

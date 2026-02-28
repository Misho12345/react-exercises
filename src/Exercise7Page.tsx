import { useState } from 'react'
import ExerciseFrame from './ExerciseFrame'
import { createEntityId } from './utils'

type QuizMode = 'edit' | 'preview'

interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndexes: number[]
}

interface QuizHeaderProps {
  title: string
  onChange: (value: string) => void
  isPreview: boolean
}

function QuizHeader({ title, onChange, isPreview }: QuizHeaderProps) {
  return (
    <header className="quiz-header">
      {isPreview ? (
        <h3 className="section-title">{title || 'Untitled quiz'}</h3>
      ) : (
        <input
          className="quiz-title-input"
          value={title}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Quiz title"
        />
      )}
    </header>
  )
}

interface QuestionEditorProps {
  question: QuizQuestion
  index: number
  totalQuestions: number
  onUpdate: (question: QuizQuestion) => void
  onDelete: (questionId: string) => void
  onMove: (questionId: string, direction: 'up' | 'down') => void
}

function QuestionEditor({
  question,
  index,
  totalQuestions,
  onUpdate,
  onDelete,
  onMove,
}: QuestionEditorProps) {
  const canAddOption = question.options.length < 6

  const updateQuestionText = (value: string) => {
    onUpdate({ ...question, text: value })
  }

  const addOption = () => {
    if (!canAddOption) {
      return
    }

    const optionLabel = `Option ${question.options.length + 1}`
    onUpdate({ ...question, options: [...question.options, optionLabel] })
  }

  const updateOptionText = (optionIndex: number, value: string) => {
    const nextOptions = question.options.map((option, indexInArray) =>
      indexInArray === optionIndex ? value : option,
    )

    onUpdate({ ...question, options: nextOptions })
  }

  const toggleCorrectOption = (optionIndex: number) => {
    const nextCorrectIndexes = question.correctIndexes.includes(optionIndex)
      ? question.correctIndexes.filter((indexInArray) => indexInArray !== optionIndex)
      : [...question.correctIndexes, optionIndex].sort((a, b) => a - b)

    onUpdate({ ...question, correctIndexes: nextCorrectIndexes })
  }

  const deleteOption = (optionIndex: number) => {
    const nextOptions = question.options.filter((_, indexInArray) => indexInArray !== optionIndex)
    const nextCorrectIndexes = question.correctIndexes
      .filter((indexInArray) => indexInArray !== optionIndex)
      .map((indexInArray) => (indexInArray > optionIndex ? indexInArray - 1 : indexInArray))

    onUpdate({ ...question, options: nextOptions, correctIndexes: nextCorrectIndexes })
  }

  return (
    <article className="question-editor">
      <div className="question-editor-top">
        <h4 className="question-label">Question {index + 1}</h4>

        <div className="move-buttons">
          <button
            type="button"
            className="ui-button secondary"
            onClick={() => onMove(question.id, 'up')}
            disabled={index === 0}
          >
            Up
          </button>
          <button
            type="button"
            className="ui-button secondary"
            onClick={() => onMove(question.id, 'down')}
            disabled={index === totalQuestions - 1}
          >
            Down
          </button>
          <button type="button" className="ui-button danger" onClick={() => onDelete(question.id)}>
            Delete question
          </button>
        </div>
      </div>

      <input
        className="question-title-input"
        value={question.text}
        onChange={(event) => updateQuestionText(event.target.value)}
        placeholder="Question text"
      />

      <div className="question-options">
        {question.options.length === 0 && <p className="empty-state">No answers yet.</p>}

        {question.options.map((option, optionIndex) => (
          <div className="option-row" key={`${question.id}-${optionIndex}`}>
            <input
              className="control-input"
              value={option}
              onChange={(event) => updateOptionText(optionIndex, event.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
            />

            <label className="check-label">
              <input
                type="checkbox"
                checked={question.correctIndexes.includes(optionIndex)}
                onChange={() => toggleCorrectOption(optionIndex)}
              />
              Correct
            </label>

            <button type="button" className="ui-button danger" onClick={() => deleteOption(optionIndex)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="question-editor-actions">
        <button type="button" className="ui-button" onClick={addOption} disabled={!canAddOption}>
          Add answer
        </button>

        {!canAddOption && <p className="result-count">Maximum of 6 options reached.</p>}
      </div>
    </article>
  )
}

function QuestionPreview({ question, index }: { question: QuizQuestion; index: number }) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  const toggleSelection = (optionIndex: number) => {
    setSelectedIndexes((current) =>
      current.includes(optionIndex)
        ? current.filter((selected) => selected !== optionIndex)
        : [...current, optionIndex],
    )
  }

  return (
    <article className="preview-question">
      <h4 className="question-label">
        {index + 1}. {question.text || 'Untitled question'}
      </h4>

      <div className="preview-options">
        {question.options.length === 0 ? (
          <p className="empty-state">No answers configured.</p>
        ) : (
          question.options.map((option, optionIndex) => (
            <label className="preview-option" key={`${question.id}-preview-${optionIndex}`}>
              <input
                type="checkbox"
                checked={selectedIndexes.includes(optionIndex)}
                onChange={() => toggleSelection(optionIndex)}
              />
              {option || `Option ${optionIndex + 1}`}
            </label>
          ))
        )}
      </div>
    </article>
  )
}

function QuizStats({ questions }: { questions: QuizQuestion[] }) {
  const totalOptions = questions.reduce((sum, question) => sum + question.options.length, 0)
  const noCorrectAnswer = questions.filter((question) => question.correctIndexes.length === 0).length

  return (
    <section className="stats-grid">
      <article className="stat-card">
        <p className="stat-label">Questions</p>
        <p className="stat-value">{questions.length}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Total answers</p>
        <p className="stat-value">{totalOptions}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Without correct answer</p>
        <p className="stat-value">{noCorrectAnswer}</p>
      </article>
    </section>
  )
}

function QuizBuilder() {
  const [mode, setMode] = useState<QuizMode>('edit')
  const [title, setTitle] = useState('New Quiz')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])

  const isPreview = mode === 'preview'

  const addQuestion = () => {
    setQuestions((current) => [
      ...current,
      {
        id: createEntityId('question'),
        text: `Question ${current.length + 1}`,
        options: ['Option 1', 'Option 2'],
        correctIndexes: [],
      },
    ])
  }

  const updateQuestion = (updatedQuestion: QuizQuestion) => {
    setQuestions((current) =>
      current.map((question) => (question.id === updatedQuestion.id ? updatedQuestion : question)),
    )
  }

  const deleteQuestion = (questionId: string) => {
    setQuestions((current) => current.filter((question) => question.id !== questionId))
  }

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    setQuestions((current) => {
      const index = current.findIndex((question) => question.id === questionId)
      if (index === -1) {
        return current
      }

      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= current.length) {
        return current
      }

      const next = [...current]
      ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
      return next
    })
  }

  return (
    <section className="quiz-builder">
      <div className="quiz-top">
        <button
          type="button"
          className="ui-button"
          onClick={() => setMode((current) => (current === 'edit' ? 'preview' : 'edit'))}
        >
          {isPreview ? 'Back to edit' : 'Preview'}
        </button>
      </div>

      <QuizHeader title={title} onChange={setTitle} isPreview={isPreview} />

      <div className="question-list">
        {questions.length === 0 ? (
          <p className="empty-state">No questions yet.</p>
        ) : (
          questions.map((question, index) =>
            isPreview ? (
              <QuestionPreview key={question.id} question={question} index={index} />
            ) : (
              <QuestionEditor
                key={question.id}
                question={question}
                index={index}
                totalQuestions={questions.length}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
                onMove={moveQuestion}
              />
            ),
          )
        )}
      </div>

      {!isPreview && (
        <button type="button" className="ui-button" onClick={addQuestion}>
          + New question
        </button>
      )}

      <QuizStats questions={questions} />
    </section>
  )
}

function Exercise7Page({ onBack }: { onBack: () => void }) {
  return (
    <ExerciseFrame title="Exercise 7 - Quiz Builder" onBack={onBack}>
      <QuizBuilder />
    </ExerciseFrame>
  )
}

export default Exercise7Page

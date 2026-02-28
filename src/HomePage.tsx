import { EXERCISES, type ExerciseRoute } from './routes'

interface HomePageProps {
  onOpen: (route: ExerciseRoute) => void
}

function HomePage({ onOpen }: HomePageProps) {
  return (
    <section className="home-page">
      <div className="home-grid">
        {EXERCISES.map((exercise) => (
          <article className="exercise-card" key={exercise.route}>
            <h3 className="exercise-title">{exercise.title}</h3>
            <button type="button" className="ui-button" onClick={() => onOpen(exercise.route)}>
              Open exercise
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage

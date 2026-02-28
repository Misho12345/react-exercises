import { useEffect, useState } from 'react'
import './App.css'
import Exercise1Page from './Exercise1Page'
import Exercise2Page from './Exercise2Page'
import Exercise3Page from './Exercise3Page'
import Exercise4Page from './Exercise4Page'
import Exercise5Page from './Exercise5Page'
import Exercise6Page from './Exercise6Page'
import Exercise7Page from './Exercise7Page'
import HomePage from './HomePage'
import { getRouteFromHash, toHash, type ExerciseRoute, type RouteKey } from './routes'

function ExerciseRouter({ route, onBack }: { route: ExerciseRoute; onBack: () => void }) {
  switch (route) {
    case 'exercise-1':
      return <Exercise1Page onBack={onBack} />
    case 'exercise-2':
      return <Exercise2Page onBack={onBack} />
    case 'exercise-3':
      return <Exercise3Page onBack={onBack} />
    case 'exercise-4':
      return <Exercise4Page onBack={onBack} />
    case 'exercise-5':
      return <Exercise5Page onBack={onBack} />
    case 'exercise-6':
      return <Exercise6Page onBack={onBack} />
    case 'exercise-7':
      return <Exercise7Page onBack={onBack} />
    default:
      return null
  }
}

function App() {
  const [route, setRoute] = useState<RouteKey>(() => getRouteFromHash(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)

    if (!window.location.hash) {
      window.location.hash = '/'
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const navigate = (nextRoute: RouteKey) => {
    window.location.hash = toHash(nextRoute)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1 className="brand-title">React exercises</h1>
      </header>

      <main className="page-panel">
        {route === 'home' ? (
          <HomePage onOpen={navigate} />
        ) : (
          <ExerciseRouter route={route} onBack={() => navigate('home')} />
        )}
      </main>
    </div>
  )
}

export default App

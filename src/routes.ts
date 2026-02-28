export type ExerciseRoute =
  | 'exercise-1'
  | 'exercise-2'
  | 'exercise-3'
  | 'exercise-4'
  | 'exercise-5'
  | 'exercise-6'
  | 'exercise-7'

export type RouteKey = 'home' | ExerciseRoute

export interface ExerciseLink {
  route: ExerciseRoute
  title: string
}

export const EXERCISES: ExerciseLink[] = [
  { route: 'exercise-1', title: '1. Student Card' },
  { route: 'exercise-2', title: '2. Status Indicator' },
  { route: 'exercise-3', title: '3. Accordion' },
  { route: 'exercise-4', title: '4. Filterable Student List' },
  { route: 'exercise-5', title: '5. Tabs' },
  { route: 'exercise-6', title: '6. Mini Classroom' },
  { route: 'exercise-7', title: '7. Quiz Builder' },
]

const routeSet = new Set<RouteKey>(['home', ...EXERCISES.map((exercise) => exercise.route)])

export function getRouteFromHash(hash: string): RouteKey {
  const normalized = hash.replace(/^#\/?/, '').replace(/\/+$/, '').trim()

  if (normalized.length === 0 || normalized === 'home') {
    return 'home'
  }

  if (routeSet.has(normalized as RouteKey)) {
    return normalized as RouteKey
  }

  return 'home'
}

export function toHash(route: RouteKey): string {
  return route === 'home' ? '/' : `/${route}`
}

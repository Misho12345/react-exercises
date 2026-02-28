export function createEntityId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 100_000)}`
}

export function formatScore(value: number): string {
  return value.toFixed(2)
}

export function calculateAverage(scores: number[]): number {
  if (scores.length === 0) {
    return 0
  }

  const total = scores.reduce((sum, score) => sum + score, 0)
  return total / scores.length
}

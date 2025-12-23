import { Score } from '../types'

export function toDeltas(scores: Score[]) {
	const povScore = scores[0] || 0

	return scores.map((n, i): Score => {
		if (i === 0) return 0
		if (n === null) return null

		return n - povScore
	})
}

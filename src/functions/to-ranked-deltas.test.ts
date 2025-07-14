import { expect, test } from 'vitest'
import { toRankedDeltas } from './to-ranked-deltas'

test('shared placements', () => {
	const deltas = toRankedDeltas([null, 300, 250, 300])
	const ranks = deltas.map(d => d.rankIndex)

	expect(ranks).toEqual([3, 0, 2, 0])
})

test('null placements', () => {
	const deltas = toRankedDeltas([null, null, null, null])
	const ranks = deltas.map(d => d.rankIndex)

	expect(ranks).toEqual([0, null, null, null])
})

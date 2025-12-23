import { RankedDelta, Score } from '../types'
import { toDeltas } from './to-deltas'

type SeatRankedDelta = RankedDelta & {
	seatIndex: number;
}

export function toRankedDeltas(scores: Score[]) {
	const deltaList = toDeltas(scores)
		.map((delta, seatIndex): SeatRankedDelta => ({ delta, seatIndex, rankIndex: null, }))

	const sortedList = deltaList.slice().sort((a, b) => {
		if (Object.is(a.delta, b.delta)) return a.seatIndex - b.seatIndex
		if (a.delta === null) return 1
		if (b.delta === null) return -1

		return b.delta - a.delta
	})

	let prevDelta = 999_999_999_999
	let prevRankIndex = 0

	for (const [rankIndex, { delta, seatIndex }] of sortedList.entries()) {
		if (delta === null) continue

		if (delta < prevDelta) {
			prevRankIndex = rankIndex
			prevDelta = delta

			deltaList[seatIndex].rankIndex = prevRankIndex
		} else {
			deltaList[seatIndex].rankIndex = prevRankIndex
		}
	}

	return deltaList.map(({ delta, rankIndex }): RankedDelta => ({ delta, rankIndex }))
}

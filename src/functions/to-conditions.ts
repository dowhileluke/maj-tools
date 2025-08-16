import { BASE_VALUE_LIST, BASE_VALUE_POINTS } from '../const'
import { Condition, PointComponents, ScoreState } from '../types'
import { toDeltas } from './to-deltas'

type TargetDelta = {
	delta: number;
	isDealer: boolean;
}

function compareByDelta(a: TargetDelta, b: TargetDelta) {
	return b.delta - a.delta
}

// tsumo vs dealer takes less effort
function asOyaDelta({ delta, isDealer }: TargetDelta) {
	return isDealer ? Math.ceil(delta * 4 / 6) : Math.ceil(delta * 4 / 5)
}

function compareByTsumoDelta(a: TargetDelta, b: TargetDelta) {
	return asOyaDelta(b) - asOyaDelta(a)
}

function isPreferable(existing: PointComponents | null, baseValue: number) {
	if (!existing) return true

	return baseValue < existing.baseValue
}

function toRonCondition(targetDelta: number, isDealer: boolean) {
	let minCondition: PointComponents | null = null

	for (const components of BASE_VALUE_LIST) {
		const { fu, baseValue } = components

		if (fu === 20 || fu === 60 || fu > 70) continue // exclude pinfu+tsumo and large fu

		const { koRon, oyaRon } = BASE_VALUE_POINTS[baseValue]
		const ronValue = isDealer ? oyaRon : koRon

		if (ronValue > targetDelta && isPreferable(minCondition, baseValue)) {
			minCondition = components
		}
	}

	return minCondition
}

function toTsumoCondition(targetDelta: number, isPovDealer: boolean, isTargetDealer: boolean) {
	let minCondition: PointComponents | null = null

	for (const components of BASE_VALUE_LIST) {
		const { fu, baseValue } = components

		if (fu > 50) continue // exclude large fu

		const { oyaGainsByTsumo, koGainsVsOyaByTsumo, koGainsVsKoByTsumo } = BASE_VALUE_POINTS[baseValue]
		const tsumoGains = isPovDealer ? oyaGainsByTsumo : (
			isTargetDealer ? koGainsVsOyaByTsumo : koGainsVsKoByTsumo
		)

		if (tsumoGains > targetDelta && isPreferable(minCondition, baseValue)) {
			minCondition = components
		}
	}

	return minCondition
}

function dedupe(list: Array<PointComponents | null>) {
	const result: Array<PointComponents | null> = []
	let prev: PointComponents | null = null

	for (const item of list) {
		if (!prev || !item || (prev.baseValue > item.baseValue)) {
			prev = item

			result.push(item)
		} else {
			result.push(null)
		}
	}

	return result
}

export function toConditions({ scores, dealerIndex, repeatCount, leftoverCount }: ScoreState) {
	const isPovDealer = dealerIndex === 0
	const deltaList = toDeltas(scores)
	const targets: TargetDelta[] = []

	for (const [index, delta] of deltaList.entries()) {
		if (delta !== null && delta > 0) {
			targets.push({ delta, isDealer: index === dealerIndex, })
		}
	}

	targets.sort(compareByDelta)

	const potByRon = 300 * repeatCount + 1000 * leftoverCount
	const potByTsumo = 400 * repeatCount + 1000 * leftoverCount

	const simpleRonConditions = targets.map(({ delta }) => toRonCondition(delta - potByRon, isPovDealer))

	// direct hit on target[i] must also exceed the next target's delta
	const directDeltas = targets.map(({ delta }, i) => {
		const halfDelta = Math.ceil(delta / 2)
		const nextDelta = targets[i + 1]?.delta ?? 0

		return Math.max(halfDelta, nextDelta)
	})

	const directRonConditions = directDeltas.map((delta => toRonCondition(delta - potByRon, isPovDealer)))
	const tsumoTargets = isPovDealer ? targets : targets.slice().sort(compareByTsumoDelta)
	const tsumoConditions = tsumoTargets.map(({ delta, isDealer }) => toTsumoCondition(delta - potByTsumo, isPovDealer, isDealer))

	const simpled = dedupe(simpleRonConditions)
	const directed = dedupe(directRonConditions)
	const tsumod = dedupe(tsumoConditions)

	const positionalConditions = simpled.map((simpleRon, i) => {
		let directRon = directed[i]
		const tsumo = tsumod[i]

		if (!simpleRon && !directRon && !tsumo) return null

		// ignore directRon if simpleRon is easier
		if (simpleRon && directRon && simpleRon.baseValue <= directRon.baseValue) {
			directRon = null
		}

		const result: Condition = {
			simpleRon,
			directRon,
			tsumo,
		}

		return result
	})

	return positionalConditions
}

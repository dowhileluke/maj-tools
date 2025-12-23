import { generateArray } from '@dowhileluke/fns'
import { LimitHand, PointCalculation, PointComponents } from './types'
import { toPointCalculation } from './functions/to-point-calculation'

export const BG_HEX_CODE = '#262626'
export const RANK_LABELS = ['1st', '2nd', '3rd', '4th'] as const

export const HAN_LIST = generateArray(1, 4)
export const FU_LIST = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]
export const MAX_INDEX = FU_LIST.length - 3

export const LIMIT_HANDS: LimitHand[] = [
	{ name: 'Mangan', han: 5, hanLabel: '5', baseValue: 2000, },
	{ name: 'Haneman', han: 6, hanLabel: '6-7', baseValue: 3000, },
	{ name: 'Baiman', han: 8, hanLabel: '8-10', baseValue: 4000, },
	{ name: 'Sanbaiman', han: 11, hanLabel: '11+', baseValue: 6000, },
	{ name: 'Yakuman', han: 13, hanLabel: 'Y', baseValue: 8000, },
]
export const KIRIAGE_BASE_VALUE = 1920
export const MANGAN_BASE_VALUE = LIMIT_HANDS[0].baseValue

export const BASE_VALUE_LIST: PointComponents[] = []
export const BASE_VALUE_LOOKUP: Record<string, number> = {}
export const BASE_VALUE_POINTS: Record<number, PointCalculation> = {}

for (const han of HAN_LIST) {
	for (const fu of FU_LIST) {
		// pinfu+tsumo and chiitoi > 1 han
		if (han === 1 && fu < 30) continue

		const key = `${han}h${fu}`
		const baseValue = Math.min(4 * fu * (2 ** han), MANGAN_BASE_VALUE)

		BASE_VALUE_LIST.push({ key, han, fu, baseValue, })
		BASE_VALUE_LOOKUP[key] = baseValue

		if (!BASE_VALUE_POINTS[baseValue]) {
			BASE_VALUE_POINTS[baseValue] = toPointCalculation(baseValue)
		}

		if (baseValue === MANGAN_BASE_VALUE) break
	}
}

for (const { han, hanLabel, baseValue } of LIMIT_HANDS) {
	if (baseValue > MANGAN_BASE_VALUE) {

		const key = hanLabel === 'Y' ? 'Y' : `${han}h`

		BASE_VALUE_LIST.push({ key, han, fu: 0, baseValue, })
		BASE_VALUE_LOOKUP[key] = baseValue
		BASE_VALUE_POINTS[baseValue] = toPointCalculation(baseValue)
	}
}

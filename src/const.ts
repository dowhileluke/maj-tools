import { generateArray } from '@dowhileluke/fns'
import { LimitHand } from './types'

export const HAN_LIST = generateArray(1, 4)
export const FU_LIST = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]
export const MAX_INDEX = FU_LIST.length - 3

export const LIMIT_HANDS: LimitHand[] = [
	{ name: 'Mangan', han: '5', baseValue: 2000, },
	{ name: 'Haneman', han: '6-7', baseValue: 3000, },
	{ name: 'Baiman', han: '8-10', baseValue: 4000, },
	{ name: 'Sanbaiman', han: '11+', baseValue: 6000, },
	{ name: 'Yakuman', han: 'Y', baseValue: 8000, },
]
export const KIRIAGE_BASE_VALUE = 1920
export const MANGAN_BASE_VALUE = LIMIT_HANDS[0].baseValue

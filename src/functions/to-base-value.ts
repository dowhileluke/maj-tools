import { MANGAN_BASE_VALUE } from '../const'

export function toBaseValue(han: number, fu: number) {
	if (han > 4) return null

	// pinfu+tsumo and chiitoi > 1 han
	if (han === 1 && fu < 30) return null

	const value = 4 * fu * (2 ** han)

	if (value > MANGAN_BASE_VALUE) return null

	return value
}

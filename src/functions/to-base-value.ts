export function toBaseValue(han: number, fu: number) {
	// pinfu+tsumo and chiitoi > 1 han
	if (han === 1 && fu < 30) return 0

	const value = 4 * fu * (2 ** han)

	return value
}

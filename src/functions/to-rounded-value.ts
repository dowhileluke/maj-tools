/** round n to the nearest 100 */
export function toRoundedValue(n: number) {
	const remainder = n % 100

	if (remainder > 0) {
		return n - remainder + 100
	}

	return n
}

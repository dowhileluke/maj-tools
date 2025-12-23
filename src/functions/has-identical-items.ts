export function hasIdenticalItems<T>(list: T[]) {
	if (list.length < 2) return true

	const first = list[0]

	return list.slice(1).every(item => Object.is(first, item))
}

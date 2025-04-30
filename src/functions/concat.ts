import { Falsy, truthy } from '@dowhileluke/fns'

export function concat(...classNames: Array<string | Falsy>) {
	return truthy(classNames).join(' ')
}

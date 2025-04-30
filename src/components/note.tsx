import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

const noteStyles = 'text-xs leading-none italic opacity-60'

export function Note({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span className={concat(noteStyles, className)} {...props} />
	)
}

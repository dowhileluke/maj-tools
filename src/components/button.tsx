import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

const buttonStyle = ''

export function Button({ className, ...props }: ComponentProps<'button'>) {
	return (
		<button type="button" className={concat(buttonStyle, className)} {...props} />
	)
}

import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

const buttonStyle = 'flex-center cursor-pointer active:opacity-80 disabled:opacity-50'

export function Button({ className, ...props }: ComponentProps<'button'>) {
	return (
		<button type="button" className={concat(buttonStyle, className)} {...props} />
	)
}

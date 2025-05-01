import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

const buttonStyle = 'flex justify-center items-center cursor-pointer active:opacity-80 disabled:opacity-50'

export function Button({ className, ...props }: ComponentProps<'button'>) {
	return (
		<button type="button" className={concat(buttonStyle, className)} {...props} />
	)
}

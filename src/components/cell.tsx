import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

type CellProps = ComponentProps<'div'> & {
	short?: boolean;
	bordered?: boolean;
}

const cellStyle = 'w-full flex flex-col gap-1 justify-center items-center'

export function Cell({ short = false, bordered = false, className, ...props }: CellProps) {
	const heightStyle = short ? 'h-10' : 'h-12'
	const borderStyle = concat('border-t border-l last:border-b', !bordered && 'first:border-none')

	return (
		<div
			className={concat(cellStyle, heightStyle, borderStyle, className)}
			{...props}
		/>
	)
}

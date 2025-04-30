import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

type CellProps = ComponentProps<'div'> & {
	short?: boolean;
	borders?: string;
}

const cellStyle = 'w-full flex flex-col justify-center items-center'
const cellBorderStyle = 'border-b border-r'

export function Cell({ short = false, borders, className, ...props }: CellProps) {
	const heightStyle = short ? 'gap-1 h-10' : 'gap-2 h-12'

	return (
		<div
			className={concat(cellStyle, borders || cellBorderStyle, heightStyle, className)}
			{...props}
		/>
	)
}

import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

type DualPanelExpand = 'above' | 'below' | 'both'

type DualPanelProps = ComponentProps<'div'> & {
	expand?: DualPanelExpand;
	fixed?: boolean;
}

const expandStyles: Record<DualPanelExpand, [string, string]> = {
	above: ['grid-rows-[1fr_auto]', 'condensed:grid-cols-[1fr_auto]'],
	below: ['grid-rows-[auto_1fr]', 'condensed:grid-cols-[auto_1fr]'],
	both: ['grid-rows-[auto_1fr]', 'condensed:grid-cols-[auto_1fr]'],
}

export function DualPanel({ className, expand = 'both', fixed = false, ...props }: DualPanelProps) {
	const [baseStyle, condensedStyle] = expandStyles[expand]

	return (
		<div
			className={concat(
				'grid h-full',
				baseStyle,
				!fixed && 'condensed:grid-rows-[auto]',
				!fixed && condensedStyle,
				className,
			)}
			{...props}
		/>
	)
}

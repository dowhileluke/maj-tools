import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

type DualPanelExpand = 'above' | 'below' | 'both'
type DualPanelTrigger = 'condensed' | 'landscape' | 'none'

type DualPanelProps = ComponentProps<'div'> & {
	expand?: DualPanelExpand;
	trigger?: DualPanelTrigger;
}

const expandStyles: Record<DualPanelExpand, [string, string, string]> = {
	above: ['grid-rows-[1fr_auto]', 'condensed:grid-cols-[1fr_auto]', 'landscape:grid-cols-[1fr_auto]'],
	below: ['grid-rows-[auto_1fr]', 'condensed:grid-cols-[auto_1fr]', 'landscape:grid-cols-[auto_1fr]'],
	both: ['grid-rows-[auto_1fr]', 'condensed:grid-cols-[auto_1fr]', 'landscape:grid-cols-[auto_1fr]'],
}

export function DualPanel({ className, expand = 'both', trigger = 'condensed', ...props }: DualPanelProps) {
	const [baseStyle, condensedStyle, landscapeStyle] = expandStyles[expand]

	return (
		<div
			className={concat(
				'grid h-full',
				baseStyle,
				trigger === 'condensed' && 'condensed:grid-rows-[auto]',
				trigger === 'condensed' && condensedStyle,
				trigger === 'landscape' && 'landscape:grid-rows-[auto]',
				trigger === 'landscape' && landscapeStyle,
				className,
			)}
			{...props}
		/>
	)
}

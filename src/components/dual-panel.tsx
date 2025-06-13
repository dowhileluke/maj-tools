import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

type DualPanelExpand = 'above' | 'below' | 'both'

type DualPanelProps = ComponentProps<'div'> & {
	expand?: DualPanelExpand;
}

const expandStyles: Record<DualPanelExpand, string> = {
	above: 'grid-rows-[1fr_auto] condensed:grid-cols-[1fr_auto]',
	below: 'grid-rows-[auto_1fr] condensed:grid-cols-[auto_1fr]',
	both: 'grid-rows-[auto_1fr] condensed:grid-cols-[auto_1fr]',
}

export function DualPanel({ className, expand = 'both', ...props }: DualPanelProps) {
	return (
		<div
			className={concat('grid condensed:grid-rows-[auto]', expandStyles[expand], className)}
			{...props}
		/>
	)
}

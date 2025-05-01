import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

const labelStyle = 'flex flex-col justify-center items-center gap-2'

export function FlexLabel({ className, children, title, ...props }: ComponentProps<'label'>) {
	return (
		<label className={concat(labelStyle, className)} {...props}>
			<span className="text-center">{title}</span>
			{children}
		</label>
	)
}

import { ComponentProps } from 'react'
import { concat } from '../functions/concat'

export function BorderBox({ className, children, ...props }: ComponentProps<'div'>) {
	return (
		<div className={concat(className, 'relative')} {...props}>
			{children}
			<div className="absolute top-0 left-0 h-full border-l" />
			<div className="absolute top-0 right-0 h-full border-l" />
		</div>
	)
}

import { Dialog, DialogPanel, DialogProps } from '@headlessui/react'
import { concat } from '../functions/concat'

const panelStyle = 'w-full max-w-lg h-full overflow-hidden p-8 bg-white rounded-lg shadow-xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'

export function Modal({ className, children, ...props }: DialogProps) {
	if (className instanceof Function || children instanceof Function) {
		return (
			<Dialog className={className} {...props}>
				{children}
			</Dialog>
		)
	}

	return (
		<Dialog as="div" className="relative z-10 focus:outline-none" {...props}>
			<div className="fixed inset-0 z-10 w-screen h-screen">
				<div className="flex h-full items-center justify-center p-4 overflow-hidden">
					<DialogPanel transition className={concat(panelStyle, className)}>
						{children}
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

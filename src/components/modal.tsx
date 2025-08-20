import { Dialog, DialogPanel, DialogProps } from '@headlessui/react'
import { concat } from '../functions/concat'

const panelStyle = 'p-8 max-h-full overflow-hidden bg-(--back) rounded-lg shadow-sm shadow-current duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'

export function Modal({ className, children, ...props }: DialogProps) {
	if (className instanceof Function || children instanceof Function) {
		return (
			<Dialog className={className} {...props}>
				{children}
			</Dialog>
		)
	}

	return (
		<Dialog className="fixed inset-0 z-10 focus:outline-none" {...props}>
			<div className="fixed inset-0 z-10 w-screen h-screen overflow-hidden">
				<div className="flex items-center justify-center h-full p-4 overflow-hidden">
					<DialogPanel transition className={concat(panelStyle, className)}>
						{children}
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}
